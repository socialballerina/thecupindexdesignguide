---
name: The Cup Index
description: Brand and content system for The Cup Index, a data-driven, faceless cafe-review brand that scores coffee shops on six axes and publishes 4:5 Instagram carousels. Use for any Cup Index logo, brand asset, review carousel, social post, or caption. Triggers on "cup index", "cafe scorecard", "coffee radar", "six-axis coffee review".
---

# The Cup Index, brand + content skill

A faceless, data-driven cafe index. The voice is dry, precise, unsentimental. Never cozy-cafe, never influencer. Closer to a performance-tech brand than a coffee blog.

## Non-negotiables

1. **Palette. Three colours only.**
   - Chestnut `#964B34` , primary ink and dark field
   - Vanilla `#F1E7C4` , light field and reversed ink
   - Deep honey `#D9A03C` , data / accent. On vanilla fields use the deepened honey `#B5762A` for labels so they clear 3:1 contrast.
   - Page desk colour behind artwork: `#DCCB9F`. No gradients except the photo scrims defined below. No fourth colour, ever.

2. **Type. Two typefaces, always both.**
   - **Satoshi** (Fontshare) for the humanist half: "Cup", venue names, body copy. Weight 700 for names, 400 for body.
   - **Saira** (Google) for the technical half: "INDEX", all eyebrows, all numerals, all labels. Weight 500/600, uppercase, letter-spacing 0.22em to 0.44em.
   - The contrast is the idea: human warmth measured by technical precision. Never set a whole layout in one of them.
   - Canva equivalents if Satoshi/Saira are unavailable: **Poppins** or **Figtree** for Cup, **Archivo** or **Barlow Semi Condensed** for Index.

3. **The mark.** A flat hexagonal six-axis radar: outer hex, one inner hex, three axis diagonals, an irregular plotted polygon in honey, and one filled dot on the latte vertex. Thin precise strokes, flat, no texture. It doubles as the **X in "INDEX"** in the wordmark.

4. **No em dashes anywhere.** Use commas or full stops. This is a hard house rule.

5. **Six axes, in this order:** Latte, Vibe, Food, Price, Location, Repeatability. Scored 0 to 10. The composite is the plain mean, one decimal.

6. **Adjustments, not extra scores.** Merits and demerits are listed as considerations, never as explicit point values. Things considered: iced-drink cup material (paper or plastic), accessibility from public transport, milk options, seating comfort, laptopability, music, queue length, quality of avocado toast and banana bread.

## For human designers

Everything below is written to be read either way. If you are working in Figma or Canva rather than code, the parts that matter are the palette, the type pairing and its Canva substitutes, the three-slide carousel structure, and the caption format. `reference/brand-guidelines.dc.html` and `reference/logo-sheet.dc.html` show the full system laid out visually. They load their own components with JavaScript, so serve the folder over http rather than double-clicking, `python3 -m http.server 8000`, or read them on the published site. `reference/colour-explorations.dc.html` shows the palettes that were considered and rejected, and why.

## Components (in `components/`)

Design Component files, drop them beside your page and mount with `<dc-import>`.

- `RadarMark.dc.html` , the icon mark. Props: `ink`, `accent`, `sw`, `fillOpacity`, `gridOpacity`.
- `LogoLockup.dc.html` , wordmark with the radar as the X. Props: `layout` (stacked | horizontal), `size`, `ink`, `accent`, `gsw`.
- `ReviewRadar.dc.html` , the labelled six-axis chart. Props: the six axis scores plus `ink`, `accent`, `sw`, `dotR`, `labelSize`, `valueSize`, `fillOpacity`, `showLabels`.

Axis labels and values are drawn as real SVG `<text>` built in `renderVals()`. Do not move them into template holes, they will not paint.

## The review carousel

Every review is exactly three 1080 × 1350 slides. Copy `templates/review-carousel.dc.html` and swap the content. Structure:

**Slide 1, scorecard over the cups.** Full-bleed photo of the drinks in hand, chestnut scrim
(`linear-gradient(180deg,rgba(58,26,14,0.45) 0%,rgba(58,26,14,0.12) 34%,rgba(58,26,14,0.55) 100%)`),
"INDEX NO. NNN" top left and the neighbourhood top right in Saira/vanilla, then a **centred vanilla card**: horizontal lockup, radar mark, venue name in Satoshi 700, composite score in Saira 600 honey. No per-axis breakdown on slide 1.

**Slide 2, the analysis.** Vanilla field. Eyebrow "THE ANALYSIS", venue name, "No. NNN / neighbourhood" right-aligned. Centred `ReviewRadar` at 760px with names and values on the chart itself. Then "ADJUSTMENTS", five lines max, `+` and `−` markers in a fixed 26px Saira column. Footer rule with the composite bottom right.

**Slide 3, the venue.** Full-bleed exterior photo, scrim
(`...0.42 / 0.05 / 0.72`), "INDEX NO. NNN" and a small radar mark top row, then a hairline rule with the venue name bottom left and the HK neighbourhood bottom right.

### Rules that keep exports clean

- Slides are `width:1080px;height:1350px` with `data-export="rNs1"` and `data-screen-label`.
- Set explicit **pixel** `line-height` on every text block, not unitless. The export renderer collapses unitless line heights and text overlaps.
- Put `white-space:nowrap` on adjustment lines and venue names, and shrink the font or hard-break with `<br>` for long names rather than letting them wrap.
- Verify each slide's `scrollHeight` is exactly 1350 before exporting. If it overflows, reduce the radar width and the gaps, not the type size.
- Export at 2x, giving 2160 × 2700.

## Caption format

```
📍 [Venue] @[handle]

☕ Latte: X/10

🎨 Vibe: X/10

🍽️ Food: X/10

💰 Price: X/10

📍 Location: X/10

🔁 Repeatability: X/10

+ [merit, lowercase, specific]
− [demerit, lowercase, specific]

[Two or three dry sentences of real commentary. An observation, a consequence, a verdict. No exclamation marks, no hype, no first-person plural gushing.]

#thecupindex #hongkongcoffee #hkcafes #coffeerating #cafe
```

Every score line sits on its own line with a blank line between. Merits and demerits are lowercase fragments. The commentary must say something a score cannot.

## Voice examples

Good: "The coffee deserves a chair, which is the one thing on the menu they do not offer."
Good: "Comes for the laptop, stays for the food. The latte is the least interesting thing on the table."
Bad: "Such a cute spot, we loved it!" Bad anything with an exclamation mark or an em dash.

## Standing editorial rules

- Visits are always unannounced and always paid for. No sponsorships, no free coffee. Say so when the format allows.
- If two reviewers visit together, the two cards are averaged and never discussed before scoring.
- Same order everywhere: a latte, avocado toast if it exists, banana bread if available.
- Tolerance: ±0 opinions.


## Worked examples

`examples/` holds four published review carousels (Islet Coffee Lab, Common Man Coffee Roasters, Marouf Coffee, Manners Matter Ltd) and the three intro posts that launched the account. Open any of them over a local server, or on the published site. They are the fastest way to see the rules applied, including how long venue names are handled and how the adjustment lines are phrased.

## Forking this for another brand

The method transfers, the identity does not. If you are building a different index, keep the machinery and replace the surface.

**Keep:**
- Six axes, scored 0 to 10, composite as the plain mean to one decimal.
- Adjustments as unweighted considerations, never explicit point values.
- The three-slide carousel shape: photo with scorecard, analysis with the labelled radar, venue photo with name and area.
- The two-typeface contrast principle, one humanist and one technical, with the technical face carrying every numeral and label.
- The dry, unsentimental voice, and the standing editorial rules (unannounced, self-funded, same order everywhere).
- The radar as both chart and logo element. Letting the mark double as a letterform is what ties the identity to the method.

**Replace:**
- The six axis names. They should be the six things that actually decide the category. For a ramen index that might be broth, noodle, topping, price, wait, repeatability.
- The palette. Three colours: a dark ink, a light field, one accent reserved exclusively for data. Never a fourth. Check the accent against the light field at 3:1 and deepen it if it fails, which is why this brand carries `#B5762A` alongside `#D9A03C`.
- The typefaces, holding the humanist/technical contrast.
- The emoji set and hashtags in the caption.

**Do not carry over:** the Cup Index name, the chestnut/vanilla/honey palette, or the specific wordmark. Those are this brand's.
