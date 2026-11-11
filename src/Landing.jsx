import React, { useRef, useState } from "react";
import publicAsset from "./publicAsset.js";
import LaserFlow from "./components/LaserFlow.jsx";
import AnimatedFooter from "./components/AnimatedFooter.jsx";
import CircularGallery from "./components/CircularGallery.jsx";
import ExpandableBentoGrid from "./components/ExpandableBentoGrid.jsx";
import FaqAccordion from "./components/FaqAccordion.jsx";
import PricingTiers from "./components/PricingTiers.jsx";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  ChevronDown,
  Check,
  MessageCircle,
  Globe,
  Wallet,
  TrendingUp,
  Send,
  Signal,
  BatteryFull,
  Sparkles,
  ArrowDownLeft,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "./motion.js";

const SoftwareBento = React.lazy(() => import("./components/SoftwareBento.jsx"));

const brands = {
  WhatsApp: "whatsapp",
  Instagram: "instagram",
  CRM: "hubspot",
  "E-mail": "gmail",
};
export function Brand({ name }) {
  return brands[name] ? (
    <img
      className="brand-icon"
      src={publicAsset(`logos/${brands[name]}.svg`)}
      alt=""
      width="24"
      height="24"
    />
  ) : (
    <Globe size={24} aria-hidden="true" />
  );
}
function MiniChart() {
  return (
    <svg
      className="mini-chart"
      viewBox="0 0 420 100"
      role="img"
      aria-label="Exemplo de evolução positiva do caixa"
    >
      <path className="chart-guide" d="M0 25H420M0 60H420M0 95H420" />
      <path
        className="chart-trace"
        d="M2 88C30 89 34 65 60 70S100 85 130 58S175 70 210 45S260 58 290 30S350 46 418 4"
      />
    </svg>
  );
}
function FinanceMockup() {
  return (
    <div className="hero-product" data-reveal="product" data-ui>
      <div className="mock-window">
        <span className="window-mark">nexo.</span>
        <span>Visão financeira</span>
        <span className="avatar-initial">A</span>
      </div>
      <div className="mock-content">
        <span>Disponível no caixa</span>
        <strong>
          R$ 84.230<span>,00</span>
        </strong>
        <p className="mock-positive">
          <TrendingUp size={16} /> Entradas acima das saídas
        </p>
        <MiniChart />
        <div className="mock-months">
          <span>01 nov</span>
          <span>15 nov</span>
          <span>30 nov</span>
        </div>
        <div className="mock-totals">
          <span>
            Entradas<b>R$ 128.450</b>
          </span>
          <span>
            Saídas<b>R$ 44.220</b>
          </span>
        </div>
      </div>
      <div className="mock-insight">
        <Wallet size={19} />
        <span>
          <b>Nina · Assistente financeira</b>Seu resumo do mês está pronto.
        </span>
        <Check size={18} />
      </div>
      <span className="mock-caption">
        Prévia da plataforma · dados ilustrativos
      </span>
    </div>
  );
}
const steps = [
  {
    title: "Uma conversa começa.",
    text: "Lia acolhe quem chega, responde às primeiras dúvidas e entende o que cada pessoa precisa.",
    name: "Lia",
    role: "Atendimento",
    message: "Olá! Quero organizar o financeiro da minha empresa.",
    reply:
      "Vamos começar pelo que mais precisa da sua atenção: contas, fluxo de caixa ou relatórios?",
    status: "Conversa acolhida",
    icon: MessageCircle,
  },
  {
    title: "O interesse vira contexto.",
    text: "Leo qualifica a oportunidade e entrega ao seu time um próximo passo claro, com o histórico da conversa.",
    name: "Leo",
    role: "Vendas",
    message: "Preciso de ajuda com o caixa. Podemos conversar?",
    reply:
      "Já organizei seu contexto para o time. Vamos preparar uma conversa sobre sua operação.",
    status: "Oportunidade organizada",
    icon: TrendingUp,
  },
  {
    title: "Os números fazem sentido.",
    text: "Nina reúne os movimentos do financeiro e ajuda você a entender o cenário antes de decidir.",
    name: "Nina",
    role: "Financeiro",
    message: "Como está o caixa neste mês?",
    reply:
      "No exemplo, entraram R$ 128.450 e saíram R$ 44.220. O saldo é R$ 84.230. Vamos olhar os próximos compromissos?",
    status: "Resumo disponível",
    icon: Wallet,
  },
];

const storyGalleryItems = [
  {
    image: publicAsset("images/shop-owner.jpg"),
    text: "Quem empreende",
    description: "Por trás de cada número, tem alguém fazendo acontecer.",
  },
  {
    image: publicAsset("images/coffee-shop-jpg.jpg"),
    text: "Rotina em movimento",
    description: "Uma operação organizada abre espaço para o próximo passo.",
  },
  {
    image: publicAsset("images/coffee-interior-jpg.jpg"),
    text: "Um negócio com ritmo",
    description: "A clareza acompanha o dia a dia de cada negócio.",
  },
  {
    image: publicAsset("images/facade.jpg"),
    text: "Estrutura para crescer",
    description: "Boas conexões ajudam a sustentar novas possibilidades.",
  },
  {
    image: publicAsset("images/architecture.jpg"),
    text: "Novos caminhos",
    description: "Uma visão ampla ajuda a escolher a direção.",
  },
  {
    image: publicAsset("images/sao-paulo-skyline.jpg"),
    text: "Visão de futuro",
    description: "Mais clareza para planejar o que vem pela frente.",
  },
  {
    image: publicAsset("images/sao-paulo-brazil-skyline-aerial-december-2024.jpg"),
    text: "O ritmo da cidade",
    description: "Cada negócio cresce no seu próprio compasso.",
  },
];

function AgentJourney({ openChat }) {
  const [active, setActive] = useState(0);
  const [manual, setManual] = useState(false);
  const root = useRef(null);
  const phoneRef = useRef(null);
  useGSAP(
    () => {
      if (manual || matchMedia("(prefers-reduced-motion: reduce)").matches)
        return;
      root.current.querySelectorAll("[data-step]").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 58%",
          end: "bottom 42%",
          onEnter: () => setActive(Number(step.dataset.step)),
          onEnterBack: () => setActive(Number(step.dataset.step)),
        });
      });
    },
    { scope: root, dependencies: [manual], revertOnUpdate: true },
  );
  useGSAP(
    () => {
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const question = phoneRef.current.querySelector(".phone-question");
      const typing = phoneRef.current.querySelector(".phone-typing");
      const answer = phoneRef.current.querySelector(".phone-answer");
      const status = phoneRef.current.querySelector(".phone-status");
      const fullAnswer = answer.dataset.text;
      answer.textContent = "";
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .fromTo(
          question,
          { autoAlpha: 0, x: 18, y: 8 },
          { autoAlpha: 1, x: 0, y: 0, duration: 0.42 },
        )
        .fromTo(
          typing,
          { autoAlpha: 0, y: 5, scale: 0.92 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.24 },
          "-=0.04",
        )
        .to(typing, { autoAlpha: 0, duration: 0.2 }, "+=0.66")
        .to(
          { count: 0 },
          {
            count: fullAnswer.length,
            duration: Math.min(1.8, Math.max(0.8, fullAnswer.length / 48)),
            ease: "none",
            onUpdate() {
              answer.textContent = fullAnswer.slice(
                0,
                Math.round(this.targets()[0].count),
              );
            },
          },
          "-=0.02",
        )
        .fromTo(
          status,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.3 },
          "-=0.12",
        );
    },
    { scope: phoneRef, dependencies: [active], revertOnUpdate: true },
  );
  const item = steps[active];
  const Icon = item.icon;
  return (
    <section
      className="journey section"
      id="agentes"
      ref={root}
      data-manual={manual || undefined}
    >
      <div className="journey-heading" data-reveal>
        <h2>
          Um time de IA.
          <br />
          Uma operação conectada.
        </h2>
        <p>
          Do primeiro “olá” à visão do seu caixa, cada agente cuida de uma
          parte. Você acompanha o todo.
        </p>
      </div>
      <div className="journey-layout">
        <div className="journey-stories">
          {steps.map((s, i) => (
            <article
              data-step={i}
              className={active === i ? "journey-step active" : "journey-step"}
              key={s.name}
            >
              <h3>
                {s.name}{" "}
                {s.role === "Atendimento"
                  ? "acolhe."
                  : s.role === "Vendas"
                    ? "conecta oportunidades."
                    : "cuida dos números."}
              </h3>
              <p>{s.text}</p>
              <button
                className="text-action"
                onClick={() => {
                  setManual(true);
                  setActive(i);
                  if (matchMedia("(max-width: 760px)").matches)
                    root.current
                      .querySelector(".journey-stage")
                      .scrollIntoView({
                        block: "center",
                        behavior: matchMedia("(prefers-reduced-motion: reduce)")
                          .matches
                          ? "instant"
                          : "smooth",
                      });
                }}
                aria-pressed={active === i}
              >
                Ver {s.name} em ação <ArrowUpRight size={18} />
              </button>
            </article>
          ))}
        </div>
        <div className="journey-stage">
          <img
            src={publicAsset("images/architecture.jpg")}
            width="1600"
            height="1000"
            alt="Linhas de um edifício branco vistas de baixo contra o céu"
            loading="lazy"
            decoding="async"
          />
          <div className="phone" data-ui ref={phoneRef}>
            <div className="phone-top">
              <span>9:41</span>
              <span className="phone-speaker" />
              <span className="phone-system-icons" aria-hidden="true">
                <Signal size={14} />
                <BatteryFull size={16} />
              </span>
            </div>
            <div className="phone-heading">
              <span className="phone-agent">
                <Icon size={22} />
              </span>
              <span>
                <b>{item.name}</b>
                <small>{item.role} · exemplo</small>
              </span>
              <MessageCircle size={20} />
            </div>
            <div className="phone-conversation" key={active}>
              <span className="phone-date">Hoje</span>
              <p className="phone-question">{item.message}</p>
              <div className="phone-typing" aria-hidden="true">
                <i /> <i /> <i />
              </div>
              <p
                className="phone-answer"
                data-text={item.reply}
                aria-hidden="true"
              >
                {item.reply}
              </p>
              <span className="sr-only">{item.reply}</span>
              <span className="phone-status">
                <Check size={15} />
                {item.status}
              </span>
            </div>
            <button className="phone-input" onClick={openChat}>
              Conversar com a Nexo <Send size={17} />
            </button>
            <span className="phone-home" />
          </div>
          <p className="stage-caption">
            Seu time define as regras. A IA ajuda a executar.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Landing({
  Dashboard,
  openChat,
  openDemo,
  channels,
  channel,
  setChannel,
}) {
  const pageRef = useRef(null);
  const dashboardSurfaceRef = useRef(null);
  const [activeStoryItem, setActiveStoryItem] = useState(0);
  const [footerRevealed, setFooterRevealed] = useState(false);
  const storyHighlights = [
    {
      id: "cash",
      className: "story-cash",
      icon: <Wallet size={20} />,
      subtitle: "Fluxo de caixa",
      title: "Mais clareza.\nMenos susto.",
      description:
        "Uma leitura organizada das movimentações ajuda você a antecipar decisões e cuidar do caixa com mais confiança.",
      preview: (
        <>
          <div className="cash-bars" aria-hidden="true">
            {Array.from({ length: 7 }, (_, index) => <i key={index} />)}
          </div>
          <span className="story-card-foot">
            Uma visão pronta para o próximo passo <ArrowUpRight size={17} />
          </span>
        </>
      ),
      content: (
        <>
          <p>
            O acompanhamento financeiro aproxima os dados do dia a dia das
            decisões que movem o negócio.
          </p>
          <ul>
            <li>Entradas, saídas e compromissos organizados em um só lugar.</li>
            <li>Leitura clara do que aconteceu e do que vem pela frente.</li>
            <li>Relatórios preparados para apoiar conversas e decisões.</li>
          </ul>
        </>
      ),
    },
    {
      id: "agents",
      className: "story-agent",
      icon: <Sparkles size={20} />,
      subtitle: "Seu time inteligente",
      title: "3 agentes.\nUm só contexto.",
      description:
        "Agentes de IA apoiam o atendimento e as vendas, compartilhando contexto para cada conversa continuar de onde parou.",
      preview: (
        <div className="agent-pills">
          <span>Lia</span>
          <span>Leo</span>
          <span>Nina</span>
        </div>
      ),
      content: (
        <>
          <p>
            Cada agente tem uma função definida pela sua equipe e trabalha com
            as informações certas para aquele momento.
          </p>
          <ul>
            <li><strong>Lia</strong> acolhe e orienta quem chega.</li>
            <li><strong>Leo</strong> organiza oportunidades e próximos passos.</li>
            <li><strong>Nina</strong> transforma os números em uma leitura simples.</li>
          </ul>
        </>
      ),
    },
    {
      id: "channels",
      className: "story-connect",
      icon: <ArrowDownLeft size={20} />,
      subtitle: "Canais conectados",
      title: "A conversa segue\ncom você.",
      description:
        "Os canais digitais podem se conectar à operação para sua equipe acompanhar o histórico e dar continuidade ao atendimento.",
      preview: (
        <div className="story-logos" aria-label="Exemplos de canais integrados">
          <Brand name="WhatsApp" />
          <Brand name="Instagram" />
          <Brand name="CRM" />
          <Brand name="E-mail" />
        </div>
      ),
      content: (
        <>
          <p>
            Reúna os principais pontos de contato em fluxos pensados para a
            rotina da sua equipe.
          </p>
          <ul>
            <li>WhatsApp e Instagram para conversas com clientes.</li>
            <li>CRM para acompanhar oportunidades e histórico.</li>
            <li>E-mail integrado ao contexto da operação.</li>
          </ul>
        </>
      ),
    },
  ];
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray("[data-reveal]", pageRef.current)
          .forEach((element) => {
            gsap.fromTo(
              element,
              {
                autoAlpha: 0,
                y: element.dataset.reveal === "product" ? 38 : 26,
              },
              {
                autoAlpha: 1,
                y: 0,
                duration: element.dataset.reveal === "product" ? 1.2 : 0.95,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 88%",
                  once: true,
                },
              },
            );
          });
        gsap.utils
          .toArray("[data-parallax]", pageRef.current)
          .forEach((photo) => {
            gsap.fromTo(
              photo,
              { yPercent: -3, scale: 1.04 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: photo.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                },
              },
            );
          });

      });
      return () => media.revert();
    },
    { scope: pageRef },
  );
  const current = channels[channel];
  return (
    <>
      <main id="conteudo" ref={pageRef}>
        <section className="dashboard-hero" id="solucoes">
          <LaserFlow
            className="dashboard-laser"
            surfaceRef={dashboardSurfaceRef}
            beamPosition={0.94}
            beamLift={0.04}
            color="#aebaff"
            intensity={2.25}
            beamWidth={1.8}
            flare={1.65}
            spread={1.5}
            spill={1.25}
            fog={0.2}
            dust={1.6}
            speed={0.8}
            revealImage={publicAsset("images/architecture.jpg")}
            revealRadius={220}
            revealOpacity={0.6}
            theme="dark"
          />
          <div className="dashboard-hero-content section">
            <div className="dashboard-hero-copy" data-reveal>
              <span className="dashboard-eyebrow">
                <i /> Finanças e inteligência em sintonia
              </span>
              <h1>
                Seu negócio,
                <br />
                <em>em perspectiva.</em>
              </h1>
              <p>
                Uma visão clara do financeiro, com agentes de IA prontos para
                atender, vender e conectar sua operação.
              </p>
              <div className="dashboard-hero-actions">
                <button className="button dashboard-hero-cta" onClick={openDemo}>
                  Conheça a Nexo <ArrowUpRight size={18} />
                </button>
                <a href="#agentes" className="dashboard-hero-link">
                  Conheça seu time de IA <ArrowDown size={16} />
                </a>
              </div>
            </div>
            <div className="dashboard-stage" data-reveal="product">
              <div className="dashboard-screen" ref={dashboardSurfaceRef}>
                <div className="screen-frame-bar" aria-hidden="true">
                  <span className="screen-window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>Nexo · Visão geral</span>
                  <span className="screen-live">
                    <i /> Prévia interativa
                  </span>
                </div>
                <Dashboard openChat={openChat} />
              </div>
            </div>
            <div className="dashboard-hero-foot">
              <span>Uma prévia da sua operação financeira.</span>
              <span>Troque de área e período para explorar.</span>
            </div>
          </div>
        </section>
        <AgentJourney openChat={openChat} />
        <section className="stack-gallery" aria-labelledby="stack-gallery-title">
          <div className="stack-gallery-heading section" data-reveal>
            <span className="eyebrow">TECNOLOGIA DESENVOLVIDA PELA EQUIPE NEXO</span>
            <h2 id="stack-gallery-title">
              Financeiro que entende
              <br />
              <em>o seu ritmo.</em>
            </h2>
            <p>
              Da arquitetura dos dados às interfaces e integrações, nossa equipe
              de software cria e acompanha cada camada da plataforma. Tecnologia
              moldada à rotina financeira de cada negócio.
            </p>
          </div>
          <div className="section software-bento-stage" data-reveal>
            <React.Suspense fallback={null}>
              <SoftwareBento />
            </React.Suspense>
          </div>
          <p className="software-bento-note section">
            Demonstração conceitual da arquitetura e dos fluxos de software.
          </p>
        </section>
        <div className="section section-rule" aria-hidden="true">
          <span />
          Um ecossistema, muitos pontos de contato
          <span />
        </div>
        <section
          className="brand-strip section"
          aria-label="Exemplos de canais"
        >
          <p>
            Seu negócio já está conectado.
            <br />
            <b>Agora, sua operação também.</b>
          </p>
          <div className="brand-list">
            {[
              ["WhatsApp", "WhatsApp"],
              ["Instagram", "Instagram"],
              ["CRM", "HubSpot"],
              ["E-mail", "Gmail"],
            ].map(([key, label]) => (
              <span key={key}>
                <Brand name={key} />
                {label}
              </span>
            ))}
          </div>
          <small>
            Exemplos de integração. Disponibilidade sujeita à configuração.
          </small>
        </section>
        <div className="section section-rule color-rule" aria-hidden="true">
          <span />
          Gente de verdade. Decisões melhores.
          <span />
        </div>
        <section
          className="story section"
          id="historia"
          aria-labelledby="story-title"
        >
          <div className="story-heading">
            <div>
              <span className="eyebrow">Uma operação com mais vida</span>
              <h2 id="story-title">
                Os números contam.
                <br />
                <em>A história é sua.</em>
              </h2>
            </div>
            <p>
              Do primeiro cliente ao próximo passo, junte a visão do caixa ao
              ritmo do seu negócio.
            </p>
          </div>
          <div className="story-gallery" data-reveal="product">
            <div className="story-gallery-viewport">
              <CircularGallery
                items={storyGalleryItems}
                bend={3}
                textColor="#f3f5fb"
                borderRadius={0.05}
                font="700 18px Manrope Variable"
                scrollEase={0.05}
                enableWheel={false}
                autoScroll={0.5}
                onItemClick={(item, index) => setActiveStoryItem(index)}
                onActiveChange={setActiveStoryItem}
                aria-label="Histórias de negócios e gestão financeira"
              />
            </div>
            <div className="story-gallery-meta" aria-live="polite">
              <span className="story-gallery-index">
                {String(activeStoryItem + 1).padStart(2, "0")} / {String(storyGalleryItems.length).padStart(2, "0")}
              </span>
              <span>{storyGalleryItems[activeStoryItem]?.text}</span>
              <small>Arraste para explorar · clique em uma imagem para ampliar</small>
            </div>
          </div>
          <ExpandableBentoGrid items={storyHighlights} onAction={openDemo} />
          <p className="story-disclaimer">
            Composição ilustrativa. Indicadores e fluxos são exemplos, sem dados
            de clientes reais.
          </p>
        </section>
        <section className="integration-section" id="integracoes">
          <div className="section integration-grid">
            <div data-reveal>
              <h2>
                O mesmo cuidado.
                <br />
                Em cada canal.
              </h2>
              <p>
                A conversa muda de lugar. O contexto continua com você. Explore
                como cada canal pode fazer parte da sua operação.
              </p>
              <div className="channel-tabs" aria-label="Canais disponíveis">
                {Object.keys(channels).map((name) => (
                  <button
                    key={name}
                    aria-pressed={channel === name}
                    onClick={() => setChannel(name)}
                  >
                    <Brand name={name} />
                    {name}
                  </button>
                ))}
              </div>
              <p className="integration-note">
                WhatsApp, Instagram, HubSpot e Gmail são marcas de seus
                respectivos titulares. Conexões ilustrativas, sem vínculo de
                parceria.
              </p>
            </div>
            <div className="channel-detail" data-ui>
              <div className="channel-title">
                <Brand name={channel} />
                <b>{channel}</b>
                <span>Exemplo de fluxo</span>
              </div>
              <h3>{current.category}</h3>
              <p>{current.desc}</p>
              <ol>
                {current.flow.map((step) => (
                  <li key={step}>
                    <Check size={17} />
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              <div className="sample-message">
                <MessageCircle size={18} />
                <p>{current.sample}</p>
              </div>
              <button className="text-action" onClick={openChat}>
                Testar uma conversa <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
        <section className="care section" id="como-funciona">
          <PricingTiers onContact={openDemo} />
        </section>
        <section className="faq section" id="duvidas">
          <h2 id="faq-title" data-reveal>
            Vamos deixar
            <br /> tudo claro.
          </h2>
          <FaqAccordion
            aria-label="Perguntas frequentes sobre a Nexo"
            items={[
              {
                question: "A Nexo cuida de quais partes do financeiro?",
                answer: "A proposta reúne contas a pagar e receber, organização do fluxo de caixa e acompanhamento dos resultados. O escopo é definido de acordo com a rotina da sua empresa.",
              },
              {
                question: "A IA toma decisões financeiras por mim?",
                answer: "Não. Os agentes ajudam a organizar informações e sugerir próximos passos. Decisões e movimentações dependem da revisão e autorização das pessoas responsáveis.",
              },
              {
                question: "Preciso trocar as ferramentas que já uso?",
                answer: "As conexões são avaliadas a partir das ferramentas da sua empresa, suas permissões e as integrações disponíveis.",
              },
              {
                question: "Posso experimentar os agentes por aqui?",
                answer: "Sim. O dashboard e o chat desta página são demonstrações interativas com dados ilustrativos. Nenhuma conta é conectada e nenhuma mensagem externa é enviada.",
              },
            ]}
          />
        </section>
        <section className="closing">
          <img
            data-parallax
            src={publicAsset("images/sao-paulo-skyline.jpg")}
            alt="Horizonte de São Paulo em um dia claro"
            width="1700"
            height="1110"
            loading="lazy"
            decoding="async"
          />
          <div className="closing-scrim" />
          <div className="section closing-content">
            <h2 data-reveal>
              Seu próximo capítulo
              <br />
              começa com clareza.
            </h2>
            <p data-reveal>
              Conte com a Nexo para cuidar do financeiro
              <br />e conectar as oportunidades do seu negócio.
            </p>
            <button className="button light" onClick={openDemo} data-reveal>
              Vamos conversar <ArrowUpRight size={19} />
            </button>
          </div>
        </section>
      </main>
      <footer className="site-footer" data-revealed={footerRevealed ? "true" : "false"}>
        <AnimatedFooter
          leftImage={publicAsset("images/shop-owner.jpg")}
          rightImage={publicAsset("images/architecture.jpg")}
          columns={52}
          cellSize={11}
          fontSize={9}
          parallaxStrength={11}
          charColor="#aebaff"
          hoverColor="#6576f0"
          hoverCharColor="#ffffff"
          onRevealChange={setFooterRevealed}
        />
        <div
          className="footer-inner section"
          aria-hidden={!footerRevealed}
          inert={!footerRevealed}
        >
          <div className="footer-top">
            <div className="footer-brand">
              <a
                href="#solucoes"
                className="footer-wordmark"
                aria-label="Nexo, voltar à plataforma"
              >
                nexo<span className="footer-dot">.</span>
              </a>
              <p>
                Financeiro em ordem.
                <br />
                Mais clareza para o que vem depois.
              </p>
            </div>
            <div className="footer-cta">
              <span>Vamos organizar seu próximo passo?</span>
              <button className="footer-action" onClick={openDemo}>
                Fale com a Nexo <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Links do rodapé">
            <div className="footer-link-group">
              <h3>Explorar</h3>
              <a href="#solucoes">Plataforma financeira</a>
              <a href="#agentes">Agentes de IA</a>
              <a href="#integracoes">Canais integrados</a>
            </div>
            <div className="footer-link-group">
              <h3>A Nexo</h3>
              <a href="#como-funciona">Como funciona</a>
              <a href="#historia">Nossa abordagem</a>
              <a href="#duvidas">Perguntas frequentes</a>
            </div>
            <div className="footer-link-group">
              <h3>Converse</h3>
              <button onClick={openDemo}>Fale com nosso time</button>
              <button onClick={openChat}>Pergunte à assistente</button>
            </div>
          </nav>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Nexo. Conceito de marca e demonstração.
            </span>
            <span className="footer-note">Dados e conversas ilustrativos.</span>
            <details className="photo-credits">
            <summary>Créditos das imagens</summary>
            <p>
              São Paulo:{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:Sao_Paulo_Brazil_Skyline_Aerial,_December_2024.jpg"
                target="_blank"
                rel="noreferrer"
              >
                Spicypepper999 (CC0)
              </a>{" "}
              e{" "}
              <a
                href="https://commons.wikimedia.org/w/index.php?curid=21404665"
                target="_blank"
                rel="noreferrer"
              >
                Andre Deak
              </a>{" "}
              (
              <a
                href="https://creativecommons.org/licenses/by/2.0/"
                target="_blank"
                rel="noreferrer"
              >
                CC BY 2.0
              </a>
              ), imagens recortadas. Pequenos negócios:{" "}
              <a
                href="https://commons.wikimedia.org/wiki/File:A_successful_shop_owner.jpg"
                target="_blank"
                rel="noreferrer"
              >
                USAID Indonesia (domínio público nos EUA)
              </a>
              . Café:{" "}
              <a
                href="https://commons.wikimedia.org/w/index.php?curid=81463270"
                target="_blank"
                rel="noreferrer"
              >
                Mostafameraji (CC BY 4.0)
              </a>
              , imagens recortadas. Interior de café:{" "}
              <a
                href="https://commons.wikimedia.org/w/index.php?curid=129257786"
                target="_blank"
                rel="noreferrer"
              >
                UndueMarmot (CC BY 4.0)
              </a>
              . Arquitetura: Julien Moreau e Roman Kraft,
              via{" "}
              <a href="https://picsum.photos" target="_blank" rel="noreferrer">
                Lorem Picsum / Unsplash
              </a>
              . Logos:{" "}
              <a
                href="https://github.com/simple-icons/simple-icons"
                target="_blank"
                rel="noreferrer"
              >
                Simple Icons
              </a>
              .
            </p>
            </details>
          </div>
        </div>
      </footer>
    </>
  );
}
