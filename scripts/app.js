/* =========================================================================
   RAIZHE — lógica da interface
   Monta abas, renderiza cursos/glossário/conexões/analisador, busca e links.
   Não precisa mexer aqui para adicionar conteúdo — edite scripts/data.js.
   ========================================================================= */

const $tabs = document.getElementById("tabs");
const $conteudo = document.getElementById("conteudo");
const $busca = document.getElementById("busca");
const $contador = document.getElementById("contador");

// Abas fixas + uma aba por curso
const ABAS = [
  ...CURSOS.map((c) => ({ id: c.id, rotulo: c.titulo, tipo: "curso" })),
  { id: "glossario", rotulo: "Glossário", tipo: "glossario" },
  { id: "conexoes", rotulo: "Conexões c/ Tráfego", tipo: "conexoes" },
  { id: "analisador", rotulo: "Analisador (protótipo)", tipo: "analisador" }
];

let abaAtiva = ABAS[0].id;

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

/* ---------- abas ---------- */
function renderTabs() {
  $tabs.innerHTML = "";
  ABAS.forEach((aba) => {
    const t = el("div", "tab" + (aba.id === abaAtiva ? " ativa" : ""), esc(aba.rotulo));
    t.onclick = () => { abaAtiva = aba.id; $busca.value = ""; render(); };
    $tabs.appendChild(t);
  });
}

/* ---------- render de um curso ---------- */
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
    alvo.style.outline = "2px solid var(--accent)";
    setTimeout(() => (alvo.style.outline = "none"), 1200);
  }
}
function slug(s) {
  return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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

/* ---------- analisador (protótipo) ---------- */
function renderAnalisador() {
  $conteudo.appendChild(headerSimples("Analisador de Campanhas — protótipo",
    "O 'jogo': escolha uma métrica e veja as causas prováveis de ela subir ou cair."));
  $conteudo.appendChild(el("div", "aviso",
    "🌱 Semente do diagnóstico. Vamos expandir com casos reais e regras por plataforma (Google · Meta · LinkedIn)."));
  const grid = el("div", "grid");
  DIAGNOSTICOS.forEach((d) => {
    const card = el("div", "card");
    card.appendChild(el("h3", null, esc(d.metrica)));
    const cols = el("div", "diag-cols");
    cols.appendChild(colDiag("subiu", "▲ Se subiu, é porque…", d.subiu));
    cols.appendChild(colDiag("caiu", "▼ Se caiu, é porque…", d.caiu));
    card.appendChild(cols);
    grid.appendChild(card);
  });
  $conteudo.appendChild(grid);
}
function colDiag(cls, titulo, itens) {
  const col = el("div", "diag-col " + cls);
  col.appendChild(el("h4", null, titulo));
  const ul = el("ul");
  itens.forEach((i) => ul.appendChild(el("li", null, esc(i))));
  col.appendChild(ul);
  return col;
}

function headerSimples(titulo, sub) {
  const cab = el("div", "pagina-cabecalho");
  cab.appendChild(el("h1", null, esc(titulo)));
  if (sub) cab.appendChild(el("div", "sub", esc(sub)));
  return cab;
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
  $conteudo.appendChild(headerSimples('Busca: "' + esc(termo) + '"',
    achados.length + " resultado(s)"));
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

/* ---------- render principal ---------- */
function render() {
  renderTabs();
  $conteudo.innerHTML = "";
  const termoBusca = $busca.value.trim();
  if (termoBusca.length >= 2) {
    renderBusca(termoBusca);
  } else {
    const aba = ABAS.find((a) => a.id === abaAtiva);
    if (aba.tipo === "curso") renderCurso(CURSOS.find((c) => c.id === aba.id));
    else if (aba.tipo === "glossario") renderGlossario();
    else if (aba.tipo === "conexoes") renderConexoes();
    else if (aba.tipo === "analisador") renderAnalisador();
  }
  $contador.textContent = CURSOS.length + " curso(s) · " + CONCEITOS.length + " conceitos";
  window.scrollTo({ top: 0 });
}

$busca.addEventListener("input", render);
render();
