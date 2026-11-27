// =========================================
// CÓDIGO COMUM A TODAS AS TELAS
// Este arquivo guarda os dados do Cadê? e as funções
// que várias telas usam. Ele precisa ser carregado
// ANTES do script de cada tela.
// =========================================

// -----------------------------------------
// 1. DATAS
// -----------------------------------------

// Data no formato dos campos de data: "2026-11-25"
function dataNoFormatoDoCampo(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return ano + "-" + mes + "-" + dia;
}

function dataDeHoje() {
  return dataNoFormatoDoCampo(new Date());
}

// Data de "tantos dias atrás"
function diasAtras(quantidade) {
  const data = new Date();
  data.setDate(data.getDate() - quantidade);
  return dataNoFormatoDoCampo(data);
}

// Transforma "2026-11-25" em "25/11"
function formatarData(data) {
  const partes = data.split("-");
  return partes[2] + "/" + partes[1];
}

// Transforma um momento (Date.now()) em "14h20"
function formatarHora(momento) {
  const data = new Date(momento);
  const hora = String(data.getHours()).padStart(2, "0");
  const minuto = String(data.getMinutes()).padStart(2, "0");
  return hora + "h" + minuto;
}

// -----------------------------------------
// 2. ITENS DE EXEMPLO (já vêm carregados)
// -----------------------------------------
const UMA_HORA = 60 * 60 * 1000;
const UM_DIA = 24 * UMA_HORA;

const itensDeExemplo = [
  {
    id: "garrafa-termica",
    nome: "Garrafa térmica azul",
    categoria: "Garrafas",
    local: "Biblioteca, 2º andar",
    data: diasAtras(0),
    hora: "14h20",
    descricao: "Garrafa térmica azul, de inox, com cerca de 500 ml.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 2 * UMA_HORA
  },
  {
    id: "carregador-usb-c",
    nome: "Carregador de celular USB-C",
    categoria: "Eletrônicos",
    local: "Laboratório de Informática",
    data: diasAtras(1),
    hora: "10h05",
    descricao: "Carregador branco com cabo USB-C de cerca de 1 metro.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 2 * UM_DIA
  },
  {
    id: "carteira-estudante",
    nome: "Carteira de estudante",
    categoria: "Documentos",
    local: "Cantina",
    data: "2026-11-12",
    hora: "12h40",
    descricao: "Carteira de estudante da UCSAL, dentro de um porta-cartão.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 15 * UM_DIA
  },
  {
    id: "chaveiro",
    nome: "Chaveiro com 2 chaves",
    categoria: "Chaves",
    local: "Bloco B",
    data: "2026-11-10",
    hora: "08h15",
    descricao: "Duas chaves prateadas presas em uma argola simples.",
    deixou: "Portaria principal",
    status: "Devolvido",
    publicadoEm: Date.now() - 17 * UM_DIA
  },
  {
    id: "casaco-moletom",
    nome: "Casaco moletom cinza",
    categoria: "Roupas e acessórios",
    local: "Auditório",
    data: "2026-11-09",
    hora: "19h30",
    descricao: "Moletom cinza com capuz, tamanho M.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 18 * UM_DIA
  },
  {
    id: "fone-branco",
    nome: "Fone de ouvido branco",
    categoria: "Eletrônicos",
    local: "Bloco A",
    data: "2026-11-08",
    hora: "16h50",
    descricao: "Fone de ouvido com fio, na cor branca.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 19 * UM_DIA
  },
  {
    id: "calculadora",
    nome: "Calculadora científica",
    categoria: "Material escolar",
    local: "Bloco A",
    data: "2026-11-07",
    hora: "11h10",
    descricao: "Calculadora científica preta.",
    deixou: "Portaria principal",
    status: "Disponível",
    publicadoEm: Date.now() - 20 * UM_DIA
  },
  {
    id: "guarda-chuva",
    nome: "Guarda-chuva preto",
    categoria: "Outros",
    local: "Estacionamento",
    data: "2026-11-05",
    hora: "17h25",
    descricao: "Guarda-chuva preto, dobrável.",
    deixou: "Portaria principal",
    status: "Devolvido",
    publicadoEm: Date.now() - 22 * UM_DIA
  }
];

// -----------------------------------------
// 3. CATEGORIAS, LOCAIS E ÍCONES
// -----------------------------------------
const categorias = [
  "Eletrônicos",
  "Documentos",
  "Chaves",
  "Garrafas",
  "Roupas e acessórios",
  "Material escolar",
  "Outros"
];

const locais = [
  "Biblioteca",
  "Cantina",
  "Bloco A",
  "Bloco B",
  "Laboratório de Informática",
  "Auditório",
  "Estacionamento",
  "Quadra"
];

const iconesDasCategorias = {
  "Eletrônicos": "smartphone",
  "Documentos": "id-card",
  "Chaves": "key-round",
  "Garrafas": "glass-water",
  "Roupas e acessórios": "shirt",
  "Material escolar": "pencil",
  "Outros": "package"
};

// -----------------------------------------
// 4. LER E GUARDAR NO NAVEGADOR (localStorage)
// -----------------------------------------
function lerDoNavegador(etiqueta) {
  try {
    const texto = localStorage.getItem(etiqueta);
    if (texto === null) {
      return [];
    }
    return JSON.parse(texto);
  } catch (erro) {
    // Se o navegador bloquear ou o texto estiver estragado,
    // seguimos com a lista vazia em vez de quebrar a página.
    return [];
  }
}

function guardarNoNavegador(etiqueta, lista) {
  try {
    localStorage.setItem(etiqueta, JSON.stringify(lista));
  } catch (erro) {
    // Sem espaço ou bloqueado: não há o que fazer num protótipo.
  }
}

// Itens que VOCÊ publicou
function lerItensPublicados() {
  const itens = lerDoNavegador("cade-itens");

  // Itens guardados antes desta versão não tinham id nem status
  for (const item of itens) {
    if (!item.id) {
      item.id = "publicado-" + item.publicadoEm;
    }
    if (!item.status) {
      item.status = "Disponível";
    }
  }

  return itens;
}

function guardarItensPublicados(itens) {
  guardarNoNavegador("cade-itens", itens);
}

// Pedidos de "É meu!" que VOCÊ fez
function lerSolicitacoes() {
  return lerDoNavegador("cade-solicitacoes");
}

function guardarSolicitacao(solicitacao) {
  const solicitacoes = lerSolicitacoes();
  solicitacoes.push(solicitacao);
  guardarNoNavegador("cade-solicitacoes", solicitacoes);
}

function jaSolicitei(idDoItem) {
  const solicitacoes = lerSolicitacoes();
  return solicitacoes.some(function (solicitacao) {
    return solicitacao.itemId === idDoItem;
  });
}

// -----------------------------------------
// 5. TODOS OS ITENS, DO MAIS NOVO PARA O MAIS ANTIGO
// -----------------------------------------
function todosOsItens() {
  const meus = lerItensPublicados().map(function (item) {
    item.meu = true;
    return item;
  });

  const lista = meus.concat(itensDeExemplo);

  lista.sort(function (a, b) {
    return b.publicadoEm - a.publicadoEm;
  });

  return lista;
}

function buscarItemPeloId(id) {
  return todosOsItens().find(function (item) {
    return item.id === id;
  });
}

// Publicado há menos de 24 horas?
function ehNovo(item) {
  return Date.now() - item.publicadoEm < UM_DIA;
}

// -----------------------------------------
// 6. CRIAR UM CARTÃO A PARTIR DO MODELO
// (cada tela com lista tem um <template id="modelo-cartao">)
// -----------------------------------------
function criarCartao(item) {
  const modelo = document.querySelector("#modelo-cartao");
  const cartao = modelo.content.cloneNode(true);

  const link = cartao.querySelector(".cartao-link");
  link.textContent = item.nome;
  link.href = "item.html?id=" + encodeURIComponent(item.id);

  cartao.querySelector(".cartao-local").textContent = item.local;
  cartao.querySelector(".cartao-data").textContent = "Encontrado em " + formatarData(item.data);

  const icone = iconesDasCategorias[item.categoria] || "package";
  cartao.querySelector(".cartao-foto i").setAttribute("data-lucide", icone);

  const selos = cartao.querySelector(".selos");
  for (const selo of criarSelos(item)) {
    selos.append(selo);
  }

  return cartao;
}

// Selos de status: nunca só pela cor, sempre com texto
function criarSelos(item) {
  const selos = [];

  if (item.status === "Devolvido") {
    const selo = document.createElement("span");
    selo.className = "selo selo-devolvido";
    const icone = document.createElement("i");
    icone.setAttribute("data-lucide", "check");
    icone.setAttribute("aria-hidden", "true");
    selo.append(icone, "Devolvido");
    selos.push(selo);
  } else {
    const selo = document.createElement("span");
    selo.className = "selo selo-disponivel";
    selo.textContent = "Disponível";
    selos.push(selo);
  }

  if (ehNovo(item)) {
    const selo = document.createElement("span");
    selo.className = "selo selo-novo";
    selo.textContent = "Novo";
    selos.push(selo);
  }

  return selos;
}

// Desenha os ícones (se a biblioteca Lucide tiver carregado)
function desenharIcones() {
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Tira acentos e deixa minúsculo: "Eletrônicos" vira "eletronicos"
function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}
