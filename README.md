# Brand Infinity — website

A single-page, editorial redesign of [brandinfinity.sg](https://www.brandinfinity.sg/), built to showcase projects and drive partnership enquiries.

Work can be browsed as an editorial **Grid** or a text **Index** (hover a row to preview). Each project opens as a full-screen case study with its own shareable link, e.g. `/#project/tumi-bullet-train`.

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
}
```

The grid layout alternates large and small images automatically, so order in the list is the order on the page.

Mark a project `highlight: true` to show it in the Our Work carousel.

The **Products & activations** tiles are the `PRODUCTS` list, and the partner logos are `PARTNER_GROUPS` (one row per sector, logo files in `assets/logos/`), both in the same file.

The opening montage is the four `hero-media` items near the top of `index.html`, one per highlighted word (Film, Licensing, Gaming, Streaming). Swap a file there to change what plays.

## Contact form

The form opens the visitor's email app with a pre-filled message to connect@brandinfinity.sg. To collect submissions without email, point the form at a service like Formspree or Netlify Forms.

## Publish on GitHub Pages

Repository **Settings → Pages → Deploy from a branch → `main` / root**.

## Partner links

Each partner logo opens that brand's website in a new tab. The addresses are in the `PARTNER_LINKS` list at the bottom of `projects.js`.


## Features added in round 9

- **Showreel**: the "Watch showreel" button in the hero plays every campaign film back to back. Any project with a `video` is included automatically.
- **Case-study results**: add `results: [{ value: "12M", label: "Video views" }]` to a project in `projects.js`. Without it the case study shows "Results available on request".
- **On the slate**: the four cards in the dark launch band come from `window.SLATE` in `projects.js`. Keep them generic; the real slate is shared under NDA.
- **How it works**: the 4 steps under Services are plain HTML in `index.html`.
- **Testimonials**: add quotes to `window.TESTIMONIALS` in `projects.js`. The section stays hidden while the list is empty.
- **Contact form**: by default it opens the visitor's email app. To have enquiries arrive straight in the inbox, create a free form at formspree.io (set the notification email to connect@brandinfinity.sg) and paste its URL into `SITE.formEndpoint` in `projects.js`.
- **Visit stats**: sign up at goatcounter.com, then put your code (the `xxx` in `xxx.goatcounter.com`) into `SITE.goatcounter`. Off until set. Showreel opens and sent enquiries are counted as events.
- **Languages**: EN / ไทย / 中文 picker in the header, remembered per visitor. Translations live in `i18n.js`; anything not translated falls back to English. Long paragraphs (service descriptions, Why us, project summaries) are English only for now. Have a native speaker review before using with clients.
- **Credentials PDF**: `assets/brand-infinity-credentials.pdf`, linked in Contact and the footer.
- **Link preview**: `assets/og.jpg` is the image shown when the link is shared on WhatsApp, LinkedIn, Slack etc.

To rebuild the PDF and preview image after changing projects or copy:

```bash
python3 -m http.server 8765
```

```bash
node tools/build-assets.js
```

The deck layout is `tools/credentials.html`; the preview image is `tools/og.html`. If the site moves to a new address, update the `og:url`, `og:image` and `twitter:image` tags in `index.html`.
