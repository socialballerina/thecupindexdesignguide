/* doc-page, a paged document frame.
   Wraps a run of <section class="page"> children and gives each one real page
   dimensions, stacks them on a desk, and prints one section per sheet.

   <doc-page size="letter">        816 × 1056 at 96dpi, the default
   <doc-page size="a4">            794 × 1123
   <doc-page size="letter" landscape>
   <doc-page size="1080x1350">     any explicit pixel size

   Defining the element also clears the `doc-page:not(:defined)` guard that
   keeps the document hidden until the frame is ready. */
(function () {
  if (window.customElements && customElements.get('doc-page')) return;

  var SIZES = { letter: [816, 1056], legal: [816, 1344], a4: [794, 1123], a5: [559, 794] };
  var STYLE_ID = 'doc-page-style';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = [
      'doc-page{display:flex;flex-direction:column;align-items:center;gap:var(--doc-gap,40px);',
        'padding:var(--doc-gap,40px) 20px calc(var(--doc-gap,40px) * 2);background:var(--doc-desk,#DCCB9F);',
        'min-height:100vh;box-sizing:border-box}',
      'doc-page>.page{width:var(--doc-w);height:var(--doc-h);flex:0 0 auto;overflow:hidden;position:relative;',
        'box-shadow:0 1px 2px rgba(58,26,14,0.16),0 12px 34px rgba(58,26,14,0.14)}',
      /* Narrow viewports scale the sheet down rather than letting it overflow. */
      '@media (max-width:900px){doc-page>.page{transform:scale(var(--doc-scale,1));transform-origin:top center;',
        'margin-bottom:calc((var(--doc-h) * (var(--doc-scale,1) - 1)))}}',
      '@media print{doc-page{background:none;padding:0;gap:0;min-height:0}',
        'doc-page>.page{box-shadow:none;break-after:page;page-break-after:always}',
        'doc-page>.page:last-child{break-after:auto;page-break-after:auto}}'
    ].join('');
    (document.head || document.documentElement).appendChild(s);
  }

  function parseSize(raw) {
    var v = (raw || 'letter').trim().toLowerCase();
    if (SIZES[v]) return SIZES[v].slice();
    var m = v.match(/^(\d+(?:\.\d+)?)\s*[x×]\s*(\d+(?:\.\d+)?)$/);
    if (m) return [parseFloat(m[1]), parseFloat(m[2])];
    return SIZES.letter.slice();
  }

  var DocPage = function () {
    return Reflect.construct(HTMLElement, [], DocPage);
  };
  DocPage.prototype = Object.create(HTMLElement.prototype);
  DocPage.prototype.constructor = DocPage;
  Object.setPrototypeOf(DocPage, HTMLElement);

  DocPage.observedAttributes = ['size', 'landscape', 'gap'];

  DocPage.prototype.connectedCallback = function () {
    injectStyle();
    this.apply();
    if (!this._ro && window.ResizeObserver) {
      var self = this;
      this._ro = new ResizeObserver(function () { self.fit(); });
      this._ro.observe(document.documentElement);
    }
  };
  DocPage.prototype.disconnectedCallback = function () {
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
  };
  DocPage.prototype.attributeChangedCallback = function () {
    if (this.isConnected) this.apply();
  };

  DocPage.prototype.apply = function () {
    var wh = parseSize(this.getAttribute('size'));
    if (this.hasAttribute('landscape')) wh = [wh[1], wh[0]];
    this.style.setProperty('--doc-w', wh[0] + 'px');
    this.style.setProperty('--doc-h', wh[1] + 'px');
    if (this.getAttribute('gap')) this.style.setProperty('--doc-gap', this.getAttribute('gap'));
    this._w = wh[0];
    /* Give the print sheet the same geometry as the screen sheet. */
    var pid = 'doc-page-at-rule';
    var at = document.getElementById(pid) || document.createElement('style');
    at.id = pid;
    at.textContent = '@page{size:' + wh[0] + 'px ' + wh[1] + 'px;margin:0}';
    if (!at.parentNode) (document.head || document.documentElement).appendChild(at);
    this.fit();
  };

  /* Scale the sheet to fit narrow screens, so a phone shows the whole page. */
  DocPage.prototype.fit = function () {
    if (!this._w) return;
    var avail = (this.clientWidth || window.innerWidth) - 40;
    var scale = avail > 0 && avail < this._w ? Math.max(avail / this._w, 0.2) : 1;
    this.style.setProperty('--doc-scale', String(Math.round(scale * 1000) / 1000));
  };

  try {
    customElements.define('doc-page', DocPage);
  } catch (e) {
    /* Last resort: if defining fails, never leave the document invisible. */
    injectStyle();
    var un = document.querySelectorAll('doc-page');
    for (var i = 0; i < un.length; i++) un[i].style.visibility = 'visible';
  }
})();
