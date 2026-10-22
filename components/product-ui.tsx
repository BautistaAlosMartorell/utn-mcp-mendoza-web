"use client";

import { useState } from "react";

const examples = {
  courses: {
    tool: "list_courses",
    label: "Listar materias",
    call: '{ "tool": "list_courses", "arguments": {} }',
    result: '{\n  "courses": [\n    { "name": "Álgebra I", "code": "MAT-101" },\n    { "name": "Sistemas", "code": "INF-204" }\n  ],\n  "demo": true\n}',
    note: "Datos inventados para mostrar el formato. No provienen de una cuenta real.",
  },
  tasks: {
    tool: "list_assignments",
    label: "Ver actividades",
    call: '{ "tool": "list_assignments", "arguments": { "course_id": "demo-01" } }',
    result: '{\n  "assignments": [\n    { "title": "Guía de ejercicios", "status": "open" },\n    { "title": "Práctica 02", "status": "submitted" }\n  ],\n  "demo": true\n}',
    note: "Ejemplo sintético: los cursos y estados reales dependen de tu acceso al Campus.",
  },
  files: {
    tool: "read_file",
    label: "Leer un archivo",
    call: '{ "tool": "read_file", "arguments": { "url": "campus://archivo-demo" } }',
    result: '{\n  "text": "Contenido extraído…",\n  "format": "markdown",\n  "status": "partial",\n  "demo": true\n}',
    note: "La extracción puede ser parcial. Los PDF escaneados no tienen OCR.",
  },
} as const;

type ExampleKey = keyof typeof examples;

export function DemoConsole() {
  const [active, setActive] = useState<ExampleKey>("courses");
  const example = examples[active];
  return (
    <div className="demo-console">
      <div className="demo-rail">
        <p className="mono-label">ELEGÍ UNA CONSULTA</p>
        <div className="demo-options" role="group" aria-label="Ejemplos de herramientas MCP">
          {(Object.keys(examples) as ExampleKey[]).map((key, index) => (
            <button
              type="button"
              key={key}
              className={`demo-option ${active === key ? "is-active" : ""}`}
              aria-pressed={active === key}
              onClick={() => setActive(key)}
            >
              <span className="demo-index">0{index + 1}</span>{examples[key].label}
              <span aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
        <p className="demo-note">{example.note}</p>
      </div>
      <div className="demo-stage" aria-live="polite" aria-atomic="true">
        <div className="terminal-top"><span><i /> llamada MCP</span><span>STDIO / JSON</span></div>
        <div className="terminal-block">
          <p className="terminal-caption"><span>01</span> EL CLIENTE PIDE</p>
          <code>{example.call}</code>
        </div>
        <div className="terminal-separator"><span>servidor local procesa la consulta</span><b>↓</b></div>
        <div className="terminal-block terminal-result">
          <p className="terminal-caption"><span>02</span> RESPUESTA ESTRUCTURADA</p>
          <pre>{example.result}</pre>
        </div>
        <p className="terminal-foot">DEMO SINTÉTICA <span>·</span> SIN DATOS DE ESTUDIANTES</p>
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  const [active, setActive] = useState(1);
  const details = [
    "Un cliente compatible inicia el servidor local mediante STDIO. No hay endpoint HTTP público.",
    "El servidor interpreta cada solicitud y consulta el Campus con una sesión local. Las escrituras tienen políticas separadas.",
    "Moodle devuelve solo lo que esa cuenta puede ver. Cursos, permisos y contenido varían entre estudiantes.",
  ];
  return (
    <div className="architecture-wrap">
      <div className="architecture" aria-label="Diagrama de la conexión entre cliente, servidor local y Moodle">
        <button className={`arch-node client-node ${active === 0 ? "selected" : ""}`} onClick={() => setActive(0)} aria-pressed={active === 0}>
          <span className="arch-number">01 / APLICACIÓN</span><strong>Tu cliente<br />de IA</strong><span className="arch-detail">Codex · compatible con MCP</span>
        </button>
        <div className="arch-link"><span className="link-label">STDIO</span><span className="link-line"><i /></span><span className="link-arrow">›</span></div>
        <button className={`arch-node server-node ${active === 1 ? "selected" : ""}`} onClick={() => setActive(1)} aria-pressed={active === 1}>
          <span className="arch-number">02 / PROCESO LOCAL</span><strong>UTN FRM<br />MCP</strong><span className="arch-detail">Interpreta y limita cada operación</span>
          <svg className="server-mark" viewBox="0 0 72 72" role="img" aria-label="Diagrama de nodos conectados"><path d="M36 6v60M6 36h60M15 15l42 42m0-42L15 57"/><circle cx="36" cy="36" r="11"/><circle cx="36" cy="6" r="3"/><circle cx="66" cy="36" r="3"/><circle cx="36" cy="66" r="3"/><circle cx="6" cy="36" r="3"/></svg>
        </button>
        <div className="arch-link"><span className="link-label">HTTPS · LECTURA</span><span className="link-line"><i /></span><span className="link-arrow">›</span></div>
        <button className={`arch-node campus-node ${active === 2 ? "selected" : ""}`} onClick={() => setActive(2)} aria-pressed={active === 2}>
          <span className="arch-number">03 / ORIGEN</span><strong>Campus<br />Virtual</strong><span className="arch-detail">Moodle · UTN FRM</span>
          <svg className="campus-mark" viewBox="0 0 100 54" aria-hidden="true"><path d="M2 48 29 16l12 13L57 6l41 42M2 51h96"/><path d="m22 48 7-9 8 9m9 0 11-15 13 15m12 0 8-9 8 9"/></svg>
        </button>
      </div>
      <div className="arch-explainer" aria-live="polite"><span className="live-pulse" />{details[active]}<span className="arch-privacy">TU SESIÓN PERMANECE LOCAL</span></div>
    </div>
  );
}

const configText = `{
  "mcpServers": {
    "utn-mendoza": {
      "command": "node",
      "args": ["C:/ruta/a/utn-mcp-mendoza/dist/index.js"]
    }
  }
}`;

export function CopyConfig() {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(configText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return <div className="config-code"><pre>{configText}</pre><button type="button" onClick={copy} aria-label="Copiar configuración de Codex">{copied ? "COPIADO ✓" : "COPIAR ↗"}</button><p>Reemplazá <code>C:/ruta/a/…</code> por la ruta absoluta en tu equipo.</p></div>;
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu"><button aria-expanded={open} aria-controls="mobile-links" onClick={() => setOpen(!open)}>{open ? "CERRAR −" : "MENÚ +"}</button>{open && <nav id="mobile-links" aria-label="Navegación móvil"><a href="#como-funciona" onClick={() => setOpen(false)}>Cómo funciona</a><a href="#capacidades" onClick={() => setOpen(false)}>Capacidades</a><a href="#instalacion" onClick={() => setOpen(false)}>Instalación</a><a href="/docs">Documentación</a></nav>}</div>;
}
