/**
 * screenshot.mjs — Puppeteer screenshot tool for local visual QA
 *
 * Usage:
 *   node screenshot.mjs http://localhost:3000
 *   node screenshot.mjs http://localhost:3000 label
 *
 * Output: ./temporary screenshots/screenshot-N.png (auto-incremented)
 *         ./temporary screenshots/screenshot-N-label.png (with label suffix)
 *
 * Requirements: npm install puppeteer  (one-time setup)
 */

import puppeteer from 'puppeteer';
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const DIR = join(fileURLToPath(new URL('.', import.meta.url)), 'temporary screenshots');
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3];

async function nextIndex(dir) {
  try {
    const files = await readdir(dir);
    const nums = files
      .map(f => parseInt(f.match(/^screenshot-(\d+)/)?.[1]))
      .filter(n => !isNaN(n));
    return nums.length ? Math.max(...nums) + 1 : 1;
  } catch {
    return 1;
  }
}

(async () => {
  await mkdir(DIR, { recursive: true });

  const n = await nextIndex(DIR);
  const filename = label ? `screenshot-${n}-${label}.png` : `screenshot-${n}.png`;
  const outPath = join(DIR, filename);

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Brief pause for animations to settle
  await new Promise(r => setTimeout(r, 800));

  await page.screenshot({ path: outPath, fullPage: true });
  await browser.close();

  console.log(`Screenshot saved: ${outPath}`);
})();
