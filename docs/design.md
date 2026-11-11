---
name: Nexo
description: Clareza financeira, pessoas e oportunidades conectadas.
colors:
  primary: "#2455da"
  primary-hover: "#1947c3"
  ink: "#142b3d"
  paper: "#ffffff"
  soft: "#f0f4f8"
  muted: "#475d6b"
  deep-stage: "#132c40"
  success: "#126247"
  dark-ink: "#e4edf4"
  dark-paper: "#112330"
  dark-soft: "#1d3445"
  dark-muted: "#b7c8d4"
typography:
  display:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(3rem, 5.8vw, 5.5rem)"
    fontWeight: 550
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  headline:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "clamp(2.25rem, 3.7vw, 3.5rem)"
    fontWeight: 550
    lineHeight: 1.12
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "16px"
    fontWeight: 450
    lineHeight: 1.6
  button:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "15px"
    fontWeight: 650
  product:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "14px"
    lineHeight: 1.5
rounded:
  control: "7px"
  product-panel: "8px"
  channel-panel: "12px"
  dialog: "16px"
spacing:
  compact: "8px"
  control-gap: "18px"
  panel: "24px"
  section-gap: "100px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px"
  channel-button:
    backgroundColor: "#294254"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
---

# Design System: Nexo

## Overview

**Creative North Star: "Uma operação conectada"**

A identidade existente combina Manrope, azul de ação e azul profundo com superfícies claras e informações financeiras legíveis. Fotografias reais de cidade e arquitetura dão contexto aos negócios; os mockups mostram o produto com conteúdo reconhecível. A direção desta página e sua sequência narrativa estão em [visual-direction.md](visual-direction.md), não constituem uma composição obrigatória para outras superfícies.

Este documento foi reconciliado com `src/styles.css`, `src/Landing.jsx` e `src/main.jsx`. A marca é provisória e as telas são demonstrativas, conforme [PRODUCT.md](../PRODUCT.md). Fotografias, logos e respectivas fontes estão em [assets.md](assets.md).

**Key Characteristics:**

- Fotografia real como contexto, com contraste suficiente para a leitura.
- Produto legível e interativo em mockups solicitados pelo usuário.
- Superfícies planas, hierarquia tipográfica e ação azul.
- Movimento opcional que explica uma mudança de contexto.

### Pesquisa preservada

A consulta Graphify utilizou o grafo do outro projeto, `site isp_ apple`, com 433 nós. Ele não contém conhecimento financeiro pertinente e não foi modificado; notas Obsidian foram preservadas. O Mobbin MCP recusou as consultas por exigir plano pago: nenhuma referência Mobbin foi obtida ou presumida.

Referências Awwwards consultadas e inspecionadas: [Moto Finance](https://www.awwwards.com/sites/moto-finance), [Mercury Command](https://www.awwwards.com/sites/https-mercury-com-command), [ChatSpark](https://www.awwwards.com/sites/chatspark-conversational-ai) e [Handhold](https://www.awwwards.com/sites/handhold). A ampliação fotográfica acrescentou [VELTO](https://www.awwwards.com/sites/velto-fintech-app-concept), para escala de mockups e clareza dos valores; [E&A Financial](https://www.awwwards.com/sites/ea-financial), para contraste e narrativa financeira; e [Fourmula AI](https://www.awwwards.com/sites/fourmula-ai), para presença fotográfica e destaque do produto. Assets dessas referências não foram copiados.

## Colors

O azul informa ação e seleção. Branco e azul profundo alternam campos de leitura, enquanto as fotografias fornecem variedade sem introduzir uma segunda cor promocional.

### Primary

- **Azul de ação** (`primary`): CTA principal, gráficos de entrada, seleção e vínculos com o produto.
- **Azul de resposta** (`primary-hover`): confirmação de hover no CTA principal.

### Neutral

- **Tinta azul** (`ink`), **papel** (`paper`), **superfície suave** (`soft`) e **texto secundário** (`muted`): papéis globais claros.
- **Palco profundo** (`deep-stage`): seção de integrações, com texto branco.
- Os quatro papéis `dark-*` substituem os globais no tema escuro do sistema. As demonstrações financeiras, o telefone e os detalhes de canais mantêm superfícies claras e sua própria tinta para preservar leitura e cor de marca.
- **Verde de confirmação** (`success`): estado acompanhado por texto e ícone, nunca como único sinal.

**The Action Color Rule.** Azul sinaliza ação ou informação do produto; o significado de estado também aparece em palavras ou ícones.

## Typography

**Display Font / Body Font:** Manrope Variable, auto-hospedada, com fallback `sans-serif`. A fonte é compartilhada pelo marketing e pela interface demonstrativa; o produto usa numerais tabulares.

### Hierarchy

- **Display:** título principal fluido definido no frontmatter. Em celular passa a `clamp(2.6rem, 10.8vw, 4.5rem)` e entrelinha `1.08`.
- **Headline:** títulos de seção fluidos; em celular, a base é `clamp(1.9rem, 8.2vw, 2.7rem)`. A seção dos agentes e o fechamento têm medidas próprias para manter títulos curtos.
- **Title:** padrão de 24 px; os títulos dos agentes usam 32 px em desktop e 24 px em celular.
- **Body:** base definida no frontmatter; parágrafos de apresentação usam 17–18 px no desktop e, em geral, 16 px no celular. O limite global é 65 caracteres aproximados por linha (`65ch`), com limites menores conforme a coluna.
- **Product / Label:** interface em 14 px, detalhes em 13 px; botões e navegação variam entre 13 e 15 px conforme a largura. Os 13 px são o mínimo usado para conteúdo auxiliar legível.

**The One Voice Rule.** Manrope carrega título, corpo e produto; peso, escala e espaço criam hierarquia sem acrescentar fontes de decoração.

## Layout

O container principal tem largura máxima de 1280 px e margem total de 112 px. Entre 761 e 1100 px, a margem total passa a 64 px; até 760 px, a 40 px; até 360 px, a 32 px. A navegação tem container próprio, máximo de 1328 px.

Seções narrativas usam duas colunas, com intervalos de 90–100 px em desktop, 45 px em tablet e empilhamento no celular. O dashboard possui sidebar de 185 px no desktop, trilho de ícones de 60 px no tablet e navegação horizontal no celular. Métricas financeiras se reorganizam em uma coluna em telas compactas.

O telefone fica fixo no viewport dentro da sequência de agentes em desktop (`sticky`, distância superior de 40 px). Abaixo de 761 px, retorna ao fluxo normal. Botões permitem escolher o agente e levam ao mockup em celular. Nenhum trecho do conteúdo depende de ficar invisível antes de uma animação.

Validação registrada pelo trabalho principal: 11 testes Playwright aprovados; larguras de 320, 390, 768 e 1440 px, texto ampliado a 200%, operações da demonstração e axe claro/escuro. A inspeção de produção em `.taste-skill/final/report.json` registrou zero FAIL e três WARN. Essas verificações não substituem uma auditoria completa com tecnologias assistivas e dispositivos reais.

## Elevation & Depth

As superfícies ficam planas em repouso, sem sombras de caixa. Tons diferentes, fotografia, sobreposição de conteúdo e contornos dos dispositivos comunicam profundidade. O notebook e o telefone são mockups explicitamente solicitados; não definem o tratamento de todos os componentes do sistema.

A fotografia do hero recebe um scrim neutro direcional para legibilidade. O fechamento usa uma sobreposição escura uniforme. Diálogos nativos usam backdrop escuro e mantêm foco protegido. Não há blur decorativo nem texto em gradiente.

**The Readable Ground Rule.** Texto sobre fotografia exige uma base de contraste; a imagem deve continuar reconhecível, não virar uma textura quase invisível.

## Shapes

Controles têm curvas discretas; painéis usam os raios definidos no frontmatter. A moldura do telefone é uma exceção de objeto, com raio de 40 px e contorno de 6 px. O notebook usa cantos superiores de 18 px e uma base geométrica. Campos de formulário e linhas de gráfico têm bordas estruturais; as seções de marketing se separam por espaço e mudança de superfície.

Ícones de interface vêm do Lucide, com traço consistente. Logos de canais são SVGs locais do Simple Icons, acompanhados dos nomes das plataformas. O uso das marcas é ilustrativo e não representa parceria.

## Components

### Buttons

Ação sólida, texto claro e seta discreta. O botão principal tem altura mínima de 52 px; variantes de navegação são mais compactas. O estado pressionado reduz a escala a `0.97`; hover move a seta em 3 px em dispositivos com ponteiro. Foco visível usa contorno de 3 px e afastamento de 5 px. Botões desativados usam opacidade `0.45` e cursor correspondente.

### Channel selectors

Botões com logo e nome, fundo azul intermediário e estado selecionado claro. A seleção usa `aria-pressed`; altera descrição, mensagem e sequência do fluxo, sem conectar serviços externos.

### Product panels

Dados em superfícies claras, numerais tabulares, alinhamentos previsíveis e detalhes a partir de 13 px. Valores, métricas e gráficos são identificados como exemplos. O dashboard alterna período e área; o assistente abre uma demonstração local.

### Inputs and dialogs

Campos com contorno de 1 px, curva de controle, padding de 12 px e altura mínima de 48 px. Labels permanecem visíveis. Diálogos nativos limitam largura e altura ao viewport, preservam Escape e restauração de foco. O briefing gera um arquivo local; não envia uma solicitação.

### Navigation and disclosure

Header de 88 px em desktop, 72 px em celular. O menu móvel expõe links em uma coluna e controla expansão com `aria-expanded`. FAQ e créditos usam `details`/`summary`, com comportamento nativo e indicadores visuais.

### Motion

Entradas de seção duram 650 ms; entradas de produto duram 850 ms. Ambas usam transformação e opacidade com `cubic-bezier(0.16, 1, 0.3, 1)`. Fotografias têm deslocamento limitado a 18 px e escala de 1.06, calculados apenas quando estão visíveis. A rolagem muda o agente mostrado no telefone; a seleção manual interrompe essa troca automática. A mudança de mensagem dura 280 ms, desativada após seleção manual.

`prefers-reduced-motion` remove animações e transições, mantém o conteúdo visível e conserva os controles manuais. Mudança dessa preferência durante a sessão cancela os efeitos da página.

### Apple Design rationale

Princípios web preservados da leitura da skill Apple: ordenar conteúdo por importância (`hig/layout.md`), comunicar significado além da cor (`hig/accessibility.md` e `hig/color.md`), manter hierarquia com texto ampliado (`hig/typography.md`), descrever gráficos (`hig/charting-data.md`), deixar limites da IA explícitos (`hig/generative-ai.md`) e tornar movimento opcional (`hig/motion.md`). Marca serve ao conteúdo (`hig/branding.md`); teclado, ponteiro e larguras variáveis seguem a orientação de `cross-platform.md`. Não se impõem convenções nativas de macOS à página web.

## Do's and Don'ts

### Do:

- **Do** preservar Manrope, azul de ação e a hierarquia entre marketing e dados.
- **Do** usar fotografias reais com procedência, crédito e contraste legível.
- **Do** manter controles funcionais, foco visível e alternativa sem movimento.
- **Do** identificar valores e conexões ilustrativos como demonstração.

### Don't:

- **Don't** voltar às órbitas e cartões flutuantes da composição anterior como se ainda fossem a direção vigente.
- **Don't** reduzir texto auxiliar abaixo do mínimo observado de 13 px.
- **Don't** transformar limites da demonstração em promessas comerciais ou parcerias inventadas.
- **Don't** esconder conteúdo até uma animação disparar ou depender apenas de cor para comunicar estado.

Avisos não convertidos em regra: a inspeção registra muitos tamanhos tipográficos, ausência de vídeo e espaço aberto à direita do fechamento. A variedade vem de escalas responsivas e densidades distintas; fotografia foi o pedido do usuário, e o fechamento usa o horizonte como contraponto ao texto. Não se prescreve repetir essas escolhas em toda nova superfície.
