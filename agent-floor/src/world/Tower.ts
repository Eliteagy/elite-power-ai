import { BoxGeometry, Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, Vector3, type CanvasTexture, type Object3D } from 'three';
import { FLOORS, floorByN, floorsIn, type Floor } from '../core/floors';
import { PICK_LAYER } from './Character';
import { Kit } from './kit';
import { clay, G } from './materials';
import { damp } from './motion';
import { bench, bulbMat, bush, floorGeo, glassMat, lampPost, M, plantTall, rand, reseed, tree } from './props';
import { makeCanvas, UI_FONT, MONO_FONT, fit } from './text';
import { paving, realEstateSignMaterial, signMaterial } from './textures';
import type { ThemeName } from './palette';
import { CLIENTS, CONSULTANTS, formatPrice, type Consultant } from './consultants';

// The "Prédio" overview: the whole agency as one tower, one storey per
// department. Pure massing (a few dozen draws); no offices, no characters.

export const TOWER_W = 24;
export const TOWER_D = 14;
export const STOREY_H = 4;
export const STOREYS = floorsIn('agency').length;

// One building: a shared podium at street level carrying two towers,
// World Elite Corporate on the right (east) and Elite Real Estate on the left (west).
export const PODIUM_H = 5;
export const TOWER_H = PODIUM_H + STOREYS * STOREY_H;

export const RE_X = -27;
export const RE_Z = -1;
export const RE_W = 18;
export const RE_D = 12;
export const RE_H = PODIUM_H + floorsIn('realestate').length * STOREY_H;

const POD_X0 = RE_X - RE_W / 2 - 3;
const POD_X1 = TOWER_W / 2 + 3;
const POD_Z0 = -TOWER_D / 2 - 2;
const POD_Z1 = TOWER_D / 2 + 3;
const POD_CX = (POD_X0 + POD_X1) / 2;
const POD_CZ = (POD_Z0 + POD_Z1) / 2;
const POD_W = POD_X1 - POD_X0;
const POD_D = POD_Z1 - POD_Z0;
/** Keeps trees and street furniture off the podium. */
const onPodium = (x: number, z: number, pad = 1.5) => x > POD_X0 - pad && x < POD_X1 + pad && z > POD_Z0 - pad && z < POD_Z1 + pad;

// World Elite Corporate steps in as it rises, like a desert supertall: [from level, width, depth].
const TIERS: [number, number, number][] = [
  [0, TOWER_W, TOWER_D],
  [2, 21.5, 13],
  [4, 19, 12],
  [6, 16.5, 11],
  [8, 14, 10],
  // Agent floors A1-A8 (levels 10-17) keep stepping in above the skill floors.
  [10, 13, 9.6],
  [14, 12, 9.2],
];
// Above the top floor: a block carrying the sign, then a Y-plan shaft whose three wings step back
// in a spiral (the Burj Khalifa silhouette), then a telescoping spire.
const SIGN_TIER: [number, number, number] = [11, 8.6, 4.2];
const BURJ_LEVELS = 13;
const BURJ_LEVEL_H = 3;
export const SPIRE_H = 30;
export const SPIRE_TOP = TOWER_H + SIGN_TIER[2] + BURJ_LEVELS * BURJ_LEVEL_H + SPIRE_H;

/** Where a storey's building stands and how big its footprint is. */
export function footprint(f: Floor) {
  if (f.building === 'realestate') return { x: RE_X, z: RE_Z, w: RE_W, d: RE_D };
  // Wraps the hospital's ward tower, slightly proud of its walls.
  if (f.building === 'hospital') return { x: CLIENT_STREET_X, z: HOSPITAL_Z - 2, w: 22.6, d: 14.6 };
  let t = TIERS[0];
  for (const tier of TIERS) if (f.level >= tier[0]) t = tier;
  return { x: 0, z: 0, w: t[1], d: t[2] };
}

const SLAB = 0.42;
const ST_SLAB = 0.22;
const ST_SPAN = 0.3;
const CROWN_H = 3.9;
const COLS = 12;

const hitMat = new MeshBasicMaterial({ visible: false });

interface Storey {
  n: number;
  f: Floor;
  glass: MeshStandardMaterial;
  windows: { ctx: CanvasRenderingContext2D; texture: CanvasTexture };
  plaque: { ctx: CanvasRenderingContext2D; texture: CanvasTexture };
  plaqueMat: MeshStandardMaterial;
  trim: Mesh;
  hit: Mesh;
  key: string;
  glow: number;
}

export function findFloorN(o: Object3D | null): number | undefined {
  while (o) {
    if (typeof o.userData.floorN === 'number') return o.userData.floorN as number;
    o = o.parent;
  }
  return undefined;
}

export class Tower {
  readonly root = new Group();
  private storeys: Storey[] = [];
  private theme: ThemeName = 'light';
  private hovered: number | null = null;
  private current: number | null = null;
  private counts = new Map<number, number>();
  private live = new Map<number, number>();

  private slabMat = new MeshStandardMaterial({ roughness: 0.85 });
  private wallMat = new MeshStandardMaterial({ roughness: 0.9 });
  private pavingMat = new MeshStandardMaterial({ map: paving(), roughness: 0.95 });
  private grassMat = new MeshStandardMaterial({ color: '#7fb86a', roughness: 1 });
  private lawnMat = new MeshStandardMaterial({ color: '#93c97c', roughness: 1 });
  private waterMat = new MeshStandardMaterial({ color: '#5aa7d8', roughness: 0.15, metalness: 0.1 });
  private trimMat = new MeshBasicMaterial({ color: '#d4af37', toneMapped: false, transparent: true, opacity: 0 });
  private asphaltMat = new MeshStandardMaterial({ color: '#4a4f57', roughness: 0.95 });
  private reSlabMat = new MeshStandardMaterial({ roughness: 0.8 });
  private reWallMat = new MeshStandardMaterial({ roughness: 0.9 });
  private reFrameMat = new MeshStandardMaterial({ color: '#b8973a', roughness: 0.35, metalness: 0.6 });
  private curtainMat = new MeshStandardMaterial({ color: '#3a4b5c', roughness: 0.12, metalness: 0.55 });
  private finMat = new MeshStandardMaterial({ color: '#1d2129', roughness: 0.4, metalness: 0.5 });
  private silverMat = new MeshStandardMaterial({ color: '#d3dae0', roughness: 0.3, metalness: 0.35 });
  private crownGlassMat = new MeshStandardMaterial({ color: '#7f97ad', roughness: 0.1, metalness: 0.4 });
  private beaconMat = new MeshBasicMaterial({ color: '#ff2a2a', toneMapped: false });
  private plane = new Group();
  private plateHits: Mesh[] = [];
  private traffic: { g: Group; dir: number; speed: number }[] = [];
  private parkMat = new MeshStandardMaterial({ color: '#5b6068', roughness: 0.95 });
  private villaWallMat = new MeshStandardMaterial({ roughness: 0.85 });
  private planeT = 0;
  private train = new Group();
  private trainPhase: 'arriving' | 'stopped' | 'leaving' = 'arriving';
  private trainSpeed = TGV_SPEED;
  private trainWait = 0;
  private trainDoors: Mesh[] = [];
  private passengers: { g: Group; legs: Mesh[]; role: 'on' | 'off'; order: number; x: number; path: { x: number; z: number }[]; delay: number; hideAtEnd: boolean }[] = [];
  private walkers: { g: Group; legs: Mesh[]; s: number; dir: number }[] = [];
  private trainX = -HW_L / 2;
  private forestFloorMat = new MeshStandardMaterial({ color: '#5f8f52', roughness: 1 });
  private tunnelMat = new MeshStandardMaterial({ color: '#dfeef2', roughness: 0.15, transparent: true, opacity: 0.35, depthWrite: false });

  constructor() {
    this.root.visible = false;
    this.buildShell();
    for (const f of FLOORS) this.buildStorey(f);
    this.buildRealEstate();
    const pk = new Kit();
    airliner(pk, clay('#d4af37'));
    this.plane.add(pk.build());
    this.root.add(this.plane);
    this.buildTraffic();
    this.buildTrain();
    this.buildWalkers();
    this.buildPassengers();
    this.setTheme('light');
  }

  /** Centre of a storey's street-facing side: where the camera dives in. */
  storeyCenter(n: number) {
    const f = floorByN(n) ?? FLOORS[0];
    const fp = footprint(f);
    return new Vector3(fp.x, PODIUM_H + f.level * STOREY_H + STOREY_H / 2, fp.z);
  }

  /** Middle of a storey's street face (+z). */
  storeyFront(n: number) {
    const c = this.storeyCenter(n);
    c.z += footprint(floorByN(n) ?? FLOORS[0]).d / 2;
    return c;
  }

  hitTargets(): Object3D[] {
    return this.storeys.map((s) => s.hit);
  }

  /** Click targets for the villa name plates; `userData.villaN` indexes PLATE_PEOPLE. */
  plateTargets(): Object3D[] {
    return this.plateHits;
  }

  setTheme(theme: ThemeName) {
    this.theme = theme;
    const night = theme === 'dark';
    this.slabMat.color.set(night ? '#3a414c' : '#e4e7ec');
    this.wallMat.color.set(night ? '#262c35' : '#cfd5dd');
    this.pavingMat.color.set(night ? '#3c4048' : '#d9dce1');
    this.grassMat.color.set(night ? '#2b3f2c' : '#7fb86a');
    this.lawnMat.color.set(night ? '#33492f' : '#93c97c');
    this.forestFloorMat.color.set(night ? '#223323' : '#5f8f52');
    this.waterMat.color.set(night ? '#1f3c57' : '#5aa7d8');
    this.asphaltMat.color.set(night ? '#25292f' : '#4a4f57');
    this.parkMat.color.set(night ? '#2c3036' : '#5b6068');
    this.villaWallMat.color.set(night ? '#3a3f47' : '#f4f3ef');
    this.reSlabMat.color.set(night ? '#4a4338' : '#efe6d4');
    this.reWallMat.color.set(night ? '#2e2a24' : '#d9cbb0');
    this.curtainMat.color.set(night ? '#18202a' : '#3a4b5c');
    for (const s of this.storeys) {
      s.key = '';
      s.glass.emissiveIntensity = night ? 1.0 : 0.3;
    }
    this.redraw();
  }

  /** Activity per storey: lit windows plus a count on the plaque. Redraws only what changed. */
  update(counts: Map<number, number>, live: Map<number, number>, current: number | null) {
    this.counts = counts;
    this.live = live;
    this.current = current;
    this.redraw();
  }

  setHover(n: number | null) {
    this.hovered = n;
  }

  tick(dt: number) {
    for (const s of this.storeys) {
      const target = s.n === this.hovered ? 1 : s.n === this.current ? 0.45 : 0;
      s.glow = damp(s.glow, target, 10, dt);
      this.trimFor(s, s.glow);
    }
    if (this.root.visible) {
      this.tickAirport(dt);
      this.tickTraffic(dt);
      this.tickTrain(dt);
      this.tickWalkers(dt);
      this.tickPassengers(dt);
    }
  }

  private trimFor(s: Storey, v: number) {
    const m = s.trim.material as MeshBasicMaterial;
    m.opacity = v;
    s.trim.visible = v > 0.02;
    s.plaqueMat.emissiveIntensity = (this.theme === 'dark' ? 0.55 : 0.25) + v * 0.35;
  }

  // ---------------------------------------------------------------- drawing

  private redraw() {
    const night = this.theme === 'dark';
    for (const s of this.storeys) {
      const count = this.counts.get(s.n) || 0;
      const live = this.live.get(s.n) || 0;
      const key = `${count}|${live}|${night}`;
      if (key === s.key) continue;
      s.key = key;
      this.drawWindows(s, count, night);
      this.drawPlaque(s, count, live);
    }
  }

  /** One row of window cells; more people, more lit windows (always the same ones per storey). */
  private drawWindows(s: Storey, count: number, night: boolean) {
    const { ctx, texture } = s.windows;
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.fillStyle = night ? '#0e131b' : '#26323f';
    ctx.fillRect(0, 0, w, h);
    const lit = count ? Math.min(COLS, Math.round(COLS * (0.12 + Math.log2(1 + count) / 7.5))) : 0;
    // A fixed shuffle per storey so windows light up in a scattered order.
    const order = [...Array(COLS).keys()].sort((a, b) => ((a * 7 + s.n * 5) % COLS) - ((b * 7 + s.n * 5) % COLS));
    const on = new Set(order.slice(0, lit));
    const cw = w / COLS;
    for (let i = 0; i < COLS; i++) {
      const x = i * cw + 1.5;
      const g = ctx.createLinearGradient(0, 0, 0, h);
      if (on.has(i)) {
        g.addColorStop(0, night ? '#ffd58a' : '#f1f3f2');
        g.addColorStop(1, night ? '#f2a94a' : '#c9d2d8');
      } else {
        g.addColorStop(0, night ? '#1c2533' : '#86a3ba');
        g.addColorStop(1, night ? '#111823' : '#4b6580');
      }
      ctx.fillStyle = g;
      ctx.fillRect(x, 2, cw - 3, h - 4);
      if (!on.has(i)) {
        // A soft sky reflection on unlit glass.
        ctx.fillStyle = night ? 'rgba(120,150,200,0.06)' : 'rgba(255,255,255,0.28)';
        ctx.beginPath();
        ctx.moveTo(x, 4);
        ctx.lineTo(x + (cw - 6) * 0.45, 4);
        ctx.lineTo(x, h * 0.7);
        ctx.fill();
      }
    }
    texture.needsUpdate = true;
  }

  private drawPlaque(s: Storey, count: number, live: number) {
    const { ctx, texture } = s.plaque;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;
    const label = s.f.label;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#121419';
    ctx.beginPath();
    ctx.roundRect(4, 4, W - 8, H - 8, H / 2 - 4);
    ctx.fill();
    ctx.strokeStyle = 'rgba(212,175,55,0.65)';
    ctx.lineWidth = 4;
    ctx.stroke();
    // Number disc.
    const r = H / 2 - 22;
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(H / 2, H / 2, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#121419';
    ctx.font = `800 ${Math.round(r * (s.f.tag.length > 1 ? 0.9 : 1.25))}px ${MONO_FONT}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.f.tag, H / 2, H / 2 + 4);
    // Count badge on the right.
    // Green when someone is actively working there, grey for residents only.
    const badgeW = 170;
    const bx = W - badgeW - 30;
    ctx.fillStyle = count ? (live ? '#2f7d4f' : '#3a404b') : '#262a31';
    ctx.beginPath();
    ctx.roundRect(bx, 36, badgeW, H - 72, (H - 72) / 2);
    ctx.fill();
    ctx.fillStyle = count ? '#ffffff' : '#8a93a3';
    ctx.font = `700 72px ${MONO_FONT}`;
    ctx.fillText(String(count), bx + badgeW / 2, H / 2 + 4);
    // Department name.
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ffffff';
    // Shrink long names before truncating them.
    const room = bx - H - 30;
    let size = 80;
    ctx.font = `700 ${size}px ${UI_FONT}`;
    while (size > 54 && ctx.measureText(label).width > room) ctx.font = `700 ${(size -= 4)}px ${UI_FONT}`;
    ctx.fillText(fit(ctx, label, room), H + 4, H / 2 + 4);
    texture.needsUpdate = true;
  }

  // ---------------------------------------------------------------- geometry

  private buildStorey(f: Floor) {
    const n = f.n;
    const y0 = PODIUM_H + f.level * STOREY_H;
    const { x: ox, z: oz, w: TW, d: TD } = footprint(f);
    const re = f.building === 'realestate';
    const slabMat = re ? this.reSlabMat : this.slabMat;
    const finMat = re ? this.reFrameMat : this.silverMat;
    const pw = Math.min(10, TD - 1.8, TW - 2);
    const k = new Kit();
    // Thin slab edge between storeys, then a slim spandrel of the same dark glass as the crown.
    k.add(G.box(TW + 0.3, ST_SLAB, TD + 0.3), slabMat, 0, y0 + ST_SLAB / 2, 0);
    k.add(G.box(TW - 0.1, ST_SPAN, TD - 0.1), re ? this.reWallMat : this.silverMat, 0, y0 + ST_SLAB + ST_SPAN / 2, 0);
    const gy0 = y0 + ST_SLAB + ST_SPAN;
    const gh = STOREY_H - ST_SLAB - ST_SPAN;
    // Slim mullions on all four faces.
    for (let i = 0; i <= COLS; i++) {
      const x = -TW / 2 + (TW * i) / COLS;
      for (const z of [-TD / 2, TD / 2]) k.add(G.box(0.06, gh, 0.14), this.finMat, x, gy0 + gh / 2, z);
    }
    for (let i = 0; i <= COLS; i++) {
      const z = -TD / 2 + (TD * i) / COLS;
      for (const x of [-TW / 2, TW / 2]) k.add(G.box(0.14, gh, 0.06), this.finMat, x, gy0 + gh / 2, z);
    }
    // Full-height vertical fins (gold on Real Estate), kept clear of the name plaques.
    const plaqueX1 = -TW / 2 + pw + 1.2;
    for (let i = 0; i <= COLS; i += 3) {
      const x = -TW / 2 + (TW * i) / COLS;
      if (x > plaqueX1) k.add(G.box(0.1, STOREY_H, 0.55), finMat, x, y0 + STOREY_H / 2, TD / 2 + 0.27);
      k.add(G.box(0.1, STOREY_H, 0.55), finMat, x, y0 + STOREY_H / 2, -TD / 2 - 0.27);
    }
    for (const x of [-TW / 2, TW / 2]) for (const z of [-TD / 2, TD / 2]) k.add(G.box(0.3, STOREY_H, 0.3), finMat, x, y0 + STOREY_H / 2, z);
    const group = k.build();
    group.userData.floorN = n;

    // Window band: one box, the same lit-cell texture on each face.
    const windows = makeCanvas(1024, 96);
    const glass = new MeshStandardMaterial({
      map: windows.texture,
      emissiveMap: windows.texture,
      emissive: '#ffffff',
      emissiveIntensity: 0.3,
      roughness: 0.15,
      metalness: 0.2,
    });
    const band = new Mesh(new BoxGeometry(TW - 0.2, gh, TD - 0.2), glass);
    band.position.y = gy0 + gh / 2;
    band.receiveShadow = true;

    // Name plaque on the street face and the east face.
    const plaque = makeCanvas(1024, 192);
    const plaqueMat = new MeshStandardMaterial({
      map: plaque.texture,
      emissiveMap: plaque.texture,
      emissive: '#ffffff',
      emissiveIntensity: 0.35,
      roughness: 0.6,
      transparent: true,
    });
    const ph = pw * (192 / 1024);
    const py = gy0 + gh * 0.5;
    const front = new Mesh(new PlaneGeometry(pw, ph), plaqueMat);
    front.position.set(-TW / 2 + pw / 2 + 0.9, py, TD / 2 + 0.16);
    const side = new Mesh(front.geometry, plaqueMat);
    side.position.set(TW / 2 + 0.16, py, TD / 2 - pw / 2 - 0.9);
    side.rotation.y = Math.PI / 2;

    // Gold trim on the slab edge: shows the hovered storey (and, faintly, the last one opened).
    const trim = new Mesh(new BoxGeometry(TW + 0.62, 0.12, TD + 0.62), this.trimMat.clone());
    trim.position.y = y0 + STOREY_H + 0.02;
    trim.visible = false;
    trim.renderOrder = 3;

    // Picking: one invisible box per storey.
    const hit = new Mesh(new BoxGeometry(TW + 0.8, STOREY_H, TD + 0.8), hitMat);
    hit.position.y = y0 + STOREY_H / 2;
    hit.layers.set(PICK_LAYER);
    hit.userData.floorN = n;

    group.add(band, front, side, trim, hit);
    group.position.set(ox, 0, oz);
    this.root.add(group);
    this.storeys.push({ n, f, glass, windows, plaque, plaqueMat, trim, hit, key: '', glow: 0 });
  }

  private buildShell() {
    reseed(919);
    const k = new Kit();
    const top = TOWER_H;
    // Plaza and the shared podium both towers stand on.
    k.add(floorGeo(POD_W + 22, POD_D + 18, 1.1), this.pavingMat, POD_CX, -0.14, POD_CZ + 2, { cast: false });
    k.add(G.box(POD_W + 1.6, 0.3, POD_D + 1.6), this.slabMat, POD_CX, -0.15, POD_CZ);
    this.buildPodium(k);
    // Corporate entrance under the east tower: canopy and doors on the podium's street face.
    k.add(G.box(9, 0.22, 3), M.charcoal(), 0, 3.25, POD_Z1 + 1.5);
    for (const x of [-4.2, 4.2]) k.add(G.cyl(0.09, 0.09, 3.2, 10), M.charcoal(), x, 1.6, POD_Z1 + 2.8);
    k.add(G.box(4.6, 2.7, 0.06), glassMat, 0, 1.35 + SLAB, POD_Z1 + 0.06, { cast: false });
    // Roof: a glass crown hides the plant, with the sign set flush into its street face.
    this.spire(k, top);
    this.skyBridge(k);
    // Street furniture and greenery around the plaza.
    for (const [x, z] of [[19, 9], [19, -9], [21, 0], [-45, 9], [-45, -9], [-47, 0], [-9, 17], [9, 17], [-36, 17], [-18, 17], [0, -13], [-27, -13]] as [number, number][])
      if (!onPodium(x, z)) tree(k, x, z, 1.4 + (Math.abs(x + z) % 3) * 0.15);
    for (const x of [-12, -9.5, 9.5, 12, -39, -36.5, -17.5, -15]) bush(k, x, POD_Z1 + 2.2, 1.1);
    for (const x of [-7, 7, -34, -20]) lampPost(k, x, POD_Z1 + 5);
    bench(k, -11, POD_Z1 + 5.2, Math.PI);
    bench(k, 11, POD_Z1 + 5.2, Math.PI);
    plantTall(k, -3, POD_Z1 + 0.7, 1);
    plantTall(k, 3, POD_Z1 + 0.7, 2);
    this.buildGrounds(k);
    this.root.add(k.build());
  }

  /** Corporate's crown: the sign block, a Y-plan shaft stepping back in a spiral, and a telescoping spire with a beacon. */
  private spire(k: Kit, top: number) {
    const last = TIERS[TIERS.length - 1];
    k.add(G.box(last[1] + 0.3, ST_SLAB, last[2] + 0.3), this.slabMat, 0, top + ST_SLAB / 2, 0);
    let y = top + ST_SLAB;
    const [w, d, h] = SIGN_TIER;
    k.add(G.box(w, h, d), this.crownGlassMat, 0, y + h / 2, 0);
    for (const x of [-w / 2, w / 2]) for (const z of [-d / 2, d / 2]) k.add(G.box(0.22, h, 0.22), this.silverMat, x, y + h / 2, z);
    k.add(G.box(w + 0.3, 0.16, d + 0.3), this.reFrameMat, 0, y + h, 0);
    // The brand sign, flush on the street face.
    const sw = w - 0.6;
    const sh = sw * (3.25 / 13);
    k.add(G.box(sw + 0.3, sh + 0.2, 0.1), M.charcoal(), 0, y + h / 2, d / 2 + 0.2);
    k.add(new PlaneGeometry(sw, sh), signMaterial(), 0, y + h / 2, d / 2 + 0.26, { cast: false });
    y += h;

    // The two rear wings of the Y run down the storeys too, showing past each setback.
    for (let level = 0; level < STOREYS; level++) {
      const fp = footprint(floorsIn('agency')[level]);
      const L = fp.w / 2 / Math.sin(Math.PI / 3) + 1.4;
      const wy = PODIUM_H + level * STOREY_H;
      for (const ang of [(Math.PI * 2) / 3, (-Math.PI * 2) / 3]) {
        k.push(0, 0, 0, ang);
        k.add(G.box(4.6, STOREY_H * 0.84, L), this.crownGlassMat, 0, wy + STOREY_H * 0.42, L / 2);
        k.add(G.box(4.74, STOREY_H * 0.16, L + 0.14), this.silverMat, 0, wy + STOREY_H * 0.92, L / 2);
        k.pop();
      }
    }

    const H = BURJ_LEVEL_H;
    for (let s = 0; s < BURJ_LEVELS; s++) {
      const r = 3.4 - s * 0.17;
      const cy = y + H / 2;
      k.add(G.cyl(r, r, H, 6), this.crownGlassMat, 0, cy, 0);
      k.add(G.cyl(r + 0.1, r + 0.1, H * 0.16, 6), this.silverMat, 0, y + H - H * 0.08, 0);
      [0, (Math.PI * 2) / 3, (-Math.PI * 2) / 3].forEach((ang, a) => {
        // Each wing loses a step every third level, one level after the wing before it.
        const L = 7.6 - Math.floor((s + a) / 3) * 1.35;
        const wing = 3.6 - s * 0.14;
        k.push(0, 0, 0, ang);
        k.add(G.box(wing, H * 0.84, L), this.crownGlassMat, 0, y + H * 0.42, L / 2);
        k.add(G.box(wing + 0.14, H * 0.16, L + 0.14), this.silverMat, 0, y + H * 0.92, L / 2);
        // Silver ribs up the wing's sides and nose.
        for (const x of [-wing / 2, wing / 2]) k.add(G.box(0.12, H, 0.3), this.silverMat, x, cy, L - 0.15);
        k.add(G.box(wing * 0.3, H, 0.14), this.silverMat, 0, cy, L + 0.04);
        k.pop();
      });
      y += H;
    }
    const parts: [number, number, number][] = [[0.85, 1.5, 12], [0.4, 0.85, 10], [0.1, 0.4, 8]];
    for (const [rt, rb, ph] of parts) {
      k.add(G.cyl(rt, rb, ph, 12), this.silverMat, 0, y + ph / 2, 0);
      k.add(G.cyl(rb + 0.14, rb + 0.14, 0.2, 12), this.reFrameMat, 0, y + 0.1, 0);
      y += ph;
    }
    k.add(G.sphere(0.32, 12, 10), this.beaconMat, 0, y + 0.2, 0, { cast: false });
  }

  /** Glass sky bridge joining the Real Estate crown to the Corporate tower at roof level. */
  private skyBridge(k: Kit) {
    const y0 = RE_H + ST_SLAB;
    const x0 = RE_X + RE_W / 2;
    let x1 = -TOWER_W / 2;
    for (const t of TIERS) if (PODIUM_H + t[0] * STOREY_H <= y0) x1 = -t[1] / 2;
    const h = CROWN_H;
    const d = 6;
    const cx = (x0 + x1) / 2;
    const L = x1 - x0;
    k.add(G.box(L, 0.3, d + 0.4), this.reFrameMat, cx, y0 + 0.15, RE_Z);
    k.add(G.box(L, h - 0.5, d), this.curtainMat, cx, y0 + 0.3 + (h - 0.5) / 2, RE_Z);
    k.add(G.box(L, 0.2, d + 0.4), this.reFrameMat, cx, y0 + h, RE_Z);
    for (let i = 0; i <= 6; i++) for (const z of [RE_Z - d / 2 - 0.05, RE_Z + d / 2 + 0.05]) k.add(G.box(0.08, h - 0.3, 0.12), this.silverMat, x0 + (L * i) / 6, y0 + h / 2, z);
  }

  /** A tower's roof: thin slab and a dark glass screen all round, capped with a metal line. */
  private crown(k: Kit, W: number, D: number, top: number, capMat: MeshStandardMaterial) {
    k.add(G.box(W + 0.3, ST_SLAB, D + 0.3), this.slabMat, 0, top + ST_SLAB / 2, 0);
    const cy = top + ST_SLAB + CROWN_H / 2;
    for (const z of [-D / 2, D / 2]) k.add(G.box(W, CROWN_H, 0.14), this.curtainMat, 0, cy, z);
    for (const x of [-W / 2, W / 2]) k.add(G.box(0.14, CROWN_H, D), this.curtainMat, x, cy, 0);
    k.add(G.box(W + 0.3, 0.16, D + 0.3), capMat, 0, top + ST_SLAB + CROWN_H, 0);
    for (const x of [-W / 2, W / 2]) for (const z of [-D / 2, D / 2]) k.add(G.box(0.3, CROWN_H, 0.3), this.finMat, x, cy, z);
  }

  /** The shared podium: a glazed street-level block with a roof terrace between the two towers. */
  private buildPodium(k: Kit) {
    const H = PODIUM_H;
    const gh = H - 1.2;
    // Solid base, glass band all round, cornice slab on top.
    k.add(G.box(POD_W, 0.6, POD_D), this.wallMat, POD_CX, 0.3, POD_CZ);
    k.add(G.box(POD_W - 0.2, gh, POD_D - 0.2), this.curtainMat, POD_CX, 0.6 + gh / 2, POD_CZ, { cast: false });
    for (let i = 0; i <= 18; i++)
      for (const z of [POD_Z0, POD_Z1]) k.add(G.box(0.12, gh, 0.24), this.finMat, POD_X0 + (POD_W * i) / 18, 0.6 + gh / 2, z);
    for (let i = 0; i <= 6; i++)
      for (const x of [POD_X0, POD_X1]) k.add(G.box(0.24, gh, 0.12), this.finMat, x, 0.6 + gh / 2, POD_Z0 + (POD_D * i) / 6);
    k.add(G.box(POD_W + 0.6, 0.6, POD_D + 0.6), this.slabMat, POD_CX, H - 0.3, POD_CZ);
    // Gold line along the cornice: the one material both brands share.
    k.add(G.box(POD_W + 0.66, 0.12, POD_D + 0.66), this.reFrameMat, POD_CX, H - 0.62, POD_CZ);
    // Glass balustrade round the roof.
    for (const z of [POD_Z0 - 0.15, POD_Z1 + 0.15]) k.add(G.box(POD_W + 0.6, 0.8, 0.12), glassMat, POD_CX, H + 0.4, z, { cast: false });
    for (const x of [POD_X0 - 0.15, POD_X1 + 0.15]) k.add(G.box(0.12, 0.8, POD_D + 0.6), glassMat, x, H + 0.4, POD_CZ, { cast: false });
    // Roof terrace between the towers: decking, planters, benches.
    const gx0 = RE_X + RE_W / 2 + 0.6;
    const gx1 = -TOWER_W / 2 - 0.6;
    const gcx = (gx0 + gx1) / 2;
    k.add(G.box(gx1 - gx0, 0.08, POD_D - 2), clay('#a0683f', { roughness: 0.8 }), gcx, H + 0.04, POD_CZ, { cast: false });
    for (const z of [POD_Z0 + 2, POD_CZ, POD_Z1 - 2]) {
      k.add(G.box(1.2, 0.6, 1.2), this.slabMat, gcx, H + 0.3, z);
      k.push(0, H + 0.5, 0);
      bush(k, gcx, z, 0.9);
      k.pop();
    }
  }

  /** The Elite Real Estate tower's entrance, roof and rooftop sign. */
  private buildRealEstate() {
    reseed(424);
    const k = new Kit();
    const top = RE_H;
    const W = RE_W;
    const D = RE_D;
    // Entrance under the west tower: gold canopy on two columns, glass doors in the podium face.
    const fz = POD_Z1 - RE_Z;
    k.add(G.box(8, 0.24, 3), this.reFrameMat, 0, 3.25, fz + 1.5);
    for (const x of [-3.7, 3.7]) k.add(G.cyl(0.11, 0.11, 3.2, 12), this.reFrameMat, x, 1.6, fz + 2.8);
    k.add(G.box(4.4, 2.7, 0.06), glassMat, 0, 1.35 + SLAB, fz + 0.06, { cast: false });
    // Roof: glass crown with a gold cap, sign flush on the street face.
    this.crown(k, W, D, top, this.reFrameMat);
    const sy = top + ST_SLAB + CROWN_H / 2;
    const sz = D / 2 + 0.2;
    k.add(G.box(14.4, 3.25, 0.1), M.charcoal(), 0, sy, sz);
    k.add(new PlaneGeometry(14, 3.06), realEstateSignMaterial(), 0, sy, sz + 0.06, { cast: false });
    const g = k.build();
    g.position.set(RE_X, 0, RE_Z);
    this.root.add(g);
  }

  /** Lawn around the plaza, tree-lined avenues, a park with a pond to the east and a hedge garden to the west. */
  private buildGrounds(k: Kit) {
    const flowers = ['#e8657a', '#f2c14e', '#b48ae0', '#ffffff', '#f28c3c'].map((c) => new MeshStandardMaterial({ color: c, roughness: 0.8 }));
    k.add(floorGeo(900, 900, 4), this.grassMat, 0, -0.22, 0, { cast: false });

    // Avenues of trees in front of and behind the tower.
    for (let x = -44; x <= 64; x += 7) for (const z of [-26, 26]) tree(k, x, z, 1.5 + (Math.abs(x) % 3) * 0.12);
    for (let x = -40; x <= 60; x += 7) for (const z of [-23, 23]) bush(k, x + 3.5, z, 1.2);

    // East park: path from the plaza, a ring walk, lawn, pond and fountain.
    const PX = 46;
    k.add(G.box(PX - 23, 0.04, 3.2), this.pavingMat, (23 + PX) / 2 - 6, -0.18, 0, { cast: false });
    k.add(G.cyl(13, 13, 0.04, 48), this.pavingMat, PX, -0.18, 0, { cast: false });
    k.add(G.cyl(11, 11, 0.05, 48), this.lawnMat, PX, -0.16, 0, { cast: false });
    k.add(G.cyl(5.6, 5.6, 0.3, 40), M.steel(), PX, -0.05, 0, { cast: false });
    k.add(G.cyl(5.2, 5.2, 0.32, 40), this.waterMat, PX, -0.03, 0, { cast: false });
    k.add(G.cyl(0.9, 1.1, 0.6, 20), M.steel(), PX, 0.2, 0);
    k.add(G.cyl(0.25, 0.35, 1.4, 14), M.steel(), PX, 0.9, 0);
    k.add(G.sphere(0.55, 16, 10), this.waterMat, PX, 1.8, 0, { cast: false, sy: 0.6 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      tree(k, PX + Math.cos(a) * 16.5, Math.sin(a) * 16.5, 1.6 + (i % 3) * 0.2);
      if (i % 3 === 0) bench(k, PX + Math.cos(a) * 8.2, Math.sin(a) * 8.2, -a + Math.PI / 2);
      if (i % 3 === 1) lampPost(k, PX + Math.cos(a) * 12, Math.sin(a) * 12);
    }
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      k.add(G.sphere(0.22, 10, 8), flowers[i % flowers.length], PX + Math.cos(a) * 6.3, 0.05, Math.sin(a) * 6.3, { cast: false });
    }
    for (let i = 0; i < 10; i++) bush(k, PX + Math.cos(i * 0.63) * 9.8, Math.sin(i * 0.63) * 9.8, 1.3);

    // West garden: hedge rows, flower beds and a few trees.
    for (const z of [-12, -6, 0, 6, 12]) {
      k.add(G.box(14, 0.9, 1.1), M.leafDark(), -62, 0.3, z);
      for (let x = -68; x <= -56; x += 1.5) k.add(G.sphere(0.2, 8, 6), flowers[(((Math.round(x * 2 + z) + 999) % flowers.length) + flowers.length) % flowers.length], x, 0.05, z + 1.4, { cast: false });
    }
    for (const [x, z] of [[-72, -16], [-72, 0], [-72, 16], [-52, -18], [-54, 18]] as [number, number][]) tree(k, x, z, 1.8);
    bench(k, -26, -3, Math.PI / 2);
    bench(k, -26, 3, Math.PI / 2);

    this.buildAirport(k);
    this.buildHighway(k);
    this.buildRailway(k);
    this.buildStation(k);
    this.buildParking(k);
    this.buildVillas(k);
    this.buildClientStreet(k);
    this.buildHospital(k);
    this.buildForest(k);
    this.buildHorta(k);
  }

  /** Forest behind the airport: pines and broadleaves, a trail from the vegetable garden and a clearing with a cabin. */
  private buildForest(k: Kit) {
    reseed(2026);
    const trunk = clay('#5b4331');
    const pines = [clay('#2f5d3f'), clay('#27503a'), clay('#3a6b45')];
    const crowns = [clay('#4f8a5b'), clay('#3f7a4c'), clay('#6b9a58'), clay('#b98d3c')];
    const rock = clay('#8b8f91');
    const dirt = clay('#a58a63');
    for (let x = -200; x <= 200; x += 50) for (const z of [-165, -215]) k.add(G.cyl(58, 58, 0.04, 28), this.forestFloorMat, x, -0.19, z, { cast: false });

    // Winding trail from the garden's west gate, round the end of the airport, to the clearing.
    const trail: [number, number][] = [[HORTA.x0, HORTA.gateZ], [-106, -12], [-110, -45], [-106, -85], [-92, -112], [-68, -131]];
    for (let i = 0; i < trail.length - 1; i++) {
      const [ax, az] = trail[i];
      const [bx, bz] = trail[i + 1];
      const len = Math.hypot(bx - ax, bz - az);
      k.add(G.box(len, 0.04, 2.2), dirt, (ax + bx) / 2, -0.15, (az + bz) / 2, { ry: Math.atan2(az - bz, bx - ax), cast: false });
      k.add(G.cyl(1.1, 1.1, 0.04, 12), dirt, bx, -0.15, bz, { cast: false });
    }
    const nearTrail = (x: number, z: number) => {
      for (let i = 0; i < trail.length - 1; i++) {
        const [ax, az] = trail[i];
        const [bx, bz] = trail[i + 1];
        const t = Math.max(0, Math.min(1, ((x - ax) * (bx - ax) + (z - az) * (bz - az)) / ((bx - ax) ** 2 + (bz - az) ** 2)));
        if (Math.hypot(x - ax - t * (bx - ax), z - az - t * (bz - az)) < 3.4) return true;
      }
      return false;
    };

    const CLEARING = { x: -56, z: -137, r: 14 };
    for (let z = -245; z <= -102; z += 6) {
      for (let x = -230; x <= 230; x += 6) {
        const px = x + (rand() - 0.5) * 4.6;
        const pz = z + (rand() - 0.5) * 4.6;
        const type = rand();
        const s = 1.5 + rand() * 1.3;
        const tone = rand();
        const ry = rand() * Math.PI;
        // Irregular edge behind the runway; stay off the trail and the clearing.
        if (pz > -108 + 5 * Math.sin(px * 0.07) + 3 * Math.sin(px * 0.19)) continue;
        if (nearTrail(px, pz) || Math.hypot(px - CLEARING.x, pz - CLEARING.z) < CLEARING.r) continue;
        k.push(px, 0, pz, ry);
        k.add(G.cyl(0.12, 0.2, 1.6, 6), trunk, 0, 0.8 * s, 0, { sx: s, sy: s, sz: s, cast: false });
        if (type < 0.62) {
          const m = pines[Math.floor(tone * pines.length)];
          k.add(G.cyl(0, 1.5, 2.6, 8), m, 0, 2.6 * s, 0, { sx: s, sy: s, sz: s, cast: false });
          k.add(G.cyl(0, 1.15, 2.2, 8), m, 0, 3.9 * s, 0, { sx: s, sy: s, sz: s, cast: false });
          k.add(G.cyl(0, 0.8, 1.8, 8), m, 0, 5.1 * s, 0, { sx: s, sy: s, sz: s, cast: false });
        } else {
          // A few broadleaves turn gold.
          const m = crowns[tone < 0.08 ? 3 : Math.floor(tone * 3)];
          k.add(G.sphere(1.35, 8, 6), m, 0, 2.5 * s, 0, { sx: s, sy: s, sz: s, cast: false });
          k.add(G.sphere(0.95, 8, 6), crowns[Math.floor(tone * 3)], 0.7 * s, 3 * s, 0.3 * s, { sx: s, sy: s, sz: s, cast: false });
        }
        k.pop();
      }
    }
    // Undergrowth, rocks and fallen logs along the edge.
    for (let i = 0; i < 110; i++) {
      const x = -220 + rand() * 440;
      const z = -100 - rand() * 40;
      if (nearTrail(x, z) || Math.hypot(x - CLEARING.x, z - CLEARING.z) < CLEARING.r) continue;
      const pick = i % 5;
      if (pick < 3) bush(k, x, z, 1.4 + rand());
      else if (pick === 3) k.add(G.sphere(0.8, 7, 5), rock, x, 0, z, { sx: 1 + rand(), sy: 0.6, sz: 1, ry: rand() * 3, cast: false });
      else k.add(G.cyl(0.25, 0.3, 3.4, 8), trunk, x, 0.1, z, { rz: Math.PI / 2, ry: rand() * 3, cast: false });
    }

    // Clearing: lawn, log cabin with a mono-pitch roof, wood pile and a fire ring.
    const { x: cx, z: cz } = CLEARING;
    k.add(G.cyl(CLEARING.r - 1, CLEARING.r - 1, 0.05, 32), this.lawnMat, cx, -0.16, cz, { cast: false });
    k.push(cx - 5, 0, cz - 2, Math.PI / 2);
    const log = clay('#7a5636');
    k.add(G.box(8, 3.2, 6), log, 0, 1.5, 0, { cast: false });
    for (let y = 0.3; y < 3.1; y += 0.5) k.add(G.box(8.2, 0.08, 6.2), trunk, 0, y, 0, { cast: false });
    k.add(G.box(9.2, 0.25, 7.4), M.charcoal(), 0, 3.6, 0, { rx: 0.14, cast: false });
    k.add(G.box(1.2, 2.2, 0.1), trunk, 0, 1, 3.03, { cast: false });
    for (const x of [-2.6, 2.6]) k.add(G.box(1.4, 1.1, 0.1), clay('#f5d58a', { emissive: '#f2b84b', emissiveIntensity: 0.5 }), x, 1.7, 3.03, { cast: false });
    k.add(G.box(0.9, 2, 0.9), rock, 2.8, 4, -1.5, { cast: false });
    k.pop();
    // Wood pile in three layers: 4, 3, 2 logs.
    for (const [row, count] of [[0, 4], [1, 3], [2, 2]]) {
      for (let i = 0; i < count; i++) k.add(G.cyl(0.18, 0.18, 2.4, 8), log, cx - 9 + row * 0.2 + i * 0.4, 0.05 + row * 0.33, cz + 6, { rx: Math.PI / 2, cast: false });
    }
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      k.add(G.sphere(0.24, 7, 5), rock, cx + 4 + Math.cos(a), 0, cz + 4 + Math.sin(a), { cast: false });
    }
    k.add(G.sphere(0.45, 8, 6), clay('#ff8a3c', { emissive: '#ff6a1f', emissiveIntensity: 1.4 }), cx + 4, 0.15, cz + 4, { sy: 1.5, cast: false });
    for (const a of [0.5, 2.4, 4.3]) k.add(G.cyl(0.26, 0.28, 1.8, 8), log, cx + 4 + Math.cos(a) * 2.6, 0.12, cz + 4 + Math.sin(a) * 2.6, { rz: Math.PI / 2, ry: -a + Math.PI / 2, cast: false });
  }

  /** Fenced vegetable garden between the hedge garden and the forest: raised beds, polytunnel, shed, fruit trees. */
  private buildHorta(k: Kit) {
    reseed(907);
    const { x0, x1, z0, z1, gateZ } = HORTA;
    const cx = (x0 + x1) / 2;
    const cz = (z0 + z1) / 2;
    const w = x1 - x0;
    const d = z1 - z0;
    const fence = clay('#a4835c');
    const gravel = clay('#c8b796');
    k.add(G.box(w, 0.04, d), clay('#9fb37c'), cx, -0.18, cz, { cast: false });

    // Fence with a gate gap on both long sides, on the cross path.
    for (const x of [x0, x1]) {
      for (const [zA, zB] of [[z0, gateZ - 1.2], [gateZ + 1.2, z1]]) {
        for (const y of [0.45, 0.85]) k.add(G.box(0.07, 0.1, zB - zA), fence, x, y, (zA + zB) / 2, { cast: false });
        for (let z = zA; z <= zB + 0.01; z += 1.8) k.add(G.box(0.14, 1.15, 0.14), fence, x, 0.45, z, { cast: false });
      }
    }
    for (const z of [z0, z1]) {
      for (const y of [0.45, 0.85]) k.add(G.box(w, 0.1, 0.07), fence, cx, y, z, { cast: false });
      for (let x = x0; x <= x1 + 0.01; x += 1.8) k.add(G.box(0.14, 1.15, 0.14), fence, x, 0.45, z, { cast: false });
    }
    // Paths: spine, cross path and the link to the hedge garden.
    k.add(G.box(1.8, 0.04, z1 + 17), gravel, cx, -0.15, (z1 - 17) / 2, { cast: false });
    k.add(G.box(w, 0.04, 1.5), gravel, cx, -0.14, gateZ, { cast: false });
    k.add(G.box(7.5, 0.04, 1.5), gravel, x1 + 3.75, -0.14, gateZ, { cast: false });

    // Twelve raised beds in two columns, one crop each.
    const crops = ['alface', 'tomate', 'cenoura', 'milho', 'couve', 'abobora', 'morango', 'feijao', 'girassol', 'alface', 'cenoura', 'tomate'];
    let c = 0;
    for (const z of [-13.5, -9.6, -3.2, 0.7, 4.6, 8.5]) {
      for (const side of [-1, 1]) {
        k.push(cx + side * 5.5, 0, z);
        k.add(G.box(8, 0.5, 3), clay('#8a6a48'), 0, 0.05, 0, { cast: false });
        k.add(G.box(7.7, 0.52, 2.7), M.soil(), 0, 0.05, 0, { cast: false });
        this.crop(k, crops[c++]);
        k.pop();
      }
    }

    // Polytunnel: arched cover on steel hoops, with benches of seedlings inside.
    const TX = cx - 3;
    const TZ = -24;
    const TL = 10;
    const RX = 4.5;
    const RY = 3.6;
    k.add(G.cyl(RX, RX, TL, 28), this.tunnelMat, TX, 0, TZ, { rx: Math.PI / 2, sz: RY / RX, cast: false });
    for (let h = 0; h <= 4; h++) {
      const z = TZ - TL / 2 + (h * TL) / 4;
      for (let j = 0; j < 12; j++) {
        const a = ((j + 0.5) / 12) * Math.PI;
        k.add(G.box(1.24, 0.07, 0.07), M.steel(), TX + Math.cos(a) * RX, Math.sin(a) * RY, z, { rz: a - Math.PI / 2, cast: false });
      }
    }
    for (const s of [-1, 1]) {
      k.add(G.box(1.6, 0.7, TL - 1.4), clay('#7a5f42'), TX + s * 2.1, 0.2, TZ, { cast: false });
      for (let z = TZ - TL / 2 + 1.2; z < TZ + TL / 2 - 1; z += 0.8)
        for (const o of [-0.4, 0.4]) k.add(G.sphere(0.2, 7, 5), M.leafLight(), TX + s * 2.1 + o, 0.65, z, { cast: false });
    }
    k.add(G.box(1.5, 2.2, 0.08), M.charcoal(), TX, 1, TZ + TL / 2 + 0.02, { cast: false });

    // Tool shed, water butt and compost box.
    const SX = x1 - 3.4;
    k.add(G.box(4.4, 2.5, 4), clay('#7e8f6c'), SX, 1.1, -25, { cast: false });
    k.add(G.box(5.2, 0.16, 4.8), M.charcoal(), SX, 2.55, -25, { rx: 0.14, cast: false });
    k.add(G.box(1.1, 1.9, 0.08), M.woodDark(), SX, 0.85, -22.97, { cast: false });
    k.add(G.cyl(0.55, 0.5, 1.2, 12), clay('#2f6fb3'), SX - 1.4, 0.45, -22.3, { cast: false });
    k.add(G.box(1.8, 0.9, 1.8), fence, SX, 0.3, -19.6, { cast: false });
    k.add(G.box(1.6, 0.92, 1.6), M.soil(), SX, 0.3, -19.6, { cast: false });

    // Scarecrow watching the beds.
    k.push(x0 + 3, 0, -17);
    k.add(G.box(0.1, 2.3, 0.1), fence, 0, 1, 0, { cast: false });
    k.add(G.box(1.5, 0.1, 0.1), fence, 0, 1.5, 0, { cast: false });
    k.add(G.box(0.75, 0.85, 0.28), clay('#b0483a'), 0, 1.3, 0, { cast: false });
    k.add(G.sphere(0.24, 10, 8), clay('#e3cf9a'), 0, 2.1, 0, { cast: false });
    k.add(G.cyl(0.42, 0.42, 0.04, 12), clay('#c9a95b'), 0, 2.26, 0, { cast: false });
    k.add(G.cyl(0.16, 0.22, 0.26, 10), clay('#c9a95b'), 0, 2.38, 0, { cast: false });
    k.pop();

    // Fruit trees along the fence by the car park.
    for (let i = 0; i < 4; i++) {
      const x = x0 + 2.6 + i * 2.2 + (i > 1 ? w - 5.2 - 6.6 : 0);
      tree(k, x, z1 - 1.4, 1);
      for (let f = 0; f < 7; f++) {
        const a = f * 2.4;
        k.add(G.sphere(0.1, 7, 5), clay(i % 2 ? '#e0a02c' : '#c8352d'), x + Math.cos(a) * 0.75, 1.8 + (f % 3) * 0.3, z1 - 1.4 + Math.sin(a) * 0.75, { cast: false });
      }
    }
  }

  /** One crop on a raised bed, in the bed's local frame (8 x 3, soil top at y 0.31). */
  private crop(k: Kit, kind: string) {
    const Y = 0.31;
    const leaf = M.leaf();
    const light = M.leafLight();
    const dark = M.leafDark();
    const opts = { cast: false };
    for (const z of [-0.8, 0, 0.8]) {
      for (let i = 0; i < 7; i++) {
        const x = -3.3 + i * 1.1;
        if (kind === 'alface') {
          k.add(G.sphere(0.34, 8, 6), light, x, Y + 0.1, z, { sy: 0.7, cast: false });
          k.add(G.sphere(0.2, 7, 5), leaf, x, Y + 0.24, z, opts);
        } else if (kind === 'couve') {
          k.add(G.sphere(0.42, 8, 6), clay('#6c9c7c'), x, Y + 0.18, z, { sy: 0.85, cast: false });
          k.add(G.sphere(0.46, 8, 4), dark, x, Y + 0.02, z, { sy: 0.25, cast: false });
        } else if (kind === 'cenoura') {
          for (const o of [-0.25, 0.25]) {
            k.add(G.sphere(0.09, 6, 4), clay('#e9812c'), x + o, Y + 0.03, z, opts);
            k.add(G.cyl(0, 0.13, 0.42, 6), light, x + o, Y + 0.28, z, opts);
          }
        } else if (kind === 'morango') {
          k.add(G.sphere(0.3, 8, 4), leaf, x, Y + 0.06, z, { sy: 0.4, cast: false });
          for (const o of [-0.16, 0.16]) k.add(G.sphere(0.075, 6, 4), clay('#d3293a'), x + o, Y + 0.14, z + o * 0.6, opts);
        } else if (kind === 'abobora') {
          if (z !== 0) k.add(G.sphere(0.45, 8, 4), dark, x, Y + 0.04, z, { sy: 0.2, cast: false });
          else if (i % 2 === 0) k.add(G.sphere(0.36, 9, 6), clay('#e58a24'), x, Y + 0.22, z, { sy: 0.78, cast: false });
        } else if (kind === 'tomate' && z !== 0) {
          k.add(G.box(0.05, 1.5, 0.05), M.wood(), x, Y + 0.75, z, opts);
          k.add(G.sphere(0.3, 7, 5), leaf, x, Y + 0.65, z, { sy: 1.5, cast: false });
          for (const [o, y] of [[0.22, 0.5], [-0.2, 0.75], [0.1, 1]]) k.add(G.sphere(0.09, 7, 5), clay('#d93a2b'), x + o, Y + y, z + 0.18, opts);
        } else if (kind === 'feijao' && z !== 0) {
          k.add(G.cyl(0.02, 0.03, 1.9, 5), M.wood(), x, Y + 0.95, z, opts);
          k.add(G.sphere(0.2, 7, 5), leaf, x, Y + 0.6, z, opts);
          k.add(G.sphere(0.18, 7, 5), dark, x, Y + 1.1, z, opts);
          k.add(G.sphere(0.14, 7, 5), light, x, Y + 1.55, z, opts);
        } else if (kind === 'milho') {
          k.add(G.cyl(0.04, 0.06, 2.1, 6), light, x, Y + 1.05, z, opts);
          for (const a of [0, 1.6, 3.2, 4.8]) k.add(G.box(0.7, 0.03, 0.12), leaf, x + Math.cos(a) * 0.3, Y + 0.8 + a * 0.12, z - Math.sin(a) * 0.3, { ry: a, rz: 0.4, cast: false });
          k.add(G.capsule(0.07, 0.2), clay('#e6c34a'), x + 0.09, Y + 1.15, z, opts);
          k.add(G.cyl(0, 0.08, 0.3, 5), clay('#c9a95b'), x, Y + 2.2, z, opts);
        } else if (kind === 'girassol' && z === 0) {
          k.add(G.cyl(0.04, 0.05, 2, 6), leaf, x, Y + 1, z, opts);
          k.add(G.cyl(0.4, 0.4, 0.05, 12), clay('#f2c23c'), x, Y + 2.05, z + 0.08, { rx: Math.PI / 2 - 0.4, cast: false });
          k.add(G.cyl(0.2, 0.2, 0.07, 10), clay('#5a3a22'), x, Y + 2.05, z + 0.11, { rx: Math.PI / 2 - 0.4, cast: false });
        }
      }
    }
  }

  /** Residential street east of the park: one villa per key consultant, with a name plate. */
  private buildVillas(k: Kit) {
    reseed(512);
    const SX = 87;
    const zEdge = HW_Z - (MEDIAN / 2 + 3 * LANE) - 1.5;
    const z0 = -31;
    // Street with pavements, joining the near carriageway, lamps on alternate sides.
    k.add(G.box(6, 0.05, zEdge - z0), this.asphaltMat, SX, -0.17, (z0 + zEdge) / 2, { cast: false });
    for (const s of [-1, 1]) k.add(G.box(1.6, 0.08, zEdge - z0 - 3), this.pavingMat, SX + s * 3.8, -0.15, (z0 + zEdge - 3) / 2, { cast: false });
    for (let z = z0 + 4; z < zEdge - 4; z += 3) k.add(G.box(0.14, 0.02, 1.5), M.white(), SX, -0.13, z, { cast: false });
    for (let i = 0, z = z0 + 6; z < zEdge - 6; z += 12, i++) lampPost(k, SX + (i % 2 ? 4.6 : -4.6), z);
    k.add(G.cyl(4.5, 4.5, 0.05, 28), this.asphaltMat, SX, -0.17, z0, { cast: false });

    const wood = [clay('#8a5a3c'), clay('#2b2f36'), clay('#b8973a'), clay('#6e7781'), clay('#a0683f')];
    const paints = ['#d4af37', '#121419', '#f2f2f2', '#2f6fb3', '#7d8f69', '#c8473d'];
    CONSULTANTS.slice(0, 10).forEach((c, i) => {
      const west = i % 2 === 0;
      const z = -24 + Math.floor(i / 2) * 12;
      k.push(SX + (west ? -10 : 10), 0, z, west ? Math.PI / 2 : -Math.PI / 2);
      this.villa(k, wood[i % wood.length], clay(paints[i % paints.length]));
      k.pop();
      // The plate is its own mesh so a click on it can open the consultant's card.
      const g = new Group();
      g.position.set(SX + (west ? -10 : 10), 0, z);
      g.rotation.y = west ? Math.PI / 2 : -Math.PI / 2;
      const plate = new Mesh(new PlaneGeometry(2.8, 1.925), villaPlateMaterial(c));
      plate.position.set(-3.4, 2.1, 5.93);
      const hit = new Mesh(new BoxGeometry(3.4, 2.6, 0.8), hitMat);
      hit.position.set(-3.4, 2.1, 5.9);
      hit.layers.set(PICK_LAYER);
      hit.userData.villaN = i;
      g.add(plate, hit);
      this.root.add(g);
      this.plateHits.push(hit);
    });
  }

  /** Street east of the villas: one house per closed client, a FECHADO sign on the roof and a name plate. */
  private buildClientStreet(k: Kit) {
    reseed(613);
    const SX = CLIENT_STREET_X;
    const zEdge = HW_Z - (MEDIAN / 2 + 3 * LANE) - 1.5;
    const z0 = -7;
    k.add(G.box(6, 0.05, zEdge - z0), this.asphaltMat, SX, -0.17, (z0 + zEdge) / 2, { cast: false });
    for (const s of [-1, 1]) k.add(G.box(1.6, 0.08, zEdge - z0 - 3), this.pavingMat, SX + s * 3.8, -0.15, (z0 + zEdge - 3) / 2, { cast: false });
    for (let z = z0 + 4; z < zEdge - 4; z += 3) k.add(G.box(0.14, 0.02, 1.5), M.white(), SX, -0.13, z, { cast: false });
    for (let i = 0, z = z0 + 6; z < zEdge - 6; z += 12, i++) lampPost(k, SX + (i % 2 ? 4.6 : -4.6), z);
    k.add(G.cyl(4.5, 4.5, 0.05, 28), this.asphaltMat, SX, -0.17, z0, { cast: false });

    const wood = [clay('#8a5a3c'), clay('#2b2f36'), clay('#b8973a'), clay('#6e7781')];
    const paints = ['#d4af37', '#2f6fb3', '#c8473d', '#f2f2f2'];
    const sign = closedSignMaterial();
    CLIENTS.forEach((c, i) => {
      const west = i % 2 === 0;
      const z = 2 + Math.floor(i / 2) * 13;
      const ry = west ? Math.PI / 2 : -Math.PI / 2;
      const x = SX + (west ? -10 : 10);
      k.push(x, 0, z, ry);
      this.villa(k, wood[i % wood.length], clay(paints[i % paints.length]));
      k.pop();
      // Roof sign on two posts, square to the motorway so it reads from the overview.
      const sx = x;
      const sz = z + (west ? 2.2 : -2.2);
      for (const px of [-2.4, 2.4]) k.add(G.box(0.16, 1.2, 0.16), M.charcoal(), sx + px, 6.5, sz);
      k.add(G.box(6.4, 1.7, 0.12), M.charcoal(), sx, 7.8, sz);
      const signFace = new Mesh(new PlaneGeometry(6.2, 1.5), sign);
      signFace.position.set(sx, 7.8, sz + 0.2);
      this.root.add(signFace);
      const g = new Group();
      g.position.set(x, 0, z);
      g.rotation.y = ry;
      const plate = new Mesh(new PlaneGeometry(2.8, 1.925), clientPlateMaterial(c));
      plate.position.set(-3.4, 2.1, 5.93);
      const hit = new Mesh(new BoxGeometry(3.4, 2.6, 0.8), hitMat);
      hit.position.set(-3.4, 2.1, 5.9);
      hit.layers.set(PICK_LAYER);
      hit.userData.villaN = CONSULTANTS.length + i;
      g.add(plate, hit);
      this.root.add(g);
      this.plateHits.push(hit);
    });
  }

  /** Hospital DIOGO at the end of the clients' street: low clinic block, ward tower, roof sign and helipad. */
  private buildHospital(k: Kit) {
    const X = CLIENT_STREET_X;
    const white = M.white();
    const red = clay('#d3232e');
    const glass = clay('#5d7f99', { roughness: 0.2 });
    // Access road from the turning circle to the forecourt, with the ambulance bay.
    k.add(G.box(6, 0.05, 8), this.asphaltMat, X, -0.17, -14, { cast: false });
    k.add(G.box(26, 0.05, 6), this.asphaltMat, X, -0.17, -17.5, { cast: false });
    // Clinic block: glass ground floor and a band of windows above.
    k.add(G.box(32, 6, 22), this.villaWallMat, X, 3, HOSPITAL_Z);
    k.add(G.box(32.1, 0.4, 22.1), this.slabMat, X, 6.1, HOSPITAL_Z);
    k.add(G.box(29, 1.5, 0.08), glass, X, 4.3, HOSPITAL_Z + 11.02, { cast: false });
    k.add(G.box(29, 2, 0.08), glass, X, 1.5, HOSPITAL_Z + 11.02, { cast: false });
    // Entrance canopy on two columns.
    k.add(G.box(11, 0.4, 4), red, X, 3.1, HOSPITAL_Z + 13);
    for (const s of [-1, 1]) k.add(G.box(0.3, 3, 0.3), white, X + s * 5, 1.4, HOSPITAL_Z + 14.6);
    // Ward tower: five storeys of windows on the front and sides.
    const Tz = HOSPITAL_Z - 2;
    k.add(G.box(22, 15, 14), this.villaWallMat, X, 13.5, Tz);
    k.add(G.box(22.2, 0.4, 14.2), this.slabMat, X, 21.1, Tz);
    for (let i = 0; i < 5; i++) {
      const y = 8 + i * 2.8;
      k.add(G.box(20, 1.5, 0.08), glass, X, y, Tz + 7.02, { cast: false });
      for (const s of [-1, 1]) k.add(G.box(0.08, 1.5, 12), glass, X + s * 11.02, y, Tz, { cast: false });
    }
    // Helipad on the tower roof, behind the sign.
    k.add(G.cyl(4.2, 4.2, 0.12, 28), M.charcoal(), X, 21.4, Tz - 1.6, { cast: false });
    for (const s of [-1, 1]) k.add(G.box(0.6, 0.04, 4), white, X + s * 1.1, 21.48, Tz - 1.6, { cast: false });
    k.add(G.box(2.2, 0.04, 0.6), white, X, 21.48, Tz - 1.6, { cast: false });
    // Ambulance waiting at the door.
    k.push(X + 9, 0, HOSPITAL_Z + 14.5, 0);
    truck(k, red);
    k.pop();
    for (const s of [-1, 1]) tree(k, X + s * 15, HOSPITAL_Z + 13.5, 1.4);
    // Roof sign on posts, square to the motorway so it reads from the overview.
    const sz = Tz + 5.6;
    for (const px of [-8, 0, 8]) k.add(G.box(0.25, 1.2, 0.25), M.charcoal(), X + px, 21.8, sz);
    k.add(G.box(21, 5, 0.2), M.charcoal(), X, 24.7, sz);
    const face = new Mesh(new PlaneGeometry(20.6, 4.6), hospitalSignMaterial());
    face.position.set(X, 24.7, sz + 0.12);
    this.root.add(face);
  }

  /** One modern villa in local space: street side towards +z, plot about 12 x 13. */
  private villa(k: Kit, cladding: MeshStandardMaterial, paint: MeshStandardMaterial) {
    const glass = clay('#5d7f99', { roughness: 0.2 });
    // Hedges on the sides and back, a gap at the front for the path and drive.
    for (const x of [-6, 6]) k.add(G.box(0.7, 1.1, 12.5), M.leafDark(), x, 0.4, 0);
    k.add(G.box(12.7, 1.1, 0.7), M.leafDark(), 0, 0.4, -6.2);
    k.add(G.box(3, 0.04, 6), this.pavingMat, 3.6, -0.16, 3.5, { cast: false });
    k.add(G.box(1.4, 0.04, 3.2), this.pavingMat, -1.5, -0.16, 4.9, { cast: false });
    // Ground floor: white box with a glass front; upper floor cantilevered in cladding.
    k.add(G.box(8, 3, 6), this.villaWallMat, -1, 1.5, -0.6);
    k.add(G.box(4.4, 2.3, 0.08), glass, -2.6, 1.3, 2.42, { cast: false });
    k.add(G.box(1.1, 2.3, 0.1), M.charcoal(), 1.3, 1.15, 2.42);
    k.add(G.box(8.4, 0.25, 6.4), this.slabMat, -1, 3.1, -0.6);
    k.add(G.box(6.4, 2.6, 5.4), cladding, -2.2, 4.5, -0.1);
    k.add(G.box(4.6, 1.5, 0.08), glass, -2.2, 4.6, 2.62, { cast: false });
    k.add(G.box(6.8, 0.25, 5.8), this.slabMat, -2.2, 5.9, -0.1);
    // Terrace rail over the uncovered part of the ground floor.
    k.add(G.box(0.06, 0.9, 6), glass, 2.95, 3.7, -0.6, { cast: false });
    // Pool in the back garden, a tree and the car on the drive.
    k.add(G.box(6, 0.3, 2.4), this.slabMat, -1.5, -0.05, -4.4, { cast: false });
    k.add(G.box(5.4, 0.32, 1.9), this.waterMat, -1.5, -0.03, -4.4, { cast: false });
    tree(k, 4, -4, 1.2 + rand() * 0.4);
    bush(k, -4.6, 4.8, 0.9);
    k.push(3.6, 0, 3.4, -Math.PI / 2);
    car(k, paint);
    k.pop();
    // Name plate on a post by the path.
    k.add(G.box(0.14, 1.2, 0.14), M.charcoal(), -3.4, 0.6, 5.9);
    k.add(G.box(2.9, 2.02, 0.12), M.charcoal(), -3.4, 2.1, 5.86);
  }

  /** Airport behind the tower: runway, taxiway, apron with parked jets, terminal, control tower and hangar. */
  private buildAirport(k: Kit) {
    const white = M.white();
    const yellow = clay('#f2c14e');
    const edgeLight = clay('#fff4c2', { emissive: '#ffd27a', emissiveIntensity: 1.2 });
    const glass = clay('#5d7f99', { roughness: 0.2 });

    // Fence along the airside boundary.
    for (let x = -84; x <= 84; x += 6) k.add(G.box(0.12, 1.6, 0.12), M.steel(), x, 0.6, AIR_Z0);
    k.add(G.box(168, 0.08, 0.06), M.steel(), 0, 1.35, AIR_Z0, { cast: false });
    k.add(G.box(168, 0.08, 0.06), M.steel(), 0, 0.5, AIR_Z0, { cast: false });

    // Runway with threshold bars, centreline dashes and edge lights.
    k.add(G.box(RUNWAY_L, 0.06, 12), this.asphaltMat, 0, -0.16, RUNWAY_Z, { cast: false });
    for (let x = -RUNWAY_L / 2 + 14; x < RUNWAY_L / 2 - 14; x += 9) k.add(G.box(4.5, 0.02, 0.3), white, x, -0.12, RUNWAY_Z, { cast: false });
    for (const end of [-1, 1]) {
      const x = end * (RUNWAY_L / 2 - 4);
      for (let z = -4.6; z <= 4.6; z += 1.15) k.add(G.box(5, 0.02, 0.5), white, x, -0.12, RUNWAY_Z + z, { cast: false });
    }
    for (let x = -RUNWAY_L / 2; x <= RUNWAY_L / 2; x += 6)
      for (const z of [-6.4, 6.4]) k.add(G.sphere(0.16, 8, 6), edgeLight, x, -0.05, RUNWAY_Z + z, { cast: false });

    // Taxiway parallel to the runway, two links and a yellow guide line.
    k.add(G.box(130, 0.05, 6), this.asphaltMat, 0, -0.17, TAXI_Z, { cast: false });
    k.add(G.box(130, 0.02, 0.18), yellow, 0, -0.13, TAXI_Z, { cast: false });
    for (const x of [-60, 60]) k.add(G.box(6, 0.05, RUNWAY_Z - TAXI_Z - 6), this.asphaltMat, x, -0.17, (RUNWAY_Z + TAXI_Z) / 2, { cast: false });

    // Apron in front of the terminal, with stand lines and parked jets.
    k.add(G.box(64, 0.05, 16), this.asphaltMat, -6, -0.17, -53, { cast: false });
    for (const x of [-28, -12, 4, 20]) k.add(G.box(0.16, 0.02, 12), yellow, x, -0.13, -53, { cast: false });
    for (const [x, livery] of [[-20, '#d4af37'], [-4, '#2f6fb3'], [12, '#c8473d']] as [number, string][]) {
      k.push(x, 0, -55, Math.PI / 2);
      airliner(k, clay(livery));
      k.pop();
    }

    // Terminal: long low block with a glass band and a roof edge.
    k.add(G.box(54, 5, 7), this.wallMat, -6, 2.3, -44);
    k.add(G.box(54.2, 2.2, 7.2), glass, -6, 2.8, -44, { cast: false });
    k.add(G.box(55, 0.4, 8), this.slabMat, -6, 5, -44);
    // Jet bridges reaching to the stands.
    for (const x of [-20, -4, 12]) k.add(G.box(1.6, 1.6, 5.5), M.offWhite(), x + 3.5, 2.4, -49.6);

    // Control tower.
    k.add(G.cyl(1.4, 1.9, 20, 18), this.wallMat, 34, 10, -46);
    k.add(G.cyl(3.4, 2.6, 1, 18), this.slabMat, 34, 20.5, -46);
    k.add(G.cyl(3.2, 3.2, 2.6, 18), glass, 34, 22.3, -46, { cast: false });
    k.add(G.cyl(3.6, 3.6, 0.4, 18), M.charcoal(), 34, 23.8, -46);
    k.add(G.cyl(0.08, 0.08, 3, 6), M.steel(), 34, 25.5, -46);
    k.add(G.sphere(0.25, 8, 6), clay('#ff5a4f', { emissive: '#ff3b30', emissiveIntensity: 1.5 }), 34, 27.1, -46, { cast: false });

    // Hangar: barrel roof, dark open door facing the taxiway.
    k.add(G.box(20, 0.05, 10), this.asphaltMat, 56, -0.17, -60, { cast: false });
    k.add(G.cyl(8, 8, 18, 24), M.steel(), 56, 0, -46, { rx: Math.PI / 2, sz: 0.8 });
    k.add(G.box(16, 7.6, 0.2), M.charcoal(), 56, 3.8, -55.1);
  }

  /** Motorway: asphalt, lane markings, concrete median, guardrails, lights and a gantry. */
  private buildHighway(k: Kit) {
    const white = M.white();
    const yellow = clay('#f2c14e');
    const concrete = clay('#c9ccd1');
    const half = MEDIAN / 2 + 3 * LANE;
    // Carriageways plus hard shoulders.
    k.add(G.box(HW_L, 0.06, 2 * half + 3), this.asphaltMat, 0, -0.16, HW_Z, { cast: false });
    for (const side of [-1, 1]) {
      const zIn = HW_Z + side * (MEDIAN / 2);
      const zOut = HW_Z + side * half;
      // Edge lines: yellow by the median, white on the outside.
      k.add(G.box(HW_L, 0.02, 0.18), yellow, 0, -0.12, zIn + side * 0.2, { cast: false });
      k.add(G.box(HW_L, 0.02, 0.18), white, 0, -0.12, zOut - side * 0.2, { cast: false });
      // Dashed lane lines.
      for (const l of [1, 2])
        for (let x = -HW_L / 2 + 2; x < HW_L / 2; x += 9) k.add(G.box(4, 0.02, 0.14), white, x, -0.12, zIn + side * l * LANE, { cast: false });
      // Guardrail on posts along the outer edge.
      const zr = zOut + side * 1.3;
      k.add(G.box(HW_L, 0.32, 0.08), M.steel(), 0, 0.55, zr, { cast: false });
      for (let x = -HW_L / 2; x <= HW_L / 2; x += 4) k.add(G.box(0.1, 0.7, 0.1), M.steel(), x, 0.3, zr, { cast: false });
    }
    // Concrete barrier on the median, lamp posts every 20 m.
    k.add(G.box(HW_L, 0.8, 0.6), concrete, 0, 0.25, HW_Z);
    for (let x = -HW_L / 2 + 10; x < HW_L / 2; x += 20) {
      k.add(G.cyl(0.08, 0.1, 7, 10), M.steel(), x, 3.5, HW_Z);
      for (const side of [-1, 1]) {
        k.add(G.box(0.08, 0.08, 2.4), M.steel(), x, 6.95, HW_Z + side * 1.2, { cast: false });
        k.add(G.box(0.5, 0.12, 0.8), bulbMat, x, 6.85, HW_Z + side * 2.3, { cast: false });
      }
    }
    // Overhead gantry with green direction signs.
    const gx = -20;
    for (const side of [-1, 1]) k.add(G.box(0.3, 7, 0.3), M.steel(), gx, 3.3, HW_Z + side * (half + 1.6));
    k.add(G.box(0.4, 0.5, 2 * half + 3.6), M.steel(), gx, 6.9, HW_Z);
    const green = clay('#1f6b45');
    for (const side of [-1, 1]) {
      const z = HW_Z + side * (MEDIAN / 2 + 1.5 * LANE);
      k.add(G.box(0.2, 2, 6), green, gx + 0.25, 5.6, z);
      for (const dy of [0.45, -0.1, -0.55]) k.add(G.box(0.04, 0.16, 4.6 - Math.abs(dy) * 2), white, gx + 0.37, 5.6 + dy, z, { cast: false });
    }
    // Slip road from the car park on to the near carriageway.
    const zEdge = HW_Z - half - 1.5;
    k.add(G.box(7, 0.05, zEdge - PK.z1 + 0.5), this.asphaltMat, (PK.x0 + PK.x1) / 2, -0.17, (PK.z1 + zEdge) / 2, { cast: false });
  }

  /** Double-track high-speed line along the motorway: ballast, sleepers, rails, catenary portals and a fence. */
  private buildRailway(k: Kit) {
    const ballast = clay('#8d8a84');
    const sleeper = clay('#5c5650');
    const midZ = (RAIL_ZS[0] + RAIL_ZS[1]) / 2;
    k.add(G.box(HW_L, 0.3, 12), ballast, 0, -0.1, midZ, { cast: false });
    for (const z of RAIL_ZS) {
      for (let x = -HW_L / 2; x <= HW_L / 2; x += 2) k.add(G.box(0.5, 0.1, 2.4), sleeper, x, 0.1, z, { cast: false });
      for (const side of [-0.72, 0.72]) k.add(G.box(HW_L, 0.14, 0.1), M.steel(), 0, 0.22, z + side, { cast: false });
      k.add(G.box(HW_L, 0.05, 0.05), M.charcoal(), 0, 6.3, z, { cast: false });
    }
    for (let x = -HW_L / 2 + 15; x < HW_L / 2; x += 45) {
      for (const z of [midZ - 5.2, midZ + 5.2]) k.add(G.box(0.3, 7.2, 0.3), M.steel(), x, 3.6, z);
      k.add(G.box(0.35, 0.4, 10.8), M.steel(), x, 7, midZ);
    }
    // Fence beyond the line, open where the station's far platform stands.
    const fenceZ = midZ + 6.8;
    const gap0 = STATION_X - STATION_PLATFORM_L / 2 - 1;
    const gap1 = STATION_X + STATION_PLATFORM_L / 2 + 1;
    for (let x = -HW_L / 2; x <= HW_L / 2; x += 6) if (x < gap0 || x > gap1) k.add(G.box(0.1, 1.4, 0.1), M.steel(), x, 0.6, fenceZ, { cast: false });
    for (const y of [0.5, 1.2]) {
      for (const [a, b] of [[-HW_L / 2, gap0], [gap1, HW_L / 2]]) k.add(G.box(b - a, 0.06, 0.05), M.steel(), (a + b) / 2, y, fenceZ, { cast: false });
    }
  }

  /** Railway station across the line from the hospital: two platforms, footbridge, hall, forecourt and road. */
  private buildStation(k: Kit) {
    reseed(731);
    const X = STATION_X;
    const L = STATION_PLATFORM_L;
    const PY = 0.9;
    const white = M.white();
    const yellow = clay('#f2c14e');
    const glass = clay('#5d7f99', { roughness: 0.2 });
    const roof = clay('#7f98ab', { roughness: 0.35 });
    const blue = clay('#1f4e8c');
    // Platforms either side of the tracks, with a yellow safety line at the edge.
    const FAR_Z = 73.85;
    const NEAR_Z = 61.15;
    k.add(G.box(L, 1.1, 6.3), this.pavingMat, X, 0.35, FAR_Z);
    k.add(G.box(L, 1.1, 3.3), this.pavingMat, X, 0.35, NEAR_Z);
    k.add(G.box(L, 0.02, 0.25), yellow, X, PY + 0.01, 71.2, { cast: false });
    k.add(G.box(L, 0.02, 0.25), yellow, X, PY + 0.01, 62.3, { cast: false });
    // Platform canopies, stopping short of the footbridge stairs and clear of the catenary masts.
    const canopy = (x0: number, x1: number, z: number, d: number) => {
      k.add(G.box(x1 - x0, 0.25, d), roof, (x0 + x1) / 2, 4.4, z);
      for (let x = x0 + 2; x <= x1 - 2; x += 8) k.add(G.box(0.25, 3.4, 0.25), M.steel(), x, PY + 1.7, z);
    };
    canopy(X - 32, X - 4, 74.5, 4.2);
    canopy(X + 4, X + 32, 74.5, 4.2);
    canopy(X - 13, X - 3, NEAR_Z, 2.4);
    canopy(X + 3, X + 25, NEAR_Z, 2.4);
    for (const x of [X - 24, X - 10, X + 10, X + 24]) {
      k.push(x, PY, 75.2, 0);
      bench(k, 0, 0, 0);
      k.pop();
    }
    // Footbridge over the tracks: a stair tower on each platform and a glazed deck above the wires.
    for (const z of [NEAR_Z, 75.5]) {
      k.add(G.box(3, 9.1, 3), this.villaWallMat, X, PY + 4.55, z);
      k.add(G.box(3.4, 0.25, 3.4), this.slabMat, X, 10.1, z);
    }
    const deckZ = (NEAR_Z + 75.5) / 2;
    const deckD = 75.5 - NEAR_Z;
    k.add(G.box(2.6, 0.3, deckD), this.slabMat, X, 8.4, deckZ);
    for (const s of [-1, 1]) k.add(G.box(0.08, 1, deckD), glass, X + s * 1.25, 9, deckZ, { cast: false });
    this.buildRoadBridge(k, NEAR_Z);
    // Hall: glazed front, barrel roof, entrance canopy and the sign facing the open lawn.
    const HZ = 84;
    k.add(G.box(46, 7, 12), this.villaWallMat, X, 3.3, HZ);
    k.add(G.cyl(5.9, 5.9, 46.4, 28), roof, X, 6.8, HZ, { rz: Math.PI / 2 });
    k.add(G.box(40, 3.2, 0.08), glass, X, 1.8, HZ + 6.03, { cast: false });
    k.add(G.box(16, 0.3, 3), blue, X, 3.6, HZ + 7.4);
    for (const s of [-1, 1]) k.add(G.box(0.25, 3.5, 0.25), M.steel(), X + s * 7.4, 1.7, HZ + 8.6);
    k.add(G.box(24.4, 3, 0.15), M.charcoal(), X, 5.4, HZ + 6.1);
    const face = new Mesh(new PlaneGeometry(24, 2.7), stationSignMaterial());
    face.position.set(X, 5.4, HZ + 6.2);
    this.root.add(face);
    // Forecourt with taxis, lamps and trees, then a road along the lawn.
    k.add(G.box(64, 0.08, 7), this.pavingMat, X, -0.15, HZ + 9.5, { cast: false });
    k.add(G.box(HW_L, 0.05, 7), this.asphaltMat, 0, -0.17, HZ + 16.5, { cast: false });
    for (let x = -HW_L / 2; x < HW_L / 2; x += 6) k.add(G.box(3, 0.02, 0.14), white, x, -0.13, HZ + 16.5, { cast: false });
    const taxi = clay('#e6b422');
    for (const x of [X - 18, X - 11, X + 11, X + 18]) {
      k.push(x, 0, HZ + 14.8, 0);
      car(k, taxi);
      k.pop();
    }
    for (const s of [-1, 1]) {
      lampPost(k, X + s * 26, HZ + 8);
      lampPost(k, X + s * 12, HZ + 11.5);
      for (const x of [28, 34]) tree(k, X + s * x, HZ - 2, 1.6);
    }
  }

  /** Open footbridge over the motorway, from the near platform's stair tower to the clients' street. */
  private buildRoadBridge(k: Kit, fromZ: number) {
    const X = STATION_X;
    const glass = clay('#5d7f99', { roughness: 0.2 });
    const [land, turn] = WALK_PATH;
    const d = fromZ - turn.z;
    const z = (fromZ + turn.z) / 2;
    k.add(G.box(2.6, 0.3, d), this.slabMat, X, 8.4, z);
    for (const s of [-1, 1]) k.add(G.box(0.08, 1, d), glass, X + s * 1.25, 9, z, { cast: false });
    // Short arm to the stair tower on the verge beside the street's pavement.
    const w = land.x - X;
    k.add(G.box(w, 0.3, 2.6), this.slabMat, X + w / 2, 8.4, turn.z);
    k.add(G.box(w, 1, 0.08), glass, X + w / 2, 9, turn.z - 1.25, { cast: false });
    k.add(G.box(w, 1, 0.08), glass, X + w / 2, 9, turn.z + 1.25, { cast: false });
    k.add(G.box(3, 10, 3), this.villaWallMat, land.x, 5, land.z);
    k.add(G.box(3.4, 0.25, 3.4), this.slabMat, land.x, 10.1, land.z);
    // Piers: one on the median, one on the verge each side of the motorway.
    for (const pz of [HW_Z, HW_Z + 13.5, HW_Z - 13.5]) k.add(G.box(1, 8.3, 1), this.slabMat, X, 4.1, pz);
  }

  /** People crossing the footbridges, in both directions. They vanish into the stair towers at each end. */
  private buildWalkers() {
    PEOPLE_SHIRTS.slice(0, 8).forEach((c, i) => {
      const { g, legs } = this.makeFigure(c);
      this.walkers.push({ g, legs, s: (i / 8) * WALK_L, dir: i % 2 ? -1 : 1 });
    });
  }

  /** One small person, facing +x, added to the scene. */
  private makeFigure(shirt: string) {
    const g = new Group();
    const body = new Mesh(G.capsule(0.3, 0.7), clay(shirt));
    body.position.y = 1.15;
    const head = new Mesh(G.sphere(0.25, 10, 8), clay('#e3b48f'));
    head.position.y = 1.95;
    const legs = [-0.15, 0.15].map((o) => {
      const leg = new Mesh(G.box(0.2, 0.75, 0.2), clay('#2b2f36'));
      leg.position.set(0, 0.38, o);
      g.add(leg);
      return leg;
    });
    g.add(body, head);
    this.root.add(g);
    return { g, legs };
  }

  /** Passengers on the far platform: some get off at each stop, others wait and get on. */
  private buildPassengers() {
    STOP_DOORS.forEach((door, d) => {
      const dx = STATION_X + door;
      this.trainDoors.push(this.makeDoor(door));
      for (let i = 0; i < 2; i++) {
        const order = d * 2 + i;
        const off = this.makeFigure(PEOPLE_SHIRTS[order % PEOPLE_SHIRTS.length]);
        off.g.visible = false;
        this.passengers.push({ ...off, role: 'off', order, x: dx, path: [], delay: 0, hideAtEnd: true });
        const on = this.makeFigure(PEOPLE_SHIRTS[(order + 5) % PEOPLE_SHIRTS.length]);
        const spot = this.waitSpot(dx, i);
        on.g.position.set(spot.x, PLATFORM_Y, spot.z);
        on.g.rotation.y = Math.PI / 2;
        this.passengers.push({ ...on, role: 'on', order, x: dx, path: [], delay: 0, hideAtEnd: false });
      }
    });
  }

  private waitSpot(doorX: number, i: number) {
    return { x: doorX + (i ? 1.3 : -1.3), z: 73 };
  }

  /** A dark open doorway on the platform side of a coach, shown only while stopped. */
  private makeDoor(localX: number) {
    const door = new Mesh(new BoxGeometry(1, 2.3, 0.04), clay('#10151f'));
    door.position.set(localX, 2.05, 1.49);
    door.visible = false;
    this.train.add(door);
    return door;
  }

  /** Doors open: send those getting off to the hall and those waiting into the train. */
  private startExchange() {
    for (const d of this.trainDoors) d.visible = true;
    for (const p of this.passengers) {
      if (p.role === 'off') {
        p.g.position.set(p.x, PLATFORM_Y, DOOR_Z);
        p.g.visible = true;
        p.path = [{ x: p.x, z: 72.6 + (p.order % 2) * 0.7 }, { x: p.x - 3, z: 76.9 }, HALL_DOOR];
        p.delay = 0.8 + p.order * 0.55;
      } else {
        p.path = [{ x: p.x, z: 71.8 }, { x: p.x, z: DOOR_Z }];
        p.delay = 3 + p.order * 0.55;
      }
      p.hideAtEnd = true;
    }
  }

  /** Train gone: the next people come out of the hall and wait at the doors. */
  private startNextWait() {
    for (const d of this.trainDoors) d.visible = false;
    for (const p of this.passengers) {
      if (p.role !== 'on') continue;
      p.g.position.set(HALL_DOOR.x, PLATFORM_Y, HALL_DOOR.z);
      p.g.visible = true;
      p.path = [{ x: p.x - 3, z: 76.9 }, this.waitSpot(p.x, p.order % 2)];
      p.delay = p.order * 0.7;
      p.hideAtEnd = false;
    }
  }

  private tickPassengers(dt: number) {
    for (const p of this.passengers) {
      if (!p.path.length) continue;
      if (p.delay > 0) {
        p.delay -= dt;
        continue;
      }
      const to = p.path[0];
      const dx = to.x - p.g.position.x;
      const dz = to.z - p.g.position.z;
      const dist = Math.hypot(dx, dz);
      const step = PASSENGER_SPEED * dt;
      if (dist <= step) {
        p.g.position.x = to.x;
        p.g.position.z = to.z;
        p.path.shift();
        if (!p.path.length) {
          if (p.hideAtEnd) p.g.visible = false;
          p.legs[0].position.x = p.legs[1].position.x = 0;
        }
        continue;
      }
      p.g.position.x += (dx / dist) * step;
      p.g.position.z += (dz / dist) * step;
      p.g.rotation.y = Math.atan2(-dz, dx);
      const swing = Math.sin((p.g.position.x + p.g.position.z) * 5) * 0.14;
      p.legs[0].position.x = swing;
      p.legs[1].position.x = -swing;
    }
  }

  private tickWalkers(dt: number) {
    const [a, b] = WALK_PATH;
    const seg = b.x - a.x;
    for (const w of this.walkers) {
      w.s += WALK_SPEED * dt;
      if (w.s > WALK_L) w.s -= WALK_L;
      const along = w.dir > 0 ? w.s : WALK_L - w.s;
      // Keep right: each direction uses its own side of the deck.
      const off = 0.55 * w.dir;
      if (along < -seg) {
        w.g.position.set(a.x - along, 8.55, a.z - off);
        w.g.rotation.y = w.dir > 0 ? Math.PI : 0;
      } else {
        w.g.position.set(b.x + off, 8.55, b.z + along + seg);
        w.g.rotation.y = w.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
      }
      const swing = Math.sin(w.s * 5) * 0.14;
      w.legs[0].position.x = swing;
      w.legs[1].position.x = -swing;
    }
  }

  /** The TGV: two streamlined power cars and eight coaches on the near track, nose towards +x. */
  private buildTrain() {
    const k = new Kit();
    const start = -TGV_L / 2 + TGV_POWER;
    powerCar(k, start - TGV_POWER / 2, -1);
    for (let i = 0; i < TGV_COACHES; i++) coach(k, start + TGV_COACH * (i + 0.5));
    powerCar(k, TGV_L / 2 - TGV_POWER / 2, 1);
    this.train.add(k.build());
    this.train.position.set(this.trainX, 0.3, RAIL_ZS[1]);
    this.root.add(this.train);
  }

  /** The train brakes into the station, waits with its doors open, then pulls away and comes round again. */
  private tickTrain(dt: number) {
    const end = HW_L / 2 + TGV_L;
    if (this.trainPhase === 'stopped') {
      this.trainWait -= dt;
      if (this.trainWait <= 0) {
        this.trainPhase = 'leaving';
        this.startNextWait();
      }
      return;
    }
    if (this.trainPhase === 'arriving') {
      const left = STATION_X - this.trainX;
      this.trainSpeed = Math.min(TGV_SPEED, Math.max(0.8, Math.sqrt(2 * TGV_BRAKE * Math.max(left, 0))));
      if (left <= this.trainSpeed * dt) {
        this.trainX = STATION_X;
        this.trainSpeed = 0;
        this.trainPhase = 'stopped';
        this.trainWait = STOP_SECONDS;
        this.train.position.x = this.trainX;
        this.startExchange();
        return;
      }
    } else {
      this.trainSpeed = Math.min(TGV_SPEED, this.trainSpeed + TGV_BRAKE * dt);
    }
    this.trainX += this.trainSpeed * dt;
    if (this.trainX > end) {
      this.trainX = -end;
      this.trainPhase = 'arriving';
    }
    this.train.position.x = this.trainX;
  }

  /** Car park: two rows of bays around a central aisle, with parked cars and lamps. */
  private buildParking(k: Kit) {
    reseed(311);
    const white = M.white();
    const { x0, x1, z0, z1 } = PK;
    const cx = (x0 + x1) / 2;
    const cz = (z0 + z1) / 2;
    k.add(G.box(x1 - x0, 0.05, z1 - z0), this.parkMat, cx, -0.17, cz, { cast: false });
    // Kerb on three sides; the highway side stays open for the slip road.
    k.add(G.box(x1 - x0, 0.25, 0.3), M.offWhite(), cx, -0.05, z0);
    for (const x of [x0, x1]) k.add(G.box(0.3, 0.25, z1 - z0), M.offWhite(), x, -0.05, cz);
    const BAY = 2.8;
    const DEPTH = 4.6;
    const n = Math.floor((x1 - x0 - 2) / BAY);
    const colors = ['#d4af37', '#c8473d', '#2f6fb3', '#f2f2f2', '#2b2f36', '#7d8f69', '#9aa3ad', '#121419'];
    for (const row of [0, 1]) {
      const zc = row === 0 ? z0 + DEPTH / 2 + 0.3 : z1 - DEPTH / 2 - 0.3;
      const ry = row === 0 ? -Math.PI / 2 : Math.PI / 2;
      for (let i = 0; i <= n; i++) {
        const x = x0 + 1 + i * BAY;
        k.add(G.box(0.12, 0.02, DEPTH), white, x, -0.13, zc, { cast: false });
        // Parked cars in most bays, nose in.
        if (i < n && rand() < 0.72) {
          k.push(x + BAY / 2, 0, zc, ry);
          car(k, clay(colors[Math.floor(rand() * colors.length)]));
          k.pop();
        }
      }
    }
    // Arrows on the aisle and lamp posts along it.
    for (let x = x0 + 6; x < x1 - 4; x += 12) k.add(G.box(2.4, 0.02, 0.35), white, x, -0.13, cz, { cast: false });
    for (let x = x0 + 8; x < x1; x += 16) lampPost(k, x, cz);
    // Trees along the plaza side and a blue P sign at the entrance.
    for (let x = x0 + 4; x < x1; x += 9) tree(k, x, z0 - 1.6, 1.2);
    const sx = cx + 5;
    k.add(G.box(0.12, 2.2, 0.12), M.charcoal(), sx, 1.1, z1 + 0.6);
    k.add(G.box(1.4, 1.4, 0.1), clay('#2f6fb3'), sx, 2.6, z1 + 0.6);
    k.add(G.box(0.18, 0.9, 0.02), white, sx - 0.15, 2.6, z1 + 0.66, { cast: false });
    k.add(G.box(0.45, 0.16, 0.02), white, sx + 0.05, 2.97, z1 + 0.66, { cast: false });
    k.add(G.box(0.45, 0.16, 0.02), white, sx + 0.05, 2.57, z1 + 0.66, { cast: false });
    k.add(G.box(0.16, 0.4, 0.02), white, sx + 0.27, 2.77, z1 + 0.66, { cast: false });
  }

  /** Cars driving both ways on the motorway (right-hand traffic). */
  private buildTraffic() {
    reseed(77);
    const colors = ['#d4af37', '#c8473d', '#2f6fb3', '#f2f2f2', '#2b2f36', '#3f7f7a', '#e8657a', '#9aa3ad'];
    for (const dir of [1, -1]) {
      for (let lane = 0; lane < 3; lane++) {
        const z = HW_Z + dir * (MEDIAN / 2 + (lane + 0.5) * LANE);
        const count = lane === 2 ? 5 : 7;
        for (let i = 0; i < count; i++) {
          const k = new Kit();
          const paint = clay(colors[Math.floor(rand() * colors.length)]);
          if (lane === 2 && i === 0) truck(k, paint);
          else car(k, paint);
          const g = k.build();
          g.position.set(-HW_L / 2 + ((i + rand() * 0.6) / count) * HW_L, 0, z);
          g.rotation.y = dir === 1 ? 0 : Math.PI;
          this.root.add(g);
          // Fast lane by the median, slower towards the outside.
          this.traffic.push({ g, dir, speed: 16 - lane * 3.5 + rand() * 2 });
        }
      }
    }
  }

  private tickTraffic(dt: number) {
    for (const c of this.traffic) {
      let x = c.g.position.x + c.dir * c.speed * dt;
      if (x > HW_L / 2) x -= HW_L;
      if (x < -HW_L / 2) x += HW_L;
      c.g.position.x = x;
    }
  }

  /** One jet taking off now and then. */
  tickAirport(dt: number) {
    const p = this.plane;
    this.planeT = (this.planeT + dt) % 48;
    const t = this.planeT - 4;
    if (t < 0) {
      p.position.set(-RUNWAY_L / 2 + 6, 0, RUNWAY_Z);
      p.rotation.z = 0;
      p.visible = true;
      return;
    }
    const ROLL = 13;
    const a = 88 / (0.5 * ROLL * ROLL);
    if (t < ROLL) {
      p.position.x = -RUNWAY_L / 2 + 6 + 0.5 * a * t * t;
      return;
    }
    const s = t - ROLL;
    const v = a * ROLL;
    p.position.x = -RUNWAY_L / 2 + 6 + 88 + v * s;
    p.position.y = 0.45 * s * s;
    p.rotation.z = Math.min(0.2, s * 0.09);
    p.visible = p.position.x < 190;
  }
}

const AIR_Z0 = -36;
// Street of closed clients, east of the consultants' villas (their street is at x 87).
export const CLIENT_STREET_X = 122;
// Hospital at the far end of that street, entrance facing the turning circle.
export const HOSPITAL_Z = -31;
// Railway station on the lawn side of the line, straight in front of the hospital.
export const STATION_X = CLIENT_STREET_X;
export const STATION_Z = 88;
// Long enough for the whole train, which stops centred on the station.
const STATION_PLATFORM_L = 150;
const PLATFORM_Y = 0.9;
const TGV_BRAKE = 6;
const STOP_SECONDS = 14;
// Coach doors in use, relative to the train's centre: east of the hall, where the camera sees them.
const STOP_DOORS = [29.15, 40.85, 54.85];
const DOOR_Z = 70.9;
const HALL_DOOR = { x: STATION_X + 22, z: 77.4 };
const PASSENGER_SPEED = 3;
const PEOPLE_SHIRTS = ['#c8473d', '#2f6fb3', '#d4af37', '#2b2f36', '#7d8f69', '#f2f2f2', '#a0683f', '#6b4fa0'];
// Walking route on the footbridges: street-side tower, corner over the street, far platform tower.
const WALK_PATH = [{ x: 128, z: 29.5 }, { x: 122, z: 29.5 }, { x: 122, z: 75.5 }];
const WALK_L = 52;
const WALK_SPEED = 2.4;
// Motorway in front of both buildings: two carriageways of three lanes and a median.
const HW_Z = 46;
const LANE = 3.5;
const MEDIAN = 2;
// Runs to the edge of the lawn, so neither road nor rail stops short in the open.
const HW_L = 900;
// High-speed line just beyond the motorway's outer guardrail.
export const RAIL_ZS = [64.5, 69];
const TGV_POWER = 17;
const TGV_COACH = 14;
const TGV_COACHES = 8;
const TGV_L = 2 * TGV_POWER + TGV_COACHES * TGV_COACH;
const TGV_SPEED = 60;
// Car park in front of Elite Real Estate.
const PK = { x0: -100, x1: -46, z0: 18.5, z1: 31.5 };
// Vegetable garden west of the hedge garden; the gates sit on the cross path between beds.
const HORTA = { x0: -99, x1: -77, z0: -30, z1: 13, gateZ: -6.4 };
const RUNWAY_Z = -84;
const TAXI_Z = -67;
const RUNWAY_L = 150;

/** Green roof sign shared by every closed client's house. */
function closedSignMaterial() {
  const { canvas, ctx, texture } = makeCanvas(1024, 248);
  ctx.fillStyle = '#17803f';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 170px ${UI_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('FECHADO', canvas.width / 2, canvas.height / 2 + 8);
  texture.needsUpdate = true;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

/** The station's front sign. */
function stationSignMaterial() {
  const { canvas, ctx, texture } = makeCanvas(1024, 116);
  ctx.fillStyle = '#1f4e8c';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 84px ${UI_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ESTAÇÃO', canvas.width / 2, canvas.height / 2 + 4);
  texture.needsUpdate = true;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

/** The hospital's roof sign: a red cross and DIOGO on white. */
function hospitalSignMaterial() {
  const { canvas, ctx, texture } = makeCanvas(1024, 228);
  const H = canvas.height;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, H);
  ctx.fillStyle = '#d3232e';
  ctx.fillRect(70, H / 2 - 24, 140, 48);
  ctx.fillRect(116, H / 2 - 70, 48, 140);
  ctx.font = `800 170px ${UI_FONT}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('DIOGO', canvas.width / 2 + 110, H / 2 + 8);
  texture.needsUpdate = true;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

/** A closed client's plate: name, company and FECHADO. */
function clientPlateMaterial(c: Consultant) {
  const H = 352;
  const { canvas, ctx, texture } = makeCanvas(512, H);
  const W = canvas.width;
  ctx.fillStyle = '#121419';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, W - 16, H - 16);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5f1e6';
  ctx.font = `700 50px ${UI_FONT}`;
  ctx.fillText(fit(ctx, c.name, W - 48), W / 2, 90);
  ctx.fillStyle = '#d4af37';
  ctx.font = `500 34px ${UI_FONT}`;
  ctx.fillText(fit(ctx, c.agency || 'Cliente', W - 48), W / 2, 145);
  ctx.fillStyle = '#17803f';
  ctx.fillRect(40, 200, W - 80, 104);
  ctx.fillStyle = '#ffffff';
  ctx.font = `800 68px ${UI_FONT}`;
  ctx.fillText('FECHADO', W / 2, 276);
  texture.needsUpdate = true;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

/** Black and gold plate: consultant, agency, their dearest listing and its price. */
function villaPlateMaterial(c: Consultant) {
  const H = 352;
  const { canvas, ctx, texture } = makeCanvas(512, H);
  const W = canvas.width;
  ctx.fillStyle = '#121419';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 6;
  ctx.strokeRect(8, 8, W - 16, H - 16);
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f5f1e6';
  ctx.font = `700 46px ${UI_FONT}`;
  ctx.fillText(fit(ctx, c.name, W - 48), W / 2, 62);
  // Contacts: phone and Instagram, right under the name.
  ctx.fillStyle = '#d4af37';
  ctx.font = `600 30px ${MONO_FONT}`;
  ctx.fillText(fit(ctx, c.phone || 'sem telefone', W - 48), W / 2, 104);
  ctx.fillStyle = '#e8e2d2';
  ctx.font = `500 26px ${UI_FONT}`;
  ctx.fillText(fit(ctx, c.instagram || 'sem Instagram', W - 48), W / 2, 140);
  ctx.strokeStyle = 'rgba(212,175,55,0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 160);
  ctx.lineTo(W - 40, 160);
  ctx.stroke();
  ctx.fillStyle = '#b9b4a8';
  ctx.font = `500 26px ${UI_FONT}`;
  ctx.fillText(fit(ctx, [c.agency, c.listing].filter(Boolean).join(' · '), W - 48), W / 2, 200);
  ctx.fillStyle = '#d4af37';
  ctx.font = `700 64px ${MONO_FONT}`;
  ctx.fillText(formatPrice(c.price) || '—', W / 2, 272);
  ctx.fillStyle = '#b9b4a8';
  ctx.font = `500 24px ${UI_FONT}`;
  ctx.fillText(fit(ctx, c.verdict, W - 48), W / 2, 318);
  texture.needsUpdate = true;
  return new MeshBasicMaterial({ map: texture, toneMapped: false });
}

/** A hatchback, nose towards +x, wheels on the ground. */
function car(k: Kit, paint: MeshStandardMaterial) {
  const dark = M.screen();
  k.add(G.rbox(4.0, 0.75, 1.8, 0.2), paint, 0, 0.62, 0);
  k.add(G.rbox(2.3, 0.62, 1.62, 0.18), paint, -0.25, 1.25, 0);
  k.add(G.box(2.1, 0.46, 1.66), dark, -0.25, 1.27, 0, { cast: false });
  for (const x of [-1.25, 1.25]) for (const z of [-0.82, 0.82]) k.add(G.cyl(0.34, 0.34, 0.26, 14), M.charcoal(), x, 0.34, z, { rx: Math.PI / 2 });
  for (const z of [-0.6, 0.6]) k.add(G.box(0.05, 0.16, 0.36), bulbMat, 2.0, 0.72, z, { cast: false });
}

/** A box truck, nose towards +x. */
function truck(k: Kit, paint: MeshStandardMaterial) {
  k.add(G.box(5.6, 2.6, 2.3), M.offWhite(), -1.1, 1.8, 0);
  k.add(G.rbox(1.9, 2, 2.2, 0.15), paint, 2.75, 1.45, 0);
  k.add(G.box(0.06, 0.8, 2.0), M.screen(), 3.72, 1.95, 0, { cast: false });
  for (const x of [-3, -1.8, 2.7]) for (const z of [-1.05, 1.05]) k.add(G.cyl(0.45, 0.45, 0.3, 14), M.charcoal(), x, 0.45, z, { rx: Math.PI / 2 });
}

/** Bogies under a TGV vehicle, centred on x. */
function bogie(k: Kit, x: number) {
  k.add(G.box(3, 0.45, 2.2), M.charcoal(), x, 0.55, 0);
  for (const dx of [-0.9, 0.9]) for (const z of [-0.72, 0.72]) k.add(G.cyl(0.36, 0.36, 0.14, 14), M.black(), x + dx, 0.36, z, { rx: Math.PI / 2 });
}

/** A TGV coach, centred on x: pearl body, dark window band, blue skirt and doors. */
function coach(k: Kit, x: number) {
  const L = TGV_COACH - 0.3;
  k.add(G.rbox(L, 3, 2.9, 0.35), clay('#eef1f4', { roughness: 0.4 }), x, 2.35, 0);
  k.add(G.box(L, 0.75, 2.94), clay('#16233f', { roughness: 0.25 }), x, 2.75, 0, { cast: false });
  k.add(G.box(L, 0.55, 2.94), clay('#1f4e9c'), x, 1.15, 0, { cast: false });
  for (const dx of [-L / 2 + 1, L / 2 - 1]) k.add(G.box(1, 2.5, 2.96), clay('#1f4e9c'), x + dx, 2.1, 0, { cast: false });
  for (const dx of [-L / 2 + 2.6, L / 2 - 2.6]) bogie(k, x + dx);
}

/** A TGV power car, centred on x, its long nose towards `dir` on the x axis. */
function powerCar(k: Kit, x: number, dir: number) {
  const pearl = clay('#eef1f4', { roughness: 0.4 });
  const blue = clay('#1f4e9c');
  const dark = clay('#16233f', { roughness: 0.2 });
  const BODY = 10;
  const NOSE = TGV_POWER - BODY;
  const bodyX = x - (dir * NOSE) / 2;
  k.add(G.rbox(BODY, 3, 2.9, 0.35), pearl, bodyX, 2.35, 0);
  k.add(G.box(BODY, 0.55, 2.94), blue, bodyX, 1.15, 0, { cast: false });
  k.add(G.box(BODY, 0.22, 2.94), clay('#c8473d'), bodyX, 3.05, 0, { cast: false });
  // Long tapered nose: a stretched sphere, with a darker windscreen and a blue chin.
  const noseBase = bodyX + (dir * BODY) / 2;
  k.add(G.sphere(1, 24, 16), pearl, noseBase, 2.3, 0, { sx: NOSE, sy: 1.5, sz: 1.45 });
  k.add(G.sphere(1, 24, 16), blue, noseBase, 1.7, 0, { sx: NOSE - 0.1, sy: 0.92, sz: 1.47, cast: false });
  k.add(G.sphere(1, 20, 12), dark, noseBase + dir * 2.3, 3, 0, { sx: 2.7, sy: 0.62, sz: 1.06, cast: false });
  bogie(k, bodyX - dir * 2.6);
  bogie(k, bodyX + dir * 2.6);
  // Pantograph on the roof.
  k.add(G.box(1.4, 0.14, 0.9), M.charcoal(), bodyX, 3.92, 0);
  k.add(G.box(0.1, 1.5, 0.1), M.steel(), bodyX + 0.5, 4.6, 0, { rz: 0.8 });
  k.add(G.box(0.1, 1.4, 0.1), M.steel(), bodyX + 0.5, 5.4, 0, { rz: -0.8 });
  k.add(G.box(0.14, 0.06, 1.7), M.steel(), bodyX + 0.5, 5.95, 0, { cast: false });
}

/** A small twin-engine airliner, nose towards +x, wheels on the ground. */
function airliner(k: Kit, livery: MeshStandardMaterial) {
  const body = M.white();
  const dark = M.screen();
  const Y = 1.65;
  k.add(G.capsule(0.9, 9), body, 0, Y, 0, { rz: Math.PI / 2 });
  k.add(G.box(7.2, 0.22, 1.84), livery, -0.4, Y + 0.05, 0, { cast: false });
  for (let x = -3; x <= 3; x += 0.75) for (const z of [-0.91, 0.91]) k.add(G.box(0.28, 0.2, 0.04), dark, x, Y + 0.45, z, { cast: false });
  k.add(G.box(0.5, 0.25, 1.2), dark, 5.05, Y + 0.4, 0, { rz: -0.5, cast: false });
  // Wings, engines and tail.
  k.add(G.box(2.4, 0.16, 12), body, 0.2, Y - 0.35, 0);
  for (const z of [-2.7, 2.7]) {
    k.add(G.cyl(0.45, 0.4, 1.8, 14), M.steel(), 0.9, Y - 0.85, z, { rz: Math.PI / 2 });
    k.add(G.cyl(0.3, 0.3, 0.05, 14), M.charcoal(), 1.82, Y - 0.85, z, { rz: Math.PI / 2, cast: false });
  }
  k.add(G.box(2, 2.4, 0.16), livery, -4.7, Y + 1.5, 0, { rz: -0.35 });
  k.add(G.box(1.4, 0.14, 4.6), body, -4.9, Y + 0.45, 0);
  // Landing gear.
  for (const [x, z] of [[3.9, 0], [-0.3, -1.1], [-0.3, 1.1]] as [number, number][]) {
    k.add(G.cyl(0.07, 0.07, 0.9, 6), M.steel(), x, 0.75, z);
    k.add(G.cyl(0.3, 0.3, 0.26, 12), M.black(), x, 0.3, z, { rx: Math.PI / 2 });
  }
}
