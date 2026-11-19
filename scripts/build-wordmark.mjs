// Outlines the CAPITAL wordmark (Unbounded 600, as in the presentation) into an SVG path,
// so the site doesn't download a whole font for one word. Run: node scripts/build-wordmark.mjs
import opentype from 'opentype.js';
import fs from 'fs';
const buf = fs.readFileSync('node_modules/@fontsource/unbounded/files/unbounded-latin-600-normal.woff');
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
const size = 100;
// glyph-by-glyph layout (opentype's getPath emitted NaN coordinates for this font)
const path = new opentype.Path();
let x = 0;
const glyphs = font.stringToGlyphs('CAPITAL');
glyphs.forEach((g, i) => {
  path.extend(g.getPath(x, size * 0.78, size));
  const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) : 0;
  x += ((g.advanceWidth + kern) / font.unitsPerEm) * size + size * 0.02;
});
const bb = path.getBoundingBox();
const w = Math.ceil(bb.x2 - bb.x1), h = Math.ceil(bb.y2 - bb.y1);
const d = path.toPathData(3).replace(/(\d+\.\d)\d*/g, '$1');
const tx = (-bb.x1).toFixed(1), ty = (-bb.y1).toFixed(1);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><path transform="translate(${tx} ${ty})" d="${d}"/></svg>`;
fs.writeFileSync('src/data/wordmark.json', JSON.stringify({ w, h, d, tx, ty }));
fs.writeFileSync('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#121a2e"/>${(() => { const p = font.getPath('C', 0, 0, 52); const b = p.getBoundingBox(); return `<path fill="#e9e3d8" transform="translate(${(32 - (b.x1 + b.x2) / 2).toFixed(1)} ${(32 - (b.y1 + b.y2) / 2).toFixed(1)})" d="${p.toPathData(3)}"/>`; })()}</svg>`);
console.log('wordmark', w, h, d.length, 'chars');
