# Especificação do protótipo — Cadê?

> Prompt usado no Figma Make (versão 1), copiado da página "Prompts" do Notion do projeto.

Crie o protótipo navegável para smartphone (390 × 844) do "Cadê?", um sistema de achados e perdidos do campus da UCSAL (universidade em Salvador). Todo o texto da interface deve estar em português do Brasil.

## Objetivo

Quem encontra um objeto no campus publica o item com foto, categoria, local e data. Quem perdeu algo busca e filtra os itens por categoria ou local para recuperá-lo.
A funcionalidade principal, que será usada em um teste com usuários, tem dois fluxos completos e clicáveis:

1. Publicar um item encontrado.
2. Buscar itens com filtros e solicitar a devolução ("É meu!").

## Restrições (trabalho acadêmico de front-end)

- Sem back-end, sem banco de dados e sem autenticação real. Simule os dados no próprio front-end (estado local e localStorage), com itens de exemplo já carregados.
- O login é apenas visual: o botão "Entrar" avança para o Início sem validar senha.
- Layout mobile-first, um único tema claro.
- Interface simples, consistente e acessível.

## Identidade visual (siga exatamente)

Tom: leve, acolhedor e jovem. Quem perdeu algo está ansioso, então a interface deve transmitir calma e clareza.

Logo: use as imagens em `assets/marca/`. O logotipo é a palavra "cadê" em minúsculas (Poppins Bold, índigo) seguida de um ponto de interrogação desenhado como a lente de uma lupa (violeta), cujo pingo é um pin de localização (âmbar). Não redesenhe, não distorça e não mude as cores do logo.

### Cores

| Uso | Cor |
|---|---|
| Fundo da página (creme) | `#FBF7F0` |
| Superfície (cartões, campos, barra inferior) | `#FFFFFF` |
| Texto principal (índigo) | `#2D2B55` |
| Texto secundário (local, data, legendas) | `#5E5A7A` |
| Primária — botões principais, chip selecionado, aba ativa (violeta, texto branco) | `#6A5ACD` |
| Destaque — só no botão "Publicar item" e no selo "Novo" (âmbar, texto SEMPRE índigo) | `#F4A62A` |
| Lavanda — apenas ícones de categoria e detalhes decorativos (nunca em texto) | `#A678B9` |
| Areia — fundo da área de foto vazia e de avisos de dica | `#F0D9B5` |
| Chip não selecionado e selo "Disponível" (texto índigo) | `#EFE6F4` |
| Divisórias | `#E6DFD3` |
| Contorno de campos | `#8E89A8` |
| Sucesso (texto / fundo) | `#1F7A55` / `#E3F2EA` |
| Erro (texto / fundo) | `#B3261E` / `#FBE4E2` |

Proporção 60-30-10: neutros 60%, índigo e violeta 30%, âmbar 10%.

### Tipografia (Google Fonts)

- **Poppins** para títulos e botões: título de tela 24/32 Bold; subtítulo 20/28 Medium; botão 16/24 Medium
- **Inter** para textos: corpo 16/24 Regular; apoio 14/20; legenda 12/16 Medium
- Nunca use texto de corpo menor que 16px em campos de formulário

### Forma e espaçamento

- Botões e chips em formato de pílula (raio 999px), altura mínima de 48px nos botões e 36px nos chips
- Cartões e campos com raio de 16px. Folhas inferiores e modais com raio de 24px no topo. Miniaturas e selos com raio de 8px
- Nenhum canto reto na interface
- Espaçamento em base 4px (4, 8, 12, 16, 24, 32, 48); margem lateral de 16px
- Sombra do cartão: `0 2px 8px rgba(45,43,85,0.08)`. Sombra elevada (botão flutuante, folhas): `0 8px 24px rgba(45,43,85,0.18)`

Ícones: estilo Lucide, outline com traço de 2px e pontas arredondadas, 24px, área de toque mínima de 44 × 44px. Sem emojis.

## Componentes

- **Botão:** primário (violeta), destaque (âmbar, só para "Publicar item"), secundário (contorno `#8E89A8`, texto índigo), de texto (link violeta sublinhado) e desativado (opacidade de 45%). No máximo um botão primário por tela.
- **Chip de filtro:** fundo `#EFE6F4` quando não selecionado e violeta com texto branco quando selecionado. Fica em uma linha com rolagem horizontal.
- **Cartão de item:** foto 88 × 88 à esquerda; à direita, o nome (Poppins Medium 16), a linha "pin + local" e a linha "calendário + Encontrado em dd/mm" em `#5E5A7A`, e embaixo os selos. Sem foto, mostrar fundo areia com o ícone da categoria em lavanda.
- **Selos de status:** "Disponível" (`#EFE6F4`), "Devolvido" (verde, com ícone de check) e "Novo" (âmbar, até 24h após a publicação). Nunca indique o status só pela cor.
- **Campo de texto:** rótulo sempre visível acima do campo (nunca só o placeholder), altura de 48px e texto de ajuda abaixo. No erro, contorno vermelho de 2px, ícone e mensagem dizendo como corrigir.
- **Aviso:** sucesso (verde), erro (vermelho) e dica (areia), com título curto em negrito e uma frase.
- **Barra de navegação inferior** fixa, com 64px de altura: Início, Buscar, botão flutuante circular âmbar com "+" (Publicar item), Meus itens e Perfil. A aba ativa fica em violeta, com o ícone dentro de uma pílula violeta.

## Telas e fluxo

1. **Entrar:** logo centralizado, a frase "Cadê seu objeto? Vamos procurar.", o campo "E-mail institucional" e o botão primário "Entrar" (login simulado).
2. **Início:** cabeçalho com o logo e a saudação "Olá, Clara". Abaixo, um campo de busca ("Buscar por nome do objeto"), os chips de categoria, a seção "Encontrados recentemente" com a lista de cartões e um aviso de dica: "Os objetos ficam guardados na portaria principal até a devolução."
3. **Busca e filtros:** campo de busca ativo, contador "8 itens encontrados" e o chip "Filtros (2)", que abre uma folha inferior com Categoria, Local do campus, Período ("Hoje", "Últimos 7 dias", "Últimos 30 dias") e Status, mais os botões "Limpar" (secundário) e "Ver resultados" (primário). Estado vazio: "Nenhum item encontrado com esses filtros. Que tal limpar a busca?", com o botão "Limpar filtros".
4. **Detalhe do item:** foto grande, nome, selos, categoria, local, data e hora, uma descrição curta e o bloco "Onde retirar: Portaria principal, com documento com foto". Botão primário "É meu!". Ao tocar, abre um modal com o campo "Descreva um detalhe que só o dono saberia", o botão "Enviar solicitação" e a opção "Cancelar". Ao enviar, mostra o aviso de sucesso "Solicitação enviada! A portaria vai conferir e te avisar."
5. **Publicar item** (formulário em uma tela com rolagem): área de foto ("Adicionar foto", fundo areia com ícone de câmera), "Nome do item", "Categoria" (chips de seleção única), "Onde foi encontrado?" (lista de locais), "Data em que foi encontrado" (hoje como padrão), "Descrição" (opcional) e "Onde você deixou o objeto?" (Portaria principal / Comigo). Botão "Publicar item" (destaque âmbar). Valide ao sair do campo e ao enviar. Ao concluir, mostre a tela de sucesso "Item publicado! Obrigado por ajudar." com os botões "Ver item" e "Voltar ao início". O novo item aparece no topo da lista com o selo "Novo".
6. **Meus itens:** abas "Publicados" e "Minhas solicitações". Cada item publicado tem a ação "Marcar como devolvido", que pede confirmação e depois muda o selo para "Devolvido". Estado vazio: "Você ainda não publicou nenhum item. Encontrou algo? Toque no + para ajudar."

## Dados de exemplo (pré-carregados)

Ver também [`data/itens-exemplo.json`](../data/itens-exemplo.json).

**Categorias:** Eletrônicos, Documentos, Chaves, Garrafas, Roupas e acessórios, Material escolar, Outros.
**Locais:** Biblioteca, Cantina, Bloco A, Bloco B, Laboratório de Informática, Auditório, Estacionamento, Quadra.

| Item | Categoria | Local | Data | Status |
|---|---|---|---|---|
| Garrafa térmica azul | Garrafas | Biblioteca, 2º andar | hoje | Disponível · Novo |
| Carregador de celular USB-C | Eletrônicos | Laboratório de Informática | ontem | Disponível |
| Carteira de estudante | Documentos | Cantina | 12/11 | Disponível |
| Chaveiro com 2 chaves | Chaves | Bloco B | 10/11 | Devolvido |
| Casaco moletom cinza | Roupas e acessórios | Auditório | 09/11 | Disponível |
| Fone de ouvido branco | Eletrônicos | Bloco A | 08/11 | Disponível |
| Calculadora científica | Material escolar | Bloco A | 07/11 | Disponível |
| Guarda-chuva preto | Outros | Estacionamento | 05/11 | Devolvido |

## Acessibilidade e feedback (obrigatório)

- Contraste mínimo de 4,5:1 em todo texto. As combinações de cor acima já atendem: não crie outras.
- Foco visível em todos os elementos interativos: anel violeta de 2px com 2px de afastamento.
- Texto alternativo em todas as fotos e `aria-label` em botões que só têm ícone.
- Use elementos reais (`button`, `a`, `input`, `label`), nunca `div` clicável.
- Toda ação deve ter retorno: aviso de sucesso, estado vazio, validação de formulário e confirmação antes de ações importantes.

## Tom de voz

Próximo, calmo e direto, como um colega de turma ajudando. Frases curtas, sem jargão técnico, sem culpar o usuário ("você perdeu") e sem excesso de pontos de exclamação.
