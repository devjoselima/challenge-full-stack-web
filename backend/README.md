# Documentação da API Backend
## 📌 Sobre o projeto
Esta é uma API desenvolvida com **Fastify**, **Prisma** e **TypeScript**. Ele inclui autenticação **JWT**, validação com **Zod** e geração de dados fictícios com **Faker**.

## Requisitos
- Node.js (v20)
- npm, yarn ou algum package manager
- Docker

## 🔧 Instalação e configuração do ambiente

1. Clone o repositório
   ```sh
   git clone https://github.com/devjoselima/challenge-full-stack-web.git
   cd challenge-full-stack-web
   ```
2. Acesse a pasta do projeto
   ```sh
   cd backend
   ```
3. Instale as dependências:
    ```sh
    npm install
    ```
4. Crie um arquivo `.env` seguindo as orientações do `.env.example`
   ```sh
   PORT=3333
   DATABASE_URL="postgresql://admin:admin@localhost:5432/mydb?schema=public"
   CORS_ORIGIN="http://localhost:3000"
   JWT_SECRET="secret key"
   ```
## 🛠️ Configuração do banco de dados
1. Inicie o container docker
   ```sh
   docker compose up -d
   ```
2. Rode o seed para popular o banco
   ```sh
   npm run setup
   ```
3. Após rodar o seed será criado automaticamente um usuário para poder logar na aplicação

## ▶️ Executando o projeto
Para rodar o servidor use:
   ```sh
   npm run dev
   ```
O servidor estará rodando em `http://localhost:3333`

## 🧪 Rodando os testes
  Para rodar os testes de unidade, utilize:
  ```sh
  npm run test
  ```
