# Nexo

Site institucional demonstrativo para uma empresa de gestão financeira e agentes de IA. Os dados, conversas e integrações exibidos são exemplos; o projeto não conecta a contas bancárias nem executa agentes em produção.

## Desenvolvimento local

```sh
npm ci
npm run dev
```

## GitHub Pages

O workflow em `.github/workflows/pages.yml` publica o site em <https://anun3s.github.io/nexo/> quando há um push para `main`. A publicação usa o caminho `/nexo/` e envia apenas o build estático de `dist`.

Para gerar esse build localmente:

```sh
npm run build -- --base=/nexo/
```
