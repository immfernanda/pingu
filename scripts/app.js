/* =========================================================================
   RAIZHE — lógica da interface
   Abas, cursos, glossário, conexões, cards de estudo e análise por rede.
   Para adicionar conteúdo, edite scripts/data.js — não precisa mexer aqui.
   ========================================================================= */

const $tabs = document.getElementById("tabs");
const $conteudo = document.getElementById("conteudo");
const $busca = document.getElementById("busca");
const $contador = document.getElementById("contador");

// Abas: uma por curso + as fixas
const ABAS = [
  ...CURSOS.map((c) => ({ id: c.id, rotulo: c.titulo, tipo: "curso" })),
  { id: "cards", rotulo: "Cards de Estudo", tipo: "cards" },
  { id: "glossario", rotulo: "Glossário", tipo: "glossario" },
  { id: "conexoes", rotulo: "Conexões c/ Tráfego", tipo: "conexoes" },
  { id: "analise", rotulo: "Análise por Rede", tipo: "analise" }
];

let abaAtiva = ABAS[0].id;
let redeAtiva = REDES[0].id;

// estado do quiz (persiste entre redesenhos)
let quiz = { ordem: [], i: 0, revelado: false, acertos: 0, errados: [], ativo: false };

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

/* ---------- CARDS DE ESTUDO (quiz) ---------- */
function renderCards() {
  $conteudo.appendChild(headerSimples("Cards de Estudo",
    "Tente responder de cabeça, depois revele. Acertou: ótimo. Errou: ótimo também — vai pra revisão."));
  const area = el("div");
  area.id = "quiz-area";
  $conteudo.appendChild(area);
  desenharQuiz(area);
}

function iniciarQuiz(fonte) {
  quiz = { ordem: embaralhar(fonte), i: 0, revelado: false, acertos: 0, errados: [], ativo: true };
}

function desenharQuiz(area) {
  area.innerHTML = "";

  // tela inicial
  if (!quiz.ativo && quiz.i === 0) {
    const card = el("div", "card");
    card.appendChild(el("p", null,
      "São <b>" + CARDS_ESTUDO.length + " cards</b>. A ordem é sorteada a cada rodada."));
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

  const barra = el("div", "quiz-topo");
  barra.appendChild(el("span", "quiz-progresso", "Card " + (quiz.i + 1) + " de " + total));
  barra.appendChild(el("span", "quiz-placar", "✓ " + quiz.acertos + "  ·  📌 " + quiz.errados.length));
  area.appendChild(barra);

  const card = el("div", "card quiz-card");
  card.appendChild(el("div", "fonte", esc(atual.curso)));
  card.appendChild(el("div", "quiz-pergunta", esc(atual.pergunta)));

  if (!quiz.revelado) {
    const btn = el("button", "btn-primario", "Mostrar resposta");
    btn.onclick = () => { quiz.revelado = true; desenharQuiz(area); };
    card.appendChild(btn);
  } else {
    card.appendChild(el("div", "quiz-resposta", esc(atual.resposta)));
    const acoes = el("div", "quiz-acoes");
    const ok = el("button", "btn-acerto", "Acertei ✓");
    ok.onclick = () => { quiz.acertos++; avancar(area); };
    const err = el("button", "btn-erro", "Errei — revisar 📌");
    err.onclick = () => { quiz.errados.push(atual); avancar(area); };
    acoes.appendChild(ok);
    acoes.appendChild(err);
    card.appendChild(acoes);
  }
  area.appendChild(card);
}
function avancar(area) {
  quiz.i++;
  quiz.revelado = false;
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
    if (aba.tipo === "curso") renderCurso(CURSOS.find((c) => c.id === aba.id));
    else if (aba.tipo === "cards") renderCards();
    else if (aba.tipo === "glossario") renderGlossario();
    else if (aba.tipo === "conexoes") renderConexoes();
    else if (aba.tipo === "analise") renderAnalise();
  }
  $contador.textContent = CURSOS.length + " curso(s) · " + CONCEITOS.length +
    " conceitos · " + CARDS_ESTUDO.length + " cards";
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
  try { localStorage.setItem("raizhe-tema", t); } catch (e) {}
}
let temaAtual = "escuro"; // padrão: fundo todo preto
try { temaAtual = localStorage.getItem("raizhe-tema") || "escuro"; } catch (e) {}
$tema.onclick = () => {
  temaAtual = temaAtual === "escuro" ? "claro" : "escuro";
  aplicarTema(temaAtual);
};
aplicarTema(temaAtual);
