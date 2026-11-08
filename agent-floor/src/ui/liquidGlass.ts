// Liquid Glass, after Apple's material (developer.apple.com/design/human-interface-guidelines/materials):
// a lens that bends the 3D floor behind it near its rounded edges, with a light blur, a lift in
// saturation and a specular rim. It is meant for floating controls (tab bar, toolbar, floor picker),
// as the HIG asks; content panels keep a frosted variant so text stays readable.
//
// How: for each element we draw a displacement map on a canvas (neutral grey in the middle, pushed
// along the inward normal near the rounded edge), wrap it in an SVG filter and use it as the
// element's backdrop-filter. Chromium (the desktop app) supports url() in backdrop-filter; anything
// else, and "reduce transparency", gets the plain frosted fallback from CSS.

const NS = 'http://www.w3.org/2000/svg';
let defs: SVGDefsElement | null = null;
let seq = 0;

function supported() {
  if (matchMedia('(prefers-reduced-transparency: reduce)').matches) return false;
  // Only Chromium applies SVG filters to the backdrop; Safari/Firefox accept the syntax but ignore it.
  const chromium = /Chrome\//.test(navigator.userAgent);
  return chromium && CSS.supports('backdrop-filter', 'url(#x) blur(1px)');
}

function ensureDefs() {
  if (defs) return defs;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.position = 'absolute';
  defs = document.createElementNS(NS, 'defs');
  svg.append(defs);
  document.body.append(svg);
  return defs;
}

/** Signed distance from (x, y) to a rounded rectangle centred at the origin (half sizes hw, hh, radius r). */
function sdRoundRect(x: number, y: number, hw: number, hh: number, r: number) {
  const qx = Math.abs(x) - hw + r;
  const qy = Math.abs(y) - hh + r;
  const outside = Math.hypot(Math.max(qx, 0), Math.max(qy, 0));
  return outside + Math.min(Math.max(qx, qy), 0) - r;
}

/** The lens map: red = x shift, green = y shift (128 = none). Strongest at the rim, fading inward. */
function displacementMap(w: number, h: number, radius: number, edge: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  const img = ctx.createImageData(w, h);
  const hw = w / 2;
  const hh = h / 2;
  const r = Math.min(radius, hw, hh);
  const e = 1.2;
  for (let py = 0; py < h; py++) {
    for (let px = 0; px < w; px++) {
      const x = px + 0.5 - hw;
      const y = py + 0.5 - hh;
      const d = -sdRoundRect(x, y, hw, hh, r); // distance inside the shape
      let dx = 0;
      let dy = 0;
      if (d >= 0 && d < edge) {
        // Inward normal from the distance field gradient.
        const gx = sdRoundRect(x + e, y, hw, hh, r) - sdRoundRect(x - e, y, hw, hh, r);
        const gy = sdRoundRect(x, y + e, hw, hh, r) - sdRoundRect(x, y - e, hw, hh, r);
        const len = Math.hypot(gx, gy) || 1;
        // A convex lens: the bend rises steeply towards the rim.
        const t = 1 - d / edge;
        const m = t * t * (3 - 2 * t);
        dx = (-gx / len) * m;
        dy = (-gy / len) * m;
      }
      const i = (py * w + px) * 4;
      img.data[i] = 128 + dx * 127;
      img.data[i + 1] = 128 + dy * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL('image/png');
}

function buildFilter(id: string, w: number, h: number, radius: number, edge: number, strength: number) {
  const filter = document.createElementNS(NS, 'filter');
  filter.setAttribute('id', id);
  filter.setAttribute('x', '0');
  filter.setAttribute('y', '0');
  filter.setAttribute('width', String(w));
  filter.setAttribute('height', String(h));
  filter.setAttribute('filterUnits', 'userSpaceOnUse');
  filter.setAttribute('primitiveUnits', 'userSpaceOnUse');
  filter.setAttribute('color-interpolation-filters', 'sRGB');
  const map = document.createElementNS(NS, 'feImage');
  map.setAttribute('href', displacementMap(w, h, radius, edge));
  map.setAttribute('x', '0');
  map.setAttribute('y', '0');
  map.setAttribute('width', String(w));
  map.setAttribute('height', String(h));
  map.setAttribute('preserveAspectRatio', 'none');
  map.setAttribute('result', 'map');
  const disp = document.createElementNS(NS, 'feDisplacementMap');
  disp.setAttribute('in', 'SourceGraphic');
  disp.setAttribute('in2', 'map');
  disp.setAttribute('scale', String(-strength));
  disp.setAttribute('xChannelSelector', 'R');
  disp.setAttribute('yChannelSelector', 'G');
  filter.append(map, disp);
  return filter;
}

export interface GlassOptions {
  /** Width of the bending rim, in px. */
  edge?: number;
  /** How far the rim pulls the scene, in px. */
  strength?: number;
  /** Blur applied with the lens (the HIG "clear" variant keeps this small). */
  blur?: number;
}

/** Turn elements into Liquid Glass. Re-builds the lens when an element changes size. */
export function liquidGlass(elements: Iterable<HTMLElement>, opts: GlassOptions = {}) {
  const list = [...elements];
  for (const el of list) el.classList.add('liquid');
  if (!supported()) return;
  const { edge = 18, strength = 28, blur = 2 } = opts;
  const parent = ensureDefs();
  for (const el of list) {
    const id = `liquid-${++seq}`;
    let lastKey = '';
    const rebuild = () => {
      const w = Math.round(el.offsetWidth);
      const h = Math.round(el.offsetHeight);
      if (w < 8 || h < 8) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const key = `${w}x${h}r${radius}`;
      if (key === lastKey) return;
      lastKey = key;
      const e = Math.min(edge, w / 2, h / 2);
      parent.querySelector(`#${id}`)?.remove();
      parent.append(buildFilter(id, w, h, radius, e, strength));
      el.style.backdropFilter = `blur(${blur}px) url(#${id}) saturate(185%) brightness(1.06)`;
      el.classList.add('liquid-lens');
    };
    new ResizeObserver(() => requestAnimationFrame(rebuild)).observe(el);
    rebuild();
  }
}
