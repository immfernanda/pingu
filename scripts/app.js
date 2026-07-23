/* =========================================================================
   Pingu — lógica da interface
   Abas, cursos, glossário, conexões, cards de estudo e análise por rede.
   Para adicionar conteúdo, edite scripts/data.js — não precisa mexer aqui.
   ========================================================================= */

const $tabs = document.getElementById("tabs");
const $conteudo = document.getElementById("conteudo");
const $busca = document.getElementById("busca");
const $contador = document.getElementById("contador");

// Abas: uma por curso + as fixas
const ABAS = [
  { id: "clientes", rotulo: "Clientes", tipo: "clientes" },
  ...CURSOS.map((c) => ({ id: c.id, rotulo: c.titulo, tipo: "curso" })),
  { id: "cards", rotulo: "Cards de Estudo", tipo: "cards" },
  { id: "glossario", rotulo: "Glossário", tipo: "glossario" },
  { id: "conexoes", rotulo: "Conexões c/ Tráfego", tipo: "conexoes" },
  { id: "analise", rotulo: "Análise por Rede", tipo: "analise" }
];

let abaAtiva = ABAS[0].id;
let redeAtiva = REDES[0].id;
let clienteAtivo = (typeof CLIENTES !== "undefined" && CLIENTES.length) ? CLIENTES[0].id : null;

// estado do quiz (persiste entre redesenhos)
let quiz = { ordem: [], i: 0, acertos: 0, errados: [], ativo: false,
  respondida: false, selecionada: null, opcoesAtuais: null };

/* ---------- utilidades ---------- */
function el(tag, className, html) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (html != null) e.innerHTML = html;
  return e;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function slug(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function headerSimples(titulo, sub) {
  const cab = el("div", "pagina-cabecalho");
  cab.appendChild(el("h1", null, esc(titulo)));
  if (sub) cab.appendChild(el("div", "sub", esc(sub)));
  return cab;
}
function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------- abas ---------- */
function renderTabs() {
  $tabs.innerHTML = "";
  ABAS.forEach((aba) => {
    const t = el("div", "tab" + (aba.id === abaAtiva ? " ativa" : ""), esc(aba.rotulo));
    t.onclick = () => { abaAtiva = aba.id; $busca.value = ""; render(); };
    $tabs.appendChild(t);
  });
}

/* ---------- curso ---------- */
function renderCurso(curso) {
  const cab = el("div", "pagina-cabecalho");
  cab.appendChild(el("h1", null, esc(curso.titulo)));
  if (curso.subtitulo) cab.appendChild(el("div", "sub", esc(curso.subtitulo)));
  const chips = el("div", "chips");
  if (curso.status) chips.appendChild(el("span", "chip status", "✓ " + esc(curso.status)));
  (curso.tags || []).forEach((tag) => chips.appendChild(el("span", "chip", esc(tag))));
  cab.appendChild(chips);
  $conteudo.appendChild(cab);

  curso.modulos.forEach((mod) => {
    const m = el("section", "modulo");
    m.appendChild(el("h2", null, esc(mod.titulo)));
    mod.blocos.forEach((b) => m.appendChild(renderBloco(b)));
    $conteudo.appendChild(m);
  });
}
function renderBloco(b) {
  switch (b.tipo) {
    case "conceito": {
      const d = el("div", "bloco conceito");
      d.innerHTML = '<span class="termo">' + esc(b.termo) + "</span> — " +
        '<span class="def">' + esc(b.definicao) + "</span>";
      return d;
    }
    case "lista": {
      const w = el("div", "bloco");
      if (b.titulo) w.appendChild(el("div", "lista-titulo", esc(b.titulo)));
      const ul = el("ul", "lista");
      (b.itens || []).forEach((i) => ul.appendChild(el("li", null, esc(i))));
      w.appendChild(ul);
      return w;
    }
    case "fluxo": {
      const w = el("div", "bloco");
      if (b.titulo) w.appendChild(el("div", "lista-titulo", esc(b.titulo)));
      const f = el("div", "fluxo");
      (b.passos || []).forEach((p, i) => {
        if (i > 0) f.appendChild(el("span", "seta", "→"));
        f.appendChild(el("span", "passo", esc(p)));
      });
      w.appendChild(f);
      return w;
    }
    case "destaque":
      return el("div", "bloco destaque", esc(b.texto));
    case "nota":
      return el("div", "bloco nota", esc(b.texto));
    default:
      return el("div", "bloco", esc(b.texto || ""));
  }
}

/* ---------- glossário ---------- */
function renderGlossario() {
  $conteudo.appendChild(headerSimples("Glossário", "Os conceitos que se cruzam. Clique num relacionado para pular até ele."));
  const grid = el("div", "grid");
  CONCEITOS.forEach((c) => {
    const card = el("div", "card");
    card.id = "conceito-" + slug(c.termo);
    card.appendChild(el("div", "fonte", esc(c.curso)));
    card.appendChild(el("h3", null, esc(c.termo)));
    card.appendChild(el("p", null, esc(c.definicao)));
    if (c.relacionados && c.relacionados.length) {
      card.appendChild(el("div", "rotulo", "Relacionado a"));
      const rel = el("div", "relacionados");
      c.relacionados.forEach((r) => {
        const b = el("span", "rel", esc(r));
        b.onclick = () => irParaConceito(r);
        rel.appendChild(b);
      });
      card.appendChild(rel);
    }
    grid.appendChild(card);
  });
  $conteudo.appendChild(grid);
}
function irParaConceito(termo) {
  const alvo = document.getElementById("conceito-" + slug(termo));
  if (alvo) {
    alvo.scrollIntoView({ behavior: "smooth", block: "center" });
    alvo.style.outline = "2px solid var(--accent-2)";
    setTimeout(() => (alvo.style.outline = "none"), 1200);
  }
}

/* ---------- conexões com tráfego ---------- */
function renderConexoes() {
  $conteudo.appendChild(headerSimples("Conexões com Tráfego Pago",
    "A ponte entre o que você estuda e a operação de Google, Meta e LinkedIn Ads."));
  const grid = el("div", "grid");
  CONEXOES_TRAFEGO.forEach((c) => {
    const card = el("div", "card");
    card.appendChild(el("h3", null, esc(c.conceito)));
    card.appendChild(el("p", null, esc(c.ideia)));
    card.appendChild(el("div", "rotulo", "Na prática"));
    card.appendChild(el("p", null, esc(c.aplicacao)));
    grid.appendChild(card);
  });
  $conteudo.appendChild(grid);
}

/* ---------- CLIENTES (central de operação) ---------- */
function renderClientes() {
  $conteudo.appendChild(headerSimples("Clientes",
    "Tudo para operar e otimizar as campanhas de cada cliente — no dia a dia e antes das reuniões."));

  if (!CLIENTES.length) {
    $conteudo.appendChild(el("div", "vazio", "Nenhum cliente ainda. Me mande os dados de um cliente que eu adiciono aqui."));
    return;
  }

  // seletor de cliente
  const seletor = el("div", "sub-tabs");
  CLIENTES.forEach((c) => {
    const b = el("div", "sub-tab" + (c.id === clienteAtivo ? " ativa" : ""), esc(c.nome));
    b.onclick = () => { clienteAtivo = c.id; renderView(); };
    seletor.appendChild(b);
  });
  $conteudo.appendChild(seletor);

  const cli = CLIENTES.find((c) => c.id === clienteAtivo) || CLIENTES[0];

  if (cli.exemplo) {
    $conteudo.appendChild(el("div", "aviso",
      "🧩 Este é um cliente de exemplo (modelo). Me mande os dados de um cliente real que eu crio a aba dele — e depois é só apagar este."));
  }

  // visão geral
  const geral = el("div", "card");
  geral.appendChild(el("h3", null, esc(cli.nome)));
  const chips = el("div", "chips");
  (cli.redes || []).forEach((r) => chips.appendChild(el("span", "chip", esc(r))));
  geral.appendChild(chips);
  if (cli.objetivo) { geral.appendChild(el("div", "rotulo", "Objetivo")); geral.appendChild(el("p", null, esc(cli.objetivo))); }
  if (cli.orcamento) { geral.appendChild(el("div", "rotulo", "Orçamento")); geral.appendChild(el("p", null, esc(cli.orcamento))); }
  if (cli.observacoes) { geral.appendChild(el("div", "rotulo", "Observações")); geral.appendChild(el("p", null, esc(cli.observacoes))); }
  $conteudo.appendChild(geral);

  // rotina diária (zera a cada dia)
  if (cli.rotinaDiaria && cli.rotinaDiaria.length) {
    $conteudo.appendChild(el("div", "lista-titulo", "Rotina diária"));
    $conteudo.appendChild(checklist(cli.id, "diaria", cli.rotinaDiaria, true));
  }

  // antes das reuniões (limpa manualmente)
  if (cli.antesReuniao && cli.antesReuniao.length) {
    $conteudo.appendChild(el("div", "lista-titulo", "Antes das reuniões"));
    $conteudo.appendChild(checklist(cli.id, "reuniao", cli.antesReuniao, false));
  }

  // o que editar e como
  if (cli.editar && cli.editar.length) {
    $conteudo.appendChild(el("div", "lista-titulo", "O que editar e como"));
    const grid = el("div", "grid");
    cli.editar.forEach((e) => {
      const card = el("div", "card");
      card.appendChild(el("div", "fonte", "Situação"));
      card.appendChild(el("h3", null, esc(e.situacao)));
      card.appendChild(el("div", "rotulo", "O que editar"));
      card.appendChild(el("p", null, esc(e.oQue)));
      card.appendChild(el("div", "rotulo", "Como editar"));
      card.appendChild(el("p", null, esc(e.como)));
      grid.appendChild(card);
    });
    $conteudo.appendChild(grid);
  }
}

/* checklist com persistência (localStorage). resetDaily zera a cada novo dia. */
function hojeISO() { return new Date().toISOString().slice(0, 10); }
function carregarCheck(chave, n, resetDaily) {
  let obj = null;
  try { obj = JSON.parse(localStorage.getItem(chave) || "null"); } catch (e) {}
  if (!obj || !Array.isArray(obj.marcados) || obj.marcados.length !== n ||
      (resetDaily && obj.data !== hojeISO())) {
    obj = { data: hojeISO(), marcados: new Array(n).fill(false) };
    salvarCheck(chave, obj);
  }
  return obj;
}
function salvarCheck(chave, obj) {
  if (!obj.data) obj.data = hojeISO();
  try { localStorage.setItem(chave, JSON.stringify(obj)); } catch (e) {}
}
function checklist(clienteId, tipo, itens, resetDaily) {
  const chave = "pingu-check-" + clienteId + "-" + tipo;
  const estado = carregarCheck(chave, itens.length, resetDaily);
  const wrap = el("div", "checklist");

  const prog = el("div", "check-progresso");
  const atualizarProg = () => {
    const n = estado.marcados.filter(Boolean).length;
    prog.textContent = n + " / " + itens.length + " feito(s)" + (resetDaily ? " hoje" : "");
  };
  wrap.appendChild(prog);

  itens.forEach((txt, idx) => {
    const label = el("label", "check-item" + (estado.marcados[idx] ? " feito" : ""));
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!estado.marcados[idx];
    cb.onchange = () => {
      estado.marcados[idx] = cb.checked;
      salvarCheck(chave, estado);
      label.classList.toggle("feito", cb.checked);
      atualizarProg();
    };
    label.appendChild(cb);
    label.appendChild(el("span", null, esc(txt)));
    wrap.appendChild(label);
  });
  atualizarProg();

  const acoes = el("div", "quiz-acoes");
  const limpar = el("button", "btn-secundario", resetDaily ? "Zerar hoje" : "Limpar checklist");
  limpar.onclick = () => {
    estado.marcados = itens.map(() => false);
    estado.data = hojeISO();
    salvarCheck(chave, estado);
    renderView();
  };
  acoes.appendChild(limpar);
  wrap.appendChild(acoes);

  return wrap;
}

/* ---------- CARDS DE ESTUDO (quiz de múltipla escolha) ---------- */
function renderCards() {
  $conteudo.appendChild(headerSimples("Cards de Estudo",
    "Escolha a opção certa. Acertou: ótimo. Errou: a opção certa fica destacada e o card vai pra revisão."));
  const area = el("div");
  area.id = "quiz-area";
  $conteudo.appendChild(area);
  desenharQuiz(area);
}

function iniciarQuiz(fonte) {
  quiz = { ordem: embaralhar(fonte), i: 0, acertos: 0, errados: [], ativo: true,
    respondida: false, selecionada: null, opcoesAtuais: null };
}

function desenharQuiz(area) {
  area.innerHTML = "";

  // tela inicial
  if (!quiz.ativo && quiz.i === 0) {
    const card = el("div", "card");
    card.appendChild(el("p", null,
      "São <b>" + CARDS_ESTUDO.length + " cards</b> de múltipla escolha. A ordem e as opções são sorteadas a cada rodada."));
    const btn = el("button", "btn-primario", "Começar ▶");
    btn.onclick = () => { iniciarQuiz(CARDS_ESTUDO); desenharQuiz(area); };
    card.appendChild(btn);
    area.appendChild(card);
    return;
  }

  // tela final
  if (quiz.ativo && quiz.i >= quiz.ordem.length) {
    const total = quiz.ordem.length;
    const card = el("div", "card");
    card.appendChild(el("h3", null, "Rodada concluída! 🎯"));
    card.appendChild(el("p", null,
      "Você viu <b>" + total + "</b> cards · acertou <b>" + quiz.acertos + "</b> · marcou <b>" +
      quiz.errados.length + "</b> para revisar."));
    card.appendChild(el("p", null,
      "Errar aqui é ótimo — é exatamente assim que fixa. O que você revisar hoje vira acerto na próxima. 💪"));
    const acoes = el("div", "quiz-acoes");
    const btnTudo = el("button", "btn-primario", "Refazer tudo");
    btnTudo.onclick = () => { iniciarQuiz(CARDS_ESTUDO); desenharQuiz(area); };
    acoes.appendChild(btnTudo);
    if (quiz.errados.length) {
      const btnRev = el("button", "btn-secundario", "Revisar os que errei (" + quiz.errados.length + ")");
      const errados = quiz.errados.slice();
      btnRev.onclick = () => { iniciarQuiz(errados); desenharQuiz(area); };
      acoes.appendChild(btnRev);
    }
    card.appendChild(acoes);
    area.appendChild(card);
    return;
  }

  // card atual
  const atual = quiz.ordem[quiz.i];
  const total = quiz.ordem.length;

  // monta e embaralha as opções uma única vez por card
  if (!quiz.opcoesAtuais) {
    quiz.opcoesAtuais = embaralhar(atual.opcoes.map((texto, idx) =>
      ({ texto: texto, correto: idx === atual.correta })));
  }

  const barra = el("div", "quiz-topo");
  barra.appendChild(el("span", "quiz-progresso", "Card " + (quiz.i + 1) + " de " + total));
  barra.appendChild(el("span", "quiz-placar", "✓ " + quiz.acertos + "  ·  📌 " + quiz.errados.length));
  area.appendChild(barra);

  const card = el("div", "card quiz-card");
  card.appendChild(el("div", "fonte", esc(atual.curso)));
  card.appendChild(el("div", "quiz-pergunta", esc(atual.pergunta)));

  const lista = el("div", "quiz-opcoes");
  quiz.opcoesAtuais.forEach((op, idx) => {
    let cls = "opcao";
    if (quiz.respondida) {
      if (op.correto) cls += " certa";
      else if (idx === quiz.selecionada) cls += " errada";
    }
    const b = el("button", cls);
    if (quiz.respondida && op.correto) b.innerHTML = esc(op.texto) + " <span class='marca'>✓</span>";
    else if (quiz.respondida && idx === quiz.selecionada) b.innerHTML = esc(op.texto) + " <span class='marca'>✗</span>";
    else b.textContent = op.texto;
    if (quiz.respondida) b.disabled = true;
    else b.onclick = () => responder(area, idx);
    lista.appendChild(b);
  });
  card.appendChild(lista);

  if (quiz.respondida) {
    const acertou = quiz.opcoesAtuais[quiz.selecionada].correto;
    card.appendChild(el("div", "quiz-feedback " + (acertou ? "ok" : "revisar"),
      acertou ? "Isso! ✓" : "Sem problema — a opção certa está destacada. Vai pra revisão. 📌"));
    card.appendChild(el("div", "quiz-resposta", esc(atual.resposta)));
    const prox = el("button", "btn-primario", quiz.i + 1 >= total ? "Ver resultado" : "Próximo →");
    prox.onclick = () => avancar(area);
    card.appendChild(prox);
  }

  area.appendChild(card);
}

function responder(area, idx) {
  if (quiz.respondida) return;
  quiz.respondida = true;
  quiz.selecionada = idx;
  if (quiz.opcoesAtuais[idx].correto) quiz.acertos++;
  else quiz.errados.push(quiz.ordem[quiz.i]);
  desenharQuiz(area);
}

function avancar(area) {
  quiz.i++;
  quiz.respondida = false;
  quiz.selecionada = null;
  quiz.opcoesAtuais = null;
  desenharQuiz(area);
}

/* ---------- ANÁLISE POR REDE ---------- */
function renderAnalise() {
  $conteudo.appendChild(headerSimples("Análise por Rede",
    "Cada rede tem seu comportamento. O mesmo número muda de sentido conforme a plataforma."));

  // seletor de rede
  const seletor = el("div", "sub-tabs");
  REDES.forEach((r) => {
    const b = el("div", "sub-tab" + (r.id === redeAtiva ? " ativa" : ""), esc(r.nome));
    b.onclick = () => { redeAtiva = r.id; renderView(); };
    seletor.appendChild(b);
  });
  $conteudo.appendChild(seletor);

  const rede = REDES.find((r) => r.id === redeAtiva);

  const perfil = el("div", "card");
  perfil.appendChild(el("div", "fonte", esc(rede.funil)));
  perfil.appendChild(el("h3", null, esc(rede.nome)));
  perfil.appendChild(el("p", null, esc(rede.perfil)));
  perfil.appendChild(el("div", "rotulo", "Características da rede"));
  const ul = el("ul", "lista");
  rede.caracteristicas.forEach((c) => ul.appendChild(el("li", null, esc(c))));
  perfil.appendChild(ul);
  $conteudo.appendChild(perfil);

  $conteudo.appendChild(el("div", "lista-titulo", "Como ler os sinais nesta rede"));
  const grid = el("div", "grid");
  rede.sinais.forEach((s) => {
    const c = el("div", "card");
    c.appendChild(el("h3", null, esc(s.metrica)));
    c.appendChild(el("p", null, esc(s.leitura)));
    grid.appendChild(c);
  });
  $conteudo.appendChild(grid);

  // biblioteca geral de métricas (o "jogo": subiu / caiu)
  $conteudo.appendChild(el("div", "lista-titulo", "Biblioteca de métricas — subiu / caiu (geral)"));
  const gridD = el("div", "grid");
  DIAGNOSTICOS.forEach((d) => {
    const card = el("div", "card");
    card.appendChild(el("h3", null, esc(d.metrica)));
    const cols = el("div", "diag-cols");
    cols.appendChild(colDiag("subiu", "▲ Se subiu, é porque…", d.subiu));
    cols.appendChild(colDiag("caiu", "▼ Se caiu, é porque…", d.caiu));
    card.appendChild(cols);
    gridD.appendChild(card);
  });
  $conteudo.appendChild(gridD);
}
function colDiag(cls, titulo, itens) {
  const col = el("div", "diag-col " + cls);
  col.appendChild(el("h4", null, titulo));
  const ul = el("ul");
  itens.forEach((i) => ul.appendChild(el("li", null, esc(i))));
  col.appendChild(ul);
  return col;
}

/* ---------- busca global ---------- */
function renderBusca(termo) {
  const q = termo.toLowerCase();
  const achados = [];
  CURSOS.forEach((curso) => {
    curso.modulos.forEach((mod) => {
      mod.blocos.forEach((b) => {
        const texto = [b.termo, b.definicao, b.texto, b.titulo,
          ...(b.itens || []), ...(b.passos || [])].filter(Boolean).join(" ");
        if (texto.toLowerCase().includes(q)) {
          achados.push({ curso: curso.titulo, modulo: mod.titulo, texto });
        }
      });
    });
  });
  $conteudo.appendChild(headerSimples('Busca: "' + esc(termo) + '"', achados.length + " resultado(s)"));
  if (!achados.length) {
    $conteudo.appendChild(el("div", "vazio", "Nada encontrado. Tente outra palavra."));
    return;
  }
  const grid = el("div", "grid");
  achados.forEach((a) => {
    const card = el("div", "card");
    card.appendChild(el("div", "fonte", esc(a.curso) + " · " + esc(a.modulo)));
    card.appendChild(el("p", null, realce(esc(a.texto), termo)));
    grid.appendChild(card);
  });
  $conteudo.appendChild(grid);
}
function realce(texto, termo) {
  const re = new RegExp("(" + termo.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
  return texto.replace(re, "<mark>$1</mark>");
}

/* ---------- render ---------- */
function renderView() {
  $conteudo.innerHTML = "";
  const termoBusca = $busca.value.trim();
  if (termoBusca.length >= 2) {
    renderBusca(termoBusca);
  } else {
    const aba = ABAS.find((a) => a.id === abaAtiva);
    if (aba.tipo === "clientes") renderClientes();
    else if (aba.tipo === "curso") renderCurso(CURSOS.find((c) => c.id === aba.id));
    else if (aba.tipo === "cards") renderCards();
    else if (aba.tipo === "glossario") renderGlossario();
    else if (aba.tipo === "conexoes") renderConexoes();
    else if (aba.tipo === "analise") renderAnalise();
  }
  $contador.textContent = CLIENTES.length + " cliente(s) · " + CURSOS.length +
    " curso(s) · " + CARDS_ESTUDO.length + " cards";
}
function render() {
  renderTabs();
  renderView();
  window.scrollTo({ top: 0 });
}

$busca.addEventListener("input", render);
render();

/* ---------- tema claro / escuro ---------- */
const $tema = document.getElementById("tema-toggle");
function aplicarTema(t) {
  document.documentElement.setAttribute("data-tema", t);
  $tema.textContent = t === "escuro" ? "☀️ Claro" : "🌙 Escuro";
  try { localStorage.setItem("pingu-tema", t); } catch (e) {}
}
let temaAtual = "escuro"; // padrão: fundo todo preto
try { temaAtual = localStorage.getItem("pingu-tema") || "escuro"; } catch (e) {}
$tema.onclick = () => {
  temaAtual = temaAtual === "escuro" ? "claro" : "escuro";
  aplicarTema(temaAtual);
};
aplicarTema(temaAtual);
