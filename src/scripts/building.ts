import {
  ACESFilmicToneMapping,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  type Object3D,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { modelProgress } from './motion';

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export async function initBuilding(section: HTMLElement) {
  const host = section.querySelector<HTMLElement>('[data-model-canvas]');
  if (!host) return;

  const isMobile = window.matchMedia('(max-width: 900px)').matches;
  const renderer = new WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement);

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  const hemi = new HemisphereLight(0xbfd2ff, 0x2a2418, 0.9);
  scene.add(hemi);
  const sun = new DirectionalLight(0xfff1dc, 2.2);
  sun.position.set(-60, 90, 70);
  scene.add(sun);

  // soft contact shadow under the building, drawn once into a small canvas
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(64, 64, 6, 64, 64, 64);
  grd.addColorStop(0, 'rgba(4,8,16,0.85)');
  grd.addColorStop(1, 'rgba(4,8,16,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const shadowTex = new CanvasTexture(c);
  const ground = new Mesh(new PlaneGeometry(150, 150), new MeshStandardMaterial({ map: shadowTex, transparent: true, depthWrite: false, roughness: 1 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.02;
  scene.add(ground);

  const camera = new PerspectiveCamera(isMobile ? 40 : 30, 1, 1, 800);
  const target = new Vector3(0, 22, 0);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync('/models/capital.glb');
  const model = gltf.scene;
  const lit: MeshStandardMaterial[] = [];
  model.traverse((o: Object3D) => {
    const m = (o as Mesh).material as MeshStandardMaterial | undefined;
    if (!m) return;
    if (['fin', 'frame', 'stone'].includes(m.name)) m.side = DoubleSide;
    if (m.name === 'glass' || m.name === 'glassLit') m.envMapIntensity = 1.4;
    if (m.name === 'glassLit' || m.name === 'glassGround') {
      m.emissive = new Color(m.emissive.r, m.emissive.g, m.emissive.b);
      m.emissiveIntensity = 0;
      lit.push(m);
    }
  });
  // centre the L-shape on its footprint
  model.position.set(0, 0, 0);
  scene.add(model);

  let width = 0;
  let height = 0;
  const resize = () => {
    const r = host.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    needsRender = true;
  };

  // Scroll progress drives a slow orbit, a dolly-in, and dusk: windows light up as the sky darkens.
  let needsRender = true;
  const apply = (p: number) => {
    const t = ease(Math.min(1, Math.max(0, p)));
    const angle = lerp(-0.95, 1.15, t);
    const dist = lerp(isMobile ? 260 : 175, isMobile ? 230 : 150, t);
    const h = lerp(72, 36, t);
    // desktop: keep the building right of the copy; mobile: centred between title and captions
    const offsetX = isMobile ? 0 : lerp(-20, -16, t);
    camera.position.set(Math.sin(angle) * dist, h, Math.cos(angle) * dist);
    const ty = isMobile ? lerp(34, 32, t) : lerp(25, 24, t);
    target.set(offsetX * Math.cos(angle), ty, -offsetX * Math.sin(angle));
    camera.lookAt(target);
    const dusk = Math.min(1, Math.max(0, (p - 0.45) / 0.4));
    lit.forEach((m) => (m.emissiveIntensity = dusk * 1.15));
    hemi.intensity = lerp(0.9, 0.35, dusk);
    sun.intensity = lerp(2.2, 0.55, dusk);
    needsRender = true;
  };

  // render only when visible and something changed
  let visible = false;
  let raf = 0;
  const loop = () => {
    raf = 0;
    if (!visible) return;
    if (needsRender) {
      renderer.render(scene, camera);
      needsRender = false;
      govern(performance.now());
    }
  };
  const request = () => {
    if (!raf && visible) raf = requestAnimationFrame(loop);
  };

  // Frame governor: if scrolling through the block can't hold ~35 fps, drop resolution,
  // and if even that fails, hand the block back to the static render.
  let dpr = renderer.getPixelRatio();
  let lastFrame = 0;
  let slow = 0;
  let samples = 0;
  let gaveUp = false;
  const govern = (now: number) => {
    if (gaveUp) return;
    if (lastFrame && now - lastFrame < 250) {
      samples++;
      if (now - lastFrame > 28) slow++;
      if (samples >= 24) {
        if (slow / samples > 0.4) {
          if (dpr > 0.75) {
            dpr = Math.max(0.75, dpr - 0.5);
            renderer.setPixelRatio(dpr);
            resize();
          } else {
            gaveUp = true;
            section.classList.remove('is-3d');
            visible = false;
            renderer.setAnimationLoop(null);
            renderer.dispose();
            renderer.domElement.remove();
            return;
          }
        }
        samples = slow = 0;
      }
    }
    lastFrame = now;
  };

  modelProgress.listeners.add((p) => {
    apply(p);
    request();
  });
  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    if (visible) {
      needsRender = true;
      request();
    }
  }).observe(section);
  new ResizeObserver(() => {
    resize();
    request();
  }).observe(host);

  resize();
  apply(modelProgress.value);
  // compile shaders before showing, so the first scroll frame doesn't stall
  renderer.compile(scene, camera);
  renderer.render(scene, camera);
  section.classList.add('is-3d');
}
