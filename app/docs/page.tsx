import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Install, CopyButton } from "@/components/install";
import { Terrain } from "@/components/terrain";
import { accessMeta, product, shortcuts, toolAreas, tools, uninstallCommands } from "@/lib/content";

export const metadata: Metadata = {
  title: "Guía",
  description:
    "Cómo instalar UTN FRM MCP en Windows, Linux o macOS, conectarlo a Codex, Claude Code, OpenCode o Claude Desktop, qué puede y qué no puede hacer con el Campus, Autogestión y el correo, y qué revisar si algo falla.",
  alternates: { canonical: "/docs" },
};

const situations = [
  { id: "conectar", label: "Instalar y conectar" },
  { id: "alcance", label: "Qué puede hacer" },
  { id: "probado", label: "Qué está probado" },
  { id: "privacidad", label: "Mi cuenta y mis datos" },
  { id: "problemas", label: "Algo no funciona" },
  { id: "desinstalar", label: "Desinstalar" },
];

const trouble = [
  {
    q: "No sé qué falla.",
    a: `Ejecutá primero ${product.cli} doctor. Muestra qué está bien y qué falta (Node.js, navegador, almacén seguro, sesión y clientes) y el comando que resuelve cada punto. No incluye rutas, usuarios ni datos del Campus, así que podés pegarlo al reportar. Con --offline no consulta al Campus.`,
  },
  {
    q: `No reconoce ${product.cli}, node, npm o el comando de tu cliente.`,
    a: `Instalá o reinstalá el requisito (Node.js ${product.node} o posterior) y abrí una terminal nueva para que tome el cambio.`,
  },
  {
    q: "La sesión venció.",
    a: `Ejecutá ${product.cli} login, o pedile a tu asistente «renová mi sesión del Campus». No hace falta reinstalar ni reiniciar el cliente: el servidor detecta la sesión renovada y sigue. Revisá el estado con ${product.cli} status.`,
  },
  {
    q: "No se abre el navegador, o dice que no existe después de actualizar.",
    a: `Ejecutá ${product.cli} install-browser: cada versión necesita su Chromium. En Linux, si faltan bibliotecas, agregá --with-deps (pide sudo).`,
  },
  {
    q: "No se puede guardar la sesión.",
    a: "Desbloqueá el Llavero de macOS, o usá una sesión gráfica de Linux con Secret Service, y repetí el login.",
  },
  {
    q: "Tu cliente no muestra utn-mendoza.",
    a: "Repetí el setup de tu cliente, confirmá con su comando mcp list y reiniciá el cliente. Si dice que ya existe, quitalo primero (mirá Desinstalar) y repetí.",
  },
  {
    q: "No aparecen materias o actividades.",
    a: `Revisá ${product.cli} status. Una lista vacía puede ser que no haya contenido visible para tu cuenta; un error significa que la consulta no se completó. Con muchas materias, get_deadlines y get_announcements pueden devolver resultados parciales: pedí las pendientes con el id de la materia.`,
  },
  {
    q: "El asistente no puede leer un archivo.",
    a: "La extracción depende del formato y puede ser parcial: el resultado lo indica. Para PDF con diagramas o fórmulas, get_pdf_page_image dibuja la página. Los PDF escaneados no se leen salvo que prepares el OCR opcional, que corre en tu equipo y no descarga modelos por su cuenta.",
  },
];

const env = [
  { k: "UTN_MCP_DEBUG=1", v: "Detalle técnico (sin URLs ni credenciales) cuando falla un comando." },
  { k: "UTN_MCP_CACHE=1", v: "Guarda en disco los archivos descargados. Está desactivada por defecto porque deja material académico sin cifrar." },
  { k: "UTN_MCP_DOWNLOAD_DIR", v: "Ruta absoluta de download_file. Por defecto, ~/Downloads/utn-mcp." },
  { k: "UTN_MCP_EXTERNAL_ALLOW", v: "Hosts extra, separados por coma, que read_external y study_pack pueden leer. Por defecto solo GitHub, Gist y Colab en GitHub." },
  { k: "UTN_MCP_MIN_REQUEST_INTERVAL_MS", v: "Pausa mínima entre consultas al Campus. Por defecto, 1000." },
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
              Todo para conectar <em>tu facultad.</em>
            </h1>
            <p>
              Versión {product.version}, {product.channel} para {product.platforms}. Elegí por dónde empezar.
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
                  inicia Node.js por su cuenta. Funciona en {product.platforms}; necesitás Node.js {product.node} o
                  posterior, una cuenta del Campus y un cliente de IA con MCP (Codex, Claude Code, OpenCode o Claude
                  Desktop).
                </p>
                <Install />
              </section>

              <section className="dsec" id="alcance" aria-labelledby="d-alcance">
                <h2 id="d-alcance">Qué puede hacer</h2>
                <p>
                  El servidor expone {tools.length} herramientas. Tu asistente elige cuál usar según lo que pidas, y la
                  facultad decide qué información está disponible para tu cuenta. Donde se pide una materia sirve su
                  nombre («ciencia de datos») en lugar del id.
                </p>
                {toolAreas.map((area) => {
                  const list = tools.filter((t) => t.area === area);
                  return (
                    <div className="tool-group" key={area}>
                      <h3>{area}</h3>
                      <ul className="tool-list">
                        {list.map((t) => (
                          <li key={t.name} className={`tool tool-${t.access}`}>
                            <span className="tool-access">{accessMeta[t.access].label}</span>
                            <code>{t.name}</code>
                            <span className="tool-does">{t.does}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
                <p className="callout">
                  <strong>Solo lectura en el Campus y en Autogestión.</strong> Las entregas, publicaciones, respuestas,
                  votos, eventos e inscripciones están deshabilitados; las herramientas de vista previa muestran qué
                  pasaría, pero no cambian nada. En el correo, mover a la Papelera, recuperar y marcar como leído piden tu
                  permiso en cada llamada; nunca envía ni borra de forma definitiva.
                </p>

                <h3 className="sub-h">Atajos</h3>
                <p>Tu cliente los muestra como acciones, con <code>/</code> o en el menú de prompts.</p>
                <ul className="tool-list">
                  {shortcuts.map((s) => (
                    <li key={s.name} className="tool tool-lectura">
                      <span className="tool-access">Atajo</span>
                      <code>{s.name}</code>
                      <span className="tool-does">{s.does}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="sub-h">Resumen semanal</h3>
                <p>
                  <code>{product.cli} digest</code> imprime qué vence en los próximos 7 días (<code>--days=N</code>), lo
                  vencido sin entregar y los avisos nuevos. <code>--notify</code> muestra una notificación del sistema,{" "}
                  <code>--json</code> entrega los datos y <code>--schedule-help</code> explica cómo programarlo con cron o
                  el Programador de tareas de Windows; no instala nada.
                </p>

                <h3 className="sub-h">Variables opcionales</h3>
                <dl className="trouble">
                  {env.map((e) => (
                    <div key={e.k}>
                      <dt><code>{e.k}</code></dt>
                      <dd>{e.v}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="dsec" id="probado" aria-labelledby="d-probado">
                <h2 id="d-probado">Qué está probado</h2>
                <ul className="dlist">
                  <li>
                    <strong>Integración continua:</strong> la instalación, el arranque del servidor, la lista de
                    herramientas, el registro de cada cliente, el almacenamiento seguro de una sesión de prueba y el inicio
                    de Chromium pasan en Windows, Linux y macOS. No usa cuentas reales.
                  </li>
                  <li>
                    <strong>Pruebas a mano:</strong> Linux se probó con una cuenta real (Campus, Autogestión y correo).
                    Windows tiene validación previa, pero el almacenamiento de credenciales con DPAPI todavía no se probó en
                    un Windows real. macOS necesita que estudiantes prueben con cuentas reales.
                  </li>
                  <li>
                    <strong>Sin probar a mano:</strong> <code>setup-codex</code> en cualquier sistema, y{" "}
                    <code>setup-claude</code> y <code>setup-opencode</code> en Windows y macOS.
                  </li>
                  <li>
                    Los resultados dependen de los permisos de tu cuenta y de la disponibilidad del Campus.
                  </li>
                </ul>
              </section>

              <section className="dsec" id="privacidad" aria-labelledby="d-priv">
                <h2 id="d-priv">Mi cuenta y mis datos</h2>
                <ul className="dlist">
                  <li>
                    <strong>Tu contraseña del Campus</strong> se escribe solo en la ventana de inicio de sesión del
                    Campus. No se guarda en la configuración del asistente.
                  </li>
                  <li>
                    <strong>Usuario y contraseña UTN</strong> (los necesitan Autogestión y el correo) se guardan solo si
                    los cargás en el asistente de instalación. Quedan cifrados con el almacén seguro del sistema (DPAPI en
                    Windows, Secret Service en Linux, Llavero en macOS), nunca en archivos de texto. Se borran con{" "}
                    <code>{product.cli} forget-credentials</code>; <code>logout</code> cierra la sesión pero no borra la
                    contraseña guardada.
                  </li>
                  <li>
                    <strong>La sesión</strong> se conserva en tu equipo. No la adjuntes a un issue ni la sincronices en
                    un repositorio público.
                  </li>
                  <li>
                    <strong>Lo que consultás</strong> vuelve al cliente MCP que uses y queda sujeto a su política de
                    privacidad. Revisala antes de consultar información sensible.
                  </li>
                  <li>
                    <strong>El tráfico</strong> va al Campus por HTTPS. Su contenido, y el de Autogestión y el correo, se
                    trata como datos externos, no como instrucciones para el asistente.
                  </li>
                  <li>
                    <strong>Archivos y enlaces:</strong> <code>download_file</code> solo escribe en su carpeta de descargas
                    y nunca sobrescribe. <code>read_external</code> solo contacta sitios de una lista permitida, por
                    https y sin tus cookies. La caché de archivos está apagada por defecto.
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
                  <a href={product.issues} target="_blank" rel="noreferrer">issue en GitHub ↗</a> con tu sistema operativo
                  y su versión, <code>node --version</code>, el paso y el mensaje de error, sin datos privados. Para
                  vulnerabilidades, usá <em>Report a vulnerability</em> en la pestaña Security del repositorio.
                </p>
              </section>

              <section className="dsec" id="desinstalar" aria-labelledby="d-des">
                <h2 id="d-des">Desinstalar</h2>
                <p>
                  Ejecutalos en este orden y quitá solo el registro del cliente que usaste. <code>logout</code> cierra la
                  sesión local, <code>forget-credentials</code> borra las credenciales guardadas, los <code>mcp remove</code>{" "}
                  quitan el registro del cliente y el último desinstala el paquete.
                </p>
                <div className="code">
                  <div className="code-bar">
                    <span>Terminal</span>
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
