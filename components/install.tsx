"use client";

import { useId, useRef, useState } from "react";
import {
  clients,
  installCommands,
  loginCommands,
  product,
  prompts,
  verifyCommand,
  type ClientId,
} from "@/lib/content";

export function CopyButton({ text, label = "Copiar" }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);
  const t = useRef<number | null>(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    if (t.current) window.clearTimeout(t.current);
    t.current = window.setTimeout(() => setDone(false), 1800);
  };
  return (
    <button type="button" className={`copy ${done ? "is-done" : ""}`} onClick={copy} aria-live="polite">
      {done ? "Copiado ✓" : label}
    </button>
  );
}

function Code({ label, text, prompt = false }: { label: string; text: string; prompt?: boolean }) {
  const lines = text.split("\n");
  return (
    <div className="code">
      <div className="code-bar">
        <span>{label}</span>
        <CopyButton text={text} />
      </div>
      <pre>
        <code>
          {prompt
            ? lines.map((l, i) => (
                <span key={i}>
                  {l.startsWith("#") ? <span className="cmt">{l}</span> : <><span className="prompt">$ </span>{l}</>}
                  {i < lines.length - 1 ? "\n" : ""}
                </span>
              ))
            : text}
        </code>
      </pre>
    </div>
  );
}

export function Install() {
  const uid = useId();
  const [clientId, setClientId] = useState<ClientId>("codex");
  const client = clients.find((c) => c.id === clientId)!;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = clients.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setClientId(clients[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <ol className="steps">
      <li className="step">
        <div className="step-n" aria-hidden="true">1</div>
        <div className="step-body">
          <h3>Instalá el paquete</h3>
          <p>
            Necesitás {product.platform} y Node.js {product.node} o posterior. Abrí PowerShell: el comando descarga el
            paquete de la{" "}
            <a className="inline" href={product.release} target="_blank" rel="noreferrer">
              release v{product.version}
            </a>
            , lo instala y prepara Chromium para el inicio de sesión. No hace falta clonar nada.
          </p>
          <Code label="PowerShell" text={installCommands} />
          <details className="verify">
            <summary>Verificar la descarga (opcional)</summary>
            <p>
              Comparás el hash del archivo con el que publica la release. Debería ser{" "}
              <code className="hash">{product.sha256}</code>
            </p>
            <Code label="PowerShell" text={verifyCommand} />
          </details>
        </div>
      </li>

      <li className="step">
        <div className="step-n" aria-hidden="true">2</div>
        <div className="step-body">
          <h3>Iniciá sesión una vez</h3>
          <p>
            Se abre Chromium en el sitio oficial del Campus. Iniciá sesión ahí; cuando veas tu página principal, volvé a
            la consola y presioná Enter para guardar la sesión local.
          </p>
          <Code label="PowerShell" text={loginCommands} prompt />
          <p className="note">
            Tu contraseña se escribe solo en la página del Campus: no pasa por el asistente ni se guarda en ninguna
            configuración. En Windows la sesión queda protegida con DPAPI para tu usuario.
          </p>
        </div>
      </li>

      <li className="step">
        <div className="step-n" aria-hidden="true">3</div>
        <div className="step-body">
          <h3>Conectalo a tu asistente</h3>
          <p>
            El comando imprime la configuración con la ruta correcta de tu instalación, así que no tenés que escribir
            ninguna.
          </p>

          <div className="pick">
            <div role="tablist" aria-label="Cliente de IA" className="tabs">
              {clients.map((c, i) => (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${c.id}`}
                  aria-selected={clientId === c.id}
                  aria-controls={`${uid}-panel`}
                  tabIndex={clientId === c.id ? 0 : -1}
                  onClick={() => setClientId(c.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  {c.label}
                  {c.tested && <i className="tested">Probado</i>}
                </button>
              ))}
            </div>
          </div>

          <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${clientId}`}>
            {!client.tested && (
              <p className="warn-note">
                Configuración generada por el servidor, pero sin probar en {client.label} en esta versión.
              </p>
            )}
            {client.commands && <Code label="PowerShell" text={client.commands} prompt />}
            {client.json && (
              <>
                <p className="note file-note">Pegalo en <code>{client.file ?? "la configuración MCP del cliente"}</code>. Forma del bloque:</p>
                <Code label={client.file ?? "JSON"} text={client.json} />
              </>
            )}
            <p className="note">
              {client.how}
              {client.doc && (
                <>
                  {" "}
                  <a href={client.doc.href} target="_blank" rel="noreferrer">
                    {client.doc.label} ↗
                  </a>
                </>
              )}
            </p>
          </div>
        </div>
      </li>

      <li className="step">
        <div className="step-n" aria-hidden="true">4</div>
        <div className="step-body">
          <h3>Preguntale a tu Campus</h3>
          <p>
            Reiniciá el cliente y probá con algo concreto. Una materia sin contenido devuelve una lista vacía; los
            errores de sesión, permisos o conexión se informan como errores.
          </p>
          <ul className="try-list">
            {prompts.map((p) => (
              <li key={p}>
                <span>&ldquo;{p}&rdquo;</span>
                <CopyButton text={p} label="Copiar" />
              </li>
            ))}
          </ul>
        </div>
      </li>
    </ol>
  );
}
