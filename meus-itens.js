// =========================================
// TELA MEUS ITENS
// Usa as funções do comum.js
// =========================================

const abas = document.querySelectorAll(".aba");
const listaPublicados = document.querySelector("#lista-publicados");
const vazioPublicados = document.querySelector("#vazio-publicados");
const listaSolicitacoes = document.querySelector("#lista-solicitacoes");
const vazioSolicitacoes = document.querySelector("#vazio-solicitacoes");
const avisoDevolvido = document.querySelector("#aviso-devolvido");

const modalConfirmar = document.querySelector("#modal-confirmar");
const nomeConfirmar = document.querySelector("#nome-confirmar");
const botaoConfirmar = document.querySelector("#botao-confirmar");
const botaoCancelarConfirmar = document.querySelector("#botao-cancelar-confirmar");

// Guarda qual item está esperando a confirmação
let idParaDevolver = null;

// -----------------------------------------
// 1. ABAS
// -----------------------------------------
function abrirAba(abaEscolhida) {
  for (const aba of abas) {
    const estaAtiva = aba === abaEscolhida;
    aba.setAttribute("aria-selected", String(estaAtiva));
    aba.tabIndex = estaAtiva ? 0 : -1;

    const painel = document.querySelector("#" + aba.getAttribute("aria-controls"));
    painel.hidden = !estaAtiva;
  }
}

abas.forEach(function (aba, posicao) {
  aba.addEventListener("click", function () {
    abrirAba(aba);
  });

  // Setas esquerda/direita trocam de aba (padrão de acessibilidade)
  aba.addEventListener("keydown", function (evento) {
    let proxima = null;
    if (evento.key === "ArrowRight") {
      proxima = abas[(posicao + 1) % abas.length];
    } else if (evento.key === "ArrowLeft") {
      proxima = abas[(posicao - 1 + abas.length) % abas.length];
    }
    if (proxima) {
      abrirAba(proxima);
      proxima.focus();
    }
  });
});

// -----------------------------------------
// 2. ABA "PUBLICADOS"
// -----------------------------------------
function mostrarPublicados() {
  const meus = lerItensPublicados().reverse(); // mais novo primeiro

  listaPublicados.replaceChildren();

  for (const item of meus) {
    const cartao = criarCartao(item);

    if (item.status !== "Devolvido") {
      const botao = document.createElement("button");
      botao.type = "button";
      botao.className = "botao-secundario botao-cartao";
      botao.textContent = "Marcar como devolvido";
      botao.addEventListener("click", function () {
        pedirConfirmacao(item);
      });
      cartao.querySelector(".cartao-info").append(botao);
    }

    listaPublicados.append(cartao);
  }

  vazioPublicados.hidden = meus.length > 0;
}

function pedirConfirmacao(item) {
  idParaDevolver = item.id;
  nomeConfirmar.textContent = item.nome;
  modalConfirmar.showModal();
}

botaoCancelarConfirmar.addEventListener("click", function () {
  modalConfirmar.close();
});

botaoConfirmar.addEventListener("click", function () {
  const itens = lerItensPublicados();

  for (const item of itens) {
    if (item.id === idParaDevolver) {
      item.status = "Devolvido";
    }
  }

  guardarItensPublicados(itens);
  modalConfirmar.close();

  mostrarPublicados();
  desenharIcones();

  avisoDevolvido.hidden = false;
  avisoDevolvido.focus();
});

// -----------------------------------------
// 3. ABA "MINHAS SOLICITAÇÕES"
// -----------------------------------------
function mostrarSolicitacoes() {
  const solicitacoes = lerSolicitacoes().reverse(); // mais nova primeiro
  let total = 0;

  listaSolicitacoes.replaceChildren();

  for (const solicitacao of solicitacoes) {
    const item = buscarItemPeloId(solicitacao.itemId);
    if (!item) {
      continue; // o item foi apagado
    }

    const cartao = criarCartao(item);

    const linha = document.createElement("p");
    linha.className = "cartao-detalhe cartao-pedido";
    linha.textContent = "Pedido enviado em " + formatarData(dataNoFormatoDoCampo(new Date(solicitacao.enviadaEm)));
    cartao.querySelector(".cartao-info").append(linha);

    listaSolicitacoes.append(cartao);
    total = total + 1;
  }

  vazioSolicitacoes.hidden = total > 0;
}

// -----------------------------------------
// 4. COMEÇAR
// Se o endereço for meus-itens.html#solicitacoes, abre a segunda aba
// -----------------------------------------
mostrarPublicados();
mostrarSolicitacoes();

if (window.location.hash === "#solicitacoes") {
  abrirAba(document.querySelector("#aba-solicitacoes"));
}

desenharIcones();
