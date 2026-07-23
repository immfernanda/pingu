/* =========================================================================
   Pingu — Base de Conhecimento & Gestão de Tráfego
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

/* -------------------------------------------------------------------------
   5) ANÁLISE POR REDE — Google, Meta e LinkedIn.
   Cada rede tem um comportamento próprio. O mesmo número "bom" ou "ruim"
   muda de sentido dependendo da plataforma (ex.: CPM alto no LinkedIn é
   normal, porque a conversão/qualidade tende a compensar).
   Campos:
     - funil: em que parte do funil a rede atua
     - perfil: resumo do papel da rede
     - caracteristicas: verdades da plataforma
     - sinais: leitura de métricas NO CONTEXTO daquela rede
   ------------------------------------------------------------------------- */
const REDES = [
  {
    id: "google",
    nome: "Google Ads",
    funil: "Demanda real · fundo de funil",
    perfil: "Captura quem JÁ busca a solução (intenção de busca). Search e Pmax. É onde você converte a demanda que já existe.",
    caracteristicas: [
      "Intenção alta: a pessoa já procura o que você vende",
      "CPC pode ser caro em palavras muito concorridas",
      "Conversão costuma ser boa por ser fundo de funil",
      "Volume limitado pelo tamanho da busca — pouca previsibilidade de quantos vão buscar no mês"
    ],
    sinais: [
      { metrica: "CPC alto", leitura: "Normal em palavras disputadas. Avalie pelo CPA e pela qualidade do lead, não só pelo clique." },
      { metrica: "Muitos cliques, poucas conversões", leitura: "Descasamento entre palavra-chave/anúncio e a landing page, ou termos amplos demais atraindo intenção errada." },
      { metrica: "Impressões baixas", leitura: "Volume de busca pequeno, ou lance/orçamento baixo. A demanda real tem teto." }
    ]
  },
  {
    id: "meta",
    nome: "Meta Ads (Facebook/Instagram)",
    funil: "Demanda potencial · topo e meio de funil",
    perfil: "Interrompe o público certo por interesse e comportamento. Ótimo para gerar demanda e volume a custo mais baixo.",
    caracteristicas: [
      "CPM e CPC geralmente mais baratos que LinkedIn",
      "Público ainda sem intenção — precisa ser educado até o fundo",
      "Conversão direta menor; brilha em volume e em remarketing",
      "O criativo é a principal alavanca (a fadiga chega rápido)"
    ],
    sinais: [
      { metrica: "CTR caindo com o tempo", leitura: "Fadiga de criativo — o público já viu demais. Renove o criativo antes de mexer no resto." },
      { metrica: "CPM baixo, mas lead ruim", leitura: "Público amplo demais. Aperte a segmentação ou otimize por um evento de qualidade (não só clique)." },
      { metrica: "Muito clique, pouca conversão", leitura: "Tráfego ainda frio (topo de funil). Trabalhe remarketing e nutrição, não espere venda direta." }
    ]
  },
  {
    id: "linkedin",
    nome: "LinkedIn Ads",
    funil: "Demanda potencial B2B · público qualificado",
    perfil: "Segmenta por cargo, empresa e setor. Público caro, mas altamente qualificado (decisores B2B). Traz previsibilidade e escala para prospecção por perfil.",
    caracteristicas: [
      "CPM e CPC bem mais altos que Meta e Google",
      "PORÉM a taxa de conversão e a qualidade do lead costumam ser maiores",
      "Ideal para B2B, ticket alto e ciclo de venda mais longo",
      "Compensa quando o valor do cliente (LTV) justifica o custo por lead"
    ],
    sinais: [
      { metrica: "CPM alto", leitura: "Esperado no LinkedIn. Só faz sentido se a conversão/qualidade compensar — meça pelo custo por lead QUALIFICADO (MQL/SQL), nunca pelo CPM sozinho." },
      { metrica: "Poucos leads, mas bons", leitura: "Normal em B2B de nicho. Avalie pelo valor do cliente (LTV) e pela taxa de fechamento, não pelo volume." },
      { metrica: "CTR baixo", leitura: "O feed corporativo é mais 'sério'. Teste copy direta ao cargo e formatos como Lead Gen Form e documento." }
    ]
  }
];

/* -------------------------------------------------------------------------
   6) CARDS DE ESTUDO — múltipla escolha.
   Você lê a pergunta, clica na opção e vê na hora se acertou (a certa fica
   destacada de qualquer jeito) + a explicação. Acertou: ótimo. Errou: vai
   para a revisão. As opções são embaralhadas a cada exibição.
   Para adicionar: { curso, pergunta, opcoes: [...], correta: índice, resposta }.
   'correta' é o índice (base 0) da opção certa dentro de 'opcoes'.
   ------------------------------------------------------------------------- */
const CARDS_ESTUDO = [
  {
    curso: "Chuva de Vendas",
    pergunta: "O que é um Lead?",
    opcoes: ["Alguém que preencheu um formulário", "Um cliente que já comprou", "Um lead pronto para fechar"],
    correta: 0,
    resposta: "Lead é alguém que preencheu um formulário (os dados de uma pessoa). É binário: ou é lead, ou não é."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Qual a diferença entre MQL e SQL?",
    opcoes: ["MQL tem o perfil que buscamos; SQL teve o interesse validado", "MQL está pronto para vendas; SQL é só marketing", "São a mesma coisa"],
    correta: 0,
    resposta: "MQL é o lead com o perfil que buscamos (qualificado pelo marketing). SQL é quando o interesse foi validado e ele está pronto para vendas."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "O que significa BANT?",
    opcoes: ["Budget, Autoridade, Necessidade, Timing", "Brand, Audience, Network, Traffic", "Base, Ação, Nicho, Teste"],
    correta: 0,
    resposta: "BANT = Budget, Autoridade, Necessidade e Timing — 4 informações validadas na pré-venda antes de marcar a reunião."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Lead qualificado é o mesmo que lead quente?",
    opcoes: ["Não: qualificado é perfil; quente é o momento (temperatura)", "Sim, são sinônimos", "Sim, todo qualificado vai comprar"],
    correta: 0,
    resposta: "Não. Qualificado é sobre PERFIL; quente é sobre TEMPERATURA (momento). Um lead qualificado pode estar frio."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "O que caracteriza um lead frio?",
    opcoes: ["Não sabe que tem o problema (topo de funil)", "Já conhece a solução e vai comprar", "Já está pronto para a reunião"],
    correta: 0,
    resposta: "Lead frio não sabe que tem o problema (topo de funil). Tem o perfil certo, mas é mais difícil levar para uma call e vender."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Como se capta a demanda real?",
    opcoes: ["Google Ads, comprando a palavra-chave de quem já busca", "LinkedIn Ads por cargo", "Só por indicação"],
    correta: 0,
    resposta: "Demanda real é quem já busca a solução (fundo de funil). Captada tipicamente por Google Ads, comprando a palavra-chave."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Qual o maior problema da demanda real?",
    opcoes: ["Falta de previsibilidade e alta concorrência", "Excesso de volume de leads", "Não funciona no digital"],
    correta: 0,
    resposta: "A demanda real sofre com falta de previsibilidade e alta concorrência — sozinha, não gera uma operação de vendas escalável."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "O que é demanda potencial?",
    opcoes: ["Perfil certo, mas fora do momento de compra", "Quem já está comprando agora", "Quem nunca vai comprar"],
    correta: 0,
    resposta: "Demanda potencial são leads com o perfil certo, mas fora do momento de compra. Exigem função consultiva para irem ao fundo de funil."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Qual erro o 'demonstrador' comete?",
    opcoes: ["Foca no produto em vez do problema do cliente", "Ouve demais o cliente", "Não conhece a ferramenta"],
    correta: 0,
    resposta: "O demonstrador foca no produto e na ferramenta. Ninguém quer saber do seu produto — as pessoas querem resolver o próprio problema."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "A venda deve ser pautada em quê?",
    opcoes: ["No cliente e no problema dele", "Na solução e nos recursos", "No menor preço"],
    correta: 0,
    resposta: "A venda deve ser pautada no cliente e no problema dele — NÃO na solução."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "O que ganha a venda?",
    opcoes: ["A oferta mais clara", "A oferta mais barata", "A empresa maior"],
    correta: 0,
    resposta: "Ganha a oferta mais CLARA. Clareza gera maior taxa de conversão — não é a 'melhor' oferta que vence."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Qual a diferença entre problema e dor?",
    opcoes: ["Problema é o obstáculo; dor é o que se sente no dia a dia", "São a mesma coisa", "Dor é o obstáculo; problema é o sentimento"],
    correta: 0,
    resposta: "Problema é o obstáculo; dor é o que se sente no dia a dia. A dor é o que faz o lead agir."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Por que 'nunca trazer uma dor nova'?",
    opcoes: ["As dores devem vir do próprio lead (escuta ativa)", "Para encurtar a reunião", "Porque o vendedor não conhece o mercado"],
    correta: 0,
    resposta: "As dores devem vir do próprio lead (escuta ativa). Você trabalha em cima do que ele trouxe, não inventa dores."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "Para que serve o rapport na reunião?",
    opcoes: ["Criar conexão: quanto mais conexão, mais ele te ouve", "Fechar o preço logo", "Demonstrar o produto"],
    correta: 0,
    resposta: "O rapport cria conexão com o lead. Quanto mais conexão, mais ele te ouve e mais vê sentido na sua oferta."
  },
  {
    curso: "Chuva de Vendas",
    pergunta: "O que é a 'Maneira 2.0'?",
    opcoes: ["Fazer o lead explicar o próprio negócio e anotar para usar depois", "Demonstrar o produto em 2 minutos", "Enviar a proposta por e-mail"],
    correta: 0,
    resposta: "Maneira 2.0 é fazer o lead explicar o próprio negócio (histórico, objetivos, dores) e anotar tudo para usar depois a favor dele."
  }
];

/* -------------------------------------------------------------------------
   7) CLIENTES — central de operação. Uma aba por cliente.
   Cada cliente tem: visão geral, rotina diária (checklist que zera por dia),
   preparação antes das reuniões (checklist) e o guia "o que editar e como".
   Para adicionar um cliente: copie o objeto abaixo, troque o id e preencha.
   O "Cliente Modelo" é só um exemplo — pode apagar quando tiver os reais.
   Campos de 'editar': { situacao, oQue, como }.
   ------------------------------------------------------------------------- */
const CLIENTES = [
  {
    id: "modelo",
    nome: "Cliente Modelo (exemplo)",
    exemplo: true,
    redes: ["Google", "Meta"],
    objetivo: "Ex.: gerar leads qualificados a um CPA abaixo de R$ 80.",
    orcamento: "Ex.: R$ 3.000/mês (R$ 100/dia).",
    observacoes: "Substitua por: produto/serviço, público-alvo, oferta principal, o que já foi testado e o que funciona.",
    rotinaDiaria: [
      "Conferir se as campanhas estão ativas e sem reprovação de anúncio",
      "Checar o gasto do dia vs. o orçamento planejado",
      "Olhar CPA / custo por lead e comparar com a meta",
      "Verificar campanhas com queda ou disparada de CPM/CPC",
      "Revisar anúncios com CTR muito baixo ou sinal de fadiga",
      "Confirmar que as conversões estão sendo registradas (pixel/tag)",
      "Anotar 1 aprendizado ou hipótese do dia"
    ],
    antesReuniao: [
      "Levantar os números do período (investimento, leads, CPA, ROAS)",
      "Comparar com o período anterior e com a meta combinada",
      "Separar 1 vitória, 1 problema e 1 próximo passo",
      "Preparar prints/gráficos de apoio visual",
      "Revisar o que foi prometido na última reunião",
      "Listar dúvidas e decisões que preciso do cliente"
    ],
    editar: [
      {
        situacao: "CPA / custo por lead acima da meta por 3+ dias",
        oQue: "Orçamento e segmentação",
        como: "Pausar conjuntos e anúncios com pior CPA, realocar a verba para os melhores e apertar o público se estiver amplo demais."
      },
      {
        situacao: "CTR caindo com o tempo (fadiga de criativo) — comum no Meta",
        oQue: "Criativos",
        como: "Subir 2–3 criativos novos e pausar os fatigados. Variar gancho, formato e ângulo antes de mexer em público."
      },
      {
        situacao: "CPC/CPM subindo no leilão",
        oQue: "Lance e segmentação",
        como: "Revisar concorrência e tamanho do público. Testar público mais amplo e reavaliar a estratégia de lance."
      },
      {
        situacao: "Muitos cliques, poucas conversões",
        oQue: "Landing page e oferta",
        como: "Alinhar a mensagem do anúncio com a da página, reduzir atrito no formulário e testar uma oferta mais clara."
      },
      {
        situacao: "Chegam leads, mas de baixa qualidade",
        oQue: "Evento de otimização",
        como: "Otimizar por um evento de qualidade (não por clique/CPL) e enviar as conversões de qualificação (MQL) de volta à plataforma."
      },
      {
        situacao: "Campanha recém-lançada (fase de aprendizado)",
        oQue: "Paciência e estrutura",
        como: "Não mexer todo dia. Deixar sair da fase de aprendizado antes de otimizar, para não zerar o aprendizado do algoritmo."
      }
    ]
  }
];
