# The Cup Index, design skill

A portable brand + content skill for **The Cup Index**, a faceless, data-driven cafe-review brand.

Contents:

- `SKILL.md` , the skill itself: palette, type pairing, the six-axis scoring system, carousel structure, caption format, voice.
- `components/` , the three reusable Design Components (radar mark, logo lockup, labelled review radar) plus the `support.js` runtime.
- `templates/review-carousel.dc.html` , a complete three-slide 1080×1350 review carousel to copy and refill.
- `reference/caption-format.md` , the caption template with a worked example.
- `reference/brand-guidelines.dc.html` , the full visual guidelines page. Open in a browser.
- `reference/logo-sheet.dc.html` , every logo variant and size test.
- `reference/colour-explorations.dc.html` , the palettes considered and rejected.
- `examples/` , four published review carousels and the three intro posts, with their photos.

Each folder is self-contained: the component files and the runtime are mirrored into `examples/`, `templates/` and `reference/` so any `.dc.html` opens directly in a browser with no build step.

Start at `index.html` for a browsable index of everything, or read `SKILL.md` directly. `UPLOAD.md` covers publishing this repo as a GitHub Pages site.

## Using it

Drop the folder into a project that supports agent skills, or hand `SKILL.md` to any capable design agent as a brief. To build a new review: copy the template, replace the two photos, the venue name, the neighbourhood, the index number, the six scores and the adjustment lines, then export each `[data-export]` slide at 2x.

## Forking it

SKILL.md ends with a rebranding section: what transfers to another index (the six-axis method, the three-slide carousel, the two-typeface contrast, the voice) and what does not (this name, this palette, this wordmark).

## Brand at a glance

| | |
|---|---|
| Ink | Chestnut `#964B34` |
| Field | Vanilla `#F1E7C4` |
| Data | Deep honey `#D9A03C` (labels on light: `#B5762A`) |
| Humanist type | Satoshi |
| Technical type | Saira |
| Axes | Latte, Vibe, Food, Price, Location, Repeatability |

No em dashes. No fourth colour. No exclamation marks.
