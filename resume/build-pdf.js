// Renders public/index.html with print styles into public/Bob_Bishop_Resume.pdf
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file://' + path.join(__dirname, 'public/index.html'), { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'print' });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({ path: path.join(__dirname, 'public/Bob_Bishop_Resume.pdf'), format: 'Letter', printBackground: true, preferCSSPageSize: true });
  await browser.close();
})();
