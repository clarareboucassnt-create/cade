<p align="center">
  <img src="assets/marca/cade-logo-principal.png" alt="Logo do Cadê?" width="320">
</p>

# Cadê? — Achados e perdidos do campus UCSAL

Trabalho de **Front-End**: protótipo navegável, mobile-first (390 × 844), de um sistema de achados e perdidos do campus da UCSAL (Salvador).

Quem encontra um objeto no campus publica o item com foto, categoria, local e data. Quem perdeu algo busca e filtra os itens por categoria ou local para recuperá-lo.

## Funcionalidade principal

Dois fluxos completos e clicáveis, usados no teste com usuários:

1. **Publicar** um item encontrado.
2. **Buscar** itens com filtros e solicitar a devolução (**"É meu!"**).

## Personas

- Aluno que perdeu algo
- Funcionário da portaria

## Restrições

- Sem back-end, banco de dados ou autenticação real — dados simulados no front-end (estado local + `localStorage`), com itens de exemplo pré-carregados.
- Login apenas visual.
- Mobile-first, tema claro único, interface simples, consistente e acessível (contraste ≥ 4,5:1, foco visível, elementos semânticos).

## Identidade visual (resumo)

| Token | Cor |
|---|---|
| Fundo (creme) | `#FBF7F0` |
| Texto principal (índigo) | `#2D2B55` |
| Primária (violeta) | `#6A5ACD` |
| Destaque (âmbar) | `#F4A62A` |
| Lavanda (decorativo) | `#A678B9` |
| Areia | `#F0D9B5` |

Tipografia: **Poppins** (títulos e botões) e **Inter** (textos). Ícones estilo Lucide.

![Paleta](assets/marca/identidade-visual-final.png)

## Estrutura do repositório

```
assets/marca/              logos e ícones do app
data/itens-exemplo.json    categorias, locais e itens de exemplo
docs/especificacao.md      especificação completa (telas, componentes, cores, acessibilidade)
docs/pesquisa-ideias.md    ideias avaliadas antes da escolha do tema
```

## Telas

1. Entrar
2. Início
3. Busca e filtros
4. Detalhe do item (+ modal "É meu!")
5. Publicar item (+ tela de sucesso)
6. Meus itens

Detalhes em [`docs/especificacao.md`](docs/especificacao.md).
