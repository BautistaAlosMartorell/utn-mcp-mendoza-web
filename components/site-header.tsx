"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoMark } from "./logo";
import { product } from "@/lib/content";

const links: { href: string; label: string; external?: boolean }[] = [
  { href: "/#que-hace", label: "Qué hace" },
  { href: "/#como-funciona", label: "Cómo funciona" },
  { href: "/#control", label: "Seguridad" },
  { href: "/docs", label: "Guía" },
  { href: product.repo, label: "GitHub ↗", external: true },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <a className="skip" href="#contenido">Saltar al contenido</a>
      <div className="wrap hdr-in">
        <Link href="/" className="brand" aria-label="UTN FRM MCP, inicio" onClick={() => setOpen(false)}>
          <LogoMark />
          <span>UTN FRM <i>MCP</i></span>
        </Link>
        <nav className="hdr-nav" aria-label="Principal">
          {links.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ) : (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ),
          )}
        </nav>
        <Link href="/#empezar" className="btn btn-sm btn-sol hdr-cta">Empezar</Link>
        <button
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span />
        </button>
      </div>
      <div id="menu-movil" className="m-menu" hidden={!open}>
        <nav aria-label="Móvil">
          {links.map((l) =>
            l.external ? (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
            ) : (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ),
          )}
          <Link href="/#empezar" className="btn btn-sol" onClick={() => setOpen(false)}>Empezar</Link>
        </nav>
      </div>
    </header>
  );
}
