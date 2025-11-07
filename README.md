# Formulário ITIL Configurável

Projeto Next.js que exibe um formulário/quiz guiado por módulos. Todo o conteúdo exibido na aplicação (textos, imagens, perguntas e respostas) é carregado dinamicamente a partir do arquivo `database.json`, permitindo adaptar o formulário sem alterar código.

## Visão Geral
- Framework: Next.js 12 + React 18.
- Estilização: MUI + módulos SCSS.
- Conteúdo dinâmico: carregado de `database.json` em tempo de execução.
- Progresso: pontuação e módulos concluídos são armazenados no navegador.

## Começando
1. Instale as dependências: `npm install`.
2. Execute em desenvolvimento: `npm run dev`.
3. Acesse em `http://localhost:3000`.

## Estrutura do `database.json`
O arquivo contém um objeto com a chave `modules`. Cada módulo representa um bloco do formulário e segue a estrutura abaixo:

```json
{
  "id": 1,
  "slug": "fundamentos-de-itil",
  "name": "FUNDAMENTOS DE ITIL",
  "description": "Parte 1",
  "icon": "description",
  "introduction": { "html": "..." },
  "context": { "images": ["/modules/fundamentals/comic-1.jpeg"] },
  "questions": [
    {
      "id": 1,
      "question": "O que é o ITIL?",
      "options": [{ "id": 1, "ctx": "..." }],
      "answer_id": 4,
      "tag": ["context"]
    }
  ]
}
```

Campos principais:
- `introduction.html`: HTML exibido antes das perguntas (use apenas tags seguras).
- `context.images`: lista de imagens mostradas no passo contextual.
- `questions`: coleção de perguntas com opções e a resposta correta (`answer_id`). O campo opcional `tag` ativa etapas especiais como o cenário/contexto.

## Tutorial: Adaptando o `database.json` para outro formulário
1. **Defina os módulos**: para cada etapa do novo formulário adicione um objeto no array `modules` com `id` único e `slug` (será usado na URL `/modules/{slug}`).
2. **Personalize o conteúdo introdutório**: substitua `introduction.html` pelo texto/HTML do seu formulário. Mantenha a estrutura básica (tags como `<h2>`, `<p>`), evitando scripts.
3. **Atualize o contexto**: ajuste `context.images` com os caminhos em `public/...` que ilustram aquela etapa. Caso não use imagens, deixe o array vazio.
4. **Configure perguntas e campos**: para cada pergunta crie opções dentro de `options`. O valor `answer_id` deve corresponder ao `id` da opção considerada correta; em formulários não avaliativos, deixe `answer_id` igual ao `id` da opção padrão ou remova a validação no código.
5. **Inclua etapas personalizadas**: utilize o array `tag` para indicar páginas intermediárias (ex.: `"tag": ["context"]` exibe a etapa de cenário). Remova se não for necessário.
6. **Recarregue a aplicação**: salve o arquivo e reinicie `npm run dev` (ou atualize a página) para visualizar as alterações.

Dicas adicionais:
- Armazene ativos estáticos (imagens, áudios) na pasta `public` e referencie-os com caminhos relativos (ex.: `/modules/novo/form.png`).
- Mantenha os IDs numéricos sequenciais para facilitar o rastreamento do progresso.
- Valide o JSON após editar; um erro de sintaxe impede o carregamento do formulário.

## Scripts Disponíveis
- `npm run dev`: modo desenvolvimento com hot-reload.
- `npm run build`: build de produção.
- `npm run start`: inicia o servidor após o build.
- `npm run lint`: executa o ESLint configurado pelo Next.js.


