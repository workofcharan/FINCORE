"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export interface FooterLink {
  label: string;
  href: string;
  onClick?: () => void;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterPalette {
  background: string;
  ink: string;
  warm: string;
}

export interface HalftoneWordmarkFooterProps {
  wordmark: string;
  label: string;
  meta: string;
  columns: FooterColumn[];
  palette: FooterPalette;
  dotGap?: number;
  radius?: number;
  crop?: number;
  grain?: number;
  fontFamily?: string;
  fontWeight?: number;
  height?: string;
  showTopBackToTop?: boolean;
  children?: React.ReactNode;
}

interface Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  colorFactor: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  active: boolean;
}

function parseHex(hex: string): [number, number, number] {
  let cleaned = hex.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const intVal = parseInt(cleaned, 16);
  if (isNaN(intVal)) return [255, 255, 255];
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

export default function HalftoneWordmarkFooter({
  wordmark,
  label,
  meta,
  columns,
  palette,
  dotGap = 6,
  radius = 90,
  crop = 0.18,
  grain = 0.45,
  fontFamily = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  fontWeight = 800,
  height = "clamp(540px, 48vw, 680px)",
  showTopBackToTop = false,
  children,
}: HalftoneWordmarkFooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });
  const particlesRef = useRef<Particle[]>([]);
  const shockwavesRef = useRef<Shockwave[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const [parsedInk, setParsedInk] = useState<[number, number, number]>([255, 255, 255]);
  const [parsedWarm, setParsedWarm] = useState<[number, number, number]>([56, 189, 248]);

  useEffect(() => {
    setParsedInk(parseHex(palette.ink));
    setParsedWarm(parseHex(palette.warm));
  }, [palette.ink, palette.warm]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Re-generate particles whenever dimensions or wordmark change
  const buildParticles = useCallback(
    (width: number, height: number) => {
      if (width <= 0 || height <= 0) return;

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);

      // Maximize uppercase wordmark font size to fill ~96% width
      const targetWidth = width * 0.96;
      const targetHeight = height * 0.95;

      let minFont = 30;
      let maxFont = Math.floor(Math.max(width * 0.45, height * 1.5));
      let bestFont = minFont;

      for (let i = 0; i < 14; i++) {
        const midFont = Math.floor((minFont + maxFont) / 2);
        offCtx.font = `${fontWeight} ${midFont}px ${fontFamily}`;
        const metrics = offCtx.measureText(wordmark);
        const approxCapHeight = midFont * 0.78;

        if (metrics.width <= targetWidth && approxCapHeight <= targetHeight) {
          bestFont = midFont;
          minFont = midFont + 1;
        } else {
          maxFont = midFont - 1;
        }
      }

      const fontSize = bestFont;
      offCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      offCtx.textAlign = "center";
      offCtx.textBaseline = "middle";

      // Perfect vertical positioning in canvas
      const baselineY = height * (0.50 + crop * 0.08);

      offCtx.fillStyle = "#FFFFFF";
      offCtx.fillText(wordmark, width / 2, baselineY);

      const imgData = offCtx.getImageData(0, 0, width, height);
      const data = imgData.data;

      const particles: Particle[] = [];
      const step = Math.max(3, dotGap);

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > 25) {
            // Calculate base dot radius proportional to text density
            const normalized = alpha / 255;
            const baseRadius = Math.max(0.9, normalized * (step * 0.44));

            particles.push({
              originX: x,
              originY: y,
              x: x + (Math.random() - 0.5) * 1.5,
              y: y + (Math.random() - 0.5) * 1.5,
              vx: 0,
              vy: 0,
              baseRadius,
              colorFactor: 0,
            });
          }
        }
      }

      particlesRef.current = particles;
    },
    [wordmark, fontFamily, fontWeight, dotGap, crop]
  );

  // Resize listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.floor(rect.width);
      const displayHeight = Math.floor(rect.height);

      if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
        canvas.width = displayWidth * dpr;
        canvas.height = displayHeight * dpr;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        buildParticles(displayWidth, displayHeight);
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(canvas);

    return () => ro.disconnect();
  }, [buildParticles]);

  // Main interactive physics render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;

    const render = () => {
      if (!isRunning) return;

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const shockwaves = shockwavesRef.current;

      const [r1, g1, b1] = parsedInk;
      const [r2, g2, b2] = parsedWarm;

      // Update shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += sw.speed;
        if (sw.radius > sw.maxRadius) {
          shockwaves.splice(s, 1);
        }
      }

      // Update and draw particles
      const len = particles.length;
      for (let i = 0; i < len; i++) {
        const p = particles[i];

        // 1. Mouse repulsion physics
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          const radSq = radius * radius;

          if (distSq < radSq && distSq > 0.001) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) * 14;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force * 0.45;
            p.vy += Math.sin(angle) * force * 0.45;
            p.colorFactor = Math.min(1, p.colorFactor + (1 - dist / radius) * 0.7);
          }
        }

        // 2. Shockwave shock ripples
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const sdx = p.x - sw.x;
          const sdy = p.y - sw.y;
          const sdist = Math.hypot(sdx, sdy);
          const diff = Math.abs(sdist - sw.radius);

          if (diff < 30) {
            const waveForce = (1 - diff / 30) * 12;
            const sAngle = Math.atan2(sdy, sdx);
            p.vx += Math.cos(sAngle) * waveForce * 0.4;
            p.vy += Math.sin(sAngle) * waveForce * 0.4;
            p.colorFactor = Math.min(1, p.colorFactor + (1 - diff / 30));
          }
        }

        // 3. Spring physics back to origin
        const springX = (p.originX - p.x) * 0.085;
        const springY = (p.originY - p.y) * 0.085;
        p.vx = (p.vx + springX) * 0.84;
        p.vy = (p.vy + springY) * 0.84;
        p.x += p.vx;
        p.y += p.vy;

        // 4. Color decay back to ink
        p.colorFactor *= 0.94;

        // 5. Draw dot
        const t = Math.max(0, Math.min(1, p.colorFactor));
        const cr = Math.round(r1 + (r2 - r1) * t);
        const cg = Math.round(g1 + (g2 - g1) * t);
        const cb = Math.round(b1 + (b2 - b1) * t);

        ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
        ctx.beginPath();
        // Dynamic radius slightly breathes on excitation
        const currentRadius = p.baseRadius * (1 + t * 0.35);
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [radius, parsedInk, parsedWarm]);

  // Pointer event listeners
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseRef.current.active = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    shockwavesRef.current.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      maxRadius: Math.max(rect.width, rect.height) * 0.8,
      speed: 16,
      active: true,
    });
  };

  return (
    <footer
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{
        backgroundColor: palette.background,
        color: palette.ink,
      }}
    >
      {/* Procedural Film Grain Overlay */}
      {grain > 0 && (
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
          style={{
            opacity: grain,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Main Container Content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-6 flex flex-col justify-between"
        style={{ minHeight: height === "auto" ? undefined : height }}
      >
        
        {/* Top Studio & Navigation Area */}
        <div className="space-y-8 sm:space-y-10">
          {/* Studio Header Line */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-white/60">
                Studio Line
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-white mt-1">
                {label}
              </h3>
            </div>

            {showTopBackToTop && (
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-semibold text-white transition-all duration-200 cursor-pointer active:scale-95 group"
                  aria-label="Back to top"
                >
                  <span>Back to top</span>
                  <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                </button>
              </div>
            )}
          </div>

          {/* Tracked Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {columns.map((column, idx) => (
              <div key={idx} className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                  {column.title}
                </h4>
                <ul className="space-y-2.5 text-sm">
                  {column.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      {link.onClick ? (
                        <button
                          type="button"
                          onClick={link.onClick}
                          className="text-left text-white/80 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {link.label}
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-white/80 hover:text-white transition-colors duration-150 inline-flex items-center gap-1.5"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Injected Children (e.g. Disclaimers, CTA button, Badges) */}
          {children && <div className="pt-4">{children}</div>}
        </div>

        {/* Lower Halftone Wordmark Canvas & Meta Bar */}
        <div className="relative mt-4 sm:mt-6 pt-0">
          {/* Halftone Canvas */}
          <div className="relative w-full h-40 sm:h-52 md:h-64 lg:h-72 xl:h-80 cursor-crosshair">
            <canvas
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handleClick}
              className="absolute inset-0 w-full h-full block"
            />
          </div>

          {/* Bottom Meta & Copyright Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2 border-t border-white/10">
            <p>{meta}</p>
            <p className="text-white/40">Interactive Dot Physics · Part on Hover · Click for Shockwave</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
