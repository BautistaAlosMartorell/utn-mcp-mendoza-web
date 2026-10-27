import Link from "next/link";
import { HeroDemo } from "@/components/hero-demo";
import { Install } from "@/components/install";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Reveal } from "@/components/reveal";
import { Terrain } from "@/components/terrain";
import { IconArrow } from "@/components/icons";
import { faqs, product, tools } from "@/lib/content";

const readTools = tools.filter((t) => t.access === "lectura");
const previewTools = tools.filter((t) => t.access === "preview");

const principles = [
  {
    k: "Local",
    t: "Corre en tu computadora.",
    d: "No hay servidor intermedio ni cuenta nueva. Tu asistente habla con UTN FRM MCP por una conexión local.",
  },
  {
    k: "Sesión",
    t: "Tu sesión, no tu contraseña.",
    d: "Iniciás sesión una vez, en la página oficial del Campus. Se guarda la sesión, cifrada en Windows con DPAPI.",
  },
  {
    k: "Lectura",
    t: "Mira, no toca.",
    d: "Consulta lo que tu cuenta ya puede ver. Esta beta es de solo lectura: publicar, votar, crear eventos y entregar están deshabilitados.",
  },
  {
    k: "Ritmo",
    t: "Respeta al Campus.",
    d: "Una consulta por vez, con pausa entre ellas. Si el Campus pide frenar, frena.",
  },
];

const never = ["Entregar tus trabajos", "Publicar en los foros", "Votar por vos", "Guardar tu contraseña"];

const route = [
  { n: "01", k: "Salida", t: "Le preguntás a tu asistente", d: "Con tus palabras, en el cliente de IA que ya usás." },
  { n: "02", k: "Refugio", t: "UTN FRM MCP elige la herramienta", d: "Materias, consignas, archivos, notas, foros o calendario, según lo que pediste." },
  { n: "03", k: "Cumbre", t: "El Campus responde", d: "Con tu sesión, en tu computadora. Vuelve solo lo necesario para contestarte." },
];

const index = [
  {
    n: "01",
    t: "Nunca más una entrega perdida.",
    d: "Vencimientos, consignas y estado de cada actividad, de todas tus materias, en una sola respuesta.",
    vis: (
      <div className="spec spec-due">
        <div><b>29<small>OCT</small></b><span>Trabajo Práctico 4</span><i className="pill pill-warn">Sin entregar</i></div>
        <div><b>30<small>OCT</small></b><span>Informe de laboratorio</span><i className="pill pill-warn">Sin entregar</i></div>
        <div><b>02<small>NOV</small></b><span>Guía 5</span><i className="pill pill-ok">Entregado</i></div>
      </div>
    ),
  },
  {
    n: "02",
    t: "Lee tu material de cursada.",
    d: "Extrae el texto de los archivos de la materia para que puedas resumir, estudiar y consultar sin abrir uno por uno.",
    vis: (
      <div className="spec spec-files">
        {["PDF", "DOCX", "PPTX", "XLSX", "ODT", "RTF", "EPUB"].map((f, i) => (
          <span key={f} style={{ ["--i" as string]: i }}>{f}</span>
        ))}
      </div>
    ),
  },
  {
    n: "03",
    t: "Tus notas, sin ir a buscarlas.",
    d: "Calificaciones por materia y lo que te falta para cerrar la cursada.",
    vis: (
      <div className="spec spec-bars">
        {[58, 82, 70, 92, 46].map((v, i) => (
          <i key={i} className={i === 4 ? "dash" : ""} style={{ ["--h" as string]: `${v}%`, ["--i" as string]: i }} />
        ))}
      </div>
    ),
  },
  {
    n: "04",
    t: "Foros, gente y calendario.",
    d: "Qué respondió el docente, quién cursa con vos y qué eventos vienen. Todo lo que tu cuenta ya puede ver.",
    vis: (
      <div className="spec spec-thread">
        <span>¿Hasta qué tema entra en el parcial?</span>
        <span>Hasta ley de Gauss inclusive.</span>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        {/* ─────── HERO ─────── */}
        <section className="hero">
          <Terrain className="hero-terrain" spots={[[0.47, 0.12], [0.94, 0.11], [0.42, 0.83], [0.955, 0.79]]} />
          <div className="hero-shade" aria-hidden="true" />
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="kicker">
                <span aria-hidden="true" />
                Para estudiantes de la UTN FRM · Mendoza
              </p>
              <h1>
                <span className="ln"><span>Tu Campus Virtual,</span></span>
                <span className="ln"><span><em>dentro de tu IA.</em></span></span>
              </h1>
              <p className="lead">
                Preguntale a tu asistente por tus entregas, apuntes y notas. UTN FRM MCP lee el Campus con tu propia
                cuenta, en tu computadora, y le da a la IA el contexto para ayudarte de verdad.
              </p>
              <div className="cta-row">
                <Link href="/#empezar" className="btn btn-sol">
                  Empezar <IconArrow />
                </Link>
                <Link href="/#como-funciona" className="btn btn-line">Cómo funciona</Link>
              </div>
              <a className="release" href={product.release} target="_blank" rel="noreferrer">
                <b>v{product.version}</b>
                <span>{product.channel} · para {product.platform}</span>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
            <div className="hero-demo">
              <HeroDemo />
            </div>
          </div>

          <div className="wrap hero-foot">
            <p className="coords">32°53′ S · 68°50′ O<span>Mendoza, Argentina</span></p>
            <p className="works">
              <span>Probado con</span>
              Codex  ·  MCP por STDIO  ·  Código abierto (MIT)
            </p>
            <a href="#que-hace" className="cue" aria-label="Seguir bajando">
              <i aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ─────── QUÉ HACE ─────── */}
        <section className="sec paper" id="que-hace" aria-labelledby="h-que">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="eyebrow">Qué hace</p>
              <h2 id="h-que">
                Preguntale lo que antes tenías que <em>ir a buscar.</em>
              </h2>
              <p>
                El Campus guarda todo, pero encontrarlo lleva clics. Con UTN FRM MCP tu asistente entra por vos, lee y
                te responde en lenguaje natural.
              </p>
            </Reveal>

            <ol className="index">
              {index.map((r) => (
                <Reveal as="li" key={r.n} className="row" threshold={0.2}>
                  <span className="row-n" aria-hidden="true">{r.n}</span>
                  <div className="row-copy">
                    <h3>{r.t}</h3>
                    <p>{r.d}</p>
                  </div>
                  <div className="row-vis" aria-hidden="true">{r.vis}</div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div className="tools-band" aria-label={`Las ${tools.length} herramientas del servidor`}>
            <div className="wrap tools-head">
              <p className="big-num">{tools.length}</p>
              <p>
                herramientas. <b>{readTools.length}</b> consultan el Campus y <b>{previewTools.length}</b> solo
                muestran una vista previa de lo que pasaría.
              </p>
              <Link href="/docs#alcance" className="link">Ver qué hace cada una <IconArrow /></Link>
            </div>
            <div className="marquee" aria-hidden="true">
              <div className="mq mq-a">
                {[...readTools, ...readTools].map((t, i) => (
                  <span key={`${t.name}-${i}`} className={i >= readTools.length ? "dup" : undefined}>{t.name}</span>
                ))}
              </div>
              <div className="mq mq-b">
                {[...previewTools, ...previewTools, ...previewTools, ...previewTools].map((t, i) => (
                  <span key={`${t.name}-${i}`} className={i >= previewTools.length ? "is-preview dup" : "is-preview"}>{t.name}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─────── CÓMO FUNCIONA ─────── */}
        <section className="sec dark" id="como-funciona" aria-labelledby="h-como">
          <Terrain className="sec-terrain" still rgb="244,236,221" levels={14} />
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="eyebrow">Cómo funciona</p>
              <h2 id="h-como">
                Un puente local entre tu IA y <em>el Campus.</em>
              </h2>
              <p>
                UTN FRM MCP es un servidor MCP, el estándar abierto con el que los asistentes usan herramientas. Tu
                asistente lo llama; él consulta el Campus por vos.
              </p>
            </Reveal>

            <Reveal className="route" threshold={0.3}>
              <svg className="route-line" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                <path d="M 100 380 C 280 380, 330 270, 500 270 S 760 120, 900 120" pathLength="1" />
                <g className="route-dots">
                  <circle cx="100" cy="380" r="9" />
                  <circle cx="500" cy="270" r="9" />
                  <circle cx="900" cy="120" r="9" />
                </g>
              </svg>
              {route.map((s) => (
                <div key={s.n} className={`stop stop-${s.n}`}>
                  <span className="stop-dot" aria-hidden="true" />
                  <div className="stop-txt">
                    <p className="stop-k"><b>{s.n}</b> {s.k}</p>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ─────── CONTROL ─────── */}
        <section className="sec paper" id="control" aria-labelledby="h-control">
          <div className="wrap">
            <Reveal className="sec-head">
              <p className="eyebrow">Seguridad y control</p>
              <h2 id="h-control">
                Tu cuenta, <em>tus reglas.</em>
              </h2>
              <p>
                Pensado para que puedas dejarlo conectado con tranquilidad: todo ocurre en tu equipo y nada cambia en el
                Campus sin que lo hagas vos.
              </p>
            </Reveal>

            <Reveal className="principles" threshold={0.15}>
              {principles.map((p) => (
                <article key={p.k}>
                  <p className="p-k">{p.k}</p>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </article>
              ))}
            </Reveal>

            <Reveal className="never" threshold={0.35}>
              <p className="never-k">Lo que nunca hace</p>
              <ul>
                {never.map((n) => (
                  <li key={n}><span>{n}</span></li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ─────── EMPEZAR ─────── */}
        <section className="sec paper-2" id="empezar" aria-labelledby="h-empezar">
          <div className="wrap wrap-narrow">
            <Reveal className="sec-head">
              <p className="eyebrow">Empezar</p>
              <h2 id="h-empezar">
                Listo en <em>cuatro pasos.</em>
              </h2>
              <p>
                Instalá el paquete, iniciá sesión una vez, conectalo a tu asistente y empezá a preguntar. Hoy está
                disponible para {product.platform}.
              </p>
            </Reveal>
            <Install />
          </div>
        </section>

        {/* ─────── FAQ ─────── */}
        <section className="sec paper" id="preguntas" aria-labelledby="h-faq">
          <div className="wrap wrap-narrow">
            <Reveal className="sec-head">
              <p className="eyebrow">Preguntas frecuentes</p>
              <h2 id="h-faq">
                Lo que conviene <em>saber.</em>
              </h2>
            </Reveal>
            <div className="faq">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ─────── CIERRE ─────── */}
        <section className="final" aria-labelledby="h-final">
          <Terrain className="final-terrain" spots={[[0.08, 0.2], [0.9, 0.78], [0.12, 0.84]]} />
          <div className="final-shade" aria-hidden="true" />
          <div className="wrap final-in">
            <h2 id="h-final">
              Que tu Campus <em>trabaje para vos.</em>
            </h2>
            <p>Conectá tu asistente en minutos y empezá a preguntar.</p>
            <div className="cta-row cta-center">
              <Link href="/#empezar" className="btn btn-sol">
                Empezar ahora <IconArrow />
              </Link>
              <Link href="/docs" className="btn btn-line">Leer la guía</Link>
            </div>
            <p className="final-meta">
              <a href={product.repo} target="_blank" rel="noreferrer">Código en GitHub ↗</a>
              <span aria-hidden="true">·</span>
              <a href={product.issues} target="_blank" rel="noreferrer">Reportar un problema ↗</a>
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
