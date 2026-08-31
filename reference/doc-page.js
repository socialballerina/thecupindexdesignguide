/* doc-page, a paged document frame.
   Wraps a run of <section class="page"> children, gives each real page
   dimensions, stacks them on a desk, and prints one section per sheet.

   <doc-page size="letter">             816 × 1056 at 96dpi, the default
   <doc-page size="a4">                 794 × 1123
   <doc-page size="letter" landscape>   swaps the axes
   <doc-page size="1080x1350">          any explicit pixel size

   Defining the element also clears the `doc-page:not(:defined)` guard that
   keeps the document hidden until the frame is ready.

   Geometry lives in a stylesheet keyed off the `size` attribute rather than
   in inline styles on the host, because the component runtime re-renders the
   tree through React and wipes host inline styles when it does. */
(function () {
  var SIZES = { letter: [816, 1056], legal: [816, 1344], a4: [794, 1123], a5: [559, 794] };
  var STYLE_ID = 'doc-page-style';
  var sheet = null;

  function baseCss() {
    var css = [
      'doc-page{display:block;background:var(--doc-desk,#DCCB9F);min-height:100vh;',
        'padding:var(--doc-gap,40px) 0 calc(var(--doc-gap,40px) * 2);box-sizing:border-box;',
        '--doc-w:816px;--doc-h:1056px}',
      'doc-page>.page{width:var(--doc-w);height:var(--doc-h);margin:0 auto var(--doc-gap,40px);',
        'overflow:hidden;position:relative;box-sizing:border-box;',
        'box-shadow:0 1px 2px rgba(58,26,14,0.16),0 12px 34px rgba(58,26,14,0.14)}',
      'doc-page>.page:last-child{margin-bottom:0}',
      /* Narrow viewports scale the whole sheet down instead of overflowing.
         The negative margin absorbs the space a transform leaves behind. */
      'doc-page>.page{transform:scale(var(--doc-scale,1));transform-origin:top center}',
      'doc-page>.page{margin-bottom:calc(var(--doc-gap,40px) + var(--doc-h) * (var(--doc-scale,1) - 1))}',
      '@media print{doc-page{background:none;padding:0;min-height:0}',
        'doc-page>.page{box-shadow:none;margin:0;transform:none;break-after:page;page-break-after:always}',
        'doc-page>.page:last-child{break-after:auto;page-break-after:auto}}'
    ];
    for (var k in SIZES) {
      if (!Object.prototype.hasOwnProperty.call(SIZES, k)) continue;
      var s = SIZES[k];
      css.push('doc-page[size="' + k + '"]{--doc-w:' + s[0] + 'px;--doc-h:' + s[1] + 'px}');
      css.push('doc-page[size="' + k + '"][landscape]{--doc-w:' + s[1] + 'px;--doc-h:' + s[0] + 'px}');
    }
    return css.join('');
  }

  function ensureSheet() {
    if (sheet && sheet.isConnected) return sheet;
    sheet = document.getElementById(STYLE_ID);
    if (!sheet) {
      sheet = document.createElement('style');
      sheet.id = STYLE_ID;
      sheet.textContent = baseCss();
    }
    if (!sheet.isConnected) (document.head || document.documentElement).appendChild(sheet);
    return sheet;
  }

  /* An explicit "1080x1350" style size needs a rule of its own. Keyed off the
     literal attribute value so it survives a re-render like the rest. */
  var customDone = {};
  function ensureCustomSize(raw, landscape) {
    var key = raw + (landscape ? '|l' : '');
    if (customDone[key]) return true;
    var m = String(raw).trim().toLowerCase().match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)$/);
    if (!m) return false;
    var w = parseFloat(m[1]), h = parseFloat(m[2]);
    if (landscape) { var t = w; w = h; h = t; }
    var sel = 'doc-page[size="' + raw + '"]' + (landscape ? '[landscape]' : '');
    ensureSheet().textContent += sel + '{--doc-w:' + w + 'px;--doc-h:' + h + 'px}';
    customDone[key] = true;
    return true;
  }

  function pageWidth(el) {
    var v = getComputedStyle(el).getPropertyValue('--doc-w').trim();
    var n = parseFloat(v);
    return isFinite(n) && n > 0 ? n : 816;
  }

  /* The scale goes on <html>, which the runtime never re-renders. */
  function fitAll() {
    var els = document.querySelectorAll('doc-page');
    if (!els.length) return;
    var avail = (window.innerWidth || 1024) - 40;
    var widest = 0;
    for (var i = 0; i < els.length; i++) widest = Math.max(widest, pageWidth(els[i]));
    var scale = widest > 0 && avail < widest ? Math.max(avail / widest, 0.2) : 1;
    document.documentElement.style.setProperty('--doc-scale', String(Math.round(scale * 1000) / 1000));
  }

  function setPrintSize(el) {
    var w = pageWidth(el);
    var cs = getComputedStyle(el).getPropertyValue('--doc-h').trim();
    var h = parseFloat(cs) || 1056;
    var at = document.getElementById('doc-page-at-rule') || document.createElement('style');
    at.id = 'doc-page-at-rule';
    at.textContent = '@page{size:' + w + 'px ' + h + 'px;margin:0}';
    if (!at.isConnected) (document.head || document.documentElement).appendChild(at);
  }

  function setup(el) {
    ensureSheet();
    var size = el.getAttribute('size');
    if (size && !SIZES[String(size).toLowerCase()]) {
      ensureCustomSize(size, el.hasAttribute('landscape'));
    }
    setPrintSize(el);
    fitAll();
  }

  if (!window.customElements) {                 /* No custom elements, just style it. */
    ensureSheet();
    window.addEventListener('resize', fitAll);
    document.addEventListener('DOMContentLoaded', function () {
      var e = document.querySelectorAll('doc-page');
      for (var i = 0; i < e.length; i++) { e[i].style.visibility = 'visible'; setup(e[i]); }
    });
    return;
  }

  if (customElements.get('doc-page')) return;

  var DocPage = function () { return Reflect.construct(HTMLElement, [], DocPage); };
  DocPage.prototype = Object.create(HTMLElement.prototype);
  DocPage.prototype.constructor = DocPage;
  Object.setPrototypeOf(DocPage, HTMLElement);
  DocPage.observedAttributes = ['size', 'landscape'];
  DocPage.prototype.connectedCallback = function () { setup(this); };
  DocPage.prototype.attributeChangedCallback = function () {
    if (this.isConnected) setup(this);
  };

  try {
    customElements.define('doc-page', DocPage);
  } catch (e) {
    ensureSheet();                              /* Never leave the document invisible. */
    var un = document.querySelectorAll('doc-page');
    for (var i = 0; i < un.length; i++) un[i].style.visibility = 'visible';
  }

  ensureSheet();
  window.addEventListener('resize', fitAll);
  window.addEventListener('load', fitAll);
})();
