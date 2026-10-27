import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Install, CopyButton } from "@/components/install";
import { Terrain } from "@/components/terrain";
import { accessMeta, product, tools, uninstallCommands } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guía",
  description:
    "Cómo instalar UTN FRM MCP en Windows, conectarlo a Codex u otro cliente MCP, qué puede y qué no puede hacer la beta y qué revisar si algo falla.",
  alternates: { canonical: "/docs" },
};

const situations = [
  { id: "conectar", label: "Instalar y conectar" },
  { id: "alcance", label: "Qué puede hacer" },
  { id: "privacidad", label: "Mi cuenta y mis datos" },
  { id: "problemas", label: "Algo no funciona" },
  { id: "desinstalar", label: "Desinstalar" },
];

const trouble = [
  {
    q: `No reconoce ${product.cli} o node.`,
    a: `Instalá Node.js ${product.node} o posterior y abrí una consola nueva para que tome el cambio.`,
  },
  {
    q: "No se abre Chromium.",
    a: `Ejecutá de nuevo ${product.cli} install-browser y después ${product.cli} login.`,
  },
  {
    q: "La sesión venció.",
    a: `Ejecutá ${product.cli} login, iniciá sesión manualmente y revisá el estado con ${product.cli} status. No compartas credenciales por un issue.`,
  },
  {
    q: "Codex no muestra las herramientas.",
    a: `Repetí ${product.cli} setup-codex, ejecutá el comando que imprime, comprobá con codex mcp list y reiniciá Codex.`,
  },
  {
    q: "Una materia no tiene contenido.",
    a: "Puede devolver una lista vacía: depende de lo que cada materia tenga publicado. Los errores de sesión, permisos o conexión se informan como errores.",
  },
  {
    q: "El asistente no puede leer un archivo.",
    a: "La extracción depende del formato y puede ser parcial: el resultado lo indica. Los PDF escaneados no se leen salvo que prepares el OCR opcional, que corre en tu equipo y no descarga modelos por su cuenta.",
  },
];

export default function Docs() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <div className="doc-head">
          <Terrain className="doc-terrain" still />
          <div className="wrap">
            <p className="eyebrow">Guía</p>
            <h1>
              Todo para conectar <em>tu Campus.</em>
            </h1>
            <p>
              Versión {product.version}, {product.channel} para {product.platform}. Elegí por dónde empezar.
            </p>
            <div className="situations">
              {situations.map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="doc-body">
          <div className="wrap doc-layout">
            <nav className="toc" aria-label="En esta guía">
              <p>En esta guía</p>
              {situations.map((s) => (
                <a key={s.id} href={`#${s.id}`}>{s.label}</a>
              ))}
            </nav>

            <div>
              <section className="dsec" id="conectar" aria-labelledby="d-conectar">
                <h2 id="d-conectar">Instalar y conectar</h2>
                <p>
                  UTN FRM MCP corre en tu computadora y se comunica con tu asistente por STDIO: la aplicación compatible
                  inicia Node.js por su cuenta. La versión publicada es para {product.platform}; necesitás Node.js{" "}
                  {product.node} o posterior y una cuenta del Campus.
                </p>
                <Install />
              </section>

              <section className="dsec" id="alcance" aria-labelledby="d-alcance">
                <h2 id="d-alcance">Qué puede hacer</h2>
                <p>
                  El servidor expone {tools.length} herramientas. Tu asistente elige cuál usar según lo que pidas, y el
                  Campus decide qué información está disponible para tu cuenta.
                </p>
                <ul className="tool-list">
                  {tools.map((t) => (
                    <li key={t.name} className={`tool tool-${t.access}`}>
                      <span className="tool-access">{accessMeta[t.access].label}</span>
                      <code>{t.name}</code>
                      <span className="tool-does">{t.does}</span>
                    </li>
                  ))}
                </ul>
                <p className="callout">
                  <strong>Beta de solo lectura.</strong> Las publicaciones, votos, eventos y entregas están
                  deshabilitados. Las herramientas de vista previa muestran qué pasaría, pero no cambian nada en el
                  Campus. No intentes habilitar las entregas en esta versión.
                </p>
              </section>

              <section className="dsec" id="privacidad" aria-labelledby="d-priv">
                <h2 id="d-priv">Mi cuenta y mis datos</h2>
                <ul className="dlist">
                  <li>
                    <strong>Tu contraseña</strong> se escribe solo en la página del Campus. No se guarda en la
                    configuración del asistente.
                  </li>
                  <li>
                    <strong>La sesión</strong> se conserva en tu equipo y, en Windows, se protege con DPAPI para tu
                    cuenta de usuario. No compartas la carpeta de sesión ni el archivo{" "}
                    <code>storageState.dpapi</code>.
                  </li>
                  <li>
                    <strong>Lo que consultás</strong> vuelve al cliente MCP que uses y queda sujeto a su política de
                    privacidad. Revisala antes de consultar información sensible.
                  </li>
                  <li>
                    <strong>El tráfico</strong> va al Campus por HTTPS. Su contenido se trata como datos externos, no
                    como instrucciones para el asistente.
                  </li>
                  <li>
                    <strong>Si reportás un problema</strong>, nunca adjuntes contraseñas, cookies, archivos de sesión,
                    capturas del Campus ni consignas o calificaciones personales.
                  </li>
                </ul>
                <p>
                  UTN FRM MCP es un proyecto independiente y no oficial, sin afiliación ni aval de la Universidad
                  Tecnológica Nacional. Licencia MIT.{" "}
                  <a className="inline" href={product.security} target="_blank" rel="noreferrer">
                    Política de seguridad y privacidad ↗
                  </a>
                </p>
              </section>

              <section className="dsec" id="problemas" aria-labelledby="d-prob">
                <h2 id="d-prob">Algo no funciona</h2>
                <dl className="trouble">
                  {trouble.map((t) => (
                    <div key={t.q}>
                      <dt>{t.q}</dt>
                      <dd>{t.a}</dd>
                    </div>
                  ))}
                </dl>
                <p className="note">
                  ¿Sigue sin andar? Abrí un{" "}
                  <a href={product.issues} target="_blank" rel="noreferrer">issue en GitHub ↗</a> sin datos privados.
                  Para vulnerabilidades, usá <em>Report a vulnerability</em> en la pestaña Security del repositorio.
                </p>
              </section>

              <section className="dsec" id="desinstalar" aria-labelledby="d-des">
                <h2 id="d-des">Desinstalar</h2>
                <p>
                  <code>logout</code> borra la sesión local de Moodle. Los otros dos comandos quitan el registro de
                  Codex y el paquete.
                </p>
                <div className="code">
                  <div className="code-bar">
                    <span>PowerShell</span>
                    <CopyButton text={uninstallCommands} />
                  </div>
                  <pre>
                    <code>{uninstallCommands}</code>
                  </pre>
                </div>
                <Link href="/" className="back">← Volver al inicio</Link>
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
