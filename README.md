# CRUD de Usuarios com Node.js, Express, EJS e MongoDB

Aplicacao web simples para cadastro, listagem, edicao e exclusao de usuarios.

O projeto foi construido com foco em praticar backend com Node.js, integracao com MongoDB e renderizacao de paginas no servidor usando EJS.

## Visao geral

Esta aplicacao permite:

- cadastrar usuarios
- listar usuarios cadastrados
- editar usuarios pela interface
- deletar usuarios com confirmacao
- exibir mensagens visuais de sucesso para criar, editar e excluir

## Tecnologias utilizadas

- Node.js
- Express
- EJS
- MongoDB
- Mongoose
- Dotenv
- Nodemon
- Docker ou Podman para subir o MongoDB localmente

## Funcionalidades

- formulario de cadastro diretamente na pagina
- listagem de usuarios em interface responsiva
- tela de edicao com layout separado
- confirmacao antes de deletar
- mensagens automáticas de feedback na interface
- endpoints REST para consulta e manipulacao dos usuarios

## Estrutura principal

```bash
.
├── index.js
├── modules/
│   └── express.js
├── src/
│   ├── database/
│   │   └── connect.js
│   ├── models/
│   │   └── user.model.js
│   └── views/
│       ├── edit.ejs
│       ├── index.ejs
│       └── patials/
│           ├── head.ejs
│           └── navbar.ejs
└── package.json
```

## Como rodar o projeto

### 1. Clonar o repositorio

```bash
git clone <URL_DO_REPOSITORIO>
cd nodejs
```

### 2. Instalar as dependencias

```bash
npm install
```

### 3. Criar o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com este conteudo:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/nodejs
MONGODB_DB=nodejs
MONGODB_USER=
MONGODB_PASSWORD=
MONGODB_CLUSTER=
```

Se voce quiser usar MongoDB Atlas, pode substituir por:

```env
MONGODB_URI=mongodb+srv://USUARIO:SENHA@CLUSTER.mongodb.net/nodejs?retryWrites=true&w=majority
```

### 4. Subir o MongoDB local

Se estiver usando Docker:

```bash
docker run --name mongo-local -p 27017:27017 -d docker.io/library/mongo:latest
```

Se o container ja existir:

```bash
docker start mongo-local
```

### 5. Iniciar a aplicacao

```bash
npm run start:dev
```

Depois abra no navegador:

```txt
http://localhost:8080/views
```

Voce tambem pode acessar:

```txt
http://localhost:8080/
```

## Rotas principais

### Paginas

- `GET /` -> pagina principal
- `GET /views` -> pagina principal com a listagem
- `GET /users/:id/edit` -> tela de edicao

### API

- `GET /users` -> lista todos os usuarios
- `GET /users/:id` -> busca um usuario por ID
- `POST /users` -> cria um usuario
- `PATCH /users/:id` -> atualiza um usuario via API
- `DELETE /users/:id` -> remove um usuario via API

### Rotas da interface

- `POST /users` -> cria usuario pelo formulario
- `POST /users/:id/edit` -> salva a edicao pela interface
- `POST /users/:id/delete` -> remove usuario pela interface

## Modelo de usuario

Os usuarios possuem os seguintes campos:

- `firstName`
- `lastName`
- `email`
- `password`

## Possiveis melhorias futuras

- criptografar senha com `bcrypt`
- validar melhor os campos do formulario
- criar mensagens de erro amigaveis
- corrigir a pasta `patials` para `partials`
- preparar deploy completo com banco em producao

## Deploy

Em breve:

- Frontend/SSR: Vercel
- Link do projeto: `https://formulario-em-nodejs.vercel.app/`

- <img width="1355" height="633" alt="image" src="https://github.com/user-attachments/assets/ab56e124-6a20-4ba8-8e83-6c596ab272e5" />


## Autor

Projeto desenvolvido por mim para estudo e pratica com Node.js, Express, EJS e MongoDB.
