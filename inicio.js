// =========================================
// 1. ÍCONE DE CADA CATEGORIA
// =========================================
const iconesDasCategorias = {
  "Eletrônicos": "smartphone",
  "Documentos": "id-card",
  "Chaves": "key-round",
  "Garrafas": "glass-water",
  "Roupas e acessórios": "shirt",
  "Material escolar": "pencil",
  "Outros": "package"
};

// =========================================
// 2. LER OS ITENS GUARDADOS
// =========================================
function lerItensPublicados() {
  const textoGuardado = localStorage.getItem("cade-itens");

  if (textoGuardado === null) {
    return [];
  }

  return JSON.parse(textoGuardado);
}

// Transforma "2026-11-25" em "25/11"
function formatarData(data) {
  const partes = data.split("-");
  return partes[2] + "/" + partes[1];
}

// Publicado há menos de 24 horas?
function ehNovo(item) {
  const umDia = 24 * 60 * 60 * 1000;
  return Date.now() - item.publicadoEm < umDia;
}

// =========================================
// 3. CRIAR UM CARTÃO A PARTIR DO MODELO
// =========================================
const lista = document.querySelector("#lista-itens");
const modelo = document.querySelector("#modelo-cartao");

function criarCartao(item) {
  const cartao = modelo.content.cloneNode(true);

  cartao.querySelector(".cartao-nome").textContent = item.nome;
  cartao.querySelector(".cartao-local").textContent = item.local;
  cartao.querySelector(".cartao-data").textContent = "Encontrado em " + formatarData(item.data);

  const icone = iconesDasCategorias[item.categoria];
  cartao.querySelector(".cartao-foto i").setAttribute("data-lucide", icone);

  if (!ehNovo(item)) {
    cartao.querySelector(".selo-novo").remove();
  }

  return cartao;
}

// =========================================
// 4. COLOCAR OS CARTÕES NO TOPO DA LISTA
// =========================================
const itens = lerItensPublicados();

for (const item of itens) {
  lista.prepend(criarCartao(item));
}

// Desenha os ícones dos cartões novos
lucide.createIcons();
