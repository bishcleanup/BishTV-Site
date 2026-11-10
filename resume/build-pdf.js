// Builds public/Bob_Bishop_Resume.pdf (1 page) from public/one-page.html
const { chromium } = require('playwright');
const path = require('path');
const pub = (f) => path.join(__dirname, 'public', f);
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + pub('one-page.html'), { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  const over = await page.evaluate(() => {
    const bottom = document.querySelector('.page').getBoundingClientRect().bottom;
    return ['main', 'aside'].map((s) => Math.round(document.querySelector(s + ' > section:last-child').getBoundingClientRect().bottom - bottom));
  });
  console.log('space left at bottom (main, aside px):', over.map((v) => -v));
  if (over.some((v) => v > 0)) { console.error('Overflow: content does not fit on one page'); process.exitCode = 1; }
  await page.pdf({ path: pub('Bob_Bishop_Resume.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
  await browser.close();
})();
