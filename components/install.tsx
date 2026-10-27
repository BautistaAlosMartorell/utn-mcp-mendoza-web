"use client";

import { useId, useRef, useState } from "react";
import {
  clients,
  installByOs,
  loginCommands,
  product,
  prompts,
  wizardCommand,
  type ClientId,
  type OsId,
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

function Tabs<T extends string>({
  label,
  items,
  value,
  onChange,
  panelId,
  uid,
}: {
  label: string;
  items: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  panelId: string;
  uid: string;
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    onChange(items[next].id);
    tabs.current[next]?.focus();
  };
  return (
    <div className="pick">
      <div role="tablist" aria-label={label} className="tabs">
        {items.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${uid}-tab-${c.id}`}
            aria-selected={value === c.id}
            aria-controls={panelId}
            tabIndex={value === c.id ? 0 : -1}
            onClick={() => onChange(c.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Install() {
  const uid = useId();
  const [osId, setOsId] = useState<OsId>("windows");
  const [clientId, setClientId] = useState<ClientId>("codex");
  const os = installByOs.find((o) => o.id === osId)!;
  const client = clients.find((c) => c.id === clientId)!;
  const osPanel = `${uid}-os-panel`;
  const clientPanel = `${uid}-client-panel`;

  return (
    <ol className="steps">
      <li className="step">
        <div className="step-n" aria-hidden="true">1</div>
        <div className="step-body">
          <h3>Instalá el paquete</h3>
          <p>
            Necesitás Node.js {product.node} o posterior y un cliente de IA con MCP ya instalado. En la{" "}
            <a className="inline" href={product.release} target="_blank" rel="noreferrer">
              página de releases
            </a>
            , sección <em>Assets</em> de la versión {product.version}, bajá <code>{product.pkgName}</code> y su{" "}
            <code>.sha256</code> y guardalos juntos en una carpeta <code>utn-mcp-beta</code> dentro de Descargas. No
            hace falta clonar nada ni bajar el <em>Source code</em>.
          </p>

          <Tabs
            label="Sistema operativo"
            items={installByOs}
            value={osId}
            onChange={setOsId}
            panelId={osPanel}
            uid={`${uid}-os`}
          />

          <div role="tabpanel" id={osPanel} aria-labelledby={`${uid}-os-tab-${osId}`}>
            {os.before && <p className="warn-note">{os.before}</p>}
            <Code label={os.shell} text={os.install} prompt />
            {os.note && <p className="note">{os.note}</p>}
            <details className="verify">
              <summary>Verificar el instalador (recomendado)</summary>
              <p>Corré esto antes de instalar, en la misma carpeta. Tiene que decir que está bien; si no, volvé a descargarlo.</p>
              <Code label={os.shell} text={os.verify} />
            </details>
          </div>
        </div>
      </li>

      <li className="step">
        <div className="step-n" aria-hidden="true">2</div>
        <div className="step-body">
          <h3>Conectá tu cuenta</h3>
          <p>
            El camino corto es el asistente guiado: revisa tu equipo, instala el navegador si falta, ofrece guardar tu
            usuario y contraseña UTN cifrados (opcional), abre el Campus para que inicies sesión, conecta los clientes de
            IA que encuentre y termina con una prueba real. Si lo usás, podés saltar el paso 3.
          </p>
          <Code label="Terminal" text={wizardCommand} prompt />
          <details className="verify">
            <summary>Prefiero hacerlo a mano</summary>
            <p>
              Se abre una ventana del Campus. Escribí tu usuario y contraseña ahí; al confirmar el acceso la sesión se
              guarda y la ventana se cierra sola.
            </p>
            <Code label="Terminal" text={loginCommands} prompt />
          </details>
          <p className="note">
            Tu contraseña del Campus se escribe solo en su página. Autogestión y el correo necesitan usuario y contraseña
            guardados, y eso es opcional: se cifran con el almacén del sistema y los borrás con{" "}
            <code>{product.cli} forget-credentials</code>. La sesión vence a las pocas horas: volvé a correr{" "}
            <code>login</code> o pedile a tu asistente «renová mi sesión del Campus».
          </p>
        </div>
      </li>

      <li className="step">
        <div className="step-n" aria-hidden="true">3</div>
        <div className="step-body">
          <h3>Conectalo a tu asistente</h3>
          <p>
            Cada comando registra el servidor con la ruta correcta de tu instalación, así que no tenés que escribir
            ninguna.
          </p>

          <Tabs
            label="Cliente de IA"
            items={clients}
            value={clientId}
            onChange={setClientId}
            panelId={clientPanel}
            uid={`${uid}-client`}
          />

          <div role="tabpanel" id={clientPanel} aria-labelledby={`${uid}-client-tab-${clientId}`}>
            {client.commands && <Code label="Terminal" text={client.commands} prompt />}
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
          <h3>Preguntale a tu facultad</h3>
          <p>
            Reiniciá el cliente y probá con algo concreto. Una lista vacía significa que no hay contenido visible para tu
            cuenta; los errores de sesión, permisos o conexión se informan como errores.
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
