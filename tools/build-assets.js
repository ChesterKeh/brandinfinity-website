// Regenerates assets/og.jpg (link preview) and assets/brand-infinity-credentials.pdf.
// Run from the repo root while a local server is up:  python3 -m http.server 8765  then  node tools/build-assets.js
const { chromium } = require('playwright');
const base = process.env.BASE || 'http://localhost:8765/';
(async () => {
  const b = await chromium.launch();
  const og = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await og.goto(base + 'tools/og.html', { waitUntil: 'networkidle' });
  await og.evaluate(() => document.fonts.ready);
  await og.screenshot({ path: 'assets/og.jpg', type: 'jpeg', quality: 86 });
  const deck = await b.newPage();
  await deck.goto(base + 'tools/credentials.html', { waitUntil: 'networkidle' });
  await deck.evaluate(() => document.fonts.ready);
  await deck.pdf({ path: 'assets/brand-infinity-credentials.pdf', width: '1280px', height: '720px', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  await b.close();
  console.log('built assets/og.jpg and assets/brand-infinity-credentials.pdf');
})();
