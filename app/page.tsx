import Link from "next/link";
import { ArchitectureDiagram, CopyConfig, DemoConsole, MobileMenu } from "@/components/product-ui";

const capacities = [
  { n: "01", title: "Materias y campus", status: "Verificado · lectura", text: "Listar cursos matriculados mediante tu sesión del Campus. En la comprobación del 22/10/2026 se recuperaron 12 cursos." },
  { n: "02", title: "Actividades y recursos", status: "Verificado · lectura", text: "Recorrer cursos, listar recursos y consultar actividades. Se comprobó en tres cursos; lo disponible cambia según cada curso." },
  { n: "03", title: "Archivos", status: "Parcial · lectura", text: "Extraer texto de formatos comunes. Un PDF real devolvió texto parcial. No incluye OCR para documentos escaneados." },
  { n: "04", title: "Foros y participantes", status: "Contrato disponible · campus pendiente", text: "Hay herramientas para consultar foros, hilos y participantes; estas operaciones no se validaron en vivo en esta muestra." },
  { n: "05", title: "Notas y calendario", status: "Contrato disponible · campus pendiente", text: "Las herramientas existen, pero notas y calendario no se verificaron en esta revisión del Campus Mendoza." },
  { n: "06", title: "Acciones de escritura", status: "Bloqueadas o experimentales", text: "Publicar en foros, responder, votar o crear eventos solo muestra una vista previa. Entregas: aprobación local separada y ejecución apagada hasta validar un envío supervisado real." },
];

const faqs = [
  ["¿Esto es un chatbot o un tutor?", "No. Es un servidor MCP local que conecta aplicaciones compatibles con el Campus. El cliente de IA que elijas interpreta la información; UTN FRM MCP no reemplaza clases, docentes ni tu trabajo."],
  ["¿Quién puede ver mis credenciales?", "Iniciás sesión en el navegador del Campus. El estado queda en tu equipo: en Windows, las nuevas sesiones se cifran con DPAPI para tu cuenta; en POSIX se guardan con permisos restrictivos. No compartas ni subas esos archivos."],
  ["¿Se modifican tareas o publicaciones?", "Las cuatro herramientas de escritura para foros, calendario y elecciones están bloqueadas en modo vista previa. El flujo de entrega está separado, requiere aprobación humana local y continúa apagado porque todavía no se validó una entrega supervisada real."],
  ["¿Necesito una cuenta UTN FRM?", "Sí, necesitás una cuenta con acceso al Campus Virtual de la Facultad Regional Mendoza. El MCP no crea cuentas ni evita permisos, autenticación o controles del Campus."],
  ["¿Funciona con cualquier IA?", "El servidor usa transporte STDIO: el cliente debe poder iniciar Node.js localmente y ser compatible con MCP. Codex es el primer cliente indicado para configuración. No es un servicio HTTP remoto."],
  ["¿Cuánto cuesta y dónde lo descargo?", "El código no tiene aún una publicación npm. La web no inventa un instalador ni un repositorio: hasta que haya una distribución pública, la instalación depende de tener el código fuente del proyecto. La licencia del repositorio es MIT."],
  ["¿Está disponible SysAcad?", "No. Es una integración futura, todavía no disponible."],
] as const;

export default function Home() {
  return (
    <>
      <header className="site-header">
        <Link className="wordmark" href="#inicio" aria-label="UTN FRM MCP, inicio"><span className="wordmark-symbol">m<span>·</span></span><span>UTN FRM<br />MCP</span></Link>
        <p className="header-context">PUENTE LOCAL <span>—</span> CAMPUS VIRTUAL</p>
        <nav className="desktop-nav" aria-label="Navegación principal"><a href="#como-funciona">Cómo funciona</a><a href="#capacidades">Capacidades</a><a href="#instalacion">Instalación</a><Link href="/docs">Docs ↗</Link></nav>
        <MobileMenu />
      </header>

      <main id="inicio">
        <section className="hero section-shell">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-mark" /> PROYECTO INDEPENDIENTE <span className="eyebrow-rule" /> MENDOZA, AR</p>
            <h1>El Campus,<br /><em>en contexto.</em></h1>
            <p className="hero-lede">UTN FRM MCP conecta tu sesión del Campus Virtual con clientes de IA compatibles. Una herramienta local para consultar información académica con tus propios permisos.</p>
            <div className="hero-actions"><a className="button-primary" href="#como-funciona">Explorar el sistema <span>↓</span></a><Link className="text-link" href="/docs">Ver documentación <span>↗</span></Link></div>
            <p className="hero-disclaimer">No es un chatbot ni un producto oficial de la UTN.</p>
          </div>
          <div className="hero-art" aria-label="Diagrama conceptual de un flujo de información MCP">
            <div className="art-head"><span>FIG. 01</span><span>FLUJO DE CONTEXTO</span><span>01 — 03</span></div>
            <svg className="hero-graphic" viewBox="0 0 640 570" role="img" aria-labelledby="hero-svg-title hero-svg-desc">
              <title id="hero-svg-title">Una solicitud viaja del cliente al Campus y vuelve como datos</title><desc id="hero-svg-desc">Tres nodos conectados por líneas técnicas: aplicación, puente local y Campus Virtual.</desc>
              <defs><pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="currentColor" strokeOpacity=".11" strokeWidth="1" /></pattern><radialGradient id="glow"><stop stopColor="#d5e8a8" stopOpacity=".24"/><stop offset="1" stopColor="#d5e8a8" stopOpacity="0"/></radialGradient></defs>
              <rect width="640" height="570" fill="url(#grid)"/>
              <circle cx="355" cy="296" r="240" fill="url(#glow)"/>
              <g className="contours" fill="none" stroke="currentColor" strokeOpacity=".22"><ellipse cx="355" cy="296" rx="214" ry="194"/><ellipse cx="355" cy="296" rx="184" ry="164"/><ellipse cx="355" cy="296" rx="152" ry="133"/><ellipse cx="355" cy="296" rx="119" ry="103"/></g>
              <path className="orbit orbit-a" d="M88 159C174 70 442 88 550 233"/><path className="orbit orbit-b" d="M93 414C202 496 448 456 548 314"/>
              <path className="flow-path" d="M125 285H259M388 285H517"/>
              <g className="art-node art-node-start"><circle cx="102" cy="285" r="43"/><circle cx="102" cy="285" r="31"/><path d="M91 285h22m-7-8 8 8-8 8"/></g>
              <g className="art-node art-node-core"><circle cx="324" cy="285" r="75"/><circle cx="324" cy="285" r="59"/><circle cx="324" cy="285" r="36"/><path d="M324 227v116M266 285h116M283 244l82 82m0-82-82 82"/><circle cx="324" cy="285" r="7"/></g>
              <g className="art-node art-node-end"><circle cx="542" cy="285" r="43"/><circle cx="542" cy="285" r="31"/><path d="m527 292 15-16 15 16m-27 0h24"/></g>
              <g className="art-label"><text x="73" y="365">CLIENTE</text><text x="278" y="400">PUENTE LOCAL</text><text x="508" y="365">MOODLE</text></g>
              <g className="coordinate"><path d="M30 30h34M30 30v34M610 540h-34m34 0v-34"/><text x="42" y="88">SISTEMA / 01</text><text x="492" y="518">MCP · STDIO</text></g>
              <circle className="flow-dot" r="5"><animateMotion dur="4s" repeatCount="indefinite" path="M125 285H259M388 285H517" /></circle>
            </svg>
            <div className="art-foot"><span><i /> SERVIDOR EN TU EQUIPO</span><span>CANAL DE SOLO LECTURA</span></div>
          </div>
          <div className="hero-index"><span>01</span><span>—</span><span>INFORMACIÓN ACADÉMICA, SIN SALIR DE TU SESIÓN</span></div>
        </section>

        <section className="intro-band" aria-label="Resumen del producto"><p><span>01</span> CONECTA APLICACIONES COMPATIBLES</p><p><span>02</span> CONSULTA CON TU SESIÓN LOCAL</p><p><span>03</span> RESPETA PERMISOS DEL CAMPUS</p></section>

        <section className="story-section section-shell" id="como-funciona">
          <div className="section-aside"><p className="eyebrow">01 / UN PUENTE, NO UN DESTINO</p><span className="aside-line"/><span className="aside-number">01</span></div>
          <div className="section-main">
            <div className="section-heading"><div><h2>Una forma más directa<br />de llegar a <em>tu información.</em></h2></div><p>MCP es un protocolo para que una aplicación pueda pedirle herramientas a un servidor. Acá, el servidor es una capa pequeña entre tu cliente de IA y el Campus Virtual.</p></div>
            <ArchitectureDiagram />
          </div>
        </section>

        <section className="demo-section" id="demo">
          <div className="section-shell demo-inner">
            <div className="section-aside"><p className="eyebrow">02 / UNA CONSULTA, POR DENTRO</p><span className="aside-line"/><span className="aside-number">02</span></div>
            <div className="section-main">
              <div className="section-heading demo-heading"><div><h2>De una pregunta<br />a <em>datos utilizables.</em></h2></div><p>El cliente solicita una herramienta. El MCP consulta y devuelve una respuesta estructurada. Este ejemplo es sintético: no muestra contenido ni identidades reales.</p></div>
              <DemoConsole />
            </div>
          </div>
        </section>

        <section className="capabilities-section section-shell" id="capacidades">
          <div className="section-aside"><p className="eyebrow">03 / ALCANCE ACTUAL</p><span className="aside-line"/><span className="aside-number">03</span></div>
          <div className="section-main">
            <div className="section-heading"><div><h2>Lo que se puede hacer.<br /><em>Y lo que todavía no.</em></h2></div><p>La presencia de una herramienta no garantiza que cada cuenta o curso permita esa consulta. Este estado refleja una revisión acotada en el Campus Mendoza, el 22 de octubre de 2026.</p></div>
            <div className="capability-list">{capacities.map(item => <article className="capability-row" key={item.n}><span className="cap-number">{item.n}</span><div className="cap-title"><h3>{item.title}</h3><p>{item.status}</p></div><p className="cap-text">{item.text}</p><span className="cap-arrow" aria-hidden="true">↗</span></article>)}</div>
            <p className="cap-footnote"><span>NOTA DE VERIFICACIÓN</span> La comprobación en vivo fue de solo lectura y cubrió tres cursos y dos actividades. No se publicaron, modificaron ni entregaron datos.</p>
          </div>
        </section>

        <section className="install-section" id="instalacion">
          <div className="section-shell install-inner">
            <div className="section-aside"><p className="eyebrow">04 / PUESTA EN MARCHA</p><span className="aside-line"/><span className="aside-number">04</span></div>
            <div className="section-main">
              <div className="section-heading"><div><h2>Se ejecuta en tu equipo.<br /><em>La sesión también.</em></h2></div><p>El paquete aún no está publicado en npm y el repositorio no tiene aquí una URL pública verificable. Estos pasos aplican si ya tenés el código fuente.</p></div>
              <div className="install-grid">
                <ol className="install-steps"><li><span>01</span><div><h3>Prepará el entorno</h3><p>Instalá Node.js 22.13 o posterior. Abrí una terminal en la carpeta del proyecto MCP.</p><code>npm ci</code></div></li><li><span>02</span><div><h3>Compilá y abrí tu sesión</h3><p>La primera vez se abre Chromium para iniciar sesión directamente en el Campus.</p><code>npm run build<br />npm run login</code></div></li><li><span>03</span><div><h3>Conectá Codex</h3><p>Agregá esta entrada de servidor MCP. Usá una ruta absoluta válida en tu equipo.</p><CopyConfig /></div></li></ol>
                <aside className="install-aside"><p className="eyebrow">ANTES DE CONECTAR</p><div className="compat-stamp"><span>CLIENTE</span><strong>Codex</strong><i>Configuración por STDIO</i></div><p>El cliente debe poder iniciar Node.js de forma local. No configures transporte HTTP ni incluyas contraseñas o tokens en el JSON.</p><Link href="/docs#configuracion">Guía completa de instalación <span>↗</span></Link><div className="publish-note"><span className="publish-dot"/> npm · AÚN SIN PUBLICAR</div></aside>
              </div>
            </div>
          </div>
        </section>

        <section className="privacy-section section-shell" id="privacidad">
          <div className="section-aside"><p className="eyebrow">05 / SESIÓN Y PERMISOS</p><span className="aside-line"/><span className="aside-number">05</span></div>
          <div className="section-main privacy-main">
            <div><p className="eyebrow">UNA FRONTERA VISIBLE</p><h2>Tu sesión vive<br />en <em>tu dispositivo.</em></h2><p className="privacy-lede">El MCP no necesita que le entregues tu contraseña. Iniciás sesión en el navegador del Campus; la sesión se guarda en tu equipo y el servidor la reutiliza para consultar lo que tu cuenta puede ver.</p></div>
            <div className="privacy-ledger"><div><span>01 / CREDENCIALES</span><p>Se ingresan en el Campus, no en el cliente MCP. La protección local no cubre malware ejecutado como tu usuario.</p></div><div><span>02 / TRANSPORTE</span><p>El cliente inicia un proceso local por STDIO. El servidor consulta el origen HTTPS del Campus.</p></div><div><span>03 / PERMISOS</span><p>No se saltean autenticación, CAPTCHA ni permisos. El alcance depende de la cuenta y cada curso.</p></div><div><span>04 / ESCRITURAS</span><p>Las vistas previas no escriben. Las entregas están desactivadas hasta probarse con supervisión real.</p></div></div>
          </div>
        </section>

        <section className="docs-section section-shell" id="documentacion">
          <div className="section-aside"><p className="eyebrow">06 / CUADERNO TÉCNICO</p><span className="aside-line"/><span className="aside-number">06</span></div>
          <div className="section-main"><div className="section-heading"><div><h2>Seguí el hilo.<br /><em>Sin perder contexto.</em></h2></div><p>Guías breves para instalar, configurar y entender qué hace cada herramienta, qué límites tiene y cómo resolver problemas comunes.</p></div><div className="docs-index"><Link href="/docs#instalacion"><span>01</span><strong>Instalación y requisitos</strong><i>Node.js, sesión y compilación</i><b>↗</b></Link><Link href="/docs#herramientas"><span>02</span><strong>Herramientas y estado</strong><i>Capacidades, lectura y escrituras</i><b>↗</b></Link><Link href="/docs#configuracion"><span>03</span><strong>Configurar Codex</strong><i>Transporte STDIO y ruta local</i><b>↗</b></Link><Link href="/docs#solucion"><span>04</span><strong>Solución de problemas</strong><i>Sesión, permisos y respuestas</i><b>↗</b></Link><Link href="/docs#tecnico"><span>05</span><strong>Cómo funciona</strong><i>Seguridad, datos y políticas</i><b>↗</b></Link></div></div>
        </section>

        <section className="faq-section section-shell" id="preguntas">
          <div className="section-aside"><p className="eyebrow">07 / PREGUNTAS REALES</p><span className="aside-line"/><span className="aside-number">07</span></div>
          <div className="section-main faq-main"><div><h2>Antes de<br /><em>conectarlo.</em></h2><p>Lo esencial sobre tu cuenta, el alcance y el estado actual.</p></div><div className="faq-list">{faqs.map(([q, a]) => <details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div></div>
        </section>

        <section className="roadmap-section">
          <div className="section-shell roadmap-inner"><div className="roadmap-top"><p className="eyebrow">08 / LO QUE SIGUE</p><span>ESTADO DEL PROYECTO · SIN PROMESAS VACÍAS</span></div><h2>Primero, que lo básico<br /><em>sea confiable.</em></h2><div className="roadmap-track"><div><span className="road-dot current"/><p>AHORA</p><h3>Consultas de lectura</h3><i>Capacidades acotadas verificadas en Moodle Mendoza.</i></div><div><span className="road-dot next"/><p>EN VALIDACIÓN</p><h3>Entregas supervisadas</h3><i>Diseño separado; ejecución apagada hasta una prueba real.</i></div><div><span className="road-dot future"/><p>MÁS ADELANTE</p><h3>SysAcad</h3><i>Integración futura. Aún no disponible.</i></div></div><p className="roadmap-version">CAMPUS MOODLE · VERSIÓN DE LA INSTANCIA NO VERIFICADA EN ESTA REVISIÓN</p></div>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-main"><Link className="wordmark footer-wordmark" href="#inicio"><span className="wordmark-symbol">m<span>·</span></span><span>UTN FRM<br />MCP</span></Link><p>Un proyecto independiente para explorar una mejor conexión entre herramientas y contexto académico.</p><span className="footer-flag">NO OFICIAL <i>·</i> MENDOZA</span></div><div className="footer-bottom"><p>UTN FRM MCP no está afiliado, patrocinado ni respaldado por la Universidad Tecnológica Nacional.</p><div><Link href="/docs">DOCUMENTACIÓN ↗</Link><span>MIT</span><span>© 2026</span></div></div></footer>
    </>
  );
}
