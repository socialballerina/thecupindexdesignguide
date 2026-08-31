# Uploading this to GitHub

This package is meant to sit at the **root** of `socialballerina/thecupindexdesignguide`, not inside a subfolder.

## Route 1, browser drag and drop, easiest

1. Unzip the download. You will get a folder called `skill`.
2. Go to https://github.com/socialballerina/thecupindexdesignguide
3. The repo is empty, so the landing page offers **uploading an existing file**. Click it. (On a non-empty repo it is **Add file → Upload files**.)
4. Open the unzipped `skill` folder and select **everything inside it** (`SKILL.md`, `README.md`, `index.html`, and the `components`, `templates`, `examples`, `reference`, `assets` folders). Drag that selection onto the page. Do not drag the `skill` folder itself, or everything ends up one level too deep.
5. GitHub preserves the folder structure. Commit message: `Add The Cup Index design skill`.
6. Click **Commit changes**.

## Route 2, command line

```bash
git clone https://github.com/socialballerina/thecupindexdesignguide.git
cd thecupindexdesignguide
cp -R /path/to/unzipped/skill/. .
git add .
git commit -m "Add The Cup Index design skill"
git push
```

## Optional, turn on GitHub Pages

`index.html` is a browsable landing page linking to the guidelines, logo sheet and examples. To make it live:

Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → Save.

After a minute the system is viewable at `https://socialballerina.github.io/thecupindexdesignguide/`. Anyone you share it with can read the guidelines and open the example carousels in their browser, no download needed.

## Expected structure once uploaded

```
thecupindexdesignguide/
├── SKILL.md
├── README.md
├── UPLOAD.md
├── index.html
├── assets/          logo PNGs
├── components/      RadarMark, LogoLockup, ReviewRadar, support.js
├── templates/       review-carousel.dc.html, ready to refill
├── examples/        four published reviews, intro posts, photos
└── reference/       brand guidelines, logo sheet, colour explorations, caption format
```
