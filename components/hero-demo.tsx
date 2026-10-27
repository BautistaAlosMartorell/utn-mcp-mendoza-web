"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

interface Scene {
  id: string;
  tab: string;
  prompt: string;
  tools: string[];
  answer: ReactNode;
}

const Check = () => (
  <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
    <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const scenes: Scene[] = [
  {
    id: "entregas",
    tab: "Entregas",
    prompt: "¿Qué tengo para entregar esta semana?",
    tools: ["list_courses", "list_calendar_events", "get_assignment"],
    answer: (
      <>
        <p className="ans-lead">Tenés <b>3 entregas</b> con vencimiento esta semana:</p>
        <ul className="due">
          <li>
            <span className="due-date"><b>29</b>OCT</span>
            <span className="due-main"><b>Trabajo Práctico 4</b><i>Análisis Matemático II</i></span>
            <span className="pill pill-warn">Sin entregar</span>
          </li>
          <li>
            <span className="due-date"><b>30</b>OCT</span>
            <span className="due-main"><b>Informe de laboratorio</b><i>Física II</i></span>
            <span className="pill pill-warn">Sin entregar</span>
          </li>
          <li>
            <span className="due-date"><b>02</b>NOV</span>
            <span className="due-main"><b>Guía 5</b><i>Sistemas de Datos</i></span>
            <span className="pill pill-ok">Entregado</span>
          </li>
        </ul>
        <p className="ans-foot">¿Querés que lea la consigna del TP 4 y te arme un plan?</p>
      </>
    ),
  },
  {
    id: "apuntes",
    tab: "Apuntes",
    prompt: "Resumime la Unidad 3 de Física II y decime qué entra en el parcial.",
    tools: ["open", "list_resources", "read_file"],
    answer: (
      <>
        <p className="ans-lead">Leí el material de la unidad. Lo central:</p>
        <div className="file"><span className="file-ico">PDF</span><span><b>Unidad 3 · Campo eléctrico.pdf</b><i>24 páginas</i></span></div>
        <ul className="bul">
          <li><b>Ley de Coulomb</b> y principio de superposición.</li>
          <li><b>Campo eléctrico</b> de cargas puntuales y distribuciones continuas.</li>
          <li><b>Flujo y ley de Gauss</b> aplicados a simetrías.</li>
        </ul>
        <p className="ans-foot">También revisé el foro de consultas. ¿Armo ejercicios de práctica?</p>
      </>
    ),
  },
  {
    id: "carrera",
    tab: "Carrera",
    prompt: "¿Qué me falta para recibirme y qué conviene rendir primero?",
    tools: ["sysacad_consultar", "sysacad_inscripcion_estado"],
    answer: (
      <>
        <p className="ans-lead">Según tu plan y tu estado académico:</p>
        <table className="grades">
          <tbody>
            <tr><td>Final de Redes</td><td><span className="pill pill-ok">Podés rendir</span></td></tr>
            <tr><td>Final de Gestión</td><td><span className="pill pill-warn">Falta correlativa</span></td></tr>
            <tr><td>Electivas</td><td><span className="pill pill-warn">Faltan horas</span></td></tr>
          </tbody>
        </table>
        <p className="ans-foot">Conviene rendir Redes primero: habilita lo que sigue.</p>
      </>
    ),
  },
  {
    id: "correo",
    tab: "Correo",
    prompt: "¿Tengo mails sin leer de la facultad?",
    tools: ["mail_search", "mail_read_message"],
    answer: (
      <>
        <p className="ans-lead">Tenés <b>2 mails sin leer</b>:</p>
        <ul className="bul">
          <li><b>Cátedra de Física II</b> · Cambio de aula para el parcial.</li>
          <li><b>Alumnado</b> · Plazo para el certificado de alumno regular.</li>
        </ul>
        <p className="ans-foot">No los marqué como leídos. ¿Querés que lo haga o que los mande a la Papelera?</p>
      </>
    ),
  },
];

const AUTO_MS = 6500;

const REDUCE = "(prefers-reduced-motion: reduce)";
const subscribeReduce = (cb: () => void) => {
  const mq = window.matchMedia(REDUCE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const reduceNow = () => window.matchMedia(REDUCE).matches;
const reduceServer = () => false;

export function HeroDemo() {
  const [scene, setScene] = useState(0);
  const [livePhase, setPhase] = useState(0);
  const [auto, setAuto] = useState(true);
  const still = useSyncExternalStore(subscribeReduce, reduceNow, reduceServer);
  const timers = useRef<number[]>([]);

  const s = scenes[scene];
  const last = s.tools.length + 3;
  const phase = still ? last : livePhase;

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => {
    clear();
    if (still) return;
    const steps = [250, 600, ...s.tools.map((_, i) => 600 + (i + 1) * 450), 600 + (s.tools.length + 1) * 450 + 150];
    steps.forEach((ms, i) => {
      timers.current.push(window.setTimeout(() => setPhase(i + 1), ms));
    });
    if (auto) {
      timers.current.push(
        window.setTimeout(() => {
          setPhase(0);
          setScene((v) => (v + 1) % scenes.length);
        }, steps[steps.length - 1] + AUTO_MS),
      );
    }
    return clear;
  }, [scene, auto, still, s.tools]);

  const pick = useCallback(
    (i: number) => {
      setAuto(false);
      if (i === scene) return;
      setPhase(0);
      setScene(i);
    },
    [scene],
  );

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = scenes.length;
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (next < 0) return;
    e.preventDefault();
    pick(next);
    (e.currentTarget.parentElement?.children[next] as HTMLElement | undefined)?.focus();
  };

  return (
    <div className="demo">
      <div className="demo-tabs" role="tablist" aria-label="Ejemplos de conversación">
        {scenes.map((sc, i) => (
          <button
            key={sc.id}
            role="tab"
            type="button"
            aria-selected={scene === i}
            aria-controls="demo-win"
            tabIndex={scene === i ? 0 : -1}
            onClick={() => pick(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {sc.tab}
          </button>
        ))}
      </div>

      <div className="win" id="demo-win" role="tabpanel">
        <div className="win-bar">
          <span className="win-live"><i aria-hidden="true" />utn-mendoza conectado</span>
          <span className="win-title">Tu asistente</span>
          <span className="win-tag">Ejemplo</span>
        </div>

        <div className="win-body">
          <div className={`msg msg-user ${phase >= 1 ? "on" : ""}`}>
            <p>{s.prompt}</p>
          </div>

          <div className={`tools ${phase >= 2 ? "on" : ""}`} aria-label="Herramientas que usó el asistente">
            {s.tools.map((t, i) => {
              const shown = phase >= 2 + i;
              const done = phase >= 3 + i;
              return (
                <span key={t} className={`chip ${shown ? "on" : ""} ${done ? "done" : ""}`}>
                  <span className="chip-st">{done ? <Check /> : <i className="spin" />}</span>
                  {t}
                </span>
              );
            })}
          </div>

          <div className={`msg msg-ai ${phase >= last ? "on" : ""}`}>
            <span className="ai-av" aria-hidden="true">✦</span>
            <div className="ans">{s.answer}</div>
          </div>
        </div>

        <div className="win-input" aria-hidden="true">
          <span>Preguntale algo a tu facultad…</span>
          <i>↑</i>
        </div>
      </div>
    </div>
  );
}
