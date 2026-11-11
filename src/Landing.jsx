import React, { useRef, useState } from "react";
import publicAsset from "./publicAsset.js";
import LaserFlow from "./components/LaserFlow.jsx";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack.jsx";
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
  Plus,
  Signal,
  BatteryFull,
  Sparkles,
  ArrowDownLeft,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "./motion.js";

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

const careSteps = [
  {
    number: "01",
    kicker: "IMERSÃO NA ROTINA",
    title: "Uma boa conversa",
    text: "Conhecemos seu momento, suas ferramentas e o que precisa melhorar.",
    image: publicAsset("images/shop-owner.jpg"),
    alt: "Comerciante sorrindo em sua banca de frutas",
    caption: "A rotina começa por quem empreende",
  },
  {
    number: "02",
    kicker: "CONFIGURAÇÃO SOB MEDIDA",
    title: "Conexões bem feitas",
    text: "Definimos os canais, as rotinas financeiras e as regras de cada agente.",
    image: publicAsset("images/coffee-shop-jpg.jpg"),
    alt: "Barista prepara uma bebida junto à máquina de café",
    caption: "Ferramentas que trabalham em sintonia",
  },
  {
    number: "03",
    kicker: "ACOMPANHAMENTO CONTÍNUO",
    title: "Cuidado que continua",
    text: "Seu time acompanha, revisa e ajusta a operação junto com a Nexo.",
    image: publicAsset("images/sao-paulo-brazil-skyline-aerial-december-2024.jpg"),
    alt: "Vista aérea do horizonte de São Paulo",
    caption: "Clareza para seguir em frente",
  },
];

const careRoute =
  "M700 36 C702 130 766 174 780 264 C794 348 784 412 760 476 C740 532 756 576 816 595 C900 627 1128 632 1366 620 C1400 618 1412 634 1406 654 C1402 670 1372 683 1368 710 C1365 756 1382 800 1350 832 C1328 850 1284 850 1230 844 C1050 836 847 852 650 842 C430 831 250 861 76 836";
const careMobileRoute =
  "M203 52 C198 122 208 162 203 230 C198 298 208 365 203 434 C198 503 208 570 203 638 C198 706 208 773 203 848";

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

function CareSequence() {
  return (
    <div className="care-sequence" data-care-sequence>
      <div className="care-stage" data-care-stage>
        <div className="care-stage-label" aria-hidden="true">
          <span>JORNADA NEXO</span>
          <span>03 ETAPAS · UM SÓ CONTEXTO</span>
        </div>
        <svg
          className="care-route care-route--desktop"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path className="care-route-track" d={careRoute} />
          <path className="care-route-glow" d={careRoute} />
          <path className="care-route-light" d={careRoute} />
        </svg>
        <svg
          className="care-route care-route--mobile"
          viewBox="0 0 390 900"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path className="care-route-track" d={careMobileRoute} />
          <path className="care-route-glow" d={careMobileRoute} />
          <path className="care-route-light" d={careMobileRoute} />
        </svg>
        <ol className="care-steps" aria-label="Etapas de implantação da Nexo">
          {careSteps.map((step, index) => (
            <li
              className={`care-step care-step--${index + 1}`}
              data-care-step
              key={step.number}
            >
              <div className="care-step-copy">
                <span className="care-step-number" aria-hidden="true">
                  {step.number}
                </span>
                <span className="care-step-kicker">{step.kicker}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <figure className="care-step-media">
                <img
                  src={step.image}
                  alt={step.alt}
                  width="960"
                  height="640"
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{step.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
        <div className="care-scroll-hint" aria-hidden="true">
          <span>ROLE PARA ACOMPANHAR</span>
          <ArrowDown size={15} />
        </div>
      </div>
    </div>
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

        const stackWindow = pageRef.current.querySelector(
          ".stack-gallery-window",
        );
        const stackScroller = stackWindow?.querySelector(
          ".scroll-stack--contained",
        );
        if (stackWindow && stackScroller) {
          const getStackRange = () =>
            Math.max(0, stackScroller.scrollHeight - stackScroller.clientHeight);
          const syncStack = (trigger) => {
            stackScroller.scrollTop = getStackRange() * trigger.progress;
          };

          ScrollTrigger.create({
            trigger: stackWindow,
            start: "top 15%",
            end: () => `+=${Math.max(1, getStackRange())}`,
            pin: stackWindow,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: syncStack,
            onRefresh: syncStack,
          });

          const refreshFrame = requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );
          return () => cancelAnimationFrame(refreshFrame);
        }
      });
      media.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const sequence = pageRef.current.querySelector("[data-care-sequence]");
          const stage = sequence?.querySelector("[data-care-stage]");
          const route = stage?.querySelectorAll(
            ".care-route--desktop .care-route-glow, .care-route--desktop .care-route-light",
          );
          const careSteps = stage?.querySelectorAll("[data-care-step]");
          if (!sequence || !stage || !route?.length || careSteps?.length !== 3)
            return;

          route.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          });
          careSteps.forEach((step, index) => {
            gsap.set(step.querySelector(".care-step-copy"), {
              autoAlpha: index === 0 ? 1 : 0.58,
              y: index === 0 ? 0 : 12,
            });
            gsap.set(step.querySelector(".care-step-number"), {
              autoAlpha: index === 0 ? 1 : 0.55,
              scale: index === 0 ? 1 : 0.94,
            });
            gsap.set(step.querySelector(".care-step-media"), {
              autoAlpha: 0,
              scale: 0.96,
              clipPath: "inset(9% round 20px)",
            });
          });

          const scrollUnits = 3.22;
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${Math.round(window.innerHeight * scrollUnits)}`,
              pin: stage,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
          timeline.to(route, {
            strokeDashoffset: 0,
            duration: scrollUnits,
            ease: "none",
          }, 0);

          careSteps.forEach((step, index) => {
            const copy = step.querySelector(".care-step-copy");
            const number = step.querySelector(".care-step-number");
            const photo = step.querySelector(".care-step-media");
            const copyAt = [0, 1.32, 2.62][index];
            const photoAt = [1.02, 1.58, 2.72][index];

            if (index > 0) {
              timeline.to(copy, {
                autoAlpha: 1,
                y: 0,
                duration: 0.34,
                ease: "none",
              }, copyAt);
              timeline.to(number, {
                autoAlpha: 1,
                scale: 1,
                duration: 0.28,
                ease: "none",
              }, copyAt + 0.08);
            }

            timeline.to(photo, {
              autoAlpha: 1,
              scale: 1,
              clipPath: "inset(0% round 20px)",
              duration: 0.5,
              ease: "none",
            }, photoAt);
          });

          const refreshFrame = requestAnimationFrame(() =>
            ScrollTrigger.refresh(),
          );
          return () => cancelAnimationFrame(refreshFrame);
        },
      );
      media.add(
        "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
        () => {
          const sequence = pageRef.current.querySelector("[data-care-sequence]");
          const stage = sequence?.querySelector("[data-care-stage]");
          const route = stage?.querySelectorAll(
            ".care-route--mobile .care-route-glow, .care-route--mobile .care-route-light",
          );
          const careSteps = stage?.querySelectorAll("[data-care-step]");
          if (!sequence || !stage || !route?.length || !careSteps?.length) return;

          route.forEach((path) => {
            const length = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: length,
              strokeDashoffset: length,
            });
          });
          gsap.to(route, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sequence,
              start: "top 78%",
              end: "bottom 32%",
            scrub: true,
              invalidateOnRefresh: true,
            },
          });

          careSteps.forEach((step) => {
            const copy = step.querySelector(".care-step-copy");
            const number = step.querySelector(".care-step-number");
            const photo = step.querySelector(".care-step-media");
            gsap.set([copy, number, photo], { autoAlpha: 0.55 });
            gsap.set(photo, {
              scale: 0.96,
              clipPath: "inset(8% round 16px)",
            });
            gsap.to([copy, number], {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 76%",
                end: "center 58%",
                scrub: true,
              },
            });
            gsap.to(photo, {
              autoAlpha: 1,
              scale: 1,
              clipPath: "inset(0% round 16px)",
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 70%",
                end: "center 55%",
                scrub: true,
              },
            });
          });
        },
      );
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
            revealImage={publicAsset("images/coffee-shop-jpg.jpg")}
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
            <span className="eyebrow">O negócio por trás dos números</span>
            <h2 id="stack-gallery-title">
              Financeiro que entende
              <br />
              <em>o seu ritmo.</em>
            </h2>
            <p>
              Cada operação tem seu próprio passo. Role pelas histórias que
              inspiram uma gestão mais clara e próxima de quem empreende.
            </p>
          </div>
          <div className="stack-gallery-window section">
            <ScrollStack smoothScroll={false}>
              <ScrollStackItem itemClassName="nexo-scroll-card">
                <img
                  src={publicAsset("images/shop-owner.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="nexo-scroll-card-copy">
                  <span>01 / Quem empreende</span>
                  <h3>Todo negócio tem uma história que merece fôlego.</h3>
                  <p>
                    Organização financeira devolve clareza para cuidar do que
                    faz a empresa crescer.
                  </p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem itemClassName="nexo-scroll-card">
                <img
                  src={publicAsset("images/coffee-interior-jpg.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="nexo-scroll-card-copy">
                  <span>02 / Rotina financeira</span>
                  <h3>Entradas, saídas e decisões no mesmo ritmo.</h3>
                  <p>
                    Uma visão simples transforma a rotina da operação em
                    próximos passos possíveis.
                  </p>
                </div>
              </ScrollStackItem>
              <ScrollStackItem itemClassName="nexo-scroll-card">
                <img
                  src={publicAsset("images/sao-paulo-skyline.jpg")}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <div className="nexo-scroll-card-copy">
                  <span>03 / Próximos passos</span>
                  <h3>Mais clareza para crescer com confiança.</h3>
                  <p>
                    Com os números organizados, sobra espaço para planejar o
                    que vem pela frente.
                  </p>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
          <p className="stack-gallery-note section">
            Imagens ilustrativas. Nenhuma imagem representa cliente da Nexo.
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
          <div className="story-grid">
            <article className="story-photo" data-reveal="product">
              <img
                src={publicAsset("images/shop-owner.jpg")}
                width="1920"
                height="1280"
                alt="Vendedor de frutas em sua banca, cercado por abacaxis e bananas"
                loading="lazy"
                decoding="async"
              />
              <div className="story-photo-shade" />
              <div className="story-photo-copy">
                <span>Por trás de cada número</span>
                <h3>tem alguém fazendo acontecer.</h3>
              </div>
              <span className="photo-caption">
                Pequenos negócios, grandes histórias
              </span>
            </article>
            <article className="story-card story-cash" data-reveal>
              <span className="story-card-icon">
                <Wallet size={20} />
              </span>
              <small>Fluxo de caixa</small>
              <strong>
                Mais clareza.
                <br />
                Menos susto.
              </strong>
              <div className="cash-bars" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <span className="story-card-foot">
                Uma visão pronta para o próximo passo <ArrowUpRight size={17} />
              </span>
            </article>
            <article className="story-card story-agent" data-reveal>
              <span className="story-card-icon">
                <Sparkles size={20} />
              </span>
              <small>Seu time inteligente</small>
              <strong>
                3 agentes.
                <br />
                Um só contexto.
              </strong>
              <div className="agent-pills">
                <span>Lia</span>
                <span>Leo</span>
                <span>Nina</span>
              </div>
            </article>
            <article className="story-card story-connect" data-reveal>
              <span className="story-card-icon">
                <ArrowDownLeft size={20} />
              </span>
              <small>Canais conectados</small>
              <strong>
                A conversa segue
                <br />
                com você.
              </strong>
              <div
                className="story-logos"
                aria-label="Exemplos de canais integrados"
              >
                <Brand name="WhatsApp" />
                <Brand name="Instagram" />
                <Brand name="CRM" />
                <Brand name="E-mail" />
              </div>
            </article>
            <article className="story-card story-people" data-reveal="product">
              <img
                src={publicAsset("images/coffee-shop-jpg.jpg")}
                width="1920"
                height="1280"
                alt="Barista preparando uma bebida em uma máquina de café"
                loading="lazy"
                decoding="async"
              />
              <div className="story-people-overlay">
                <span>Mais tempo para</span>
                <strong>cuidar do que vem pela frente.</strong>
              </div>
            </article>
          </div>
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
          <header className="care-heading">
            <span className="care-heading-label">UMA PARCERIA FEITA PARA A SUA ROTINA</span>
            <h2 data-reveal>
              Começa com
              <br />o seu negócio.
            </h2>
            <p data-reveal>
              Antes da tecnologia, a gente entende a sua rotina. Depois, conecta
              as pessoas, os números e as ferramentas que fazem tudo seguir.
            </p>
          </header>
          <CareSequence />
          <div className="care-cta">
            <button className="text-action" onClick={openDemo}>
              Preparar minha conversa <ArrowUpRight size={18} />
            </button>
          </div>
        </section>
        <section className="faq section" id="duvidas">
          <h2 data-reveal>
            Vamos deixar
            <br /> tudo claro.
          </h2>
          <div>
            {[
              [
                "A Nexo cuida de quais partes do financeiro?",
                "A proposta reúne contas a pagar e receber, organização do fluxo de caixa e acompanhamento dos resultados. O escopo é definido de acordo com a rotina da sua empresa.",
              ],
              [
                "A IA toma decisões financeiras por mim?",
                "Não. Os agentes ajudam a organizar informações e sugerir próximos passos. Decisões e movimentações dependem da revisão e autorização das pessoas responsáveis.",
              ],
              [
                "Preciso trocar as ferramentas que já uso?",
                "As conexões são avaliadas a partir das ferramentas da sua empresa, suas permissões e as integrações disponíveis.",
              ],
              [
                "Posso experimentar os agentes por aqui?",
                "Sim. O dashboard e o chat desta página são demonstrações interativas com dados ilustrativos. Nenhuma conta é conectada e nenhuma mensagem externa é enviada.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={19} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
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
      <footer className="site-footer">
        <div className="footer-inner section">
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
