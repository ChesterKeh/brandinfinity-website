# Putting the new site live on brandinfinity.sg (Wix)

The current brandinfinity.sg runs on Wix. Wix can't run a hand-coded site as Wix pages, so instead
Wix shows the new site full-screen on top of the old one, using a short piece of custom code.

- **Go live:** paste the snippet, publish. Takes about 2 minutes.
- **Undo:** switch the snippet off, publish. The old Wix site is back instantly. Nothing on it is deleted.

## What you need

- Access to the Brand Infinity Wix account, as owner or admin.
- A Wix **Premium plan with the domain connected**. Wix only allows custom code on Premium sites; brandinfinity.sg already qualifies.
- The snippet: `wix/wix-custom-code.html`.

## Steps

1. In the Wix dashboard, open the Brand Infinity site.
2. Go to **Settings → Custom Code** (under *Advanced* or *Development & integrations*, depending on the Wix version).
3. Click **+ Add Custom Code** and paste the whole contents of `wix-custom-code.html`.
4. Settings:
   - **Name:** New Brand Infinity site
   - **Add Code to Pages:** All pages → *Load code once*
   - **Place Code in:** **Body - end**
5. Click **Apply**. The editor preview doesn't run custom code, so check the live site:
   open https://www.brandinfinity.sg in a private window.

## Also update in Wix (2 minutes)

The browser tab title, Google listing and link preview come from Wix, not from the new site:

- **SEO (Google) → page title:** Brand Infinity: Brand partnerships with entertainment IP
- **Meta description:** Brand Infinity connects brands with the world's leading storytellers across film, licensing, gaming and streaming. An IP partnership agency based in Singapore, working regionally and globally.
- **Social share image:** upload `assets/og.jpg`.
- **Favicon:** upload `assets/mark.png` (Settings → Favicon).

## Where the files live

The snippet currently loads the demo from GitHub Pages (Chester's account). That works today, but
for the company website the files should sit on an account Brand Infinity owns:

1. Create a free **Netlify** account with a company email.
2. Go to https://app.netlify.com/drop and drag in the unzipped `brandinfinity-site` folder from
   `brandinfinity-site-deploy.zip`. Netlify gives you an address like `https://brand-infinity.netlify.app`.
3. Optional: in Netlify, rename the site, or add a subdomain such as `site.brandinfinity.sg`.
4. In the Wix snippet, change `SITE_URL` to the new address and publish.

The package already allows itself to be shown on brandinfinity.sg and Wix addresses, and blocks other sites from framing it.

## Good to know

- **Google** mainly sees the Wix page, so set the SEO fields above. If search ranking becomes a priority later,
  the cleaner long-term move is to host the site directly on the domain (Netlify) instead of through Wix.
- **Updates:** change the files, re-upload to Netlify (drag and drop again). The Wix snippet doesn't need touching.
- **Forms:** the contact form opens the visitor's email app until a Formspree form is connected
  (`SITE.formEndpoint` in `projects.js`).
