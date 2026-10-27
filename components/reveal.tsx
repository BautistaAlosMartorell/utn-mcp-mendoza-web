"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Marca el bloque como visible la primera vez que entra al viewport.
 * El umbral se limita según la altura del bloque para que nunca quede oculto
 * (un bloque más alto que la pantalla jamás alcanzaría un umbral fijo del 35 %).
 */
export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  threshold = 0.25,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "li";
  threshold?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(() => setSeen(true), 0);
      return () => window.clearTimeout(id);
    }
    const h = el.getBoundingClientRect().height || 1;
    const t = Math.max(0.01, Math.min(threshold, (window.innerHeight * 0.6) / h));
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: t },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={`${className} reveal ${seen ? "is-in" : ""}`}>
      {children}
    </Comp>
  );
}
