import {
  ACESFilmicToneMapping,
  BackSide,
  PCFShadowMap,
  ShadowMaterial,
  SphereGeometry,
  MeshBasicMaterial,
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
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  // a full-screen canvas at retina 2× costs 4× the pixels for little visible gain on glass and steel
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.shadowMap.autoUpdate = false; // the sun and building never move: bake the shadow map once
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.setClearColor(0x000000, 0);
  host.append(renderer.domElement);

  const scene = new Scene();
  // Reflections come from a painted sky dome (blue zenith, pale horizon, grey city below),
  // so the curtain wall mirrors sky the way it does in the renders. Radius stays inside PMREM's far plane.
  const sky = document.createElement('canvas');
  sky.width = 4;
  sky.height = 512;
  const sg = sky.getContext('2d')!;
  const sgrd = sg.createLinearGradient(0, 0, 0, 512);
  sgrd.addColorStop(0, '#2f4f86');
  sgrd.addColorStop(0.3, '#6f90c4');
  sgrd.addColorStop(0.48, '#c9d7ea');
  sgrd.addColorStop(0.52, '#eef1f4');
  sgrd.addColorStop(0.56, '#9aa3ae');
  sgrd.addColorStop(0.75, '#5d6571');
  sgrd.addColorStop(1, '#2e333c');
  sg.fillStyle = sgrd;
  sg.fillRect(0, 0, 4, 512);
  const skyTex = new CanvasTexture(sky);
  skyTex.colorSpace = SRGBColorSpace;
  const envScene = new Scene();
  envScene.add(new Mesh(new SphereGeometry(30, 48, 24), new MeshBasicMaterial({ map: skyTex, side: BackSide })));
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(envScene, 0.015, 0.1, 100).texture;
  pmrem.dispose();
  void RoomEnvironment;

  const hemi = new HemisphereLight(0xc9d8f2, 0x3a3630, 0.75);
  scene.add(hemi);
  const sun = new DirectionalLight(0xfff3e2, 2.0);
  sun.position.set(-70, 95, 60);
  sun.castShadow = true;
  sun.shadow.mapSize.set(isMobile ? 1024 : 2048, isMobile ? 1024 : 2048);
  Object.assign(sun.shadow.camera, { left: -60, right: 60, top: 60, bottom: -60, near: 10, far: 300 });
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  const shadowCatcher = new Mesh(new PlaneGeometry(160, 160), new ShadowMaterial({ opacity: 0.28 }));
  shadowCatcher.rotation.x = -Math.PI / 2;
  shadowCatcher.position.y = 0.03;
  shadowCatcher.receiveShadow = true;
  scene.add(shadowCatcher);

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
  const ground = new Mesh(new PlaneGeometry(120, 120), new MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.8 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0.02;
  scene.add(ground);

  const camera = new PerspectiveCamera(isMobile ? 40 : 30, 1, 1, 800);
  const target = new Vector3(0, 22, 0);

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync('/models/capital.glb');
  const model = gltf.scene;
  const lit: { m: MeshStandardMaterial; k: number }[] = [];
  // [day, dusk] emissive levels: shops and ceiling strips glow faintly by day, offices light up at dusk
  const litLevel: Record<string, [number, number]> = {
    glassLitA: [0, 1.0],
    glassLitB: [0, 0.7],
    glassGround: [0.18, 0.75],
    lightLine: [0.55, 1.1],
  };
  const glassMats: MeshStandardMaterial[] = [];
  const glassTint = new Color();
  model.traverse((o: Object3D) => {
    const mesh = o as Mesh;
    const m = mesh.material as MeshStandardMaterial | undefined;
    if (!m) return;
    // only the big masses cast: hundreds of slim mullions would stipple the ground
    mesh.castShadow = m.name === 'glass' || m.name.startsWith('glassLit') || m.name === 'stone' || m.name === 'roof';
    mesh.receiveShadow = false; // shadow lookups only on the ground plane: self-shadowing every pane is the costliest part of the frame
    if (['fin', 'frame', 'stone'].includes(m.name)) m.side = DoubleSide;
    if (m.name === 'glass') glassTint.copy(m.color);
    if (m.name.startsWith('glass')) {
      m.envMapIntensity = m.name === 'glass' ? 1.0 : 0.8;
      glassMats.push(m);
    }
    if (m.name in litLevel) {
      m.emissive = new Color(m.emissive.r, m.emissive.g, m.emissive.b);
      m.emissiveIntensity = litLevel[m.name][0];
      lit.push({ m, k: 0 });
    }
  });
  void lit;
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
    const dist = lerp(isMobile ? 260 : 178, isMobile ? 238 : 160, t);
    const h = lerp(70, 44, t);
    // desktop: keep the building right of the copy; mobile: centred between title and captions
    const offsetX = isMobile ? 0 : lerp(-20, -16, t);
    camera.position.set(Math.sin(angle) * dist, h, Math.cos(angle) * dist);
    const ty = isMobile ? lerp(34, 32, t) : lerp(25, 24, t);
    target.set(offsetX * Math.cos(angle), ty, -offsetX * Math.sin(angle));
    camera.lookAt(target);
    const dusk = Math.min(1, Math.max(0, (p - 0.45) / 0.4));
    lit.forEach(({ m }) => {
      const [d0, d1] = litLevel[m.name];
      m.emissiveIntensity = lerp(d0, d1, dusk);
    });
    glassMats.forEach((m) => {
      m.envMapIntensity = lerp(m.name === 'glass' ? 1.0 : 0.8, 0.12, dusk);
      if (m.name === 'glass') m.color.setScalar(lerp(1, 0.45, dusk)).multiply(glassTint);
    });
    hemi.intensity = lerp(0.75, 0.3, dusk);
    sun.intensity = lerp(2.0, 0.45, dusk);
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
  renderer.shadowMap.needsUpdate = true;
  renderer.render(scene, camera);
  section.classList.add('is-3d');
}
