// Builds both PDFs:
//   public/Bob_Bishop_Resume.pdf          (2-page, from index.html print styles)
//   public/Bob_Bishop_Resume_1page.pdf    (1-page, from one-page.html)
const { chromium } = require('playwright');
const path = require('path');
const pub = (f) => path.join(__dirname, 'public', f);
(async () => {
  const browser = await chromium.launch();
  for (const [src, out] of [['index.html', 'Bob_Bishop_Resume.pdf'], ['one-page.html', 'Bob_Bishop_Resume_1page.pdf']]) {
    const page = await browser.newPage();
    await page.goto('file://' + pub(src), { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.evaluate(() => document.fonts.ready);
    if (src === 'one-page.html') {
      const over = await page.evaluate(() => {
        const bottom = document.querySelector('.page').getBoundingClientRect().bottom;
        return ['main', 'aside'].map((s) => Math.round(document.querySelector(s + ' > section:last-child').getBoundingClientRect().bottom - bottom));
      });
      if (over.some((v) => v > 0)) console.warn('one-page overflow (main, aside px):', over);
    }
    await page.pdf({ path: pub(out), format: 'Letter', printBackground: true, preferCSSPageSize: true });
    await page.close();
  }
  await browser.close();
})();
