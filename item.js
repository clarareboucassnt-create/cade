// =========================================
// 1. PEGAR OS ELEMENTOS DA PÁGINA
// =========================================
const botaoEhMeu = document.querySelector("#botao-e-meu");
const modal = document.querySelector("#modal-e-meu");
const formulario = document.querySelector("#form-solicitacao");
const campoDetalhe = document.querySelector("#campo-detalhe");
const mensagemErro = document.querySelector("#erro-detalhe");
const botaoCancelar = document.querySelector("#botao-cancelar");
const avisoSucesso = document.querySelector("#aviso-sucesso");

// =========================================
// 2. ABRIR E FECHAR O MODAL
// =========================================
botaoEhMeu.addEventListener("click", function () {
  modal.showModal();
});

botaoCancelar.addEventListener("click", function () {
  modal.close();
});

// =========================================
// 3. MOSTRAR E ESCONDER O ERRO
// =========================================
function mostrarErro() {
  campoDetalhe.setAttribute("aria-invalid", "true");
  mensagemErro.hidden = false;
}

function esconderErro() {
  campoDetalhe.removeAttribute("aria-invalid");
  mensagemErro.hidden = true;
}

function textoEhValido() {
  const texto = campoDetalhe.value.trim();
  return texto.length >= 5;
}

// Valida quando a pessoa sai do campo
// (só se ela já escreveu algo, para não dar bronca antes da hora)
campoDetalhe.addEventListener("blur", function () {
  const escreveuAlgo = campoDetalhe.value.trim() !== "";

  if (escreveuAlgo && !textoEhValido()) {
    mostrarErro();
  }
});

// Some com o erro assim que o texto ficar bom
campoDetalhe.addEventListener("input", function () {
  if (textoEhValido()) {
    esconderErro();
  }
});

// =========================================
// 4. ENVIAR A SOLICITAÇÃO
// =========================================
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!textoEhValido()) {
    mostrarErro();
    campoDetalhe.focus();
    return;
  }

  modal.close();
  formulario.reset();

  botaoEhMeu.disabled = true;
  botaoEhMeu.textContent = "Solicitação enviada";

  avisoSucesso.hidden = false;
  avisoSucesso.focus();
});
