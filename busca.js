// =========================================
// TELA BUSCA E FILTROS
// Usa as funções do comum.js: todosOsItens, criarCartao, normalizar...
// =========================================

const formBusca = document.querySelector("#form-busca");
const campoBusca = document.querySelector("#campo-busca");
const contador = document.querySelector("#contador");
const lista = document.querySelector("#lista-itens");
const estadoVazio = document.querySelector("#estado-vazio");

const botaoFiltros = document.querySelector("#botao-filtros");
const textoFiltros = document.querySelector("#texto-filtros");
const folha = document.querySelector("#folha-filtros");
const formFiltros = document.querySelector("#form-filtros");
const botaoFecharFiltros = document.querySelector("#botao-fechar-filtros");
const botaoLimparFiltros = document.querySelector("#botao-limpar-filtros");
const botaoLimparTudo = document.querySelector("#botao-limpar-tudo");

// Os filtros que estão valendo agora
let filtros = {
  categoria: "",
  local: "",
  periodo: "",
  status: ""
};

// -----------------------------------------
// 1. TEXTO VINDO DA TELA INÍCIO (busca.html?q=garrafa)
// -----------------------------------------
const parametros = new URLSearchParams(window.location.search);
campoBusca.value = parametros.get("q") || "";

// -----------------------------------------
// 2. O ITEM PASSA NOS FILTROS?
// -----------------------------------------
function passaNosFiltros(item) {
  const textoBuscado = normalizar(campoBusca.value);

  if (textoBuscado !== "" && !normalizar(item.nome).includes(textoBuscado)) {
    return false;
  }

  if (filtros.categoria !== "" && item.categoria !== filtros.categoria) {
    return false;
  }

  // "Biblioteca" também acha "Biblioteca, 2º andar"
  if (filtros.local !== "" && !item.local.startsWith(filtros.local)) {
    return false;
  }

  if (filtros.periodo !== "") {
    const dataMaisAntiga = diasAtras(Number(filtros.periodo));
    if (item.data < dataMaisAntiga) {
      return false;
    }
  }

  if (filtros.status !== "" && item.status !== filtros.status) {
    return false;
  }

  return true;
}

// -----------------------------------------
// 3. MOSTRAR OS RESULTADOS
// -----------------------------------------
function quantosFiltrosAtivos() {
  let total = 0;
  for (const valor of Object.values(filtros)) {
    if (valor !== "") {
      total = total + 1;
    }
  }
  return total;
}

function mostrarResultados() {
  const itens = todosOsItens().filter(passaNosFiltros);

  lista.replaceChildren();
  for (const item of itens) {
    lista.append(criarCartao(item));
  }

  if (itens.length === 1) {
    contador.textContent = "1 item encontrado";
  } else {
    contador.textContent = itens.length + " itens encontrados";
  }

  const ativos = quantosFiltrosAtivos();
  if (ativos > 0) {
    textoFiltros.textContent = "Filtros (" + ativos + ")";
    botaoFiltros.setAttribute("aria-pressed", "true");
  } else {
    textoFiltros.textContent = "Filtros";
    botaoFiltros.setAttribute("aria-pressed", "false");
  }

  estadoVazio.hidden = itens.length > 0;
  desenharIcones();
}

// Busca enquanto a pessoa digita
campoBusca.addEventListener("input", mostrarResultados);

// O Enter do teclado não recarrega a página
formBusca.addEventListener("submit", function (evento) {
  evento.preventDefault();
  campoBusca.blur();
});

// -----------------------------------------
// 4. A FOLHA DE FILTROS
// -----------------------------------------

// Coloca na folha os filtros que estão valendo
function preencherFolha() {
  for (const nome of ["categoria", "periodo", "status"]) {
    const opcao = formFiltros.querySelector('input[name="' + nome + '"][value="' + filtros[nome] + '"]');
    if (opcao) {
      opcao.checked = true;
    }
  }
  formFiltros.elements.local.value = filtros.local;
}

botaoFiltros.addEventListener("click", function () {
  preencherFolha();
  folha.showModal();
});

botaoFecharFiltros.addEventListener("click", function () {
  folha.close();
});

// Fecha ao tocar no fundo escuro, fora da folha
folha.addEventListener("click", function (evento) {
  if (evento.target === folha) {
    folha.close();
  }
});

// "Limpar" volta a folha para o padrão (ainda sem aplicar)
botaoLimparFiltros.addEventListener("click", function () {
  formFiltros.reset();
});

// "Ver resultados" aplica o que está escolhido na folha
formFiltros.addEventListener("submit", function () {
  filtros = {
    categoria: formFiltros.elements.categoria.value,
    local: formFiltros.elements.local.value,
    periodo: formFiltros.elements.periodo.value,
    status: formFiltros.elements.status.value
  };
  mostrarResultados();
});

// -----------------------------------------
// 5. ESTADO VAZIO: LIMPAR TUDO
// -----------------------------------------
botaoLimparTudo.addEventListener("click", function () {
  filtros = { categoria: "", local: "", periodo: "", status: "" };
  campoBusca.value = "";
  formFiltros.reset();
  mostrarResultados();
  campoBusca.focus();
});

mostrarResultados();
