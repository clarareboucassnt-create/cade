// =========================================
// TELA DETALHE DO ITEM (item.html?id=...)
// Usa as funções do comum.js
// =========================================

const conteudo = document.querySelector("#item-conteudo");
const naoEncontrado = document.querySelector("#item-nao-encontrado");

const botaoEhMeu = document.querySelector("#botao-e-meu");
const modal = document.querySelector("#modal-e-meu");
const formulario = document.querySelector("#form-solicitacao");
const campoDetalhe = document.querySelector("#campo-detalhe");
const mensagemErro = document.querySelector("#erro-detalhe");
const botaoCancelar = document.querySelector("#botao-cancelar");
const avisoSucesso = document.querySelector("#aviso-sucesso");

// -----------------------------------------
// 1. QUAL ITEM MOSTRAR?
// O id vem no endereço: item.html?id=garrafa-termica
// -----------------------------------------
const parametros = new URLSearchParams(window.location.search);
const idDoItem = parametros.get("id") || "garrafa-termica";
const item = buscarItemPeloId(idDoItem);

// -----------------------------------------
// 2. PREENCHER A TELA
// -----------------------------------------
function preencherTela() {
  document.title = item.nome + " | Cadê?";

  document.querySelector("#item-nome").textContent = item.nome;
  document.querySelector("#item-categoria").textContent = item.categoria;
  document.querySelector("#item-local").textContent = item.local;

  const hora = item.hora || formatarHora(item.publicadoEm);
  document.querySelector("#item-data").textContent = formatarData(item.data) + ", às " + hora;

  const descricao = document.querySelector("#item-descricao");
  descricao.textContent = item.descricao;
  descricao.hidden = !item.descricao;

  const foto = document.querySelector("#item-foto");
  foto.setAttribute("aria-label", "Sem foto. Categoria: " + item.categoria);
  const icone = iconesDasCategorias[item.categoria] || "package";
  foto.querySelector("i").setAttribute("data-lucide", icone);

  const selos = document.querySelector("#item-selos");
  for (const selo of criarSelos(item)) {
    selos.append(selo);
  }

  if (item.deixou === "Comigo") {
    document.querySelector("#item-onde-retirar").textContent =
      "Quem encontrou está com o objeto. Procure a portaria principal para combinar a devolução.";
  }

  // Situações em que o botão "É meu!" não faz sentido
  if (item.status === "Devolvido") {
    document.querySelector("#aviso-devolvido").hidden = false;
    botaoEhMeu.hidden = true;
  } else if (item.meu) {
    document.querySelector("#aviso-meu").hidden = false;
    botaoEhMeu.hidden = true;
  } else if (jaSolicitei(item.id)) {
    marcarComoSolicitado();
  }

  conteudo.hidden = false;
}

function marcarComoSolicitado() {
  botaoEhMeu.disabled = true;
  botaoEhMeu.textContent = "Solicitação enviada";
  avisoSucesso.hidden = false;
}

if (item) {
  preencherTela();
} else {
  naoEncontrado.hidden = false;
}

desenharIcones();

// -----------------------------------------
// 3. ABRIR E FECHAR O MODAL
// -----------------------------------------
botaoEhMeu.addEventListener("click", function () {
  modal.showModal();
});

botaoCancelar.addEventListener("click", function () {
  modal.close();
});

// -----------------------------------------
// 4. VALIDAÇÃO DO CAMPO
// -----------------------------------------
function mostrarErro() {
  campoDetalhe.setAttribute("aria-invalid", "true");
  mensagemErro.hidden = false;
}

function esconderErro() {
  campoDetalhe.removeAttribute("aria-invalid");
  mensagemErro.hidden = true;
}

function textoEhValido() {
  return campoDetalhe.value.trim().length >= 5;
}

// Valida ao sair do campo, só se a pessoa já escreveu algo
campoDetalhe.addEventListener("blur", function () {
  const escreveuAlgo = campoDetalhe.value.trim() !== "";

  if (escreveuAlgo && !textoEhValido()) {
    mostrarErro();
  }
});

campoDetalhe.addEventListener("input", function () {
  if (textoEhValido()) {
    esconderErro();
  }
});

// -----------------------------------------
// 5. ENVIAR A SOLICITAÇÃO
// -----------------------------------------
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (!textoEhValido()) {
    mostrarErro();
    campoDetalhe.focus();
    return;
  }

  guardarSolicitacao({
    itemId: item.id,
    detalhe: campoDetalhe.value.trim(),
    enviadaEm: Date.now()
  });

  modal.close();
  formulario.reset();

  marcarComoSolicitado();
  avisoSucesso.focus();
});
