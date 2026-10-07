// ─────────────────────────────────────────────────────────────────────────────
// The 3D crest on the home page hero.
//
// The club shield as a real object: an extruded, bevelled teal body with the
// logo artwork printed on both faces, lit by a white key light and an
// accent-coloured rim light. It turns slowly and continuously about its
// vertical axis, starting from exactly the static image's pose so the
// hand-off from the image is invisible.
//
// Loaded lazily by CrestHero.astro, and only when WebGL2 is available, motion
// is allowed, data saver is off and the hero is on screen. The static <img>
// beneath the canvas is always rendered first and stays as the fallback; the
// canvas fades in over it only after its first frame, sized so the shield
// lands exactly where the image was.
// ─────────────────────────────────────────────────────────────────────────────

import {
  AmbientLight,
  Color,
  DirectionalLight,
  ExtrudeGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  Shape,
  SRGBColorSpace,
  TextureLoader,
  WebGLRenderer,
} from 'three';

/** Pixel size of src/assets/logo-shield.png, the face texture. */
const ART = 379;

/**
 * Half-width of the shield silhouette at each row of the artwork, traced
 * from the PNG's alpha channel: [row, half-width], top to bottom. Mirrored
 * about the centre line to build the outline, so the body matches the
 * printed face.
 */
const PROFILE: [number, number][] = [
  [2, 1],
  [50, 167],
  [58, 182],
  [210, 182],
  [226, 180.5],
  [242, 175.5],
  [258, 168.5],
  [274, 158.5],
  [290, 145.5],
  [306, 130.5],
  [322, 108.5],
  [338, 84.5],
  [354, 53.5],
  [370, 15.5],
  [376, 1],
];

/** World size of the artwork square. */
const SIZE = 2.2;
const DEPTH = 0.24;
const BEVEL = 0.035;
/** Pull the body in a hair so its edge never peeks past the printed rim. */
const INSET = 0.985;
/** Seconds per full turn. */
const TURN_SECONDS = 12;

const toWorldX = (half: number) => (half / ART) * SIZE * INSET;
const toWorldY = (row: number) => (0.5 - row / ART) * SIZE * INSET;

function shieldShape(): Shape {
  const shape = new Shape();
  const [first, ...rest] = PROFILE;
  shape.moveTo(toWorldX(first[1]), toWorldY(first[0]));
  for (const [row, half] of rest) shape.lineTo(toWorldX(half), toWorldY(row));
  for (const [row, half] of [...PROFILE].reverse()) shape.lineTo(-toWorldX(half), toWorldY(row));
  shape.closePath();
  return shape;
}

/** Reads a colour custom property off an element, e.g. --accent. */
function cssColor(el: Element, name: string, fallback: string): Color {
  const value = getComputedStyle(el).getPropertyValue(name).trim();
  try {
    return new Color(value || fallback);
  } catch {
    return new Color(fallback);
  }
}

/**
 * Mounts the scene into `canvas`, laid over `frame`. `fallback` is the static
 * image the shield must line up with. Returns a function that tears it all
 * down again.
 */
export function mountCrest(frame: HTMLElement, canvas: HTMLCanvasElement, fallback: HTMLElement, textureUrl: string) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 50);

  // ── the shield ───────────────────────────────────────────────────────────
  const shield = new Group();
  scene.add(shield);

  const bodyGeometry = new ExtrudeGeometry(shieldShape(), {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: BEVEL * 0.8,
    bevelSegments: 4,
    curveSegments: 4,
  });
  bodyGeometry.translate(0, 0, -DEPTH / 2);
  const bodyMaterial = new MeshPhysicalMaterial({
    color: 0x075755,
    metalness: 0.55,
    roughness: 0.3,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
  });
  shield.add(new Mesh(bodyGeometry, bodyMaterial));

  const texture = new TextureLoader().load(textureUrl, () => requestRender());
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  // The artwork is also its own emissive map, so the logo keeps its true
  // colours whatever the lighting does; the lights add sheen on top.
  const faceGeometry = new PlaneGeometry(SIZE, SIZE);
  const faceMaterial = new MeshPhysicalMaterial({
    map: texture,
    emissive: 0xffffff,
    emissiveMap: texture,
    emissiveIntensity: 0.62,
    transparent: true,
    alphaTest: 0.5,
    metalness: 0,
    roughness: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  });
  // One face on each side. The back plane is turned half a revolution, so
  // seen from behind it shows its own front: the logo reads the right way
  // round on both sides rather than mirrored.
  const faceOffset = DEPTH / 2 + BEVEL + 0.002;
  const front = new Mesh(faceGeometry, faceMaterial);
  front.position.z = faceOffset;
  const back = new Mesh(faceGeometry, faceMaterial);
  back.position.z = -faceOffset;
  back.rotation.y = Math.PI;
  shield.add(front, back);

  // ── light ────────────────────────────────────────────────────────────────
  scene.add(new AmbientLight(0xffffff, 0.45));
  const key = new DirectionalLight(0xffffff, 0.9);
  key.position.set(2.5, 3, 5);
  scene.add(key);
  // A second key from behind, so the far face isn't left in shadow when it
  // turns toward the viewer.
  const backKey = new DirectionalLight(0xffffff, 0.9);
  backKey.position.set(-2.5, 3, -5);
  scene.add(backKey);
  const rim = new DirectionalLight(cssColor(frame, '--accent', '#4cc8c4'), 3);
  rim.position.set(-3.5, 1.5, 1.5);
  scene.add(rim);

  // ── sizing: the shield must sit exactly over the static image ─────────────
  const resize = () => {
    const box = frame.getBoundingClientRect();
    const img = fallback.getBoundingClientRect();
    if (!box.width || !img.width) return;
    renderer.setSize(box.width, box.height, false);
    camera.aspect = box.width / box.height;
    // World units per CSS pixel, so SIZE world units span the image's width.
    const unitsPerPx = SIZE / img.width;
    const visibleHeight = box.height * unitsPerPx;
    camera.position.set(0, 0, visibleHeight / 2 / Math.tan((camera.fov * Math.PI) / 360));
    // Offset the view if the image isn't centred in the frame.
    const dx = (img.left + img.width / 2 - (box.left + box.width / 2)) * unitsPerPx;
    const dy = (img.top + img.height / 2 - (box.top + box.height / 2)) * unitsPerPx;
    camera.position.x = -dx;
    camera.position.y = dy;
    camera.updateProjectionMatrix();
    requestRender();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(frame);

  // ── theme: the rim light follows the accent colour ───────────────────────
  const syncTheme = () => {
    rim.color.copy(cssColor(frame, '--accent', '#4cc8c4'));
    requestRender();
  };
  const themeObserver = new MutationObserver(syncTheme);
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  const schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  schemeQuery.addEventListener('change', syncTheme);

  // ── the loop: a steady turn, only while the hero is visible ──────────────
  let raf = 0;
  let last = 0;
  let angle = 0;
  let visible = true;
  let firstFrame = true;

  function requestRender() {
    if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frameLoop);
  }

  function frameLoop(now: number) {
    raf = 0;
    // Clamp the step so returning from a paused tab doesn't jump the turn.
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0);
    last = now;
    angle = (angle + (dt / TURN_SECONDS) * Math.PI * 2) % (Math.PI * 2);
    shield.rotation.y = angle;

    renderer.render(scene, camera);

    if (firstFrame) {
      firstFrame = false;
      frame.classList.add('is-live');
    }
    requestRender();
  }

  // Pause entirely when the hero scrolls away or the tab is hidden.
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) requestRender();
    else if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    }
  });
  visibility.observe(frame);
  const onVisibility = () => {
    last = 0;
    if (!document.hidden) requestRender();
  };
  document.addEventListener('visibilitychange', onVisibility);

  resize();
  requestRender();

  return function dispose() {
    cancelAnimationFrame(raf);
    raf = 0;
    resizeObserver.disconnect();
    themeObserver.disconnect();
    visibility.disconnect();
    schemeQuery.removeEventListener('change', syncTheme);
    document.removeEventListener('visibilitychange', onVisibility);
    bodyGeometry.dispose();
    bodyMaterial.dispose();
    faceGeometry.dispose();
    faceMaterial.dispose();
    texture.dispose();
    renderer.dispose();
    frame.classList.remove('is-live');
  };
}
