// =========================================
// TELA PERFIL
// Usa as funções do comum.js
// =========================================

const totalPublicados = document.querySelector("#total-publicados");
const totalSolicitacoes = document.querySelector("#total-solicitacoes");
const avisoApagado = document.querySelector("#aviso-apagado");

const botaoApagar = document.querySelector("#botao-apagar");
const modalApagar = document.querySelector("#modal-apagar");
const botaoConfirmarApagar = document.querySelector("#botao-confirmar-apagar");
const botaoCancelarApagar = document.querySelector("#botao-cancelar-apagar");

function mostrarTotais() {
  totalPublicados.textContent = lerItensPublicados().length;
  totalSolicitacoes.textContent = lerSolicitacoes().length;
}

botaoApagar.addEventListener("click", function () {
  modalApagar.showModal();
});

botaoCancelarApagar.addEventListener("click", function () {
  modalApagar.close();
});

botaoConfirmarApagar.addEventListener("click", function () {
  try {
    localStorage.removeItem("cade-itens");
    localStorage.removeItem("cade-solicitacoes");
  } catch (erro) {
    // navegador bloqueou: nada a apagar
  }

  modalApagar.close();
  mostrarTotais();

  avisoApagado.hidden = false;
  avisoApagado.focus();
});

mostrarTotais();
desenharIcones();
