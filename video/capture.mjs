/* Tessera — promo frame capture.
   Drives promo.html through window.setT(ms) and writes one PNG per frame, so
   the video is rendered deterministically rather than screen-recorded: no
   dropped frames, no timing drift.

   Usage:
     node capture.mjs
     FONT_BASE=http://127.0.0.1:8766 node capture.mjs   # offline typefaces

   Then encode:
     ffmpeg -framerate 24 -i frames/f%04d.png -c:v libx264 -preset slow \
            -crf 19 -pix_fmt yuv420p -movflags +faststart tessera-promo.mp4 */

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { mkdirSync } from 'node:fs';
import { dirname, join, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const FPS = 24, SECONDS = 15, FRAMES = FPS * SECONDS, SIZE = 1080;
const OUT = join(HERE, 'frames');
const ROOT = resolve(HERE, '..');
const TYPES = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css',
                '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };

const server = createServer(async (req, res) => {
  try {
    const path = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!path.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    const body = await readFile(path);
    res.writeHead(200, { 'content-type': TYPES[extname(path)] || 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404).end('not found'); }
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const port = server.address().port;
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: SIZE, height: SIZE }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on('pageerror', (e) => { console.error('page error:', String(e)); process.exitCode = 1; });
await page.goto(`http://127.0.0.1:${port}/video/promo.html`, { waitUntil: 'domcontentloaded' });

const base = process.env.FONT_BASE;
if (base) {
  const face = (fam, file, w) =>
    `@font-face{font-family:"${fam}";src:url("${base}/${file}") format("woff2");font-weight:${w};font-display:block}`;
  await page.addStyleTag({ content: [
    face('Bricolage Grotesque','bri-600.woff2',600), face('Bricolage Grotesque','bri-700.woff2',700),
    face('Bricolage Grotesque','bri-800.woff2',800),
    face('Instrument Sans','sans-400.woff2',400), face('Instrument Sans','sans-500.woff2',500),
    face('Instrument Sans','sans-600.woff2',600),
    face('JetBrains Mono','mono-400.woff2',400), face('JetBrains Mono','mono-500.woff2',500),
  ].join('\n') });
}
await page.evaluate(() => document.fonts.ready);
if (!(await page.evaluate(() => typeof window.setT === 'function'))) {
  throw new Error('promo.html did not expose window.setT');
}

for (let i = 0; i < FRAMES; i++) {
  await page.evaluate((ms) => window.setT(ms), (i / FPS) * 1000);
  await page.screenshot({ path: join(OUT, `f${String(i).padStart(4, '0')}.png`) });
  if (i % 60 === 0) console.log(`  frame ${i}/${FRAMES}`);
}
console.log(`captured ${FRAMES} frames`);
await browser.close();
server.close();
