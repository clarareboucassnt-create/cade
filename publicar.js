// =========================================
// 1. PEGAR OS ELEMENTOS DA PÁGINA
// =========================================
const formulario = document.querySelector("#form-publicar");

const campoFoto = document.querySelector("#campo-foto");
const previaFoto = document.querySelector("#previa-foto");
const textoFoto = document.querySelector("#texto-foto");

const campoNome = document.querySelector("#campo-nome");
const erroNome = document.querySelector("#erro-nome");

const grupoCategoria = document.querySelector("#grupo-categoria");
const erroCategoria = document.querySelector("#erro-categoria");

const campoLocal = document.querySelector("#campo-local");
const erroLocal = document.querySelector("#erro-local");

const campoData = document.querySelector("#campo-data");
const erroData = document.querySelector("#erro-data");

const campoDescricao = document.querySelector("#campo-descricao");

const secaoFormulario = document.querySelector("#secao-formulario");
const secaoSucesso = document.querySelector("#secao-sucesso");

// =========================================
// 2. DATA DE HOJE COMO PADRÃO
// (a função dataDeHoje está no comum.js)
// =========================================
campoData.value = dataDeHoje();
campoData.max = dataDeHoje();

// =========================================
// 3. PRÉVIA DA FOTO
// =========================================
campoFoto.addEventListener("change", function () {
  const arquivo = campoFoto.files[0];

  if (!arquivo) {
    return;
  }

  previaFoto.src = URL.createObjectURL(arquivo);
  previaFoto.hidden = false;
  textoFoto.hidden = true;
});

// =========================================
// 4. VALIDAÇÃO
// =========================================

// Marca o campo como certo ou errado
function marcar(campo, mensagem, estaCerto) {
  if (estaCerto) {
    campo.removeAttribute("aria-invalid");
    mensagem.hidden = true;
  } else {
    campo.setAttribute("aria-invalid", "true");
    mensagem.hidden = false;
  }
  return estaCerto;
}

function validarNome() {
  const nome = campoNome.value.trim();
  return marcar(campoNome, erroNome, nome.length >= 3);
}

function validarCategoria() {
  const escolhida = formulario.querySelector('input[name="categoria"]:checked');
  return marcar(grupoCategoria, erroCategoria, escolhida !== null);
}

function validarLocal() {
  return marcar(campoLocal, erroLocal, campoLocal.value !== "");
}

function validarData() {
  const data = campoData.value;
  const estaCerto = data !== "" && data <= dataDeHoje();
  return marcar(campoData, erroData, estaCerto);
}

// Valida cada campo quando a pessoa sai dele
campoNome.addEventListener("blur", validarNome);

// Se o nome estava com erro, o erro some enquanto a pessoa digita.
// (Assim a tela não "pula" no momento em que ela toca no próximo campo.)
campoNome.addEventListener("input", function () {
  if (campoNome.hasAttribute("aria-invalid")) {
    validarNome();
  }
});
grupoCategoria.addEventListener("change", validarCategoria);
campoLocal.addEventListener("change", validarLocal);
campoData.addEventListener("change", validarData);

// =========================================
// 5. GUARDAR NO NAVEGADOR (localStorage)
// (lerItensPublicados e guardarItensPublicados estão no comum.js)
// =========================================
function guardarItem(item) {
  const itens = lerItensPublicados();
  itens.push(item);
  guardarItensPublicados(itens);
}

// =========================================
// 6. ENVIAR O FORMULÁRIO
// =========================================
formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const nomeOk = validarNome();
  const categoriaOk = validarCategoria();
  const localOk = validarLocal();
  const dataOk = validarData();

  // Leva o cursor para o primeiro campo com erro
  if (!nomeOk) {
    campoNome.focus();
    return;
  }
  if (!categoriaOk) {
    grupoCategoria.querySelector("input").focus();
    return;
  }
  if (!localOk) {
    campoLocal.focus();
    return;
  }
  if (!dataOk) {
    campoData.focus();
    return;
  }

  // Tudo certo: monta o item e guarda
  const agora = Date.now();

  const item = {
    id: "publicado-" + agora,
    nome: campoNome.value.trim(),
    categoria: formulario.querySelector('input[name="categoria"]:checked').value,
    local: campoLocal.value,
    data: campoData.value,
    descricao: campoDescricao.value.trim(),
    deixou: formulario.querySelector('input[name="deixou"]:checked').value,
    status: "Disponível",
    publicadoEm: agora
  };

  guardarItem(item);

  // O botão "Ver item" leva para o item que acabou de ser publicado
  document.querySelector("#link-ver-item").href = "item.html?id=" + item.id;

  // Troca o formulário pela tela de sucesso
  secaoFormulario.hidden = true;
  secaoSucesso.hidden = false;
  secaoSucesso.focus();
});

desenharIcones();
