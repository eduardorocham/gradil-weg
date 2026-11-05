# Gradil

[![API](https://github.com/eduardorocham/gradil-weg/actions/workflows/api.yml/badge.svg)](https://github.com/eduardorocham/gradil-weg/actions/workflows/api.yml)

Sistema para orçamento e pedido de cercas Gradil. A partir do comprimento, da altura e da cor da cerca, ele calcula quantos componentes são necessários, mostra um esboço da cerca e guarda os pedidos confirmados.

## O que o projeto faz

- Calcula a quantidade de **telas, postes, fixadores e parafusos** para o comprimento informado.
- Mostra o **comprimento vendido**, que nunca é menor que o desejado porque a tela tem tamanho fixo de 2,5 m, e a **diferença** entre os dois, quando houver.
- Desenha um **esboço** da cerca com os postes e as telas na cor escolhida.
- Guarda os **pedidos confirmados** com a data de confirmação e os lista do mais recente para o mais antigo.
- Tem um **painel** com indicadores: total de pedidos, metros solicitados e pedidos por cor e por altura.

### Regras de cálculo

| Item | Regra |
| --- | --- |
| Telas | comprimento ÷ 2,5 m, arredondado para cima |
| Postes | telas + 1 |
| Fixadores | telas × 3, 4 ou 6 (alturas de 1,03 m, 1,53 m e 2,03 m) |
| Parafusos | postes × 4 |
| Comprimento vendido | telas × 2,5 m |

As alturas disponíveis são 1,03 m, 1,53 m e 2,03 m. As cores são sem pintura, branca, preta e verde.

## Tecnologias

**Backend** (`api/`)

- [NestJS](https://nestjs.com/) com TypeScript
- [TypeORM](https://typeorm.io/) e [SQLite](https://www.sqlite.org/) (via `better-sqlite3`)
- `class-validator` para validar os dados de entrada
- [Jest](https://jestjs.io/) e [Supertest](https://github.com/ladjs/supertest) para os testes de integração
- ESLint e Prettier

**Frontend** (`frontend/`)

- [React](https://react.dev/) com [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/) para as rotas
- [TanStack Query](https://tanstack.com/query) e [Axios](https://axios-http.com/) para as requisições
- [Radix UI](https://www.radix-ui.com/) como base dos componentes, estilizados com CSS Modules
- Prettier

## Como rodar

### Pré-requisitos

- **Node.js 22.** As pastas `api` e `frontend` têm um `.nvmrc`. Com o [nvm](https://github.com/nvm-sh/nvm), rode `nvm use` dentro de cada uma.
- npm

> O `better-sqlite3` é compilado para a versão do Node usada no `npm install`. Se você trocar de versão depois, rode `npm rebuild better-sqlite3` na pasta `api`.

### Backend

```bash
cd api
npm install
npm run start:dev
```

A API sobe em `http://localhost:3000`. O banco SQLite é criado automaticamente em `api/src/config/gradil.sqlite` na primeira execução.

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/pedidos/calcular` | Calcula os componentes sem salvar o pedido |
| `POST` | `/pedidos` | Confirma e salva o pedido |
| `GET` | `/pedidos` | Lista os pedidos confirmados, do mais recente para o mais antigo |

Exemplo do corpo das requisições `POST`:

```json
{ "comprimento": 11, "altura": 1.53, "cor": "verde" }
```

### Frontend

Em outro terminal:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Depois, abra o endereço que o Vite mostrar, normalmente `http://localhost:5173`.

O arquivo `.env` define o endereço da API (`VITE_API_URL`). Se você mudar esse arquivo, reinicie o `npm run dev`.

### Testes, lint e formatação

Na pasta `api`:

```bash
npm test          # testes de integração de todos os endpoints
npm run lint      # ESLint e verificação de formatação
npm run format    # corrige a formatação
```

Os testes usam um banco SQLite em memória, então não alteram o banco da aplicação.

Na pasta `frontend`, `npm run format` formata o código com o Prettier.

## Pipeline de CI

O backend tem um pipeline no GitHub Actions ([`.github/workflows/api.yml`](.github/workflows/api.yml)) que roda nestes casos:

- a cada push na branch `main`;
- a cada pull request para a `main`;
- manualmente, pelo botão **Run workflow** na aba Actions.

Os eventos de push e de pull request só disparam o pipeline quando há mudanças na pasta `api/` ou no próprio arquivo do workflow.

O pipeline tem duas etapas, em sequência:

1. **Lint:** instala as dependências e roda `npm run lint` (ESLint e Prettier).
2. **Testes:** roda `npm test`. Essa etapa **só começa se o Lint passar**.

Se qualquer etapa falhar, o pipeline é marcado como falho.
