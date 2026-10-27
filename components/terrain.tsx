"use client";

import { useEffect, useRef } from "react";

/**
 * Curvas de nivel generadas en vivo (marching squares sobre ruido fractal).
 * Pensado para costar poco: sin asignaciones por cuadro, límite de FPS, resolución
 * reducida en móviles, pausa fuera de pantalla o con la pestaña oculta y, con
 * "reducir movimiento" o ahorro de datos, un solo cuadro estático.
 */

const PERM = (() => {
  const p = new Uint8Array(512);
  const base = Array.from({ length: 256 }, (_, i) => i);
  let s = 1337;
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647;
    const j = s % (i + 1);
    [base[i], base[j]] = [base[j], base[i]];
  }
  for (let i = 0; i < 512; i++) p[i] = base[i & 255];
  return p;
})();

const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hash = (x: number, y: number, z: number) => PERM[PERM[PERM[x & 255] + (y & 255)] + (z & 255)] / 255;

function noise(x: number, y: number, z: number) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const u = fade(x - xi), v = fade(y - yi), w = fade(z - zi);
  const a = lerp(lerp(hash(xi, yi, zi), hash(xi + 1, yi, zi), u), lerp(hash(xi, yi + 1, zi), hash(xi + 1, yi + 1, zi), u), v);
  const b = lerp(lerp(hash(xi, yi, zi + 1), hash(xi + 1, yi, zi + 1), u), lerp(hash(xi, yi + 1, zi + 1), hash(xi + 1, yi + 1, zi + 1), u), v);
  return lerp(a, b, w);
}

const fbm = (x: number, y: number, z: number) =>
  noise(x, y, z) * 0.56 + noise(x * 2.03, y * 2.03, z * 1.4) * 0.3 + noise(x * 4.1, y * 4.1, z * 1.9) * 0.14;

interface Props {
  className?: string;
  /** Un solo cuadro, sin animación ni cursor; se dibuja recién cuando se acerca a la pantalla. */
  still?: boolean;
  /** Color de línea RGB, "r,g,b". */
  rgb?: string;
  levels?: number;
  /** Cotas a la manera de un mapa: posiciones relativas [x, y] (0 a 1) con la altura del punto. */
  spots?: [number, number][];
}

export function Terrain({ className = "", still = false, rgb = "242,180,65", levels = 24, spots }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const spotsKey = JSON.stringify(spots ?? []);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const spotList = JSON.parse(spotsKey) as [number, number][];
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const frozen = still || reduce || nav.connection?.saveData === true;
    const small = window.innerWidth < 700;
    const frameMs = 1000 / (coarse || small ? 24 : 40);
    const nLevels = small ? Math.min(levels, 16) : levels;

    const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-mono").trim() || "monospace";
    let w = 1, h = 1, dpr = 1, cols = 0, rows = 0, cell = 13;
    let field = new Float32Array(0);
    let cmin = new Float32Array(0);
    let cmax = new Float32Array(0);
    let raf = 0, running = false, visible = true, last = 0, resizeRaf = 0, drawn = false;
    const mouse = { x: 0.7, y: 0.4, tx: 0.7, ty: 0.4, active: 0 };
    let activeT = 0;
    const t0 = performance.now();

    const draw = (now: number) => {
      const time = frozen ? 0 : (now - t0) * 0.00004;
      const scrollY = frozen ? 0 : window.scrollY * 0.0006;
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;
      activeT += ((mouse.active ? 1 : 0) - activeT) * 0.06;

      const sx = 4.4 / (w / cell);
      let min = 1e9, max = -1e9;
      for (let j = 0; j < rows; j++) {
        const dy = (j * cell) / h - mouse.y;
        for (let i = 0; i < cols; i++) {
          let v = fbm(i * sx + 3.1, j * sx + 1.7 + scrollY, time);
          v += (i / cols) * 0.22 - (j / rows) * 0.1;
          if (activeT > 0.01) {
            const dx = ((i * cell) / w - mouse.x) * (w / h);
            v += activeT * 0.2 * Math.exp(-(dx * dx + dy * dy) / 0.02);
          }
          field[j * cols + i] = v;
          if (v < min) min = v;
          if (v > max) max = v;
        }
      }
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const k = j * cols + i;
          const a = field[k], b = field[k + 1], c = field[k + cols + 1], d = field[k + cols];
          cmin[k] = Math.min(a, b, c, d);
          cmax[k] = Math.max(a, b, c, d);
        }
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      const span = max - min || 1;
      for (let L = 1; L < nLevels; L++) {
        const level = min + (span * L) / nLevels;
        const major = L % 5 === 0;
        ctx.beginPath();
        let any = false;
        for (let j = 0; j < rows - 1; j++) {
          const y0 = j * cell;
          for (let i = 0; i < cols - 1; i++) {
            const k = j * cols + i;
            if (cmin[k] > level || cmax[k] < level) continue;
            const a = field[k], b = field[k + 1], c = field[k + cols + 1], d = field[k + cols];
            const mask = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0);
            if (mask === 0 || mask === 15) continue;
            const x0 = i * cell;
            const tx = x0 + cell * ((level - a) / (b - a)); // arriba
            const ry = y0 + cell * ((level - b) / (c - b)); // derecha
            const bx = x0 + cell * ((level - d) / (c - d)); // abajo
            const ly = y0 + cell * ((level - a) / (d - a)); // izquierda
            const xr = x0 + cell, yb = y0 + cell;
            any = true;
            switch (mask) {
              case 1: case 14: ctx.moveTo(x0, ly); ctx.lineTo(bx, yb); break;
              case 2: case 13: ctx.moveTo(bx, yb); ctx.lineTo(xr, ry); break;
              case 3: case 12: ctx.moveTo(x0, ly); ctx.lineTo(xr, ry); break;
              case 4: case 11: ctx.moveTo(tx, y0); ctx.lineTo(xr, ry); break;
              case 5: ctx.moveTo(x0, ly); ctx.lineTo(tx, y0); ctx.moveTo(bx, yb); ctx.lineTo(xr, ry); break;
              case 6: case 9: ctx.moveTo(tx, y0); ctx.lineTo(bx, yb); break;
              case 7: case 8: ctx.moveTo(x0, ly); ctx.lineTo(tx, y0); break;
              case 10: ctx.moveTo(x0, ly); ctx.lineTo(bx, yb); ctx.moveTo(tx, y0); ctx.lineTo(xr, ry); break;
            }
          }
        }
        if (!any) continue;
        ctx.strokeStyle = `rgba(${rgb},${major ? 0.55 : 0.2 + (L / nLevels) * 0.1})`;
        ctx.lineWidth = major ? 1.25 : 0.8;
        ctx.stroke();
      }
      if (spotList.length && w > 560) {
        ctx.font = `500 10.5px ${mono}`;
        ctx.textBaseline = "middle";
        for (const [fx, fy] of spotList) {
          const i = Math.min(cols - 1, Math.max(0, Math.round((fx * w) / cell)));
          const j = Math.min(rows - 1, Math.max(0, Math.round((fy * h) / cell)));
          const elev = Math.round((700 + ((field[j * cols + i] - min) / span) * 6200) / 10) * 10;
          const x = fx * w, y = fy * h;
          ctx.strokeStyle = `rgba(${rgb},0.9)`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4);
          ctx.stroke();
          ctx.fillStyle = `rgba(${rgb},0.8)`;
          ctx.fillText(`${elev.toLocaleString("es-AR")} m`, x + 9, y + 0.5);
        }
      }
      drawn = true;
    };

    const size = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      dpr = Math.min(window.devicePixelRatio || 1, coarse || small ? 1.25 : 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      cell = w < 700 ? 16 : 13;
      cols = Math.ceil(w / cell) + 2;
      rows = Math.ceil(h / cell) + 2;
      field = new Float32Array(cols * rows);
      cmin = new Float32Array(cols * rows);
      cmax = new Float32Array(cols * rows);
      if (!still || drawn) draw(performance.now());
    };

    const loop = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(loop);
      if (now - last < frameMs) return;
      last = now;
      draw(now);
    };
    const start = () => {
      if (running || frozen || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(size);
    });
    ro.observe(canvas);

    // Los estáticos esperan a estar cerca de la pantalla; los animados se pausan fuera de ella.
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (still) {
          if (visible && !drawn) draw(performance.now());
          return;
        }
        if (visible) start();
        else stop();
      },
      { rootMargin: still ? "400px 0px" : "0px" },
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) {
        mouse.active = 0;
        return;
      }
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = (e.clientY - r.top) / r.height;
      mouse.active = 1;
    };
    const onLeave = () => {
      mouse.active = 0;
    };
    if (!frozen && !coarse) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [still, rgb, levels, spotsKey]);

  return <canvas ref={ref} className={`terrain ${className}`} aria-hidden="true" />;
}
