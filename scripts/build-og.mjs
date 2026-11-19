// Social preview (1200×630) and touch icon from the project's own render and wordmark.
import sharp from 'sharp';
import fs from 'fs';
const wm = JSON.parse(fs.readFileSync('src/data/wordmark.json', 'utf8'));
const W = 1200, H = 630;
const wmW = 520, wmH = (wm.h / wm.w) * wmW, s = wmW / wm.w;
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0c1220" stop-opacity="0.92"/><stop offset="0.55" stop-color="#0c1220" stop-opacity="0.35"/><stop offset="1" stop-color="#0c1220" stop-opacity="0"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(72 ${H - 200}) scale(${s})"><path fill="#ece6db" transform="translate(${wm.tx} ${wm.ty})" d="${wm.d}"/></g>
  <text x="72" y="${H - 72}" font-family="Liberation Sans, Arial, sans-serif" font-size="30" fill="#ece6db">Бизнес-центр · Астана, Левый берег</text>
</svg>`;
await sharp('images/facade-night.jpg').resize(W, H, { fit: 'cover', position: 'centre' })
  .composite([{ input: Buffer.from(overlay) }]).jpeg({ quality: 82, mozjpeg: true }).toFile('public/og.jpg');
await sharp('public/favicon.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('og.jpg + apple-touch-icon.png written');
