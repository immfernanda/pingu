/* =========================================================================
   RAIZHE — Base de Conhecimento & Gestão de Tráfego
   -------------------------------------------------------------------------
   Este arquivo guarda TODO o conteúdo do sistema em forma de dados.
   Para adicionar um curso novo: copie um objeto dentro de CURSOS e preencha.
   Nada de código precisa mudar — a interface se monta sozinha a partir daqui.
   ========================================================================= */

/* -------------------------------------------------------------------------
   1) CURSOS
   Cada curso vira uma aba. Cada curso tem "modulos", e cada módulo tem
   "blocos". Tipos de bloco suportados pela interface:
     - { tipo: "conceito", termo, definicao }
     - { tipo: "lista", titulo, itens: [ "..." ] }
     - { tipo: "fluxo", titulo, passos: [ "..." ] }   (mostra com setas)
     - { tipo: "destaque", texto }                    (post-it / ideia-chave)
     - { tipo: "nota", texto }                        (observação de rodapé)
   ------------------------------------------------------------------------- */
const CURSOS = [
  {
    id: "chuva-de-vendas",
    titulo: "Chuva de Vendas",
    subtitulo: "Fundamentos de funil, qualificação e reunião de vendas",
    status: "concluído",
    tags: ["vendas", "funil", "pré-vendas", "reunião"],
    resumo:
      "Como um lead entra no funil, é qualificado e é conduzido em linha reta " +
      "até a venda. Base para entender o que o tráfego precisa entregar.",
    modulos: [
      {
        id: "funil-basico",
        titulo: "1 · Funil: Lead → MQL → SQL",
        blocos: [
          { tipo: "conceito", termo: "Lead", definicao: "Pessoa que preencheu um formulário. São os dados de alguém. O lead é binário: ou é, ou não é." },
          { tipo: "conceito", termo: "MQL (Marketing Qualified Lead)", definicao: "Lead qualificado pelo marketing — tem o perfil que buscamos. É a 1ª etapa de conversão: Lead → MQL." },
          { tipo: "conceito", termo: "SQL (Sales Qualified Lead)", definicao: "Lead qualificado para vendas. Depois do MQL, valida-se o interesse: entra-se em contato para verificar se há interesse real em seguir para uma reunião." },
          { tipo: "fluxo", titulo: "Jornada de qualificação", passos: ["Lead", "MQL", "SQL", "Reunião", "Venda"] },
          { tipo: "lista", titulo: "BANT — 4 informações validadas antes de marcar a reunião (metodologia de pré-vendas)", itens: [
            "Budget — orçamento disponível",
            "Autoridade — quem comanda / quem decide",
            "Necessidade — o que entregamos resolve algo real",
            "Timing — quando pretende começar"
          ]},
          { tipo: "nota", texto: "Muito comum: depois da reunião, validar com um SLA determinado pela metodologia de pré-vendas." },
          { tipo: "destaque", texto: "Benchmark de MQL: mercado ~10–15%. Raizhe: 80–90% de MQL." },
          { tipo: "nota", texto: "Taxas de referência: Lead → MQL ~50% · MQL → SQL ~15–25%." }
        ]
      },
      {
        id: "temperatura",
        titulo: "2 · Temperatura: Lead qualificado ≠ Lead quente",
        blocos: [
          { tipo: "destaque", texto: "Um lead qualificado pode ser quente OU frio. Qualificação (perfil) e temperatura (momento) são coisas diferentes." },
          { tipo: "conceito", termo: "Temperatura do lead", definicao: "A etapa do funil em que o lead está — o quanto ele reconhece o problema e a solução." },
          { tipo: "conceito", termo: "Lead Frio (topo de funil)", definicao: "Não sabe que tem o problema. Tem o nosso perfil, mas não reconhece a dor — por isso é mais difícil levar para uma call e vender." },
          { tipo: "conceito", termo: "Lead Morno (meio de funil)", definicao: "Sabe que tem o problema, mas não sabe como resolver. Mostramos o que ele pode fazer com dicas nossas." },
          { tipo: "conceito", termo: "Lead Quente (fundo de funil)", definicao: "Sabe que tem o problema, conhece a solução e já considera a gente OU um concorrente para resolver." },
          { tipo: "destaque", texto: "Um lead curioso pode virar lead quente." }
        ]
      },
      {
        id: "demanda",
        titulo: "3 · Demanda Real vs Demanda Potencial",
        blocos: [
          { tipo: "conceito", termo: "Demanda Real", definicao: "Já existe: pessoas que já estão no fundo de funil buscando um tipo específico de solução. Jeito mais comum de captar: Google Ads, comprando a palavra-chave (ex.: 'como contratar um software de gestão de projetos' = já está em busca da solução)." },
          { tipo: "lista", titulo: "Problemas da Demanda Real", itens: [
            "Falta de previsibilidade — não sei quantas pessoas vão buscar minha solução num mês",
            "Muito concorrida — todo mundo quer comprar essas palavras",
            "Sempre dependente do mercado",
            "Exige mais orçamento de marketing que os concorrentes para ganhar",
            "Não gera operação de vendas escalável sozinha"
          ]},
          { tipo: "fluxo", titulo: "Jornada da demanda real", passos: ["Pesquisa", "Me acha no Google Ads", "Site"] },
          { tipo: "lista", titulo: "Etapas de quebra (onde se perde)", itens: [
            "Ver o anúncio e não clicar",
            "Clicar, chegar no site e não converter"
          ]},
          { tipo: "conceito", termo: "Demanda Potencial", definicao: "Buscamos leads que estão dentro do meu perfil, mas NÃO estão no momento de compra. O vendedor tem função consultiva: levar do topo/meio até o fundo de funil e mostrar por que é mais caro continuar como está do que contratar a solução. Transforma lead em venda." },
          { tipo: "destaque", texto: "LinkedIn Ads como complemento: traz previsibilidade e escalabilidade — quantos leads geram uma venda." }
        ]
      },
      {
        id: "demonstrador-consultor",
        titulo: "4 · Demonstrador vs Consultor",
        blocos: [
          { tipo: "conceito", termo: "Demonstrador (o erro)", definicao: "O cara técnico, apaixonado pela ferramenta, que explica como funciona, como os algoritmos rodam e como o produto é lindo. Problema: ninguém quer saber do seu produto — as pessoas querem resolver o próprio problema." },
          { tipo: "destaque", texto: "Se você só demonstra, fica refém de um lead analítico que já conhece a sua solução." },
          { tipo: "conceito", termo: "Consultor (o certo)", definicao: "Consulta o lead: o que ele faz, quem ele atende, quais as dores e o que ele busca. A venda deve estar pautada no CLIENTE e NÃO na solução. Primeiro 'qual é o problema?' — depois casa a parte técnica com esse problema." },
          { tipo: "lista", titulo: "Se você depende só do lead de fundo de funil", itens: [
            "Cresce devagar",
            "Não vende de forma recorrente"
          ]},
          { tipo: "destaque", texto: "Não é a melhor oferta que ganha — é a oferta mais CLARA. Oferta mais clara = maior taxa de conversão." }
        ]
      },
      {
        id: "processo-comercial",
        titulo: "5 · Processo Comercial padronizado",
        blocos: [
          { tipo: "conceito", termo: "Por que padronizar", definicao: "Para não ficar só na opinião enviesada pelas atividades. Refaz e reformula o processo o tempo todo — e metrifica." },
          { tipo: "destaque", texto: "A negativa marca mais: transforme feedbacks em dados quantitativos para saber ONDE agir." },
          { tipo: "lista", titulo: "Como evoluir o processo", itens: [
            "Tijolo por tijolo: mudar onde está errado",
            "Confiar e executar o processo sempre",
            "Mais quantificação → mais dados confiáveis"
          ]}
        ]
      },
      {
        id: "reuniao",
        titulo: "6 · Etapas da Reunião",
        blocos: [
          { tipo: "destaque", texto: "Objetivo da reunião: levar o lead do topo ao fundo de funil. Bom vendedor faz a reunião em LINHA RETA — maior taxa de conversão porque a oferta fica mais clara." },
          { tipo: "conceito", termo: "1 · Rapport estruturado", definicao: "Quebra-gelo com propósito. O pré-vendas já identificou o perfil; na reunião é preciso criar conexão com o lead (mesma cidade, formação parecida etc.). Mais conexão → mais ele te ouve → mais ele vê sentido no que você diz." },
          { tipo: "conceito", termo: "2 · Maneira 2.0", definicao: "Fazer o lead explicar o próprio negócio: como começou, pontos históricos, problemas, objetivos, sonhos. Sempre anotar para usar depois 'a favor do lead' na hora certa." },
          { tipo: "conceito", termo: "3 · Objetivos", definicao: "Onde ele quer chegar (faturamento, reconhecimento). Ex.: 'onde quer chegar nos próximos 6 meses?' → '100% de faturamento'. Depois: 'qual o obstáculo para chegar lá?' — e o lead traz um problema. Entendendo o objetivo, entende-se o problema." },
          { tipo: "conceito", termo: "4 · Dores", definicao: "Problema é o obstáculo; DOR é o que é sentido no dia a dia. Resolve-se uma dor tirando um problema do cotidiano. O que faz um lead AGIR é a dor. Nunca traga uma dor nova — ele traz as dores (escuta ativa). Dor → implicação: fica mais barato agir." },
          { tipo: "conceito", termo: "5 · Implicação de dores", definicao: "Converse com as implicações da dor que ELE já trouxe. Depois de mostrar, pergunte o que falta para resolver. Ex.: 'isso está impactando sua família / gerando demissões. Se continuar assim, daqui 6 meses como você estará?'" },
          { tipo: "conceito", termo: "6 · Apresentar a solução", definicao: "Passagem que isola objeções. Pega dores/objetivos e transforma em solução, com apoio visual (mostra como o projeto funciona). Gatilho de passagem isola a objeção de preço." },
          { tipo: "nota", texto: "Estrutura de perguntas que atravessa a reunião: O QUE · COMO · PARA QUEM." }
        ]
      }
    ]
  }
];

/* -------------------------------------------------------------------------
   2) GLOSSÁRIO — os conceitos que se cruzam entre cursos.
   "relacionados" liga um conceito a outros (é a parte de "associar as coisas").
   ------------------------------------------------------------------------- */
const CONCEITOS = [
  { termo: "Lead", curso: "Chuva de Vendas", definicao: "Quem preencheu um formulário. Binário: é ou não é.", relacionados: ["MQL", "Temperatura do lead"] },
  { termo: "MQL", curso: "Chuva de Vendas", definicao: "Lead com o perfil que buscamos. 1ª conversão.", relacionados: ["Lead", "SQL", "BANT"] },
  { termo: "SQL", curso: "Chuva de Vendas", definicao: "Lead qualificado para vendas, com interesse validado.", relacionados: ["MQL", "BANT"] },
  { termo: "BANT", curso: "Chuva de Vendas", definicao: "Budget, Autoridade, Necessidade, Timing — checagem de pré-venda.", relacionados: ["MQL", "SQL"] },
  { termo: "Temperatura do lead", curso: "Chuva de Vendas", definicao: "Frio, morno ou quente — etapa do funil por reconhecimento do problema.", relacionados: ["Demanda Real", "Demanda Potencial"] },
  { termo: "Demanda Real", curso: "Chuva de Vendas", definicao: "Quem já busca a solução (fundo de funil). Captada por Google Ads.", relacionados: ["Demanda Potencial", "Temperatura do lead"] },
  { termo: "Demanda Potencial", curso: "Chuva de Vendas", definicao: "Perfil certo, mas fora do momento de compra. Captada por LinkedIn/Meta.", relacionados: ["Demanda Real", "Consultor"] },
  { termo: "Consultor", curso: "Chuva de Vendas", definicao: "Venda pautada no cliente e no problema, não na solução.", relacionados: ["Demanda Potencial", "Dor"] },
  { termo: "Dor", curso: "Chuva de Vendas", definicao: "O que é sentido no dia a dia. É o que faz o lead agir.", relacionados: ["Consultor", "Objetivos"] },
  { termo: "Objetivos", curso: "Chuva de Vendas", definicao: "Onde o lead quer chegar. Entendê-los revela o problema.", relacionados: ["Dor"] }
];

/* -------------------------------------------------------------------------
   3) CONEXÕES COM TRÁFEGO PAGO
   A ponte entre o que você estuda em vendas e o seu trabalho de gestor.
   ------------------------------------------------------------------------- */
const CONEXOES_TRAFEGO = [
  {
    conceito: "Demanda Real → Google Ads (Search)",
    ideia: "Quem já busca a solução está no fundo de funil. Google Search captura essa intenção comprando a palavra-chave.",
    aplicacao: "Campanhas de Search / Pmax com intenção de compra. Métrica-chave: taxa de conversão e CPA — não só cliques."
  },
  {
    conceito: "Demanda Potencial → Meta & LinkedIn Ads",
    ideia: "Perfil certo, mas ainda sem intenção. Precisa ser educado do topo/meio até o fundo de funil.",
    aplicacao: "Meta e LinkedIn para prospecção por perfil/interesse. Objetivo: previsibilidade e escala (quantos leads geram uma venda)."
  },
  {
    conceito: "Etapas de quebra do funil",
    ideia: "Ver anúncio e não clicar; clicar e não converter. Cada quebra é um ponto de otimização.",
    aplicacao: "Não clicou → criativo/segmentação. Clicou e não converteu → landing page/oferta. Diagnóstico separa mídia de página."
  },
  {
    conceito: "Oferta clara > melhor oferta",
    ideia: "Na reunião, a oferta mais clara converte mais. No anúncio é igual.",
    aplicacao: "Criativo e LP com uma promessa clara batem CTR e conversão maiores que promessas vagas."
  },
  {
    conceito: "Qualificação (MQL/SQL) → qualidade do lead",
    ideia: "Volume de lead barato não é vitória se não vira MQL/SQL.",
    aplicacao: "Otimizar por qualidade (lead → MQL → venda), não por CPL. Levar eventos de qualificação de volta para a plataforma."
  }
];

/* -------------------------------------------------------------------------
   4) ANALISADOR (PROTÓTIPO) — o "jogo" de diagnóstico de campanhas.
   Ideia: escolho uma métrica que subiu/caiu e vejo as causas prováveis.
   Isto ainda é a semente. Vamos expandir para Google, Meta e LinkedIn.
   ------------------------------------------------------------------------- */
const DIAGNOSTICOS = [
  {
    metrica: "CTR (taxa de cliques)",
    subiu: [
      "Criativo mais relevante / gancho mais forte",
      "Segmentação mais alinhada ao público certo",
      "Oferta ou headline mais clara",
      "Novidade do criativo (efeito ainda sem fadiga)"
    ],
    caiu: [
      "Fadiga de criativo (público já viu demais)",
      "Segmentação ampla demais ou desalinhada",
      "Oferta pouco clara ou pouco atraente",
      "Concorrência mudou / leilão mais disputado"
    ]
  },
  {
    metrica: "CPC (custo por clique)",
    subiu: [
      "Leilão mais concorrido / mais anunciantes",
      "Índice de qualidade / relevância caindo",
      "CTR caiu (plataforma cobra mais por clique)",
      "Público muito restrito"
    ],
    caiu: [
      "CTR subiu e melhorou a relevância",
      "Segmentação mais eficiente",
      "Menos concorrência no leilão",
      "Criativo novo com boa performance"
    ]
  },
  {
    metrica: "CPM (custo por mil impressões)",
    subiu: [
      "Público restrito ou muito disputado (ex.: datas sazonais)",
      "Baixa relevância do anúncio",
      "Poucos criativos competindo no leilão"
    ],
    caiu: [
      "Público mais amplo / menos disputado",
      "Melhor relevância do anúncio",
      "Período de menor concorrência"
    ]
  },
  {
    metrica: "Taxa de conversão (LP)",
    subiu: [
      "Landing page mais alinhada à promessa do anúncio",
      "Oferta mais clara / menos atrito no formulário",
      "Tráfego mais qualificado chegando"
    ],
    caiu: [
      "Descasamento anúncio × landing page",
      "Página lenta ou com atrito (formulário grande)",
      "Tráfego menos qualificado (segmentação ampla)"
    ]
  },
  {
    metrica: "CPA / Custo por lead",
    subiu: [
      "CPC ou CPM subiu",
      "Taxa de conversão caiu",
      "Tráfego menos qualificado exigindo mais volume"
    ],
    caiu: [
      "Conversão da página melhorou",
      "Custo de mídia (CPC/CPM) caiu",
      "Segmentação e criativo mais eficientes"
    ]
  }
];
