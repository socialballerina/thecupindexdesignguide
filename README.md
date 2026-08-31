# The Cup Index, design guide

**Read it in your browser: [socialballerina.github.io/thecupindexdesignguide](https://socialballerina.github.io/thecupindexdesignguide/)**

The Cup Index is a faceless, data-driven cafe index. Every cafe is scored on the same six axes, plotted on a hexagonal radar, and published as a three-slide Instagram carousel. This repo is the whole system: the colours, the type, the logo, the radar components, a fill-in template, and four published reviews to copy from.

You do not need to be a developer to use it. Pick the row that sounds like you.

| If you want to | Go here |
|---|---|
| Just look at the brand | [The visual guidelines](reference/brand-guidelines.dc.html), best viewed on the [live site](https://socialballerina.github.io/thecupindexdesignguide/reference/brand-guidelines.dc.html) |
| Read the rules in full | [SKILL.md](SKILL.md), or the [prettier web version](https://socialballerina.github.io/thecupindexdesignguide/guide.html) |
| Make a new review in Canva or Figma | [Design a review by hand](#design-a-review-by-hand) |
| Make a new review in code | [Design a review in code](#design-a-review-in-code) |
| Hand the brand to an AI assistant | [Use it as an agent skill](#use-it-as-an-agent-skill) |
| Start your own index for something else | The *Forking this for another brand* section at the end of [SKILL.md](SKILL.md) |

## The brand in ten seconds

| | |
|---|---|
| Ink | Chestnut `#964B34` |
| Field | Vanilla `#F1E7C4` |
| Data, accent | Deep honey `#D9A03C`, and `#B5762A` for labels on light backgrounds |
| Humanist type | Satoshi, free from [Fontshare](https://www.fontshare.com/fonts/satoshi). In Canva use Poppins or Figtree |
| Technical type | Saira, free from [Google Fonts](https://fonts.google.com/specimen/Saira). In Canva use Archivo or Barlow Semi Condensed |
| Six axes, always this order | Latte, Vibe, Food, Price, Location, Repeatability |
| Score | Each axis 0 to 10. The headline number is the plain average, one decimal |
| Post size | Three slides, 1080 × 1350, exported at 2x |

Three house rules that are not negotiable: **no em dashes**, **no fourth colour**, **no exclamation marks**.

## Design a review by hand

For Canva, Figma, Illustrator, or anything else that is not code.

1. Open the [visual guidelines](https://socialballerina.github.io/thecupindexdesignguide/reference/brand-guidelines.dc.html) and the [logo sheet](https://socialballerina.github.io/thecupindexdesignguide/reference/logo-sheet.dc.html) and keep both open while you work.
2. Grab the logo files from [`assets/`](assets). There is a square logo on chestnut and on vanilla, a mark on its own, and a circular avatar for profile pictures.
3. Set your canvas to 1080 × 1350 and build three slides in this order: the drinks photo with the scorecard, the vanilla analysis slide with the radar, the venue photo with the name. The exact recipe for each slide is in [SKILL.md](SKILL.md#the-review-carousel).
4. Open any of the four finished reviews in [`examples/`](examples) side by side with your draft. They are the fastest way to see the spacing and the tone.
5. Write the caption using [`reference/caption-format.md`](reference/caption-format.md), which includes a real worked example.

## Design a review in code

1. Copy the whole [`templates/`](templates) folder and rename it, for example `review-005-someplace`.
2. Replace `photos/drinks.jpg` and `photos/venue.jpg` with your two photos. Keep those filenames and the template just works. The two files in there now are placeholders telling you exactly that.
3. Open `review-carousel.dc.html` in a text editor and replace every `[VENUE NAME]`, every `NNN` with your index number, the neighbourhood, the six scores, and the adjustment lines.
4. Preview it. These files read their own components with JavaScript, so **double-clicking will not work**, you need a local web server. In Terminal, from inside the repo folder:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/templates/review-carousel.dc.html`. Any static server works, this one just ships with macOS and Linux.

5. Before exporting, check each slide is exactly 1350px tall. If a slide overflows, shrink the radar and the gaps, never the type size. Export at 2x for 2160 × 2700.

The rules that keep exports clean, pixel line-heights, `white-space:nowrap` on names, and the rest, are listed in [SKILL.md](SKILL.md#rules-that-keep-exports-clean). They exist because each one broke a real export once.

## Use it as an agent skill

`SKILL.md` is a skill file, so any AI assistant that supports skills can wear this brand.

**Claude Code**, from your project folder:

```bash
git clone https://github.com/socialballerina/thecupindexdesignguide.git .claude/skills/the-cup-index
```

**Anything else**, paste the contents of `SKILL.md` in as a brief or a system prompt. It is written to stand alone.

Once it is loaded, ask for what you want in plain language, for example *"score Islet Coffee Lab and build the carousel"*, and the six axes, the palette, the slide structure, and the caption format all come along automatically.

## What is in here

```
├── SKILL.md          the brand and content rules, the source of truth
├── index.html        browsable home page, start here in a browser
├── guide.html        SKILL.md rendered as a readable web page
├── assets/           logo PNGs, square, mark only, circular avatar
├── components/       the radar mark, the logo lockup, the labelled review radar
├── templates/        a three-slide carousel ready to refill, with placeholder photos
├── examples/         four published reviews and the three intro posts
└── reference/        visual guidelines, logo sheet, colour explorations, caption format
```

The `.dc.html` files are ordinary web pages. `components/`, `templates/`, `examples/` and `reference/` each carry their own copy of the components and the runtime, so every folder stands on its own.

## Questions people ask

**Why does nothing show when I double-click a `.dc.html` file?** Browsers block local file reads for security, and these pages load their components that way. Serve the folder over http instead, see the one-line command above, or use the [live site](https://socialballerina.github.io/thecupindexdesignguide/).

**Can I add a colour?** No. Three colours is the identity. If honey fails contrast on a light background, use the deepened `#B5762A`, which is exactly why that value exists.

**Can I reorder the axes?** No. Same six, same order, every time. Comparability across reviews is the whole point of an index.

**Where do merits and demerits get their points?** They do not. Adjustments are listed as considerations and never carry explicit point values. Only the six axes score.

**Can I use this for a ramen index, a hotel index, something else?** Yes, and the last section of [SKILL.md](SKILL.md) tells you exactly what transfers, the method, and what does not, the name, the palette, and the wordmark.

## Reuse

The method is free to take: six axes, the radar, the three-slide shape, the voice. The Cup Index name, the chestnut and vanilla and honey palette, and the wordmark belong to this brand, so build your own surface on top.
