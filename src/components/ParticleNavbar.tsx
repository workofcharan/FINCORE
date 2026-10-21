// @ts-nocheck
"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useId,
} from "react";

// CSS Stylesheet
const PN_STYLES = `
.pn { position: relative; box-sizing: border-box; display: block; isolation: isolate; -webkit-tap-highlight-color: transparent; color: var(--pn-text); line-height: 1.2; }
.pn *, .pn *::before, .pn *::after { box-sizing: border-box; }
.pn-surface { position: absolute; inset: 0; border-radius: var(--pn-sr); background: var(--pn-fill); box-shadow: var(--pn-shadow); pointer-events: none; -webkit-backdrop-filter: var(--pn-bf); backdrop-filter: var(--pn-bf); }
.pn-canvas { position: absolute; left: -44px; top: -44px; width: calc(100% + 88px); height: calc(100% + 88px); pointer-events: none; display: block; }
.pn-bar { position: relative; display: grid; grid-template-columns: minmax(max-content, 1fr) auto minmax(max-content, 1fr); align-items: center; column-gap: var(--pn-gap); padding: var(--pn-pad); min-width: 0; }
.pn.is-right .pn-bar { display: flex; align-items: center; }
.pn.is-right .pn-links { margin-left: auto; }
.pn-logo { justify-self: start; display: inline-flex; align-items: center; gap: 10px; padding: 6px 10px; border-radius: 999px; color: var(--pn-logo); font-weight: 700; font-size: 15px; white-space: nowrap; text-decoration: none; user-select: none; -webkit-user-select: none; outline: none; }
a.pn-logo[href] { cursor: pointer; }
.pn-mark { position: relative; display: block; width: 20px; height: 20px; flex: none; }
.pn-logo img { display: block; height: 22px; width: auto; max-width: 160px; object-fit: contain; }
.pn-links { justify-self: center; display: flex; align-items: center; gap: 6px; }
.pn-link { position: relative; display: inline-flex; align-items: center; justify-content: center; padding: 6px 14px; border-radius: 999px; color: var(--pn-text); font-size: 13.5px; font-weight: 500; text-decoration: none; white-space: nowrap; transition: all .25s cubic-bezier(.2,.8,.2,1); user-select: none; -webkit-user-select: none; outline: none; cursor: pointer; }
a.pn-link[href] { cursor: pointer; }
.pn-link:hover, .pn-link.is-hot { color: #FFFFFF; }
.pn-link.is-active { color: #080B14 !important; background: #FFFFFF !important; font-weight: 700 !important; box-shadow: 0 0 16px rgba(255, 255, 255, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35); }
.pn-cta { justify-self: end; position: relative; z-index: 0; display: inline-flex; align-items: center; justify-content: center; padding: 8px 18px; border-radius: 999px; color: var(--pn-cta-text); font-size: 13.5px; font-weight: 600; white-space: nowrap; text-decoration: none; user-select: none; -webkit-user-select: none; outline: none; cursor: pointer; }
a.pn-cta[href] { cursor: pointer; }
.pn-cta-bg { position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--pn-cta-fill); transition: transform .5s cubic-bezier(.2,.8,.2,1), background .5s ease, box-shadow .5s ease; }
.pn-cta-label { position: relative; }
.pn-cta.is-hot .pn-cta-bg { transform: scale(1.03); }
.pn-cta.is-particles .pn-cta-bg { background: var(--pn-cta-soft); box-shadow: inset 0 1px 0 var(--pn-cta-rim), 0 0 22px -10px var(--pn-cta-glow); }
.pn-cta.is-particles.is-hot .pn-cta-bg { background: var(--pn-cta-soft-hot); box-shadow: inset 0 1px 0 var(--pn-cta-rim), 0 0 30px -8px var(--pn-cta-glow-hot); }
.pn-menu { display: none; align-items: center; justify-content: center; width: 36px; height: 36px; margin: -4px -4px -4px auto; padding: 0; border: 0; background: transparent; border-radius: 999px; color: var(--pn-logo); cursor: pointer; outline: none; -webkit-appearance: none; appearance: none; }
.pn-menu-box { position: relative; display: block; width: 20px; height: 20px; }
.pn.is-mobile .pn-bar { display: flex; align-items: center; justify-content: space-between; }
.pn.is-mobile .pn-bar > .pn-links, .pn.is-mobile .pn-bar > .pn-cta { display: none !important; }
.pn.is-mobile .pn-menu { display: inline-flex !important; }
.pn-panel { position: relative; height: 0; overflow: hidden; }
.pn-panel-inner { display: flex; flex-direction: column; align-items: stretch; gap: 4px; padding: 6px var(--pn-pad-r) var(--pn-pad-r) var(--pn-pad-l); }
.pn-plink { position: relative; display: inline-flex; align-items: center; padding: 10px 14px; border-radius: 8px; color: var(--pn-text); font-size: 16px; letter-spacing: -0.01em; text-decoration: none; white-space: nowrap; transition: all .25s ease; user-select: none; outline: none; cursor: pointer; }
a.pn-plink[href] { cursor: pointer; }
.pn-plink:hover, .pn-plink.is-hot { color: #FFFFFF; background: rgba(255, 255, 255, 0.06); }
.pn-plink.is-active { color: #FFFFFF !important; background: rgba(255, 255, 255, 0.16) !important; font-weight: 700 !important; border-left: 3px solid #60A5FA; }
.pn-panel .pn-cta { align-self: stretch; margin-top: 12px; padding: 12px 20px; }
.pn-link:focus-visible, .pn-plink:focus-visible, .pn-logo:focus-visible, .pn-cta:focus-visible, .pn-menu:focus-visible { box-shadow: 0 0 0 2px var(--pn-focus); }
@media (max-width: 768px) {
  .pn:not(.pn-ready):not(.is-desktop) .pn-bar > .pn-links,
  .pn:not(.pn-ready):not(.is-desktop) .pn-bar > .pn-cta { display: none !important; }
  .pn:not(.pn-ready):not(.is-desktop) .pn-menu { display: inline-flex !important; }
  .pn:not(.pn-ready):not(.is-desktop) .pn-bar { display: flex; justify-content: space-between; }
}
`;

// Utility and Math functions
function P(obj: any, key: string, val: any) {
  obj[key] = val;
  return obj;
}

function I(val: number, min = 0, max = 1) {
  return val < min ? min : val > max ? max : val;
}

function L(min: number, max: number, val: number) {
  const r = I((val - min) / (max - min));
  return r * r * (3 - 2 * r);
}

function ae(str: any) {
  return typeof str === "string" && str.trim().length > 0;
}

function R(val: any, def: number): number {
  if (typeof val === "number") return val;
  if (!val) return def;
  const n = parseFloat(String(val));
  return isNaN(n) ? def : n;
}

function oe(val: any): [number, number, number, number] {
  const parts = String(val || "")
    .trim()
    .split(/\s+/)
    .map((e) => parseFloat(e))
    .map((e) => (isNaN(e) ? 0 : e));
  if (parts.length === 0) return [0, 0, 0, 0];
  if (parts.length === 1) return [parts[0], parts[0], parts[0], parts[0]];
  if (parts.length === 2) return [parts[0], parts[1], parts[0], parts[1]];
  if (parts.length === 3) return [parts[0], parts[1], parts[2], parts[1]];
  return [parts[0], parts[1], parts[2], parts[3]];
}

function z(color: any, def: [number, number, number, number]): [number, number, number, number] {
  if (!color) return def;
  let str = String(color).trim();
  if (str.startsWith("var(")) {
    const comma = str.indexOf(",");
    if (comma < 0) return def;
    str = str.slice(comma + 1, str.lastIndexOf(")")).trim();
    return z(str, def);
  }
  if (str[0] === "#") {
    let hex = str.slice(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex.split("").map((c) => c + c).join("");
    }
    const num = parseInt(hex.slice(0, 6), 16);
    if (isNaN(num)) return def;
    const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, a];
  }
  const match = str.match(/rgba?\(([^)]+)\)/i);
  if (match) {
    const parts = match[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map((p) => (p.endsWith("%") ? (parseFloat(p) / 100) * 255 : parseFloat(p)));
    if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      return [parts[0], parts[1], parts[2], parts.length >= 4 && !isNaN(parts[3]) ? parts[3] : 1];
    }
  }
  return def;
}

function se(c: [number, number, number, number]) {
  return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
}

function B(c: [number, number, number, number], a: number) {
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${Math.max(0, Math.min(1, a)).toFixed(3)})`;
}

function V(seed: number) {
  let t = seed | 0;
  return function () {
    t = (t + 1831565813) | 0;
    let e = Math.imul(t ^ (t >>> 15), 1 | t);
    e = (e + Math.imul(e ^ (e >>> 7), 61 | e)) ^ e;
    return ((e ^ (e >>> 14)) >>> 0) / 4294967296;
  };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(query.matches);
    handler();
    query.addEventListener ? query.addEventListener("change", handler) : query.addListener(handler);
    return () => {
      query.removeEventListener ? query.removeEventListener("change", handler) : query.removeListener(handler);
    };
  }, []);
  return reduced;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function U(s: any) {
  return Math.max(0, Math.min(s.r, s.w / 2, s.h / 2));
}

function le(s: any) {
  const r = U(s);
  return 2 * (s.w - 2 * r) + 2 * (s.h - 2 * r) + q * r;
}

function W(s: any, inset: number) {
  return {
    x: s.x + inset,
    y: s.y + inset,
    w: Math.max(0, s.w - 2 * inset),
    h: Math.max(0, s.h - 2 * inset),
    r: Math.max(0, s.r - inset),
  };
}

function ue(t: number, shape: any, pt: any) {
  const r = U(shape);
  const w = Math.max(0, shape.w - 2 * r);
  const h = Math.max(0, shape.h - 2 * r);
  const arc = (Math.PI * r) / 2;
  const peri = 2 * w + 2 * h + 4 * arc;
  if (peri <= 0) {
    pt.x = shape.x;
    pt.y = shape.y;
    pt.nx = 0;
    pt.ny = -1;
    return;
  }
  let dist = (((t % 1) + 1) % 1) * peri;
  const segs = [w, arc, h, arc, w, arc, h, arc];
  for (let i = 0; i < 8; i++) {
    if (dist <= segs[i] || i === 7) {
      const len = segs[i];
      fe(i, i === 2 ? dist : i === 6 ? len - dist : len > 0 ? dist / len : 0, shape, pt, 1);
      return;
    }
    dist -= segs[i];
  }
}

function de(dist: number, shape: any) {
  const r = U(shape);
  const w = Math.max(0, shape.w - 2 * r);
  const h = Math.max(0, shape.h - 2 * r);
  const arc = (Math.PI * r) / 2;
  const segs = [w, arc, h, arc, w, arc, h, arc];
  for (let i = 0; i < 8; i++) {
    if (dist <= segs[i] || i === 7) {
      const len = segs[i];
      return i === 2 ? [2, Math.min(dist, len)] : i === 6 ? [6, Math.max(0, len - dist)] : [i, len > 0 ? I(dist / len) : 0];
    }
    dist -= segs[i];
  }
  return [0, 0];
}

function fe(seg: number, t: number, shape: any, pt: any, scale: number) {
  const r = U(shape);
  const w = Math.max(0, shape.w - 2 * r);
  const h = Math.max(0, shape.h - 2 * r);
  let angle = 0;
  let cx = 0;
  let cy = 0;
  switch (seg) {
    case 0:
      pt.x = shape.x + r + t * w;
      pt.y = shape.y;
      pt.nx = 0;
      pt.ny = -1;
      return 1;
    case 2:
      pt.x = shape.x + shape.w;
      pt.y = shape.y + r + Math.min(t, h);
      pt.nx = 1;
      pt.ny = 0;
      return I((h - t) / 5 + scale);
    case 4:
      pt.x = shape.x + shape.w - r - t * w;
      pt.y = shape.y + shape.h;
      pt.nx = 0;
      pt.ny = 1;
      return 1;
    case 6:
      pt.x = shape.x;
      pt.y = shape.y + r + Math.min(t, h);
      pt.nx = -1;
      pt.ny = 0;
      return I((h - t) / 5 + scale);
    case 1:
      angle = -Math.PI / 2 + (t * Math.PI) / 2;
      cx = shape.x + shape.w - r;
      cy = shape.y + r;
      break;
    case 3:
      angle = (t * Math.PI) / 2;
      cx = shape.x + shape.w - r;
      cy = shape.y + shape.h - r;
      break;
    case 5:
      angle = Math.PI / 2 + (t * Math.PI) / 2;
      cx = shape.x + r;
      cy = shape.y + shape.h - r;
      break;
    default:
      angle = Math.PI + (t * Math.PI) / 2;
      cx = shape.x + r;
      cy = shape.y + r;
  }
  pt.nx = Math.cos(angle);
  pt.ny = Math.sin(angle);
  pt.x = cx + pt.nx * r;
  pt.y = cy + pt.ny * r;
  return 1;
}

function pe(x: number, y: number, shape: any) {
  const r = U(shape);
  const dx = Math.abs(x - (shape.x + shape.w / 2)) - (shape.w / 2 - r);
  const dy = Math.abs(y - (shape.y + shape.h / 2)) - (shape.h / 2 - r);
  const mx = Math.max(dx, 0);
  const my = Math.max(dy, 0);
  return Math.sqrt(mx * mx + my * my) + Math.min(Math.max(dx, dy), 0) - r;
}

function G(u: number, v: number, shape: any, pt: any) {
  const r = U(shape);
  const y = shape.y + v * shape.h;
  const dy = Math.abs(y - (shape.y + shape.h / 2)) - (shape.h / 2 - r);
  const halfSpan = shape.w / 2 - r + (dy > 0 ? Math.sqrt(Math.max(0, r * r - dy * dy)) : r);
  pt.x = shape.x + shape.w / 2 + (u * 2 - 1) * halfSpan;
  pt.y = y;
}

function me(u: number, dist: number, shape: any, pt: any, scale: number) {
  G(u, shape.h > 0 ? Math.min(dist, shape.h) / shape.h : 0, shape, pt);
  return I((shape.h - dist) / 6 + scale);
}

function he(type: number, t: number, pt: any) {
  const frac = (((t % 1) + 1) % 1);
  if (type === 0) {
    const a = -Math.PI / 2 + frac * q;
    pt.x = Math.cos(a) * 0.92;
    pt.y = Math.sin(a) * 0.92;
    return;
  }
  let pts: [number, number][];
  if (type === 1) {
    const s = 0.78;
    pts = [[0, -s], [s, -s], [s, s], [-s, s], [-s, -s]];
  } else if (type === 2) {
    pts = [0, 1, 2].map((i) => {
      const a = -Math.PI / 2 + (i * q) / 3;
      return [Math.cos(a) * 0.98, Math.sin(a) * 0.98 + 0.12];
    });
  } else {
    pts = [];
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * q) / 10;
      const rad = i % 2 ? 0.44 : 0.98;
      pts.push([Math.cos(a) * rad, Math.sin(a) * rad + 0.04]);
    }
  }
  const closed = pts.concat([pts[0]]);
  let total = 0;
  const lens: number[] = [];
  for (let i = 0; i < closed.length - 1; i++) {
    const l = Math.hypot(closed[i + 1][0] - closed[i][0], closed[i + 1][1] - closed[i][1]);
    lens.push(l);
    total += l;
  }
  let dist = frac * total;
  for (let i = 0; i < lens.length; i++) {
    if (dist <= lens[i] || i === lens.length - 1) {
      const segT = lens[i] > 0 ? dist / lens[i] : 0;
      pt.x = closed[i][0] + (closed[i + 1][0] - closed[i][0]) * segT;
      pt.y = closed[i][1] + (closed[i + 1][1] - closed[i][1]) * segT;
      return;
    }
    dist -= lens[i];
  }
}

function ge(mark: string, idx: number, total: number, t: number, en: number, pt: any) {
  pt.z = 1;
  pt.a = 1;
  if (mark === "Orb") {
    const p = (idx + 0.5) / total;
    const phi = Math.acos(1 - 2 * p);
    const theta = Math.PI * (1 + Math.sqrt(5)) * idx;
    const scale = 0.94 + en * (0.1 + 0.06 * Math.sin(t * 2.4 + idx * 1.7));
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    const cosT = Math.cos(t);
    const sinT = Math.sin(t);
    const rotX = x * cosT + z * sinT;
    const rotZ = -x * sinT + z * cosT;
    pt.x = rotX * scale;
    pt.y = (y * 0.913 - rotZ * 0.408) * scale;
    pt.z = y * 0.408 + rotZ * 0.913;
    return;
  }
  if (mark === "Ring") {
    if (idx >= total - 14) {
      const e = idx - (total - 14);
      const o = (e + 0.5) / 14;
      const s = Math.acos(1 - 2 * o);
      const c = Math.PI * (1 + Math.sqrt(5)) * e + t * 0.6;
      const l = 0.32 + 0.06 * en;
      pt.x = Math.sin(s) * Math.cos(c) * l;
      pt.y = Math.cos(s) * l;
      pt.z = Math.sin(s) * Math.sin(c);
      pt.a = 0.75;
      return;
    }
    const e = (idx / (total - 14)) * q + t * 0.45;
    const o = Math.cos(e);
    const s = Math.sin(e);
    const c = 0.42 + 0.3 * en;
    const l = -s * 0.408;
    pt.x = o * (0.92 + 0.08 * Math.sin(t * 2 + idx));
    pt.y = s * 0.913;
    pt.z = l;
    return;
  }
  if (mark === "Atom") {
    if (idx >= total - 10) {
      const e = idx - (total - 10);
      const n = (e + 0.5) / 10;
      const r = Math.acos(1 - 2 * n);
      const i = Math.PI * (1 + Math.sqrt(5)) * e + t * 0.5;
      const a = 0.28 + 0.05 * en;
      pt.x = Math.sin(r) * Math.cos(i) * a;
      pt.y = Math.cos(r) * a;
      pt.z = Math.sin(r) * Math.sin(i);
      pt.a = 0.7;
      return;
    }
    const e = (total - 10) / 3;
    const r = Math.floor(idx / e);
    const i = (idx % e) / e;
    const a = i * q + t * (1.1 + 0.3 * r);
    const o = Math.cos(a) * 0.96;
    const s = Math.sin(a) * 0.34;
    const c = (r * Math.PI) / 3 + t * 0.2;
    const l = Math.cos(c);
    const u = Math.sin(c);
    pt.x = o * l - s * u;
    pt.y = o * u + s * l;
    pt.z = Math.sin(a);
    return;
  }
  if (mark === "Spiral") {
    const e = idx / total;
    const n = e * q * 2.2 + t * 1.2;
    const r = (0.2 + 0.78 * Math.pow(e, 0.7)) * (0.95 + 0.08 * en);
    const i = -0.55 + 1.1 * e;
    pt.x = Math.cos(n) * r;
    pt.y = i * 0.85 + Math.sin(n) * r * 0.25;
    pt.z = Math.sin(n);
    return;
  }
  if (mark === "Pulse") {
    const e = idx / total;
    const n = e * q + t * 0.7;
    const r = 0.82 + 0.16 * Math.sin(e * q * 3 - t * 2.6) + 0.08 * en;
    pt.x = Math.cos(n) * r;
    pt.y = Math.sin(n) * r;
    pt.z = Math.sin(n * 2);
    return;
  }
  if (mark === "Helix") {
    const e = idx / total;
    const n = e * q * 2 + t * 1.4;
    const r = idx % 2 === 0 ? 1 : -1;
    const i = 0.65 + 0.1 * en;
    pt.x = Math.cos(n) * i * r;
    pt.y = -0.85 + 1.7 * e;
    pt.z = Math.sin(n) * r;
    return;
  }
  if (mark === "Cube") {
    const vert = Me[idx % Me.length];
    const cosT = Math.cos(t * 0.7);
    const sinT = Math.sin(t * 0.7);
    const x = vert[0] * 0.55;
    const y = vert[1] * 0.55;
    const z = vert[2] * 0.55;
    const rx = x * cosT + z * sinT;
    const rz = -x * sinT + z * cosT;
    pt.x = rx;
    pt.y = y * 0.86 - rz * 0.35;
    pt.z = y * 0.35 + rz * 0.86;
    return;
  }
  // Morph or default
  he(idx % 4, idx / total + t * 0.1, pt);
}

function _e(opts: any, isMobile: boolean) {
  const pad = oe(opts.padding);
  const rad = R(opts.radius, 999);
  const innerR = Math.max(6, rad - pad[0]);
  const hoverRgb = z(opts.particles.hoverColor, [255, 255, 255, 1]);
  const a = hoverRgb[3];
  const blur = Math.max(0, opts.surface.blur || 0);
  return {
    "--pn-fill": opts.surface.fill,
    "--pn-bf": blur > 0 ? `blur(${blur}px) saturate(1.4)` : "none",
    "--pn-shadow": opts.surface.shadow || "none",
    "--pn-r": opts.radius,
    "--pn-sr": isMobile ? `${Math.min(rad, 26)}px` : opts.radius,
    "--pn-ir": `${innerR}px`,
    "--pn-pad": opts.padding,
    "--pn-pad-l": `${pad[3]}px`,
    "--pn-pad-r": `${Math.max(pad[1], 12)}px`,
    "--pn-gap": `${R(opts.gap, 30)}px`,
    "--pn-text": opts.textColor,
    "--pn-hover": opts.hoverTextColor,
    "--pn-logo": opts.hoverTextColor,
    "--pn-cta-fill": opts.button.fill,
    "--pn-cta-text": opts.button.variant === "Solid" ? opts.button.text : opts.hoverTextColor,
    "--pn-cta-soft": `linear-gradient(180deg, ${B(hoverRgb, 0.11 * a)}, ${B(hoverRgb, 0.04 * a)})`,
    "--pn-cta-soft-hot": `linear-gradient(180deg, ${B(hoverRgb, 0.17 * a)}, ${B(hoverRgb, 0.07 * a)})`,
    "--pn-cta-rim": B(hoverRgb, 0.14 * a),
    "--pn-cta-glow": B(hoverRgb, 0.28 * a),
    "--pn-cta-glow-hot": B(hoverRgb, 0.45 * a),
    "--pn-focus": opts.focusRing || "#8AB4FF",
  } as React.CSSProperties;
}

function ve(link: string, newTab: boolean) {
  return ae(link) ? { href: link, target: newTab ? "_blank" : undefined, rel: newTab ? "noopener noreferrer" : undefined } : {};
}

function useIsMobile(ref: any, layout: string, breakpoint: number, align: string, depsKey: string) {
  const [mobile, setMobile] = useState(false);

  useIsomorphicLayoutEffect(() => {
    if (layout === "Mobile") {
      setMobile(true);
      return;
    }
    if (layout === "Desktop") {
      setMobile(false);
      return;
    }

    const check = () => {
      if (typeof window === "undefined") return;
      setMobile(window.innerWidth < breakpoint);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [layout, breakpoint]);

  return mobile;
}

// Particle Engine Constants
const q = Math.PI * 2;
const je: Record<string, number> = {
  Orb: 64,
  Ring: 60,
  Atom: 52,
  Spiral: 60,
  Pulse: 60,
  Helix: 44,
  Cube: 44,
  Morph: 48,
  None: 0,
};

const Me = (() => {
  const pts: [number, number, number][] = [];
  for (let t = 0; t < 8; t++) {
    pts.push([t & 1 ? 1 : -1, t & 2 ? 1 : -1, t & 4 ? 1 : -1]);
  }
  const full = pts.slice();
  for (let n = 0; n < 8; n++) {
    for (let r = n + 1; r < 8; r++) {
      if (Math.abs(pts[n][0] - pts[r][0]) + Math.abs(pts[n][1] - pts[r][1]) + Math.abs(pts[n][2] - pts[r][2]) === 2) {
        for (let i = 1; i <= 3; i++) {
          const a = i / 4;
          full.push([
            pts[n][0] + (pts[r][0] - pts[n][0]) * a,
            pts[n][1] + (pts[r][1] - pts[n][1]) * a,
            pts[n][2] + (pts[r][2] - pts[n][2]) * a,
          ]);
        }
      }
    }
  }
  return full;
})();

const Pe = 0;
const Y = 1;
const X = 2;
const Z = 3;
const Q = 4;
const Fe = 5;
const $ = 14;

// The complete Particle Canvas Engine Class
const a: any = typeof window !== "undefined" ? window : globalThis;

const Ie: any = class{now(){return performance.now()/1e3}destroy(){this.destroyed=!0,this.stop(),a.clearTimeout(this.releaseTimer),this.root.removeEventListener(`pointermove`,this.onMove),this.root.removeEventListener(`pointerleave`,this.onLeave),this.root.removeEventListener(`pointerdown`,this.onDown),this.root.removeEventListener(`focusin`,this.onFocusIn),this.root.removeEventListener(`focusout`,this.onFocusOut),document.removeEventListener(`visibilitychange`,this.onVisibility),this.ro&&this.ro.disconnect(),this.io&&this.io.disconnect();for(let e of this.linkEls)e.classList.remove(`is-hot`);this.ctaHotEl&&this.ctaHotEl.classList.remove(`is-hot`),this.resetFx()}setOptions(e){let t=this.o;this.o=e,(t.color!==e.color||t.hoverColor!==e.hoverColor)&&this.palette(),e.reduced&&this.entering&&(this.entering=!1),(!e.assemble||e.reduced)&&(this.waiting=!1),t.mobile!==e.mobile&&this.setHover(-1),this.collect(),this.measure(!1),this.flushDraw(),this.wake()}refresh(){this.collect(),this.measure(!1),this.flushDraw(),this.wake()}setMenuOpen(e){e!==this.menuOpen&&(this.menuOpen=e,e||this.setHover(-1),this.fitCanvas(),this.flushDraw(),this.wake())}palette(){this.base=z(this.o.color,[255,255,255,1]),this.hot=z(this.o.hoverColor,this.base),this.sameColor=Math.abs(this.base[0]-this.hot[0])+Math.abs(this.base[1]-this.hot[1])+Math.abs(this.base[2]-this.hot[2])<6&&Math.abs(this.base[3]-this.hot[3])<.02,this.glowMode=se(this.base)>.45,this.fills=[];for(let e=0;e<2;e++){let t=e?this.hot:this.base;for(let e=0;e<$;e++)this.fills.push(B(t,(e+.5)/$*t[3]))}if(this.sprite=null,this.passive){this.glowMode&&(this.sprite={});return}if(typeof document<`u`&&this.glowMode){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`);if(t){let n=t.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,B(this.hot,1)),n.addColorStop(.35,B(this.hot,.35)),n.addColorStop(1,B(this.hot,0)),t.fillStyle=n,t.fillRect(0,0,64,64),this.sprite=e}}}collect(){let e=this.root,t=this.o.mobile;this.linkEls.forEach(e=>e.classList.remove(`is-hot`)),this.linkEls=Array.from(e.querySelectorAll(t?`.pn-panel .pn-plink`:`.pn-bar .pn-link`)),this.hover>=0&&this.linkEls[this.hover]&&this.linkEls[this.hover].classList.add(`is-hot`);let n=e.querySelector(t?`.pn-panel .pn-cta`:`.pn-bar .pn-cta`);n!==this.ctaEl&&(this.resetFx(),this.ctaEl=n,this.ctaFx=n?Array.from(n.querySelectorAll(`.pn-cta-bg, .pn-cta-label`)):[]),this.markEl=e.querySelector(`.pn-mark`),this.iconEl=t?e.querySelector(`.pn-menu-box`):null}resetFx(){for(let e of this.ctaFx)e.style.opacity=``;this.lastFxOp=1}measure(e){let t=this.root,n=t.offsetWidth,r=t.offsetHeight,i=t.getBoundingClientRect();this.scale=n>0&&i.width>0?i.width/n:1;let o=t.querySelector(`.pn-bar`);this.barH=o?o.offsetHeight:r;let s=t.querySelector(`.pn-panel-inner`);if(this.capH=this.o.mobile&&s?this.barH+s.offsetHeight:Math.max(r,this.barH),o){let e=parseFloat(getComputedStyle(o).paddingTop)||0;this.innerR=Math.max(6,this.o.radius-e)}this.w=n,this.h=r,this.computeRects(i);let c=a!==void 0&&a.devicePixelRatio||1;this.ratio=Math.min(3,Math.max(1,c*this.scale)),this.fitCanvas(),this.updateShape();let l=this.o,u=[Math.round(n),Math.round(this.capH),Math.round(this.barH),this.cta?Math.round(this.cta.w)+`x`+Math.round(this.cta.h):`-`,+!!this.markRect,+!!this.icon,l.density,l.size,l.variant,l.hasButton,l.mark,l.mobile,l.radius].join(`|`);(e||u!==this.buildKey)&&(this.buildKey=u,this.build()),this.homesDirty=!0}fitCanvas(){let e=this.o.mobile&&(this.menuOpen||this.openT>.002||this.h>this.barH+.5)?Math.max(this.h,this.capH):this.h,t=Math.round(e+this.M*2);t!==this.cssH&&(this.cssH=t,this.canvas.style.height=t+`px`);let n=Math.max(1,Math.round((this.w+this.M*2)*this.ratio)),r=Math.max(1,Math.round(t*this.ratio));(this.canvas.width!==n||this.canvas.height!==r)&&(this.canvas.width=n,this.canvas.height=r,this.pendingDraw=!0)}flushDraw(){this.pendingDraw&&(this.pendingDraw=!1,this.homesDirty&&this.computeHomes(),this.draw(this.now()))}computeRects(e){let t=e||this.root.getBoundingClientRect(),n=this.scale||1,r=e=>{if(!e.offsetParent&&getComputedStyle(e).position!==`fixed`)return null;let r=e.getBoundingClientRect();return r.width===0&&r.height===0?null:{x:(r.left-t.left)/n,y:(r.top-t.top)/n,w:r.width/n,h:r.height/n,r:r.height/n/2}};if(this.linkRects=this.linkEls.map(e=>{let t=r(e);return t&&(t.r=Math.min(t.h/2,this.innerR)),t}),this.cta=this.ctaEl?r(this.ctaEl):null,this.cta&&this.ctaEl){let e=parseFloat(getComputedStyle(this.ctaEl).borderTopLeftRadius);this.cta.r=Math.min(this.cta.h/2,isNaN(e)?this.cta.h/2:e)}if(this.markRect=this.markEl?r(this.markEl):null,this.icon=this.iconEl?r(this.iconEl):null,this.hover>=0){let e=this.linkRects[this.hover];e&&(this.hoverRect=e)}}shapeAt(e,t){let n=t===void 0?this.barH+(this.capH-this.barH)*e:t,r=Math.min(this.o.radius,this.barH/2),i=Math.min(this.o.radius,26),a=Math.min(r+(i-r)*e,n/2,this.w/2);return{x:0,y:0,w:this.w,h:n,r:a}}updateShape(){let e=this.capH-this.barH,t=this.o.mobile&&e>1?I((this.h-this.barH)/e):0;this.shape=this.shapeAt(t,this.h)}build(){let e=this.o,t=I(e.density,.2,3),n=this.w<520?.82:1,r=this.o.mobile?this.shapeAt(1):this.shapeAt(0,Math.max(this.h,this.barH));this.capShape=r;let i=Math.max(le(r),1),a=W(r,3.4),o=Math.max(a.w*a.h,1);this.edgeSpacing=1.3/(t*n),this.fillArea=70/(t*n);let s=Math.round(i/this.edgeSpacing),c=Math.round(o/this.fillArea),l=0;if(e.hasButton&&this.cta){let n=le(this.cta),r=this.cta.w*this.cta.h;l=e.variant===`Particles`?Math.round(n/1.05*t+r/40*t):Math.round(n/2.1*t)}let u=this.markRect&&je[e.mark]||0,d=e.mobile&&this.icon?40:0,f=e.hasButton&&this.cta&&e.variant===`Solid`?Math.round(this.cta.w*this.cta.h/11*I(t,.4,1.5)):0,p=7e3,m=s+c+l+u+d+f;if(m>p){let e=p/m;s=Math.round(s*e),c=Math.round(c*e),l=Math.round(l*e),f=Math.round(f*e)}let h=s+c+l+u+d+f;this.n=h;let g=()=>new Float32Array(h);this.x=g(),this.y=g(),this.vx=g(),this.vy=g(),this.hx=g(),this.hy=g(),this.p1=g(),this.p2=g(),this.sz=g(),this.al=g(),this.ph=g(),this.tw=g(),this.rk=g(),this.ed=g(),this.bo=g(),this.ma=g(),this.td=g(),this.lf=g(),this.vz=g(),this.gt=g(),this.gb=g(),this.dl=g(),this.rl=g(),this.sb=g(),this.sa=g(),this.hd=g(),this.mt=g(),this.st=new Uint8Array(h),this.ls=new Int32Array(h),this.da=g(),this.ht=g(),this.alphaInit=!1,this.kind=new Uint8Array(h),this.seg=new Uint8Array(h),this.flag=new Uint8Array(h),this.gm=new Uint8Array(h),this.gathered=[];let _=0,v=I(e.size,.4,4),y=Math.random,b=e=>{this.ph[e]=y()*q,this.tw[e]=1.1+y()*2.4,this.rk[e]=.72+y()*.56,this.lf[e]=1,this.vz[e]=1,this.ma[e]=1};this.rEdge=[_,_+s];for(let e=0;e<s;e++,_++){this.kind[_]=Pe;let[e,t]=de(y()*i,r);this.seg[_]=e,this.p1[_]=t,this.p2[_]=-(y()**2.2)*1.15+.22,this.sz[_]=v*(.7+y()*.5),this.al[_]=.4+y()*.34,b(_)}this.rFill=[_,_+c];for(let e=0;e<c;e++,_++){this.kind[_]=Y,this.p1[_]=y(),this.p2[_]=y()*a.h;let e=y()<.03;this.sz[_]=v*(e?1.05+y()*.4:.55+y()*.6),this.al[_]=e?.55+y()*.3:.09+y()*y()*.3,b(_)}if(this.rCta=[_,_+l],l){let n=this.cta?le(this.cta):1,r=e.variant===`Particles`?Math.min(.9,n/1.05*t/Math.max(1,l)):1;for(let t=0;t<l;t++,_++){this.kind[_]=X;let t=e.variant===`Solid`||y()<r;if(this.gm[_]=+!t,this.p1[_]=y(),t)this.p2[_]=e.variant===`Solid`?y()*1.6:-(y()**2)*1+.25;else{let e=y()**2.2*.42;this.p2[_]=y()<.5?e:1-e}this.sz[_]=v*(t?.72+y()*.45:.55+y()*.5),this.al[_]=.62+y()*.38,b(_)}}this.rMark=[_,_+u];for(let e=0;e<u;e++,_++)this.kind[_]=Z,this.sz[_]=v*(.82+y()*.3),this.al[_]=.88+y()*.12,b(_);this.rIcon=[_,_+d];for(let e=0;e<d;e++,_++)this.kind[_]=Q,this.gm[_]=e%2,this.p1[_]=(Math.floor(e/2)+.5)/(d/2),this.sz[_]=v*(.95+y()*.3),this.al[_]=.85+y()*.15,b(_);this.rDust=[_,_+f];for(let e=0;e<f;e++,_++)this.kind[_]=Fe,this.p1[_]=y(),this.p2[_]=y(),this.sz[_]=v*(.6+y()*.7),this.al[_]=.6+y()*.4,b(_);this.updateShape(),this.computeHomes(!1);for(let e=0;e<h;e++){let t=this.kind[e],n=this.hx[e],r=this.hy[e];if(t===X||t===Fe){let i=this.cta;n=i?i.x+i.w*(.1+.8*this.p1[e]):0,r=i?i.y+i.h*(.2+.6*(t===Fe?this.p2[e]:.5)):0}else if(t===Z){let e=this.markRect;n=e?e.x+e.w/2:0,r=e?e.y+e.h/2:0}else if(t===Q){let e=this.icon;n=e?e.x+e.w/2:0,r=e?e.y+e.h/2:0}this.x[e]=n,this.y[e]=r}if(this.entering&&this.scatter(this.now()-this.entranceT),this.hover>=0){let e=this.hover;this.hover=-1,this.setHover(e)}}computeHomes(e=!0){let t=this.shape,n=this.capShape,r=this.tmp,i=I(1-(Math.max(0,n.h-2*U(n))-Math.max(0,t.h-2*U(t)))/10),a=I(1-(n.h-t.h)/12),[o,s]=this.rEdge;for(let n=o;n<s;n++){let a=fe(this.seg[n],this.p1[n],t,r,i),o=this.p2[n],s=r.x+r.nx*o,c=r.y+r.ny*o;e&&(this.x[n]+=s-this.hx[n],this.y[n]+=c-this.hy[n]),this.hx[n]=s,this.hy[n]=c,this.vz[n]=a,this.lf[n]=.82-.3*r.ny}let c=W(t,3.4),[l,u]=this.rFill;for(let n=l;n<u;n++){this.vz[n]=me(this.p1[n],this.p2[n],c,r,a),e&&this.flag[n]!==1&&(this.x[n]+=r.x-this.hx[n],this.y[n]+=r.y-this.hy[n]),this.hx[n]=r.x,this.hy[n]=r.y;let i=1-L(0,1,Math.min(r.y-t.y,t.y+t.h-r.y)/22);this.lf[n]=(.42+.58*i)*(1.08-.16*I((r.y-t.y)/Math.max(1,t.h)))}this.homesDirty=!1}local(e){let t=this.root.getBoundingClientRect(),n=this.scale||1;return{x:(e.clientX-t.left)/n,y:(e.clientY-t.top)/n}}onResize(){this.destroyed||(this.measure(!1),this.flushDraw(),this.wake())}setCtaHover(e){this.ctaHotEl&&this.ctaHotEl!==e&&this.ctaHotEl.classList.remove(`is-hot`),e&&e.classList.add(`is-hot`),this.ctaHotEl=e,this.ctaHover=!!e&&e===this.ctaEl}hoverFromElement(e,t=!1){if(e){let t=this.linkEls.indexOf(e);if(t>=0){a.clearTimeout(this.releaseTimer),this.releaseTimer=0,this.setHover(t);return}}if(t&&this.hover>=0){a.clearTimeout(this.releaseTimer),this.releaseTimer=0;return}this.hover>=0&&!this.releaseTimer&&this.scheduleRelease(140)}scheduleRelease(e){a.clearTimeout(this.releaseTimer),this.releaseTimer=a.setTimeout(()=>{this.releaseTimer=0,this.setHover(-1),this.wake()},e)}setHover(e){if(e===this.hover&&(e<0||this.gathered.length))return;let t=this.hover;t>=0&&this.linkEls[t]&&this.linkEls[t].classList.remove(`is-hot`),this.hover=e;let n=this.now();if(e<0){this.releaseAll(n),this.gathered=[],this.hoverRect=null;return}this.linkEls[e]&&this.linkEls[e].classList.add(`is-hot`),this.computeRects();let r=this.linkRects[e];if(!r)return;if(this.hoverRect=r,this.gathered.length){this.wake();return}let i=this.capA;i.x0=r.x,i.x1=r.x+r.w,i.y0=r.y,i.y1=r.y+r.h,i.v0=i.v1=i.w0=i.w1=0,this.syncCapsule();let a=r.x+r.w/2,o=r.y+r.h/2,[s,c]=this.rFill;this.homesDirty&&this.computeHomes();{let e=0;for(let t=s;t<c;t++)this.vz[t]>.5&&e++;let t=I(this.o.gather,.05,.9),n=Math.round(Math.min(e*t,r.w*r.h*t/5.4)),i=[];for(let e=s;e<c;e++){if(this.vz[e]<=.5)continue;let t=this.x[e]-a,n=this.y[e]-o;i.push({j:e,d:t*t+n*n*4+Math.random()*2200})}i.sort((e,t)=>e.d-t.d),this.gathered=i.slice(0,n).map(e=>e.j)}let l=this.gathered.map(e=>({j:e,a:Math.atan2((this.y[e]-o)/Math.max(1,r.h),(this.x[e]-a)/Math.max(1,r.w))}));l.sort((e,t)=>e.a-t.a);let u=0,d=1e9,f=l.length?l[0].a:0;for(let e=0;e<72;e++){let t=e/72;ue(t,r,this.tmp);let n=Math.atan2((this.tmp.y-o)/r.h,(this.tmp.x-a)/r.w),i=Math.abs(n-f);i>Math.PI&&(i=q-i),i<d&&(d=i,u=t)}let p=l.filter((e,t)=>t%8<5).length||1;this.edgeSlots=p;let m=0,h=I(this.o.speed,.3,3);for(let e=0;e<l.length;e++){let t=l[e].j;e%8<5?(this.gm[t]=0,this.gt[t]=u+m/p,this.gb[t]=(Math.random()-.5)*1.5,m++):(this.gm[t]=1,this.gt[t]=Math.random(),this.gb[t]=Math.random());let r=this.x[t]-a,i=this.y[t]-o,s=Math.sqrt(r*r+i*i),c=this.flag[t]!==0||this.ht[t]>.3;this.dl[t]=this.o.reduced?n:n+(c?Math.random()*.04:s/(1100*h)+Math.random()*.05),this.flag[t]=1,this.st[t]=0,this.rl[t]=0;let d=I(s/220);this.hd[t]=this.sb[t]>.5?n:n+.5+.3*(1-d)+Math.random()*.08}this.wake()}releaseAll(e){let[t,n]=this.rFill,r=this.capRect,i=r.x+r.w/2,a=r.y+r.h/2,o=[];for(let r=t;r<n;r++){if(this.flag[r]!==1)continue;if(this.st[r]=0,e<this.dl[r]){this.flag[r]=0;continue}if(this.o.reduced){this.flag[r]=0,this.x[r]=this.hx[r],this.y[r]=this.hy[r],this.vx[r]=0,this.vy[r]=0,this.sb[r]=0;continue}let t=this.hx[r]-i,n=this.hy[r]-a;this.sb[r]>=.5&&t*t+n*n*4>48400?o.push(r):(this.flag[r]=3,this.dl[r]=e+.04+Math.random()*.1)}if(!o.length)return;let s=[];for(let e=t;e<n;e++)this.flag[e]!==0||this.vz[e]<=.5||s.push({j:e,d:pe(this.hx[e],this.hy[e],r)});s.sort((e,t)=>Math.abs(e.d)-Math.abs(t.d));let c=Math.min(o.length,s.length);for(let t=c;t<o.length;t++)this.flag[o[t]]=3,this.dl[o[t]]=e+.04+Math.random()*.1;if(!c)return;let l=o.slice(0,c).map(e=>({j:e,a:Math.atan2(this.y[e]-a,this.x[e]-i)})),u=s.slice(0,c).map(e=>({j:e.j,a:Math.atan2(this.hy[e.j]-a,this.hx[e.j]-i)}));l.sort((e,t)=>e.a-t.a),u.sort((e,t)=>e.a-t.a);let d=0,f=1/0,p=Math.max(1,Math.floor(c/60));for(let e=0;e<c;e+=p){let t=0;for(let n=0;n<c;n++){let r=l[n].j,i=u[(n+e)%c].j,a=this.x[r]-this.hx[i],o=this.y[r]-this.hy[i];t+=a*a+o*o}t<f&&(f=t,d=e)}for(let t=0;t<c;t++){let n=l[t].j;this.flag[n]=5,this.ls[n]=u[(t+d)%c].j,this.dl[n]=e+.04+Math.random()*.1}}stepCapsule(e){let t=this.hoverRect,n=this.capA;if(!t)return;let r=t.x,i=t.x+t.w,a=t.y,o=t.y+t.h;if(this.o.reduced)n.x0=r,n.x1=i,n.y0=a,n.y1=o,n.v0=n.v1=n.w0=n.w1=0;else{let s=I(this.o.speed,.3,3),c=r+i>n.x0+n.x1,l=Math.abs(r+i-n.x0-n.x1)/2>2.2*Math.max(40,t.w)?.6:1,u=700*s*s*l,d=380*s*s*l,f=(e,t,n,r,i,a)=>{let o=2*Math.sqrt(r)*i;return t+(r*(n-e)-o*t)*a},p=e>1/90?2:1,m=e/p;for(let e=0;e<p;e++)n.v0=f(n.x0,n.v0,r,c?d:u,c?.95:.9,m),n.v1=f(n.x1,n.v1,i,c?u:d,c?.9:.95,m),n.w0=f(n.y0,n.w0,a,700*s*s,.95,m),n.w1=f(n.y1,n.w1,o,700*s*s,.95,m),n.x0+=n.v0*m,n.x1+=n.v1*m,n.y0+=n.w0*m,n.y1+=n.w1*m;let h=Math.max(t.w,8)*1.35;n.x1-n.x0>h&&(c?n.x0=n.x1-h:n.x1=n.x0+h)}this.syncCapsule()}syncCapsule(){let e=this.capA,t=this.hoverRect,n=Math.min(e.x0,e.x1-4),r=Math.max(e.x1,n+4),i=e.y0,a=e.y1;if(t){let e=(r-n)/Math.max(1,t.w);if(e>1){let t=Math.max(.8,1/Math.sqrt(e)),n=(i+a)/2,r=(a-i)/2*t;i=n-r,a=n+r}}n=Math.min(n,r-4);let o=Math.max(4,a-i),s=this.capRect;s.x=n,s.y=i,s.w=r-n,s.h=o,s.r=Math.min(o/2,this.innerR);let c=this.capIn;c.x=s.x+3,c.y=s.y+3,c.w=Math.max(0,s.w-6),c.h=Math.max(0,s.h-6),c.r=Math.max(0,s.r-3),e.moving=Math.abs(e.v0)+Math.abs(e.v1)+Math.abs(e.w0)+Math.abs(e.w1)>2}burst(){if(this.o.reduced||!this.cta)return;let e=this.now();this.burstT=e;let t=this.cta,n=t.x+t.w/2,r=t.y+t.h/2,i=(e,t)=>{let i=this.x[e]-n,a=this.y[e]-r,o=Math.sqrt(i*i+a*a)||1;i/=o,a/=o;let s=(Math.random()-.5)*1.1,c=Math.cos(s),l=Math.sin(s),u=i*c-a*l,d=i*l+a*c,f=t*(.4+Math.random()*.95);this.vx[e]+=u*f,this.vy[e]+=d*f*.8},[a,o]=this.rCta;for(let e=a;e<o;e++)i(e,200);let[s,c]=this.rDust;if(c>s){let e=W(t,2);for(let t=s;t<c;t++)G(this.p1[t],this.p2[t],e,this.tmp),this.x[t]=this.tmp.x,this.y[t]=this.tmp.y,this.vx[t]=0,this.vy[t]=0,i(t,240)}let[l,u]=[this.rEdge[0],this.rFill[1]];for(let e=l;e<u;e++){let t=this.x[e]-n,a=this.y[e]-r;t*t+a*a<8100&&i(e,80)}this.wake()}enter(){this.entered||(this.entered=!0,this.waiting=!1,!(!this.o.assemble||this.o.reduced||!this.n)&&(this.entranceT=this.now(),this.entering=!0,this.scatter(0)))}scatter(e){let t=this.shape,n=Math.random;for(let r=0;r<this.n;r++){let i=this.kind[r];if(i===Fe)continue;let a=i<=Y?this.hx[r]:this.x[r],o=i<=Y?this.hy[r]:this.y[r],s=n()*q,c=34+n()*120;this.x[r]=a+Math.cos(s)*c,this.y[r]=o+Math.sin(s)*c*.5,this.vx[r]=0,this.vy[r]=0,this.ed[r]=e+I((a-t.x)/Math.max(1,t.w))*.5+n()*.24}}wake(){this.destroyed||!this.visible||!this.pageVisible||(this.running=!0,this.raf||=(this.lastUpdate=this.now(),requestAnimationFrame(this.tick)))}stop(){this.running=!1,this.raf&&cancelAnimationFrame(this.raf),this.raf=0}idle(e){return!this.pointer.inside&&this.hover<0&&!this.ctaHover&&this.ctaEn<.01&&this.markEn<.01&&this.iconEn<.01&&!this.settling&&!this.capA.moving&&this.cp<.003&&e-this.burstT>1.3&&!this.entering&&this.motion<3&&Math.abs(this.openT-+!!this.menuOpen)<.002&&Math.abs(this.openV)<.01}fx(e){if(!this.ctaFx.length)return;let t=1;if(this.o.variant===`Solid`){let n=e-this.burstT;n<.07?t=1-n/.07:n<.5?t=0:n<.9&&(t=(n-.5)/.4)}if(Math.abs(t-this.lastFxOp)>.001){let e=t>=.999?``:t.toFixed(3);for(let t of this.ctaFx)t.style.opacity=e;this.lastFxOp=t}}update(e,t){let n=this.o;this.homesDirty&&this.computeHomes();let r=n.reduced,i=I(n.speed,.3,3),a=(t,n,r,i)=>{let a=+!!n;return t+(a-t)*(1-Math.exp(-e/(a>t?r:i)))};this.ctaEn=r?+!!this.ctaHover:a(this.ctaEn,this.ctaHover,.16,.5),this.markEn=r?+!!this.logoHover:a(this.markEn,this.logoHover,.22,.95),this.iconEn=r?+!!this.iconHover:a(this.iconEn,this.iconHover,.12,.3),this.ctaPhase+=e*(.014+.13*this.ctaEn),this.markPh+=e*(r?0:.55+1.25*this.markEn)*i,this.morphPh+=e*(r?0:.12+1.1*this.markEn)*i,this.capPhase+=e*.028,this.stepCapsule(e);{let t=+!!this.menuOpen;if(r)this.openT=t,this.openV=0;else{let n=2*Math.sqrt(170)*.86,r=170*(t-this.openT)-n*this.openV;this.openV+=r*e,this.openT+=this.openV*e}}let o=r?0:I(n.drift,0,1)*1.7,s=t-this.burstT,c=s<.24,l=I((s-.24)/.35),u=this.hoverRect?this.capRect:null,d=this.capIn;this.cp=r?+!!u:a(this.cp,!!u,.25,.18);let f=r?1:1-Math.exp(-e/.2),p=r?1:1-Math.exp(-e/.12),m=this.pointer.inside&&!r&&n.cursor>0,h=this.pointer.x,g=this.pointer.y,_=I(n.cursor,0,1)*2400,v=this.tmp,y=this.cta,b=n.variant===`Solid`,x=y?W(y,b?-(3+2.4*this.ctaEn):-(.4+1.6*this.ctaEn)):null,S=y?W(y,3):null,C=y?y.x+y.w/2:0,w=y?y.y+y.h/2:0,T=!r&&y&&this.ctaEn>.02?this.ctaEn*460:0,E=this.markRect,ee=E?E.x+E.w/2:0,te=E?E.y+E.h/2:0,D=E?(Math.min(E.w,E.h)/2-.5)*(.92+.04*this.markEn):0,[ne,O]=this.rMark,re=O-ne,k=this.mp,A=this.icon,j=I(this.openT,-.15,1.15),ie=0,M=this.n;for(let a=0;a<M;a++){let b=this.kind[a],O=0,M=0,N=90,P=.8,F=0,ae=!1;if(b===Pe||b===Y){let e=this.flag[a];if(b===Y){let n=e===1?+(t>=this.hd[a]):+(e===5||e===6);if(e===3){let e=this.hx[a]-this.x[a],t=this.hy[a]-this.y[a];n=Math.min(this.sb[a],I(Math.sqrt(e*e+t*t)/30))}let r=this.sb[a];this.sb[a]=r+(n-r)*(n>r?f:p)}if(e===3&&t>=this.dl[a]&&(this.flag[a]=0,e=0),e===6&&t-this.mt[a]>.17){let n=this.ph[a];this.x[a]=this.hx[a]+Math.sin(t*.8+n)*o,this.y[a]=this.hy[a]+Math.cos(t*.62+n*1.7)*o*.75,this.vx[a]=0,this.vy[a]=0,this.da[a]=this.sa[a],this.ht[a]=0,this.sb[a]=0,this.flag[a]=0,e=0}if(e===3||e===5&&t<this.dl[a])O=this.x[a],M=this.y[a],N=0,F=6,ae=!0;else if(e===5||e===6){let n=this.ls[a];if(O=this.x[n],M=this.y[n],e===5){let e=t-this.dl[a],n=e<.38?.12+.88*L(0,1,e/.38):1;N=90*i*n,P=.9;let r=O-this.x[a],o=M-this.y[a];(r*r+o*o<6||e>1.1)&&(this.flag[a]=6,this.mt[a]=t)}else N=500,P=1;ae=!0}else if(e===1&&u&&t>=this.dl[a]){if(this.gm[a]===0?(ue(this.gt[a]+this.capPhase,u,v),O=v.x+v.nx*this.gb[a],M=v.y+v.ny*this.gb[a]):(G(this.gt[a],this.gb[a],d,v),O=v.x,M=v.y),this.st[a])N=1400*i,P=1;else{let e=t-this.dl[a],n=e<.26?.16+.84*L(0,1,e/.26):1;N=150*this.rk[a]*i*n,P=.84;let r=O-this.x[a],o=M-this.y[a];e>.12&&r*r+o*o<9&&(this.st[a]=1)}ae=!0}else{O=this.hx[a],M=this.hy[a];let e=t-this.dl[a],n=e>=0&&e<.38?.12+.88*L(0,1,e/.38):1;N=80*this.rk[a]*i*n,P=.88}if(o>0){let e=this.ph[a],n=b===Y?1:.32;O+=Math.sin(t*.8+e)*o*n,M+=Math.cos(t*.62+e*1.7)*o*n*.75}}else if(b===X){if(!y||!x||!S)continue;if(this.gm[a]===0){ue(this.p1[a]+this.ctaPhase*(this.rk[a]>1?1:.82),x,v);let e=this.p2[a];O=v.x+v.nx*e,M=v.y+v.ny*e,this.bo[a]=v.ny}else G(this.p1[a],this.p2[a],S,v),O=v.x,M=v.y,o>0&&(O+=Math.sin(t*1.3+this.ph[a])*(.5+1.1*this.ctaEn),M+=Math.cos(t*1.1+this.ph[a])*(.35+.6*this.ctaEn));c?(N=4,P=0,F=3.2):(N=(30+170*l)*this.rk[a],P=.78)}else if(b===Z){if(!E)continue;ge(n.mark,a-ne,re,n.mark===`Morph`?this.morphPh:this.markPh,this.markEn,k),O=ee+k.x*D,M=te+k.y*D,this.bo[a]=k.z,this.ma[a]=k.a;let e=O-this.x[a],t=M-this.y[a];e*e+t*t>D*D*.5&&(this.x[a]=O,this.y[a]=M,this.vx[a]=0,this.vy[a]=0),N=560,P=.92}else if(b===Q){if(!A)continue;let e=A.x+A.w/2,t=A.y+A.h/2,n=this.p1[a],r=this.gm[a]===0,i=this.iconEn*(1-I(j)),o=(r?-1:1)*(3.5+1.1*i),s=r?-6.6:6.6,c=(r?1:-1)*1.5*i,l=1+.12*this.iconEn*I(j),u=-9+2.4*j+c,d=9-2.4*j+c,f=o+(s-o)*j,p=o+(-s-o)*j;O=e+(u+(d-u)*n)*l,M=t+(f+(p-f)*n)*l,N=420*this.rk[a],P=.82}else{if(!S||s>1.05){S&&(G(this.p1[a],this.p2[a],S,v),this.x[a]=v.x,this.y[a]=v.y),this.vx[a]=0,this.vy[a]=0;continue}G(this.p1[a],this.p2[a],S,v),O=v.x,M=v.y,c?(N=0,P=0,F=3):(N=(20+150*l)*this.rk[a],P=.72)}if(this.entering&&t<this.entranceT+this.ed[a])continue;if(r){this.x[a]=O,this.y[a]=M,this.vx[a]=0,this.vy[a]=0,this.td[a]=0;continue}let R=2*Math.sqrt(N)*P+F,oe=O-this.x[a],z=M-this.y[a],se=N*oe-R*this.vx[a],B=N*z-R*this.vy[a];if(b<=Y&&(this.bo[a]=0,!ae)){if(m){let e=this.x[a]-h,t=this.y[a]-g,n=e*e+t*t;if(n<2500){let r=Math.sqrt(n)+.001,i=1-r/50,o=i*i*_/r;se+=e*o,B+=t*o,this.bo[a]=i}}if(T&&b===Y){let e=C-this.x[a],t=w-this.y[a],n=e*e+t*t;if(n<28900){let r=Math.sqrt(n)+.001,i=T*(1-r/170)/r;se+=e*i,B+=t*i}}}let V=this.vx[a]+se*e,H=this.vy[a]+B*e;if(b<=Y){let e=V*V+H*H;if(e>950*950){let t=950/Math.sqrt(e);V*=t,H*=t}}this.vx[a]=V,this.vy[a]=H,this.x[a]+=V*e,this.y[a]+=H*e,this.td[a]=Math.abs(oe)+Math.abs(z),ie+=Math.abs(V)+Math.abs(H)}this.motion=ie/Math.max(1,M)}draw(e){let t=this.ctx;if(!t)return;this.pendingDraw=!1;let n=this.o;if(t.setTransform(1,0,0,1,0,0),t.globalCompositeOperation=`source-over`,t.clearRect(0,0,this.canvas.width,this.canvas.height),this.waiting)return;t.setTransform(this.ratio,0,0,this.ratio,this.M*this.ratio,this.M*this.ratio),t.globalCompositeOperation=this.glowMode?`lighter`:`source-over`;let r=this.bc;r.fill(0),this.glc=0;let i=this.gl.length/3,a=I(n.twinkle,0,1)*(n.reduced?.25:1),o=e-this.burstT,s=this.ctaEn,c=n.variant===`Solid`,l=1;n.mobile&&(l=I(this.openT),this.cta&&(l*=I((this.shape.y+this.shape.h-(this.cta.y+this.cta.h))/14+1)));let u=.12*this.markEn,d=n.reduced?0:I(n.drift,0,1)*1.7,f=this.cp>.003,p=this.capRect,m=this.cp,h=(e,t)=>1-m*(1-L(6,40,pe(e,t,p))),g=I(e-this.lastDrawT,0,.1);this.lastDrawT=e;let _=n.reduced||!this.alphaInit;this.alphaInit=!0;let v=_?1:1-Math.exp(-g/.07),y=_?1:1-Math.exp(-g/.2),b=_?1:1-Math.exp(-g/.12),x=_?1:1-Math.exp(-g/.3),S=0,C=!this.sameColor,w=this.n;for(let t=0;t<w;t++){let n=this.kind[t],r=this.al[t],p=1,m=1-a*.55+a*.55*(.5+.5*Math.sin(e*this.tw[t]+this.ph[t])),g=1;if(n===Pe||n===Y){let i=this.vz[t];if(i<=.01){this.da[t]=0,this.ht[t]=0;continue}r*=m*i*this.lf[t];let a=this.flag[t],o=+(a===1&&e>=this.dl[t]);if(n===Y){if(a===0){this.da[t]=0,this.ht[t]=0;continue}let n=0;if(a!==0&&this.sb[t]>.01){let i=this.ph[t],a=this.hx[t]+Math.sin(e*.8+i)*d,o=this.hy[t]+Math.cos(e*.62+i*1.7)*d*.75;n=r*this.sb[t]*(f?h(a,o):1),this.glowMode||(n*=.82),n>.015&&this.pushDot(0,Math.min(1,n),a,o,this.sz[t]*(this.glowMode?1:.9))}this.sa[t]=n,a===0&&f&&(r*=h(this.x[t],this.y[t])),a===6&&(r*=I(1-(e-this.mt[t])/.17))}let s=this.ht[t],c=o-s;if(s+=c*(c>0?b:x),s<.002&&(s=0),this.ht[t]=s,(c>.01||c<-.01)&&S++,p=s,s>0){let e=I(1-this.td[t]/34),n=(this.gm[t]===0?.92:.42)*(.78+.22*m)*(.6+.4*e);r+=(n-r)*s}r+=this.bo[t]*.55}else if(n===X){let e=this.gm[t]===0;r=c?(.24+.48*s)*this.al[t]*m:e?(.5+.3*s)*this.al[t]*(.86-.24*this.bo[t])*(.82+.18*m):(.2+.24*s)*this.al[t]*m,o<1&&(r=Math.max(r,.95*(1-o))),r*=l}else if(n===Z){let e=this.bo[t]*.5+.5;r=(.18+.82*e)*this.ma[t]*this.al[t]+u*this.ma[t],g=(.74+.4*e)*1.12}else r=n===Q?.92*this.al[t]:o>1.05?0:(o<.5?1:I(1-(o-.5)/.5))*this.al[t]*l;if(this.entering){let n=e-this.entranceT-this.ed[t];r*=n<0?0:I(n/.45)}this.glowMode||(r*=.82,g*=.9),r>1&&(r=1);let _=this.da[t],w=r-_;if(r=_+w*(w>0?v:y),r<.002&&(r=0),this.da[t]=r,r<.015)continue;let T=n===Z?-this.sz[t]*g:this.sz[t]*g;if(!C||p>=.985?this.pushDot($,r,this.x[t],this.y[t],T):p<=.015?this.pushDot(0,r,this.x[t],this.y[t],T):(this.pushDot($,r*p,this.x[t],this.y[t],T),this.pushDot(0,r*(1-p),this.x[t],this.y[t],T)),this.glowMode&&this.glc<i&&n!==Q){let e=0;if(n<=Y?e=r*p>.22?r*p:0:r>.45&&(e=n===Z?r*.4:n===X?r*.5:r),e>0){let n=this.glc*3;this.gl[n]=this.x[t],this.gl[n+1]=this.y[t],this.gl[n+2]=e,this.glc++}}}this.settling=S>0;for(let e=0;e<$*2;e++){let n=r[e];if(!n)continue;let i=this.bx[e];t.fillStyle=this.fills[e],t.beginPath();for(let e=0;e<n;e++){let n=e*3,r=i[n+2],a=i[n],o=i[n+1];if(r<0||r>=1.8){let e=(r<0?-r:r)*.5;t.moveTo(a+e,o),t.arc(a,o,e,0,q)}else t.rect(a-r*.5,o-r*.5,r,r)}t.fill()}if(this.glc&&this.sprite&&n.glow>0){let e=4.5+I(n.size,.4,4)*2.4,r=I(n.glow,0,1)*.3;for(let n=0;n<this.glc;n++){let i=n*3;t.globalAlpha=Math.min(1,this.gl[i+2]*r),t.drawImage(this.sprite,this.gl[i]-e,this.gl[i+1]-e,e*2,e*2)}t.globalAlpha=1}}pushDot(e,t,n,r,i){if(t<.012)return;let a=e+Math.min($-1,t*$|0),o=this.bx[a],s=this.bc[a]*3;if(s+3>o.length){let e=new Float32Array(o.length*2);e.set(o),this.bx[a]=e,o=e}o[s]=n,o[s+1]=r,o[s+2]=i,this.bc[a]++}constructor(e,t,n,r=!1){P(this,`root`,void 0),P(this,`canvas`,void 0),P(this,`ctx`,void 0),P(this,`o`,void 0),P(this,`M`,44),P(this,`ratio`,1),P(this,`w`,0),P(this,`h`,0),P(this,`barH`,0),P(this,`capH`,0),P(this,`cssH`,0),P(this,`scale`,1),P(this,`innerR`,16),P(this,`shape`,{x:0,y:0,w:0,h:0,r:0}),P(this,`capShape`,{x:0,y:0,w:0,h:0,r:0}),P(this,`buildKey`,``),P(this,`homesDirty`,!0),P(this,`pendingDraw`,!1),P(this,`linkEls`,[]),P(this,`linkRects`,[]),P(this,`ctaEl`,null),P(this,`ctaFx`,[]),P(this,`cta`,null),P(this,`markEl`,null),P(this,`markRect`,null),P(this,`iconEl`,null),P(this,`icon`,null),P(this,`n`,0),P(this,`x`,new Float32Array),P(this,`y`,new Float32Array),P(this,`vx`,new Float32Array),P(this,`vy`,new Float32Array),P(this,`hx`,new Float32Array),P(this,`hy`,new Float32Array),P(this,`p1`,new Float32Array),P(this,`p2`,new Float32Array),P(this,`sz`,new Float32Array),P(this,`al`,new Float32Array),P(this,`ph`,new Float32Array),P(this,`tw`,new Float32Array),P(this,`rk`,new Float32Array),P(this,`ed`,new Float32Array),P(this,`bo`,new Float32Array),P(this,`ma`,new Float32Array),P(this,`td`,new Float32Array),P(this,`lf`,new Float32Array),P(this,`vz`,new Float32Array),P(this,`gt`,new Float32Array),P(this,`gb`,new Float32Array),P(this,`dl`,new Float32Array),P(this,`rl`,new Float32Array),P(this,`sb`,new Float32Array),P(this,`sa`,new Float32Array),P(this,`hd`,new Float32Array),P(this,`mt`,new Float32Array),P(this,`st`,new Uint8Array),P(this,`ls`,new Int32Array),P(this,`da`,new Float32Array),P(this,`ht`,new Float32Array),P(this,`kind`,new Uint8Array),P(this,`seg`,new Uint8Array),P(this,`flag`,new Uint8Array),P(this,`gm`,new Uint8Array),P(this,`rEdge`,[0,0]),P(this,`rFill`,[0,0]),P(this,`rCta`,[0,0]),P(this,`rMark`,[0,0]),P(this,`rIcon`,[0,0]),P(this,`rDust`,[0,0]),P(this,`edgeSpacing`,1.3),P(this,`fillArea`,70),P(this,`hover`,-1),P(this,`hoverRect`,null),P(this,`capA`,{x0:0,x1:0,y0:0,y1:0,v0:0,v1:0,w0:0,w1:0,moving:!1}),P(this,`capRect`,{x:0,y:0,w:0,h:0,r:0}),P(this,`capIn`,{x:0,y:0,w:0,h:0,r:0}),P(this,`gathered`,[]),P(this,`edgeSlots`,120),P(this,`releaseTimer`,0),P(this,`pointer`,{x:0,y:0,inside:!1}),P(this,`ctaHover`,!1),P(this,`ctaHotEl`,null),P(this,`ctaEn`,0),P(this,`logoHover`,!1),P(this,`markEn`,0),P(this,`markPh`,.9),P(this,`morphPh`,1.2),P(this,`iconHover`,!1),P(this,`iconEn`,0),P(this,`cp`,0),P(this,`lastDrawT`,0),P(this,`settling`,!1),P(this,`alphaInit`,!1),P(this,`sameColor`,!0),P(this,`menuOpen`,!1),P(this,`openT`,0),P(this,`openV`,0),P(this,`ctaPhase`,0),P(this,`capPhase`,0),P(this,`burstT`,-99),P(this,`lastFxOp`,1),P(this,`entranceT`,-99),P(this,`entering`,!1),P(this,`entered`,!1),P(this,`waiting`,!1),P(this,`motion`,0),P(this,`mp`,{x:0,y:0,z:1,a:1}),P(this,`base`,[255,255,255,1]),P(this,`hot`,[255,255,255,1]),P(this,`glowMode`,!0),P(this,`fills`,[]),P(this,`sprite`,null),P(this,`bx`,[]),P(this,`bc`,new Int32Array($*2)),P(this,`gl`,new Float32Array(3*1600)),P(this,`glc`,0),P(this,`running`,!1),P(this,`visible`,!0),P(this,`pageVisible`,!0),P(this,`raf`,0),P(this,`lastUpdate`,0),P(this,`frame`,0),P(this,`ro`,null),P(this,`io`,null),P(this,`tmp`,{x:0,y:0,nx:0,ny:0}),P(this,`destroyed`,!1),P(this,`passive`,!1),P(this,`stats`,{frames:0,ms:0}),P(this,`onMove`,e=>{if(e.pointerType===`touch`)return;let t=this.local(e);this.pointer.x=t.x,this.pointer.y=t.y,this.pointer.inside=!0;let n=e.target,r=n&&n.closest?n.closest(`.pn-link, .pn-plink`):null,i=n&&n.closest?n.closest(`.pn-cta`):null,a=!!(n&&n.closest&&(n.closest(`.pn-links`)||!i&&n.closest(`.pn-panel-inner`)));this.hoverFromElement(r,a),this.setCtaHover(i),this.logoHover=!!(n&&n.closest&&n.closest(`.pn-logo`)),this.iconHover=!!(n&&n.closest&&n.closest(`.pn-menu`)),this.wake()}),P(this,`onLeave`,()=>{this.pointer.inside=!1,this.logoHover=!1,this.iconHover=!1,this.setCtaHover(null),this.hover>=0&&this.scheduleRelease(60),this.wake()}),P(this,`onDown`,e=>{let t=e.target;if(t&&t.closest&&t.closest(`.pn-cta`)&&this.burst(),e.pointerType===`touch`){let e=t&&t.closest?t.closest(`.pn-link, .pn-plink`):null;e&&(this.hoverFromElement(e),this.scheduleRelease(700))}this.wake()}),P(this,`onFocusIn`,e=>{let t=e.target;if(!t||!t.closest)return;let n=!0;try{n=t.matches(`:focus-visible`)}catch{n=!0}if(!n)return;let r=t.closest(`.pn-link, .pn-plink`);r&&this.hoverFromElement(r);let i=t.closest(`.pn-cta`);i&&this.setCtaHover(i),this.wake()}),P(this,`onFocusOut`,()=>{this.pointer.inside||(this.setCtaHover(null),this.hover>=0&&this.scheduleRelease(120))}),P(this,`onVisibility`,()=>{this.pageVisible=document.visibilityState!==`hidden`,this.pageVisible?this.wake():this.stop()}),P(this,`tick`,e=>{if(this.raf=0,!this.running||this.destroyed)return;let t=e/1e3,n=this.idle(t);this.frame++;let r=n&&(this.o.reduced||this.o.drift<=0&&this.o.twinkle<=0&&!this.markRect);if(n&&this.frame%2==1&&!r){this.raf=requestAnimationFrame(this.tick);return}let i=Math.min(1/12,Math.max(1/240,t-this.lastUpdate));this.lastUpdate=t;let a=performance.now();this.entering&&t-this.entranceT>2.4&&(this.entering=!1);let o=Math.max(1,Math.ceil(i*120-.01)),s=i/o;for(let e=1;e<=o;e++)this.update(s,t-i+s*e);if(this.fitCanvas(),this.draw(t),this.fx(t),this.stats.frames++,this.stats.ms+=performance.now()-a,r){this.running=!1;return}this.raf=requestAnimationFrame(this.tick)}),this.root=e,this.canvas=t,this.o=n,this.passive=r,this.waiting=!r&&n.assemble&&!n.reduced,this.ctx=t.getContext(`2d`);for(let e=0;e<$*2;e++)this.bx.push(new Float32Array(3*256));if(this.palette(),this.collect(),this.measure(!0),r)return;e.addEventListener(`pointermove`,this.onMove),e.addEventListener(`pointerleave`,this.onLeave),e.addEventListener(`pointerdown`,this.onDown),e.addEventListener(`focusin`,this.onFocusIn),e.addEventListener(`focusout`,this.onFocusOut),document.addEventListener(`visibilitychange`,this.onVisibility),typeof ResizeObserver<`u`&&(this.ro=new ResizeObserver(()=>this.onResize()),this.ro.observe(e));let i=document.fonts;i&&i.ready&&i.ready.then(()=>!this.destroyed&&this.onResize()).catch(()=>{}),typeof IntersectionObserver<`u`?(this.io=new IntersectionObserver(e=>{for(let t of e)this.visible=t.isIntersecting;this.visible?(this.entered||this.enter(),this.wake()):this.stop()},{rootMargin:`60px`}),this.io.observe(e)):(this.enter(),this.wake())}};

export interface ParticleNavbarProps {
  logoText?: string;
  logoImage?: { src: string; srcSet?: string; alt?: string };
  mark?: "Orb" | "Ring" | "Atom" | "Spiral" | "Pulse" | "Helix" | "Cube" | "Morph" | "None";
  logoLink?: string;
  logoNewTab?: boolean;
  links?: Array<{ label: string; link: string; newTab?: boolean; active?: boolean }>;
  button?: {
    show?: boolean;
    label?: string;
    link?: string;
    newTab?: boolean;
    variant?: "Particles" | "Solid";
    fill?: string;
    text?: string;
  };
  align?: "Center" | "Right";
  layout?: "Auto" | "Desktop" | "Mobile";
  breakpoint?: number;
  textColor?: string;
  hoverTextColor?: string;
  particles?: {
    color?: string;
    hoverColor?: string;
    density?: number;
    size?: number;
    glow?: number;
    twinkle?: number;
  };
  motion?: {
    gather?: number;
    speed?: number;
    drift?: number;
    cursor?: number;
    assemble?: boolean;
  };
  surface?: {
    fill?: string;
    blur?: number;
    shadow?: string;
  };
  radius?: string;
  padding?: string;
  gap?: string;
  focusRing?: string;
  className?: string;
  style?: React.CSSProperties;
  onLinkClick?: (href: string, e: React.MouseEvent) => void;
  onButtonClick?: (e: React.MouseEvent) => void;
}

export function ParticleNavbar(rawProps: ParticleNavbarProps) {
  const mark = rawProps.mark && ["Orb", "Ring", "Atom", "Spiral", "Pulse", "Helix", "Cube", "Morph", "None"].includes(rawProps.mark)
    ? rawProps.mark
    : "Orb";

  const props = {
    logoText: rawProps.logoText ?? "FINCORE",
    logoImage: rawProps.logoImage,
    mark,
    logoLink: rawProps.logoLink ?? "#hero",
    logoNewTab: !!rawProps.logoNewTab,
    links: rawProps.links ?? [
      { label: "Home", link: "#hero", newTab: false, active: false },
      { label: "About", link: "#about", newTab: false, active: false },
      { label: "Services", link: "#services", newTab: false, active: false },
      { label: "Contact", link: "#contact", newTab: false, active: false },
    ],
    button: {
      show: true,
      label: "Consultation",
      link: "#contact",
      newTab: false,
      variant: "Particles" as const,
      fill: "#FFFFFF",
      text: "#0C0C0F",
      ...(rawProps.button || {}),
    },
    align: rawProps.align ?? "Center",
    layout: rawProps.layout ?? "Auto",
    breakpoint: rawProps.breakpoint ?? 768,
    textColor: rawProps.textColor ?? "rgba(255, 255, 255, 0.72)",
    hoverTextColor: rawProps.hoverTextColor ?? "#FFFFFF",
    particles: {
      color: "#FFFFFF",
      hoverColor: "#FFFFFF",
      density: 1,
      size: 1.2,
      glow: 0.6,
      twinkle: 0.5,
      ...(rawProps.particles || {}),
    },
    motion: {
      gather: 0.45,
      speed: 1,
      drift: 0.5,
      cursor: 0.5,
      assemble: true,
      ...(rawProps.motion || {}),
    },
    surface: {
      fill: "rgba(8, 11, 20, 0.78)",
      blur: 18,
      shadow: "0px 24px 60px -24px rgba(0, 0, 0, 0.6)",
      ...(rawProps.surface || {}),
    },
    radius: rawProps.radius ?? "999px",
    padding: rawProps.padding ?? "8px 8px 8px 22px",
    gap: rawProps.gap ?? "30px",
    focusRing: rawProps.focusRing ?? "#8AB4FF",
    className: rawProps.className,
    style: rawProps.style,
  };

  const navRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const panelInnerRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLButtonElement | null>(null);
  const engineRef = useRef<any>(null);

  const reducedMotion = useReducedMotion();
  const depsKey =
    props.links.map((l) => l.label + (l.active ? ":1" : ":0")).join("|") +
    "|" +
    props.logoText +
    "|" +
    props.mark +
    "|" +
    props.button.show +
    props.button.label +
    props.padding +
    props.gap;
  const isMobile = useIsMobile(navRef, props.layout, props.breakpoint, props.align, depsKey);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const generatedId = useId();
  const panelId = "pn-panel-" + generatedId.replace(/[^a-zA-Z0-9_-]/g, "");

  const engineOptions = {
    color: props.particles.color,
    hoverColor: props.particles.hoverColor,
    density: props.particles.density,
    size: props.particles.size,
    glow: props.particles.glow,
    twinkle: props.particles.twinkle,
    gather: props.motion.gather,
    speed: props.motion.speed,
    drift: props.motion.drift,
    cursor: props.motion.cursor,
    assemble: props.motion.assemble,
    variant: props.button.variant,
    hasButton: props.button.show,
    mark: props.mark,
    mobile: isMobile,
    radius: R(props.radius, 999),
    reduced: reducedMotion,
  };

  const optionsRef = useRef(engineOptions);
  optionsRef.current = engineOptions;
  const optionsString = JSON.stringify(engineOptions);

  useEffect(() => {
    const nav = navRef.current;
    const canvas = canvasRef.current;
    if (!nav || !canvas) return;

    const engine = new Ie(nav, canvas, optionsRef.current);
    engineRef.current = engine;
    setIsReady(true);

    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setOptions(optionsRef.current);
    }
  }, [optionsString]);

  useIsomorphicLayoutEffect(() => {
    if (engineRef.current) {
      engineRef.current.refresh();
    }
  });

  useEffect(() => {
    if (!isMobile && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isMobile, isMenuOpen]);

  useIsomorphicLayoutEffect(() => {
    const panel = panelRef.current;
    const panelInner = panelInnerRef.current;
    if (engineRef.current) {
      engineRef.current.setMenuOpen(isMenuOpen && isMobile);
    }
    if (!panel || !panelInner) return;

    if (isMenuOpen) {
      panelInner.removeAttribute("inert");
      panelInner.removeAttribute("aria-hidden");
    } else {
      panelInner.setAttribute("inert", "");
      panelInner.setAttribute("aria-hidden", "true");
    }

    const items = Array.from(panelInner.children) as HTMLElement[];
    const targetH = isMenuOpen ? panelInner.offsetHeight : 0;
    if (reducedMotion) {
      panel.style.transition = "none";
      panel.style.height = targetH + "px";
      return;
    }

    const currentH = panel.offsetHeight;
    panel.style.transition = "none";
    panel.style.height = currentH + "px";
    panel.offsetHeight; // force reflow
    panel.style.transition = isMenuOpen
      ? "height .6s cubic-bezier(.4,.6,.2,1)"
      : "height .44s cubic-bezier(.45,0,.2,1) .06s";
    panel.style.height = targetH + "px";

    if (typeof panelInner.animate !== "function") return;
    items.forEach((item) => {
      if (typeof item.getAnimations === "function") {
        item.getAnimations().forEach((anim) => anim.cancel());
      }
    });

    const anims: Animation[] = [];
    if (isMenuOpen) {
      items.forEach((item, idx) => {
        anims.push(
          item.animate(
            [
              { opacity: 0, transform: "translateY(-10px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 520,
              delay: 110 + idx * 48,
              easing: "cubic-bezier(.2,.8,.2,1)",
              fill: "backwards",
            }
          )
        );
      });
    } else if (currentH > 0) {
      items.forEach((item) => {
        anims.push(
          item.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 170,
            easing: "ease-out",
            fill: "forwards",
          })
        );
      });
    }

    const lastAnim = anims.length ? anims[anims.length - 1] : null;
    if (isMenuOpen && lastAnim && lastAnim.finished) {
      lastAnim.finished
        .then(() => {
          if (engineRef.current) engineRef.current.refresh();
        })
        .catch(() => {});
    }
  }, [isMenuOpen, isMobile, reducedMotion]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    const handleClick = (e: PointerEvent) => {
      if (navRef.current && e.target instanceof Node && !navRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handleClick, true);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handleClick, true);
    };
  }, [isMenuOpen]);

  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    if (rawProps.onLinkClick) {
      rawProps.onLinkClick(href, e);
    } else if (href.startsWith("#")) {
      e.preventDefault();
      setIsMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    if (rawProps.onButtonClick) {
      e.preventDefault();
      setIsMenuOpen(false);
      rawProps.onButtonClick(e);
    } else if (props.button.link.startsWith("#")) {
      e.preventDefault();
      setIsMenuOpen(false);
      const target = document.querySelector(props.button.link);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={navRef}
      className={
        "pn" +
        (isMobile ? " is-mobile" : "") +
        (props.layout === "Desktop" ? " is-desktop" : "") +
        (props.align === "Right" ? " is-right" : "") +
        (isMenuOpen ? " is-open" : "") +
        (isReady ? " pn-ready" : "") +
        (props.className ? " " + props.className : "")
      }
      aria-label="Main"
      style={{
        ...props.style,
        ..._e(props, isMobile),
        position: "relative",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: PN_STYLES }} />
      <div className="pn-surface" aria-hidden="true" />
      <canvas ref={canvasRef} className="pn-canvas" aria-hidden="true" />
      <div className="pn-bar">
        <a
          className="pn-logo"
          aria-label={props.logoText ? undefined : "Home"}
          {...ve(props.logoLink, props.logoNewTab)}
          onClick={(e) => handleLinkClick(props.logoLink, e)}
        >
          {props.mark !== "None" && <span className="pn-mark" aria-hidden="true" />}
          {props.logoImage?.src ? (
            <img
              src={props.logoImage.src}
              srcSet={props.logoImage.srcSet}
              alt={props.logoImage.alt || props.logoText || "Logo"}
            />
          ) : (
            <span className="font-extrabold tracking-tight">{props.logoText}</span>
          )}
        </a>

        <div className="pn-links">
          {props.links.map((link, idx) => {
            const isActive = !!link.active;
            return (
              <a
                key={idx}
                className={"pn-link" + (isActive ? " is-active" : "")}
                data-i={idx}
                {...ve(link.link, !!link.newTab)}
                onClick={(e) => handleLinkClick(link.link, e)}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {props.button.show && (
          <a
            className={"pn-cta" + (props.button.variant === "Solid" ? "" : " is-particles")}
            {...ve(props.button.link, !!props.button.newTab)}
            onClick={handleButtonClick}
          >
            <span className="pn-cta-bg" aria-hidden="true" />
            <span className="pn-cta-label">{props.button.label}</span>
          </a>
        )}

        {isMobile && (
          <button
            ref={menuRef}
            type="button"
            className="pn-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls={panelId}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <span className="pn-menu-box" aria-hidden="true" />
          </button>
        )}
      </div>

      {isMobile && (
        <div ref={panelRef} id={panelId} className="pn-panel">
          <div
            ref={panelInnerRef}
            className="pn-panel-inner"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target && target.closest && target.closest("a[href]")) {
                setIsMenuOpen(false);
              }
            }}
          >
            {props.links.map((link, idx) => {
              const isActive = !!link.active;
              return (
                <a
                  key={idx}
                  className={"pn-plink" + (isActive ? " is-active" : "")}
                  data-i={idx}
                  {...ve(link.link, !!link.newTab)}
                  onClick={(e) => handleLinkClick(link.link, e)}
                >
                  {link.label}
                </a>
              );
            })}
            {props.button.show && (
              <a
                className={"pn-cta" + (props.button.variant === "Solid" ? "" : " is-particles")}
                {...ve(props.button.link, !!props.button.newTab)}
                onClick={handleButtonClick}
              >
                <span className="pn-cta-bg" aria-hidden="true" />
                <span className="pn-cta-label">{props.button.label}</span>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default ParticleNavbar;
