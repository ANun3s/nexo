import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Blocks,
  Braces,
  Check,
  CircleCheck,
  Database,
  Layers3,
  PanelsTopLeft,
  Pause,
  Play,
  Radio,
  ServerCog,
  Workflow,
} from "lucide-react";
import "./SoftwareBento.css";

const architectureLayers = [
  {
    label: "Interface",
    title: "Painéis feitos para decidir.",
    description: "Organizamos indicadores e rotinas em uma experiência simples de acompanhar.",
    Icon: PanelsTopLeft,
  },
  {
    label: "Dados",
    title: "Dados com contexto.",
    description: "Estruturamos informações financeiras para que cada leitura faça sentido.",
    Icon: Database,
  },
  {
    label: "Regras",
    title: "Regras que acompanham a operação.",
    description: "Modelamos processos e validações para reduzir tarefas repetitivas.",
    Icon: Workflow,
  },
  {
    label: "Integrações",
    title: "Conexões bem definidas.",
    description: "Conectamos canais e ferramentas respeitando o fluxo de cada negócio.",
    Icon: Blocks,
  },
  {
    label: "Plataforma",
    title: "Uma base pronta para evoluir.",
    description: "Nossa equipe mantém cada camada alinhada à evolução do produto.",
    Icon: ServerCog,
  },
];

const pipelineEvents = [
  { title: "Lançamento identificado", type: "Evento financeiro", code: "evt_01 · entrada" },
  { title: "Regra de conciliação aplicada", type: "Validação", code: "rule_08 · conferida" },
  { title: "Indicador atualizado", type: "Visão de caixa", code: "view_03 · pronta" },
];

function PointerTag({ label, className = "", style, transition, animate }) {
  return (
    <motion.div
      className={`software-bento-pointer ${className}`}
      aria-hidden="true"
      style={style}
      transition={transition}
      animate={animate}
    >
      <svg viewBox="0 0 26 30" fill="none">
        <path d="M2.2 2.5 22 15.1l-9.4 2.1-4.1 9.1L2.2 2.5Z" fill="currentColor" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span>{label}</span>
    </motion.div>
  );
}

function ArchitecturePanel({ reduceMotion, autoPlay }) {
  const [selected, setSelected] = useState(1);
  const layer = architectureLayers[selected];

  useEffect(() => {
    if (!autoPlay || reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setSelected((current) => (current + 1) % architectureLayers.length);
    }, 2800);
    return () => window.clearInterval(interval);
  }, [autoPlay, reduceMotion]);

  return (
    <article className="software-bento-panel software-bento-panel--architecture">
      <div className="software-bento-grid-texture" aria-hidden="true" />
      <div className="software-bento-panel-label">
        <span className="software-bento-live-dot" />
        ENGENHARIA EM CAMADAS
      </div>

      <div className="software-bento-layer-list" role="group" aria-label="Camadas da plataforma">
        {architectureLayers.map(({ label, Icon }, index) => (
          <motion.button
            key={label}
            type="button"
            className={`software-bento-layer${selected === index ? " is-selected" : ""}`}
            aria-pressed={selected === index}
            onClick={() => setSelected(index)}
            whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            animate={reduceMotion ? undefined : { y: selected === index ? -2 : [0, index % 2 ? 1 : -1, 0] }}
            transition={reduceMotion ? undefined : { duration: 4.4, delay: index * 0.12, repeat: selected === index ? 0 : Infinity, ease: "easeInOut" }}
          >
            <span className="software-bento-layer-icon"><Icon size={22} strokeWidth={1.55} /></span>
            <span className="software-bento-layer-name">{label}</span>
            {selected === index && !reduceMotion && (
              <motion.span
                className="software-bento-layer-glow"
                aria-hidden="true"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: [0.25, 0.62, 0.25], scale: [0.92, 1.08, 0.92] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {!reduceMotion && (
        <PointerTag
          label="Equipe Nexo"
          className="software-bento-pointer--team"
          style={{ left: `${12 + (selected * 76) / (architectureLayers.length - 1)}%` }}
          transition={{ left: { type: "spring", stiffness: 190, damping: 24 }, y: { duration: 4.6, repeat: Infinity, ease: "easeInOut" } }}
          animate={{ left: `${12 + (selected * 76) / (architectureLayers.length - 1)}%`, y: [0, -3, 0], rotate: [0, 1, 0] }}
        />
      )}
      <PointerTag label="Produto" className="software-bento-pointer--product" />

      <div className="software-bento-feature-copy">
        <span>01 / ARQUITETURA MODULAR</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={reduceMotion ? false : { opacity: 0, y: 9 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -7 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3>{layer.title}</h3>
            <p>{layer.description}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      <ArrowUpRight className="software-bento-corner-arrow" size={17} aria-hidden="true" />
    </article>
  );
}

function DataFlowPanel({ reduceMotion, autoPlay }) {
  const [eventIndex, setEventIndex] = useState(0);
  const event = pipelineEvents[eventIndex];

  useEffect(() => {
    if (!autoPlay || reduceMotion) return undefined;
    const interval = window.setInterval(() => {
      setEventIndex((current) => (current + 1) % pipelineEvents.length);
    }, 3600);
    return () => window.clearInterval(interval);
  }, [autoPlay, reduceMotion]);

  return (
    <article className="software-bento-panel software-bento-panel--data">
      <div className="software-bento-panel-label">
        <span>02 / FLUXO DE DADOS</span>
        <span className="software-bento-panel-label-icon"><Activity size={14} /> EXEMPLO DE PIPELINE</span>
      </div>

      <div className="software-bento-flow-visual" aria-label="Fluxo ilustrativo de um evento financeiro">
        <div className="software-bento-flow-lines" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div className="software-bento-flow-steps" aria-hidden="true">
          {[
            { label: "Receber", Icon: ArrowDownToLine },
            { label: "Validar", Icon: Braces },
            { label: "Atualizar", Icon: CircleCheck },
          ].map(({ label, Icon }, index) => (
            <div className={`software-bento-flow-step${eventIndex >= index ? " is-ready" : ""}`} key={label}>
              <span><Icon size={15} /></span>
              <small>{label}</small>
            </div>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={eventIndex}
            className="software-bento-event-card"
            initial={reduceMotion ? false : { opacity: 0, y: 14, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12, rotate: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="software-bento-event-topline">
              <span className="software-bento-event-icon"><Database size={15} /></span>
              <span>EVENTO PROCESSADO</span>
              <Check size={14} />
            </div>
            <strong>{event.title}</strong>
            <div className="software-bento-event-meta">
              <span>{event.type}</span>
              <code>{event.code}</code>
            </div>
            <div className="software-bento-event-bars" aria-hidden="true">
              {[54, 82, 66, 91, 43].map((width, index) => (
                <motion.i
                  key={index}
                  style={{ width: `${width}%` }}
                  animate={!autoPlay || reduceMotion ? undefined : { opacity: [0.34, 0.72, 0.34] }}
                  transition={{ duration: 3.3, delay: index * 0.18, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="software-bento-feature-copy">
        <h3>Do evento ao indicador.</h3>
        <p>Regras e validações conectam as movimentações financeiras aos painéis e relatórios.</p>
      </div>
    </article>
  );
}

function PlatformPanel({ reduceMotion, autoPlay }) {
  const [paused, setPaused] = useState(false);
  const animateRings = autoPlay && !paused && !reduceMotion;

  return (
    <article className="software-bento-panel software-bento-panel--platform">
      <div className="software-bento-panel-label"><span>03 / CICLO DE ENGENHARIA</span></div>
      <div className="software-bento-rings" aria-hidden="true">
        {Array.from({ length: 9 }, (_, index) => (
          <motion.span
            key={index}
            style={{ "--ring-index": index, width: `${152 + index * 28}px`, height: `${78 + index * 17}px` }}
            animate={animateRings ? { scale: [0.99, 1.012, 0.99], opacity: [0.62 - index * 0.035, 0.35 - index * 0.025, 0.62 - index * 0.035] } : undefined}
            transition={{ duration: 5.1, delay: index * 0.12, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>
      <div className={`software-bento-status${animateRings ? " is-active" : ""}`}>
        <span className="software-bento-status-dot" />
        <span>{animateRings ? "CICLO EM EVOLUÇÃO" : "MODO DE DEMONSTRAÇÃO"}</span>
      </div>
      <button className="software-bento-toggle" type="button" onClick={() => setPaused((value) => !value)} aria-pressed={paused}>
        {paused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}
        {paused ? "Retomar animação" : "Pausar animação"}
      </button>
      <div className="software-bento-feature-copy">
        <h3>Engenharia que acompanha.</h3>
        <p>A equipe de software evolui a plataforma, acompanha integrações e aprimora os fluxos.</p>
      </div>
    </article>
  );
}

export default function SoftwareBento({ className = "", autoPlay = true }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`software-bento ${className}`.trim()}>
      <ArchitecturePanel reduceMotion={reduceMotion} autoPlay={autoPlay} />
      <DataFlowPanel reduceMotion={reduceMotion} autoPlay={autoPlay} />
      <PlatformPanel reduceMotion={reduceMotion} autoPlay={autoPlay} />
    </div>
  );
}
