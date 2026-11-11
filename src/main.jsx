import React, { useEffect, useMemo, useRef, useState } from "react";
import publicAsset from "./publicAsset.js";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowUp,
  Check,
  ChevronDown,
  ChevronRight,
  Download,
  LayoutDashboard,
  MessageCircle,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
  X,
  Mail,
  Globe,
  Camera,
  BriefcaseBusiness,
} from "lucide-react";
import "@fontsource-variable/manrope";
import "@fontsource-variable/playfair-display";
import "./styles.css";
import Landing from "./Landing.jsx";
import MagicBento from "./components/MagicBento.jsx";
import CardNav from "./components/CardNav.jsx";
import ScrollExpand from "./components/ScrollExpand.jsx";
import { gsap, useGSAP } from "./motion.js";

const money = (n) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(n);
const salesLabel = (n) => `${n} vendas`;
const agentLabel = (n) => `${String(n).padStart(2, "0")} ativos`;

function DashboardCounter({ value, format }) {
  const counterRef = useRef(null);

  useGSAP(
    () => {
      const node = counterRef.current;
      if (!node) return;

      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        node.textContent = format(value);
        return;
      }

      const counter = { value: 0 };
      node.textContent = format(0);
      gsap.to(counter, {
        value,
        duration: 1.25,
        delay: 0.12,
        ease: "power2.out",
        onUpdate: () => {
          node.textContent = format(Math.round(counter.value));
        },
        scrollTrigger: {
          trigger: node.closest(".dashboard"),
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: counterRef, dependencies: [value, format], revertOnUpdate: true },
  );

  return (
    <span className="dashboard-counter" ref={counterRef}>
      {format(value)}
    </span>
  );
}

const Logo = ({ small = false }) => (
  <span className={`logo ${small ? "small" : ""}`}>
    <span className="logo-symbol">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M7 24V8l18 16V8" />
      </svg>
    </span>
    nexo<span className="logo-dot">.</span>
  </span>
);

function Dashboard({ openChat }) {
  const [period, setPeriod] = useState("Novembro");
  const [view, setView] = useState("Visão geral");
  const dashboardRef = useRef(null);
  const previous = period === "Outubro";
  const revenue = previous ? 112400 : 128450;
  const metricItems = useMemo(
    () => [
      {
        id: "revenue",
        label: "Receita do mês",
        icon: <TrendingUp size={16} />,
        title: <DashboardCounter value={revenue} format={money} />,
        description: `${previous ? "8,2" : "14,3"}% acima do mês anterior`,
      },
      {
        id: "cash",
        label: "Saldo disponível",
        icon: <Wallet size={16} />,
        title: (
          <DashboardCounter
            value={previous ? 71350 : 84230}
            format={money}
          />
        ),
        description: "Caixa organizado neste mês",
      },
      {
        id: "sales",
        label: "Vendas com IA",
        icon: <ArrowUpRight size={16} />,
        title: (
          <DashboardCounter value={previous ? 96 : 124} format={salesLabel} />
        ),
        description: `${previous ? "12,9" : "29,2"}% sobre o mês anterior`,
      },
      {
        id: "agents",
        label: "Agentes em ação",
        icon: <Sparkles size={16} />,
        title: <DashboardCounter value={3} format={agentLabel} />,
        description: "32 conversas · 12 oportunidades",
      },
    ],
    [previous, revenue],
  );
  const views = [
    { name: "Visão geral", icon: LayoutDashboard },
    { name: "Financeiro", icon: Wallet },
    { name: "Agentes de IA", icon: Sparkles },
    { name: "Conversas", icon: MessageCircle },
  ];
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cards = gsap.utils.toArray(
        ".chart-card, .agent-status, .demo-agents > div",
        dashboardRef.current,
      );
      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 20, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
      const lines = dashboardRef.current.querySelectorAll(
        ".income-line, .expense-line",
      );
      lines.forEach((line) => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          duration: 1.25,
          ease: "power2.out",
          delay: 0.25,
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 76%",
            once: true,
          },
        });
      });
      const chartFills = dashboardRef.current.querySelectorAll(
        ".chart-area-fill",
      );
      gsap.fromTo(
        chartFills,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.8,
          delay: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 76%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".agent-row",
        { x: 16, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    },
    { scope: dashboardRef, dependencies: [period, view], revertOnUpdate: true },
  );
  return (
    <div className="dashboard" id="demonstracao" data-ui ref={dashboardRef}>
      <aside className="dashboard-sidebar">
        <Logo small />
        <div className="workspace">
          <span className="workspace-avatar">S</span>
          <span>
            Estúdio Aurora<small>Seu espaço de trabalho</small>
          </span>
          <ChevronDown size={13} />
        </div>
        <span className="sidebar-label">Seu espaço</span>
        <nav aria-label="Áreas da demonstração">
          {views.map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={view === name ? "selected" : ""}
              aria-label={name}
              aria-pressed={view === name}
              onClick={() => setView(name)}
            >
              <Icon size={16} />
              {name}
              {name === "Conversas" && <span className="count">8</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <ShieldCheck size={17} />
          <span>
            Você no controle<small>Ambiente demonstrativo</small>
          </span>
        </div>
      </aside>
      <div className="dashboard-main">
        <div className="dashboard-toolbar">
          <span>
            Aurora <ChevronRight size={13} /> <b>{view}</b>
          </span>
          <span className="demo-label">Dados de exemplo</span>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-heading">
            <div>
              <h3>
                {view === "Visão geral"
                  ? "Seu negócio, em perspectiva."
                  : view === "Financeiro"
                    ? "Clareza para cada decisão."
                    : view === "Agentes de IA"
                      ? "Seu time também é inteligente."
                      : "Cada conversa, uma oportunidade."}
              </h3>
              <p>Veja o que está acontecendo por aqui.</p>
            </div>
            <label className="period">
              <span className="sr-only">Período do dashboard</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option>Novembro</option>
                <option>Outubro</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
          {view === "Visão geral" || view === "Financeiro" ? (
            <>
              <MagicBento
                items={metricItems}
                columns={4}
                rowHeight={200}
                gap={12}
                radius={20}
                theme="dark"
                glowColor="#f4f4f5"
                textAutoHide={false}
                enableBorderGlow={true}
                enableSpotlight={true}
                spotlightRadius={300}
                clickEffect={true}
                className="dashboard-bento"
              />
              <div className="dashboard-grid">
                <div className="chart-card">
                  <div className="card-heading">
                    <b>Fluxo de caixa</b>
                    <span>
                      <i className="legend-dot" />
                      Entradas <i className="legend-dot light" />
                      Saídas
                    </span>
                  </div>
                  <div
                    className="chart"
                    role="img"
                    aria-label={`${period}: entradas ${money(revenue)}, saídas ${money(previous ? 41050 : 44220)}. Entradas crescem ao longo do mês.`}
                  >
                    <div className="axis-y">
                      <span>60 mil</span>
                      <span>40 mil</span>
                      <span>20 mil</span>
                      <span>0</span>
                    </div>
                    <div className="plot">
                      <div className="gridlines">
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <svg
                        viewBox="0 0 540 140"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                            <stop stopColor="#5383ee" stopOpacity=".2" />
                            <stop
                              offset="1"
                              stopColor="#5383ee"
                              stopOpacity="0"
                            />
                          </linearGradient>
                        </defs>
                        <path
                          className="chart-area-fill"
                          d={
                            previous
                              ? "M0 110 C35 110 40 60 85 75 S145 55 180 65 S245 20 280 45 S350 50 380 30 S460 5 540 15 L540 140H0Z"
                              : "M0 115 C30 115 45 80 80 88 S135 110 170 75 S220 85 260 55 S310 58 350 40 S385 55 420 30 S480 30 540 5 L540 140H0Z"
                          }
                          fill="url(#fill)"
                        />
                        <path
                          className="income-line"
                          d={
                            previous
                              ? "M0 110 C35 110 40 60 85 75 S145 55 180 65 S245 20 280 45 S350 50 380 30 S460 5 540 15"
                              : "M0 115 C30 115 45 80 80 88 S135 110 170 75 S220 85 260 55 S310 58 350 40 S385 55 420 30 S480 30 540 5"
                          }
                        />
                        <path
                          className="expense-line"
                          d="M0 130 C30 120 60 122 90 113 S150 125 180 102 S240 110 280 95 S350 106 380 85 S460 96 540 75"
                        />
                      </svg>
                      <div className="axis-x">
                        {/* taste-skill-ignore: real dates on the dashboard chart axis. */}
                        {[1, 5, 10, 15, 20, 25, 30].map((d) => (
                          <span key={d}>
                            {String(d).padStart(2, "0")}{" "}
                            {previous ? "out" : "nov"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="agent-status">
                  <div className="card-heading">
                    <b>Seu time de IA</b>
                    <span className="positive">● Ativo</span>
                  </div>
                  {[
                    {
                      icon: MessageCircle,
                      name: "Lia",
                      role: "Atendimento",
                      stat: "32 conversas",
                    },
                    {
                      icon: TrendingUp,
                      name: "Leo",
                      role: "Vendas",
                      stat: "12 oportunidades",
                    },
                    {
                      icon: Wallet,
                      name: "Nina",
                      role: "Financeiro",
                      stat: "Tudo organizado",
                    },
                  ].map(({ icon: Icon, name, role, stat }) => (
                    <div className="agent-row" key={name}>
                      <span className={`agent-avatar ${name.toLowerCase()}`}>
                        <Icon size={16} />
                      </span>
                      <span>
                        <b>
                          {name}
                          <small>{role}</small>
                        </b>
                      </span>
                      <span className="agent-stat">{stat}</span>
                    </div>
                  ))}
                  <button
                    className="text-action"
                    onClick={() => setView("Agentes de IA")}
                  >
                    Conhecer os agentes <ArrowRight size={13} />
                  </button>
                </div>
              </div>
              <div className="insight">
                <span className="insight-icon">
                  <Sparkles size={17} />
                </span>
                <p>
                  <b>Um olhar além dos números.</b> No exemplo, as entradas
                  superaram as saídas neste mês.
                </p>
                <button onClick={openChat}>
                  Perguntar à Nexo <ArrowRight size={14} />
                </button>
              </div>
            </>
          ) : view === "Agentes de IA" ? (
            <div className="demo-agents">
              {[
                [
                  "Lia",
                  "Atendimento",
                  "Responde dúvidas e organiza solicitações nos seus canais.",
                  MessageCircle,
                ],
                [
                  "Leo",
                  "Vendas",
                  "Qualifica oportunidades e prepara o próximo contato.",
                  TrendingUp,
                ],
                [
                  "Nina",
                  "Financeiro",
                  "Resume entradas, saídas e pontos de atenção.",
                  Wallet,
                ],
              ].map(([name, role, desc, Icon]) => (
                <div key={name}>
                  <span className={`agent-avatar ${name.toLowerCase()}`}>
                    <Icon />
                  </span>
                  <h4>
                    {name} <small>{role}</small>
                  </h4>
                  <p>{desc}</p>
                  <span className="positive">
                    <Check size={14} /> Ativo na demonstração
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="conversation-demo">
              <MessageCircle size={32} />
              <h4>O contexto acompanha a conversa.</h4>
              <p>
                WhatsApp, Instagram e site em um só lugar. Explore um exemplo de
                atendimento com a Lia.
              </p>
              <button className="button primary" onClick={openChat}>
                Experimentar conversa <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const channels = {
  WhatsApp: {
    icon: MessageCircle,
    category: "Conversas que viram oportunidades.",
    desc: "Atenda, qualifique e acompanhe seus clientes no canal que eles já usam.",
    flow: [
      "Cliente envia uma mensagem",
      "Lia entende o que ele precisa",
      "Leo prepara o próximo passo",
    ],
    sample: "Oi! Queria entender como vocês podem ajudar minha empresa.",
  },
  Instagram: {
    icon: Camera,
    category: "Do primeiro direct ao próximo passo.",
    desc: "Dê continuidade ao interesse que chega pelo Instagram, com contexto para seu time.",
    flow: [
      "Uma pessoa chega pelo direct",
      "Lia responde às primeiras dúvidas",
      "O contato segue para o comercial",
    ],
    sample: "Vi o perfil de vocês e quero conhecer as soluções!",
  },
  "Seu site": {
    icon: Globe,
    category: "Seu melhor atendimento começa aqui.",
    desc: "Transforme uma visita ao site em uma conversa útil, mesmo fora do horário comercial.",
    flow: [
      "Visitante inicia o chat",
      "O agente apresenta as soluções",
      "Seu time recebe o contexto",
    ],
    sample: "Vocês também cuidam das contas a pagar?",
  },
  CRM: {
    icon: BriefcaseBusiness,
    category: "Uma história completa para cada cliente.",
    desc: "Mantenha oportunidades e próximos passos organizados na sua rotina comercial.",
    flow: [
      "Uma oportunidade é qualificada",
      "O contexto chega ao CRM",
      "Seu time acompanha a negociação",
    ],
    sample: "Quero retomar a proposta que conversamos ontem.",
  },
  "E-mail": {
    icon: Mail,
    category: "A conversa continua na caixa de entrada.",
    desc: "Organize solicitações e prepare respostas para seu time revisar antes de enviar.",
    flow: [
      "Um pedido chega por e-mail",
      "A IA organiza e sugere uma resposta",
      "Seu time revisa e envia",
    ],
    sample: "Olá! Podem me enviar mais detalhes sobre o financeiro?",
  },
};

const navigationItems = [
  {
    label: "Plataforma",
    description: "Uma visão clara do financeiro para orientar cada decisão.",
    bgColor: "#f2f5ff",
    textColor: "#1d2947",
    links: [
      { label: "Dashboard financeiro", href: "#solucoes" },
      { label: "Como funciona", href: "#como-funciona" },
    ],
  },
  {
    label: "Agentes de IA",
    description: "Atendimento, vendas e finanças trabalhando em sintonia.",
    bgColor: "#f2f8f8",
    textColor: "#1d373b",
    links: [
      { label: "Conheça os agentes", href: "#agentes" },
      { label: "Canais integrados", href: "#integracoes" },
    ],
  },
  {
    label: "Sobre a Nexo",
    description: "Tecnologia próxima, pensada para a rotina de cada negócio.",
    bgColor: "#f7f3ff",
    textColor: "#31254a",
    links: [
      { label: "Nossa abordagem", href: "#historia" },
      { label: "Perguntas frequentes", href: "#duvidas" },
    ],
  },
];

function App() {
  const [menu, setMenu] = useState(false),
    [channel, setChannel] = useState("WhatsApp"),
    [chat, setChat] = useState(false),
    [question, setQuestion] = useState(""),
    [messages, setMessages] = useState([]),
    [brief, setBrief] = useState(null);
  const modal = useRef(null),
    chatRef = useRef(null),
    previousFocus = useRef(null);
  const current = channels[channel],
    ChannelIcon = current.icon;
  useEffect(() => {
    const el = chatRef.current?.querySelector(".chat-messages");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);
  useEffect(() => {
    if (chat) {
      previousFocus.current = document.activeElement;
      chatRef.current?.showModal();
    } else if (chatRef.current?.open) {
      chatRef.current.close();
      previousFocus.current?.focus();
    }
  }, [chat]);
  const openDemo = () => {
    setMenu(false);
    setBrief(null);
    modal.current.showModal();
  };
  const openChat = () => setChat(true);
  const send = (q) => {
    if (!q.trim()) return;
    const clean = q.trim();
    let response = /caixa|financeir|saldo|receita|gasto/i.test(clean)
      ? "Neste exemplo, novembro teve R$ 128.450 em entradas e R$ 44.220 em saídas, resultando em R$ 84.230. A Nexo reúne essas informações para você acompanhar o caixa e revisar os próximos passos com sua equipe."
      : /vend|agente|leo/i.test(clean)
        ? "O Leo é o agente de vendas deste exemplo. Ele organiza o interesse do cliente, qualifica a oportunidade e prepara o próximo contato. Seu time define as regras e assume a conversa quando necessário."
        : /integra|whats|instagram|canal/i.test(clean)
          ? "A proposta é conectar WhatsApp, Instagram, site, CRM e e-mail. Cada conexão depende das permissões e da configuração da sua empresa. Nesta página, você pode explorar exemplos sem conectar nenhuma conta."
          : "Posso mostrar como a Nexo organiza o financeiro, apresenta agentes de vendas e conecta canais. Este chat usa respostas de demonstração: experimente “Como está meu caixa?” ou “Como funcionam os agentes?”.";
    setMessages((v) => [...v, { q: clean, a: response }]);
    setQuestion("");
  };
  const createBrief = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBrief({
      name: data.get("name"),
      company: data.get("company"),
      need: data.get("need"),
    });
  };
  const download = () => {
    const blob = new Blob(
      [
        `Briefing Nexo — demonstração\nNome: ${brief.name}\nEmpresa: ${brief.company}\nPrioridade: ${brief.need}\n\nEste briefing foi criado localmente. Nenhuma solicitação foi enviada.\n`,
      ],
      { type: "text/plain;charset=utf-8" },
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meu-briefing-nexo.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <header>
        <CardNav
          logo={<Logo small />}
          logoAlt="Nexo, início"
          logoHref="#solucoes"
          items={navigationItems}
          cta={{
            label: "Vamos conversar",
            href: "#solucoes",
            onClick: (event) => {
              event.preventDefault();
              openDemo();
            },
          }}
          theme="dark"
          surface="glass"
          accentColor="#4f63e8"
          cardEffect="rise"
          openOn="click"
          open={menu}
          onOpenChange={setMenu}
          maxWidth={1328}
          ariaLabel="Navegação principal"
          className="nexo-card-nav"
          style={{ "--cn-logo": "27px" }}
        />
      </header>
      <section className="opening-scroll" aria-label="Apresentação da Nexo">
        <ScrollExpand
          className="nexo-opening"
          src={publicAsset("images/architecture.jpg")}
          alt="Fachada de um edifício corporativo moderno vista de baixo"
          title="Finanças em foco. Negócios em movimento."
          scrollHint="Role para revelar"
          startWidth={42}
          startHeight={58}
          startRadius={24}
          endRadius={0}
          mediaZoom={1.18}
          scrollDistance={1.1}
          holdDistance={0.28}
          smoothing={0.12}
          overlayScrim={0.44}
          useWindowScroll
          style={{ height: "238svh" }}
        >
          <h2>Mais clareza para o próximo passo.</h2>
          <p>O financeiro organizado abre espaço para o seu negócio crescer.</p>
        </ScrollExpand>
        <div className="opening-transition-fade" aria-hidden="true" />
      </section>
      <Landing
        Dashboard={Dashboard}
        openChat={openChat}
        openDemo={openDemo}
        channels={channels}
        channel={channel}
        setChannel={setChannel}
      />

      <dialog
        ref={chatRef}
        className="chat-dialog"
        onCancel={() => setChat(false)}
        aria-labelledby="chat-title"
      >
        <div className="chat-header">
          <span className="agent-avatar nina">
            <Sparkles size={20} />
          </span>
          <div>
            <h3 id="chat-title">Converse com a Nexo</h3>
            <span>Demonstração interativa · respostas locais</span>
          </div>
          <button
            className="icon-button"
            aria-label="Fechar chat"
            onClick={() => setChat(false)}
          >
            <X size={20} />
          </button>
        </div>
        <div className="chat-messages" role="log" aria-live="polite">
          <div className="welcome">
            <h4>
              Seu negócio tem perguntas.
              <br />
              Vamos olhar juntos.
            </h4>
            <p>Escolha um assunto para explorar a demonstração.</p>
          </div>
          {messages.map((m, i) => (
            <React.Fragment key={i}>
              <div className="message user">{m.q}</div>
              <div className="message bot">
                <Sparkles size={16} />
                <p>{m.a}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="suggestions">
          {[
            "Como está meu caixa?",
            "Como funcionam os agentes?",
            "Quais canais posso integrar?",
          ].map((q) => (
            <button key={q} onClick={() => send(q)}>
              {q}
              <ArrowUpRight size={12} />
            </button>
          ))}
        </div>
        <form
          className="chat-input"
          onSubmit={(e) => {
            e.preventDefault();
            send(question);
          }}
        >
          <label className="sr-only" htmlFor="question">
            Sua pergunta
          </label>
          <input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Pergunte sobre a Nexo…"
            maxLength={500}
          />
          <button
            className="icon-button"
            aria-label="Enviar pergunta"
            disabled={!question.trim()}
          >
            <ArrowUp size={19} />
          </button>
        </form>
        <p className="chat-disclaimer">
          Exemplo ilustrativo. Não oferece aconselhamento financeiro
          personalizado.
        </p>
      </dialog>
      <dialog ref={modal} className="demo-dialog" aria-labelledby="demo-title">
        <button
          className="icon-button dialog-close"
          aria-label="Fechar demonstração"
          onClick={() => modal.current.close()}
        >
          <X />
        </button>
        <span className="modal-icon">
          <Sparkles size={25} />
        </span>
        {!brief ? (
          <>
            <h2 id="demo-title">
              O começo de
              <br />
              uma boa parceria.
            </h2>
            <p>Monte seu briefing para uma conversa com a Nexo.</p>
            <form onSubmit={createBrief}>
              <label htmlFor="name">Como podemos chamar você?</label>
              <input
                id="name"
                name="name"
                autoComplete="given-name"
                placeholder="Seu nome"
                required
                maxLength={80}
              />
              <label htmlFor="company">Qual é a sua empresa?</label>
              <input
                id="company"
                name="company"
                autoComplete="organization"
                placeholder="Nome da empresa"
                required
                maxLength={120}
              />
              <label htmlFor="need">Por onde você quer começar?</label>
              <select id="need" name="need">
                <option>Organizar meu financeiro</option>
                <option>Vender mais com agentes de IA</option>
                <option>Melhorar meu atendimento</option>
                <option>Conectar toda a operação</option>
              </select>
              <button className="button primary">
                Preparar meu briefing <ArrowRight size={17} />
              </button>
              <small>
                Esta é uma demonstração. Os dados ficam apenas nesta sessão e
                não são enviados.
              </small>
            </form>
          </>
        ) : (
          <div className="brief-success">
            <h2 id="demo-title">
              Tudo organizado,
              <br />
              {brief.name}.
            </h2>
            <p>
              Seu briefing está pronto para baixar. Nenhuma solicitação foi
              enviada.
            </p>
            <div>
              <span>Empresa</span>
              <b>{brief.company}</b>
              <span>Sua prioridade</span>
              <b>{brief.need}</b>
            </div>
            <button className="button primary" onClick={download}>
              <Download size={17} /> Baixar meu briefing
            </button>
            <button className="text-action" onClick={() => setBrief(null)}>
              Editar informações
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
