// =========================================
// TELA INÍCIO
// Usa as funções do comum.js: todosOsItens, criarCartao, desenharIcones
// =========================================

const lista = document.querySelector("#lista-itens");
const estadoVazio = document.querySelector("#estado-vazio");
const chips = document.querySelectorAll("#chips-categorias .chip");

let categoriaEscolhida = "";

// -----------------------------------------
// 1. MOSTRAR OS ITENS
// -----------------------------------------
function mostrarItens() {
  let itens = todosOsItens();

  if (categoriaEscolhida !== "") {
    itens = itens.filter(function (item) {
      return item.categoria === categoriaEscolhida;
    });
  }

  lista.replaceChildren();

  for (const item of itens) {
    lista.append(criarCartao(item));
  }

  estadoVazio.hidden = itens.length > 0;
  desenharIcones();
}

// -----------------------------------------
// 2. CHIPS DE CATEGORIA
// -----------------------------------------
for (const chip of chips) {
  chip.addEventListener("click", function () {
    // Desmarca todos e marca só o que foi clicado
    for (const outro of chips) {
      outro.setAttribute("aria-pressed", "false");
    }
    chip.setAttribute("aria-pressed", "true");

    categoriaEscolhida = chip.dataset.categoria;
    mostrarItens();
  });
}

mostrarItens();
