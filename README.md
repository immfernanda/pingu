# RAIZHE — Base de Conhecimento & Gestão de Tráfego

Projeto pessoal do gestor de tráfego. Começa como um **lugar para organizar e
associar tudo que estou estudando** e evolui para um **analisador de gestão de
tráfego pago** com visão estratégica (Google, Meta e LinkedIn Ads).

## Como abrir

Dê **duplo clique em `index.html`** (abre direto no navegador, sem instalar nada).

## O que já tem

- **Abas por curso** — a primeira é *Chuva de Vendas*, montada a partir das
  minhas anotações (funil, temperatura do lead, demanda real vs potencial,
  demonstrador vs consultor, processo comercial e etapas da reunião).
- **Glossário** — conceitos que se cruzam, com links de "relacionado a" para
  navegar entre ideias (a parte de *associar as coisas*).
- **Conexões com Tráfego** — a ponte entre teoria de vendas e a operação real
  de campanhas.
- **Analisador (protótipo)** — o "jogo" de diagnóstico: escolho uma métrica
  (CTR, CPC, CPM, conversão, CPA) e vejo as causas prováveis de subir ou cair.
- **Busca** — encontra qualquer conceito, dor ou métrica em tudo que já entrou.

## Como adicionar um curso novo

Tudo mora em [`scripts/data.js`](scripts/data.js). Para um curso novo, copie um
bloco dentro de `CURSOS` e preencha `titulo`, `modulos` e `blocos`. A interface
cria a aba sozinha — não precisa mexer em código.

Tipos de bloco: `conceito`, `lista`, `fluxo`, `destaque`, `nota`.

## Roadmap

1. **Agora** — base de conhecimento com abas por curso + associação de conceitos.
2. **Próximo** — receber os ~20 cursos, um por vez, virando abas.
3. **Depois** — analisador de campanhas por plataforma (regras de diagnóstico
   ricas para Google, Meta e LinkedIn).
4. **Meta** — app/site com visão estratégica: entende campanhas, cruza com a
   teoria de funil e apoia as atividades do dia a dia.

## Estrutura

```
index.html          página única (abre no navegador)
styles/main.css     tema escuro RAIZHE
scripts/data.js     TODO o conteúdo (edite aqui)
scripts/app.js      lógica da interface (abas, busca, links)
```
