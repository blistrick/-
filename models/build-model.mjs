// Stylised model of the CAPITAL business centre, built from the floor plans and renders.
// No source 3D model was supplied, so the massing is derived from docs/plans-source:
// L-shaped footprint, section 1 along ул. Е-69 (west–east), section 2 along ул. Бектурова (north–south),
// ~16 m deep wings, 4.5 m ground floor with a stone colonnade, glazed upper floors, white fins on the crown.
// Output: public/models/capital.glb (meshopt-compressed, quantized). Run: npm run model
import { Document, NodeIO } from '@gltf-transform/core';
import { EXTMeshoptCompression, KHRMeshQuantization } from '@gltf-transform/extensions';
import { reorder, quantize, meshopt, dedup, prune } from '@gltf-transform/functions';
import { MeshoptEncoder } from 'meshoptimizer';
import fs from 'fs';

const GROUND = 5.4; // 4.5 m clear + slab
const STOREY = 3.9; // 3.2 m clear + slab/ceiling void
const BAY = 1.5;

// Wings: x = east, z = south, metres. Footprint ~49 × 42 m from the floor-1 plan.
const wings = [
  { name: 'section1', x0: -24.5, x1: 8.5, z0: -21, z1: -5, floors: 9, openSides: { e: true } },
  { name: 'section2', x0: 8.5, x1: 24.5, z0: -21, z1: 21, floors: 14, openSides: {} },
];

// ---------- geometry accumulators per material ----------
const groups = {};
function group(name) {
  return (groups[name] ??= { pos: [], nrm: [], col: [], idx: [] });
}
function quad(g, a, b, c, d, n, col = [1, 1, 1]) {
  // keep the winding consistent with the intended normal so no face gets back-face culled
  const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]], v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const cr = [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]];
  if (cr[0] * n[0] + cr[1] * n[1] + cr[2] * n[2] < 0) [a, b, c, d] = [b, a, d, c];
  const base = g.pos.length / 3;
  for (const p of [a, b, c, d]) { g.pos.push(...p); g.nrm.push(...n); g.col.push(...col); }
  g.idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
}
function box(name, x0, y0, z0, x1, y1, z1, faces = 'all') {
  const g = group(name);
  const f = faces === 'all' ? ['px', 'nx', 'py', 'ny', 'pz', 'nz'] : faces;
  if (f.includes('px')) quad(g, [x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0]);
  if (f.includes('nx')) quad(g, [x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0]);
  if (f.includes('py')) quad(g, [x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0]);
  if (f.includes('ny')) quad(g, [x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0]);
  if (f.includes('pz')) quad(g, [x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1]);
  if (f.includes('nz')) quad(g, [x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1]);
}

// deterministic pseudo-random so the lit-window pattern is stable between builds
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

// A facade is a straight edge from (ax,az) to (bx,bz) with outward normal (nx,nz).
// Detailing follows the renders: stone piers and fascia framing tall shop glass on the ground floor,
// a flush curtain wall with slim dark mullions and spandrel bands above, ceiling light strips visible
// through the glass, and thin aluminium fins rising past the roof on the top two floors.
function facade(ax, az, bx, bz, nx, nz, height, floors, crownFloors) {
  const len = Math.hypot(bx - ax, bz - az);
  const ux = (bx - ax) / len, uz = (bz - az) / len;
  const bays = Math.max(1, Math.round(len / BAY));
  const bw = len / bays;
  const at = (s, out) => [ax + ux * s + nx * out, az + uz * s + nz * out];
  const n = [nx, 0, nz];

  // ---- ground floor ----
  const recess = 0.8;
  const fasciaBottom = GROUND - 1.0;
  {
    // storefront glass, its mullions and a transom
    const [x0, z0] = at(0, -recess), [x1, z1] = at(len, -recess);
    quad(group('glassGround'), [x0, 0.25, z0], [x1, 0.25, z1], [x1, fasciaBottom, z1], [x0, fasciaBottom, z0], n);
    const sm = Math.round(len / 1.6);
    for (let i = 1; i < sm; i++) {
      const s = (i / sm) * len;
      const [m0x, m0z] = at(s - 0.035, -recess + 0.02), [m1x, m1z] = at(s + 0.035, -recess + 0.02);
      solidAlong('frame', m0x, m0z, m1x, m1z, nx * 0.08, nz * 0.08, 0.25, fasciaBottom);
    }
    const [t0x, t0z] = at(0, -recess + 0.02), [t1x, t1z] = at(len, -recess + 0.02);
    solidAlong('frame', t0x, t0z, t1x, t1z, nx * 0.08, nz * 0.08, 3.0, 3.08);
    // stone piers
    const colEvery = Math.max(3, Math.round(6.0 / bw));
    for (let i = 0; i <= bays; i += colEvery) {
      const s = Math.min(i * bw, len);
      const c0 = Math.max(0, s - 0.5), c1 = Math.min(len, s + 0.5);
      const [cx0, cz0] = at(c0, 0.06), [cx1, cz1] = at(c1, 0.06);
      const [ix0, iz0] = at(c0, -recess);
      solidAlong('stone', cx0, cz0, cx1, cz1, ix0 - cx0, iz0 - cz0, 0, fasciaBottom);
    }
    // fascia and plinth
    const [fx0, fz0] = at(0, 0.06), [fx1, fz1] = at(len, 0.06);
    const [gx0, gz0] = at(0, -recess);
    solidAlong('stone', fx0, fz0, fx1, fz1, gx0 - fx0, gz0 - fz0, fasciaBottom, GROUND + 0.1);
    const [px0, pz0] = at(0, 0.12), [px1, pz1] = at(len, 0.12);
    solidAlong('stone', px0, pz0, px1, pz1, gx0 - px0, gz0 - pz0, 0, 0.25);
  }

  // ---- curtain wall ----
  for (let f = 0; f < floors - 1; f++) {
    const y0 = GROUND + f * STOREY, y1 = y0 + STOREY;
    const isCrown = f >= floors - 1 - crownFloors;
    for (let i = 0; i < bays; i++) {
      const [x0, z0] = at(i * bw, 0), [x1, z1] = at((i + 1) * bw, 0);
      const r = rnd();
      const lit = r < (isCrown ? 0.06 : 0.16);
      // each pane catches the sky slightly differently, as real glass does
      const t = 0.86 + rnd() * 0.14;
      const col = [t * (0.97 + rnd() * 0.03), t, Math.min(1, t * 1.02)];
      quad(group(lit ? (rnd() < 0.5 ? 'glassLitA' : 'glassLitB') : 'glass'), [x0, y0 + 0.3, z0], [x1, y0 + 0.3, z1], [x1, y1, z1], [x0, y1, z0], n, col);
      // linear ceiling lights seen through the glass (the white dashes in the renders)
      if (!lit && rnd() < 0.42) {
        const s0 = i * bw + bw * (0.12 + rnd() * 0.1), s1 = (i + 1) * bw - bw * (0.12 + rnd() * 0.1);
        const ly = y1 - 0.42;
        const [l0x, l0z] = at(s0, 0.015), [l1x, l1z] = at(s1, 0.015);
        quad(group('lightLine'), [l0x, ly, l0z], [l1x, ly, l1z], [l1x, ly + 0.045, l1z], [l0x, ly + 0.045, l0z], n);
      }
    }
    // spandrel band at the slab
    const [bx0, bz0] = at(0, 0.04), [bx1, bz1] = at(len, 0.04);
    quad(group('frame'), [bx0, y0, bz0], [bx1, y0, bz1], [bx1, y0 + 0.3, bz1], [bx0, y0 + 0.3, bz0], n);
  }
  const top = height;
  // slim mullions
  for (let i = 0; i <= bays; i++) {
    const s = i * bw;
    const [x0, z0] = at(Math.max(0, s - 0.03), 0.0), [x1, z1] = at(Math.min(len, s + 0.03), 0.0);
    solidAlong('frame', x0, z0, x1, z1, nx * 0.12, nz * 0.12, GROUND + 0.1, top);
  }
  // crown fins: thin aluminium blades rising past the roof line
  const finBottom = GROUND + (floors - 1 - crownFloors) * STOREY;
  const fins = Math.round(len / 0.6);
  for (let i = 1; i < fins; i++) {
    const s = (i / fins) * len;
    const [x0, z0] = at(s - 0.04, 0.08), [x1, z1] = at(s + 0.04, 0.08);
    solidAlong('fin', x0, z0, x1, z1, nx * 0.32, nz * 0.32, finBottom, top + 1.4);
  }
}

// extrude a segment (x0,z0)-(x1,z1) by (dx,dz) between heights y0..y1 as a closed prism
function solidAlong(name, x0, z0, x1, z1, dx, dz, y0, y1) {
  const g = group(name);
  const A = [x0, z0], B = [x1, z1], C = [x1 + dx, z1 + dz], D = [x0 + dx, z0 + dz];
  const ring = [A, B, C, D];
  // sides
  for (let i = 0; i < 4; i++) {
    const p = ring[i], q = ring[(i + 1) % 4];
    let nx = q[1] - p[1], nz = -(q[0] - p[0]);
    const l = Math.hypot(nx, nz) || 1; nx /= l; nz /= l;
    // make normals point away from the prism centre
    const cx = (A[0] + C[0]) / 2, cz = (A[1] + C[1]) / 2;
    const mx = (p[0] + q[0]) / 2 - cx, mz = (p[1] + q[1]) / 2 - cz;
    if (nx * mx + nz * mz < 0) { nx = -nx; nz = -nz; }
    const flip = nx * mx + nz * mz < 0;
    const a = [p[0], y0, p[1]], b = [q[0], y0, q[1]], c = [q[0], y1, q[1]], d = [p[0], y1, p[1]];
    const cross = (q[0] - p[0]) * nz - (q[1] - p[1]) * -nx; // winding check
    if (cross >= 0 !== flip) quad(g, a, b, c, d, [nx, 0, nz]);
    else quad(g, b, a, d, c, [nx, 0, nz]);
  }
  quad(g, [A[0], y1, A[1]], [D[0], y1, D[1]], [C[0], y1, C[1]], [B[0], y1, B[1]], [0, 1, 0]);
}

// ---------- massing ----------
for (const w of wings) {
  const H = GROUND + (w.floors - 1) * STOREY;
  const crown = 2;
  // facades (skip the face buried in the other wing)
  facade(w.x0, w.z1, w.x1, w.z1, 0, 1, H, w.floors, crown); // south
  facade(w.x1, w.z0, w.x0, w.z0, 0, -1, H, w.floors, crown); // north
  facade(w.x0, w.z0, w.x0, w.z1, -1, 0, H, w.floors, crown); // west
  if (!w.openSides.e) facade(w.x1, w.z1, w.x1, w.z0, 1, 0, H, w.floors, crown); // east
  // inner core / roof
  box('core', w.x0 + 0.4, 0, w.z0 + 0.4, w.x1 - 0.4, H - 0.2, w.z1 - 0.4, ['py']);
  box('roof', w.x0 + 0.2, H - 0.25, w.z0 + 0.2, w.x1 - 0.2, H, w.z1 - 0.2, ['py']);
  // parapet
  box('frame', w.x0, H, w.z0, w.x1, H + 0.5, w.z0 + 0.25);
  box('frame', w.x0, H, w.z1 - 0.25, w.x1, H + 0.5, w.z1);
  box('frame', w.x0, H, w.z0, w.x0 + 0.25, H + 0.5, w.z1);
  box('frame', w.x1 - 0.25, H, w.z0, w.x1, H + 0.5, w.z1);
  // rooftop plant boxes
  for (let i = 0; i < 4; i++) {
    const cx = w.x0 + 3 + i * ((w.x1 - w.x0 - 6) / 3), cz = (w.z0 + w.z1) / 2;
    box('roof', cx - 0.8, H, cz - 0.8, cx + 0.8, H + 1.1, cz + 0.8);
  }
}
// recessed dark glazed slot at the junction (stair shaft seen in the renders)
box('frame', 8.2, GROUND, -5.6, 9.4, GROUND + 8 * STOREY, -4.6, ['nx', 'pz', 'nz']);

// ---------- write glTF ----------
const doc = new Document();
const buffer = doc.createBuffer();
const mats = {
  // curtain-wall glass: a mirror tinted blue-grey; per-pane COLOR_0 varies the tint
  glass: doc.createMaterial('glass').setBaseColorFactor([0.42, 0.5, 0.62, 1]).setMetallicFactor(1).setRoughnessFactor(0.06),
  // occupied offices at dusk: neutral warm-white light, not orange
  glassLitA: doc.createMaterial('glassLitA').setBaseColorFactor([0.2, 0.24, 0.3, 1]).setMetallicFactor(0.7).setRoughnessFactor(0.1).setEmissiveFactor([1.0, 0.9, 0.76]),
  glassLitB: doc.createMaterial('glassLitB').setBaseColorFactor([0.2, 0.24, 0.3, 1]).setMetallicFactor(0.7).setRoughnessFactor(0.1).setEmissiveFactor([1.0, 0.84, 0.66]),
  glassGround: doc.createMaterial('glassGround').setBaseColorFactor([0.1, 0.12, 0.15, 1]).setMetallicFactor(0.9).setRoughnessFactor(0.08).setEmissiveFactor([1.0, 0.88, 0.7]),
  lightLine: doc.createMaterial('lightLine').setBaseColorFactor([0.9, 0.92, 0.95, 1]).setRoughnessFactor(1).setEmissiveFactor([0.95, 0.97, 1.0]),
  frame: doc.createMaterial('frame').setBaseColorFactor([0.09, 0.1, 0.12, 1]).setMetallicFactor(0.6).setRoughnessFactor(0.4),
  fin: doc.createMaterial('fin').setBaseColorFactor([0.8, 0.81, 0.83, 1]).setMetallicFactor(0.9).setRoughnessFactor(0.32),
  stone: doc.createMaterial('stone').setBaseColorFactor([0.74, 0.68, 0.58, 1]).setMetallicFactor(0).setRoughnessFactor(0.85),
  core: doc.createMaterial('core').setBaseColorFactor([0.2, 0.2, 0.22, 1]).setRoughnessFactor(1),
  roof: doc.createMaterial('roof').setBaseColorFactor([0.42, 0.43, 0.45, 1]).setRoughnessFactor(0.95),
};
const scene = doc.createScene('capital');
const root = doc.createNode('capital');
scene.addChild(root);
let verts = 0;
for (const [name, g] of Object.entries(groups)) {
  const pos = doc.createAccessor().setType('VEC3').setArray(new Float32Array(g.pos)).setBuffer(buffer);
  const nrm = doc.createAccessor().setType('VEC3').setArray(new Float32Array(g.nrm)).setBuffer(buffer);
  const idx = doc.createAccessor().setType('SCALAR').setArray(new Uint32Array(g.idx)).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute('POSITION', pos).setAttribute('NORMAL', nrm).setIndices(idx).setMaterial(mats[name]);
  if (name.startsWith('glass') && name !== 'glassGround') {
    prim.setAttribute('COLOR_0', doc.createAccessor().setType('VEC3').setArray(new Float32Array(g.col)).setBuffer(buffer));
  }
  const mesh = doc.createMesh(name).addPrimitive(prim);
  root.addChild(doc.createNode(name).setMesh(mesh));
  verts += g.pos.length / 3;
}
await MeshoptEncoder.ready;
doc.createExtension(EXTMeshoptCompression).setRequired(true).setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });
await doc.transform(dedup(), prune(), reorder({ encoder: MeshoptEncoder }), quantize(), meshopt({ encoder: MeshoptEncoder, level: 'high' }));
const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({ 'meshopt.encoder': MeshoptEncoder });
fs.mkdirSync('public/models', { recursive: true });
const glb = await io.writeBinary(doc);
fs.writeFileSync('public/models/capital.glb', glb);
console.log(`capital.glb: ${verts} vertices, ${(glb.byteLength / 1024).toFixed(1)} KB`);
