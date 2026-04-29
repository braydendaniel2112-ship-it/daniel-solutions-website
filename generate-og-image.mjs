/**
 * generate-og-image.mjs — Capture og-image.png from the hero at 1200x630.
 *
 * Usage:
 *   node generate-og-image.mjs                    (defaults to localhost:3000)
 *   node generate-og-image.mjs https://example   (any URL)
 *
 * Output: ./og-image.png (overwrites)
 */

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { join } from 'path';

const url = process.argv[2] || 'http://localhost:3000';
const out = join(fileURLToPath(new URL('.', import.meta.url)), 'og-image.png');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 1200x630 is the OG / Twitter card standard. 1x DPR keeps the file small
  // while matching the dimensions every social platform expects.
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });

  await page.goto(url, { waitUntil: 'networkidle0' });

  // Hide the founding-client banner so it doesn't crop into the OG frame
  await page.evaluate(() => {
    const b = document.getElementById('fc-banner');
    if (b) b.style.display = 'none';
    const nav = document.querySelector('.nav-wrapper');
    if (nav) nav.style.top = '20px';
  });

  // Wait for hero ink-fill animation to fully complete (~2s) plus a settle
  await new Promise(r => setTimeout(r, 2400));

  await page.screenshot({ path: out, type: 'png' });
  await browser.close();

  console.log(`OG image saved: ${out}`);
})();
