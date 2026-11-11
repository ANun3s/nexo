import {
  ArrowRight,
  Bot,
  ChartNoAxesCombined,
  Clock3,
  MessagesSquare,
  PlugZap,
  Sparkles,
  Wallet,
} from 'lucide-react';
import './PricingTiers.css';

const tiers = [
  {
    id: 'organizacao',
    name: 'Organização',
    description: 'Para trazer clareza à rotina financeira.',
    price: 'Sob consulta',
    featuresLabel: 'O que pode fazer parte',
    action: 'Conversar sobre organização',
    features: [
      { label: 'Contas a pagar e receber', icon: Wallet },
      { label: 'Fluxo de caixa e resultados', icon: ChartNoAxesCombined },
      { label: 'Acompanhamento financeiro', icon: Clock3 },
    ],
  },
  {
    id: 'conexao',
    name: 'Conexão',
    description: 'Para aproximar clientes, equipe e canais.',
    price: 'Sob consulta',
    featured: true,
    featuresLabel: 'Organização, com inteligência conectada',
    action: 'Conversar sobre conexões',
    features: [
      { label: 'Tudo de Organização', icon: Wallet },
      { label: 'Agentes de IA para atendimento e vendas', icon: Bot },
      { label: 'Conexão com canais da empresa', icon: PlugZap },
    ],
  },
  {
    id: 'operacao',
    name: 'Operação completa',
    description: 'Finanças e conversas no mesmo ritmo.',
    price: 'Sob consulta',
    featuresLabel: 'Para conectar a operação de ponta a ponta',
    action: 'Desenhar minha operação',
    features: [
      { label: 'Gestão financeira acompanhada', icon: ChartNoAxesCombined },
      { label: 'Agentes com contexto compartilhado', icon: MessagesSquare },
      { label: 'Revisão contínua com seu time', icon: Sparkles },
    ],
  },
];

const customPlan = {
  name: 'Escopo personalizado',
  description: 'Para operações com necessidades e conexões específicas.',
  action: 'Conversar sobre um escopo personalizado',
  featuresLabel: 'Desenhado em conjunto com a sua equipe',
  features: [
    { label: 'Rotinas financeiras adaptadas', icon: Wallet },
    { label: 'Agentes e canais conforme sua operação', icon: Bot },
    { label: 'Integrações avaliadas caso a caso', icon: PlugZap },
    { label: 'Acompanhamento alinhado ao seu time', icon: Clock3 },
  ],
};

function DottedRule() {
  return (
    <svg className="pricing-dotted-rule" aria-hidden="true" focusable="false">
      <line x1="0" x2="100%" y1="1" y2="1" />
    </svg>
  );
}

function FeatureList({ features, columns = false }) {
  return (
    <ul className={`pricing-feature-list${columns ? ' is-columns' : ''}`}>
      {features.map(({ label, icon: Icon }) => (
        <li key={label}>
          {Icon && <Icon size={20} strokeWidth={1.6} aria-hidden="true" />}
          <span>{label}</span>
        </li>
      ))}
    </ul>
  );
}

function TierCard({ tier, onContact, style }) {
  return (
    <article className={`pricing-tier${tier.featured ? ' is-featured' : ''}`} style={style}>
      <header className="pricing-tier-header">
        <h3>{tier.name}</h3>
        <p>{tier.description}</p>
      </header>
      <div className="pricing-tier-content">
        <div className="pricing-tier-price">{tier.price}</div>
        <p className="pricing-tier-price-caption">Investimento definido após entender sua operação</p>
        <button className="pricing-tier-action" type="button" onClick={onContact}>
          <span>{tier.action}</span><ArrowRight size={17} aria-hidden="true" />
        </button>
        <DottedRule />
        {tier.featuresLabel && <p className="pricing-feature-label">{tier.featuresLabel}</p>}
        <FeatureList features={tier.features} />
      </div>
    </article>
  );
}

function CustomPlanRow({ plan, onContact }) {
  return (
    <article className="pricing-custom-row">
      <header className="pricing-custom-header">
        <h3>{plan.name}</h3>
        <p>{plan.description}</p>
        <button className="pricing-tier-action" type="button" onClick={onContact}>
          <span>{plan.action}</span><ArrowRight size={17} aria-hidden="true" />
        </button>
      </header>
      <div className="pricing-custom-features">
        <DottedRule />
        <p className="pricing-feature-label">{plan.featuresLabel}</p>
        <FeatureList features={plan.features} columns />
      </div>
    </article>
  );
}

export default function PricingTiers({ onContact }) {
  return (
    <div className="pricing-tiers" data-reveal="product">
      <header className="pricing-tiers-heading">
        <span className="pricing-tiers-badge">FINANÇAS + AGENTES DE IA</span>
        <h2>Um cuidado que acompanha<br />o seu momento</h2>
        <p>Entendemos sua operação para combinar gestão financeira, agentes e integrações. O escopo e o investimento são definidos com você.</p>
      </header>
      <div className="pricing-tiers-grid">
        {tiers.map((tier, index) => <TierCard key={tier.id} tier={tier} onContact={onContact} style={{ '--tier-order': index }} />)}
      </div>
      <CustomPlanRow plan={customPlan} onContact={onContact} />
    </div>
  );
}
