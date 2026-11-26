# Brand Infinity — website

A modern, single-page redesign of [brandinfinity.sg](https://www.brandinfinity.sg/), built to showcase projects and drive partnership enquiries.

Plain HTML, CSS and JavaScript. No build step, so it runs on GitHub Pages, Netlify, Vercel or any static host.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Add or edit a project

All work is in **`projects.js`**. Copy an entry, change the fields, and drop images into `assets/work/`:

```js
{
  brand: "Brand", ip: "IP name",
  category: "film",            // film | gaming | streaming | licensing
  summary: "One-line description.",
  tags: ["Film tie-in", "Retail"],
  images: ["assets/work/my-project.webp"],
  video: "assets/video/my-project.mp4",   // optional
  featured: true                          // optional: large card
}
```

Tip: keep featured cards in pairs so the grid rows stay even.

The partner logo strip is the `PARTNERS` list at the bottom of the same file (file names in `assets/logos/`).

## Contact form

The form opens the visitor's email app with a pre-filled message to connect@brandinfinity.sg. To collect submissions without email, point the form at a service like Formspree or Netlify Forms.

## Publish on GitHub Pages

Repository **Settings → Pages → Deploy from a branch → `main` / root**.
