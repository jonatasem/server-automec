# Sistema de Gerenciamento para Automec

Este projeto é um sistema de gerenciamento de vendas que permite a criação, atualização, exclusão e listagem de vendas, produtos e clientes. O back-end é construído com Node.js e utiliza o Firebase Firestore como banco de dados.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura de Rotas](#estrutura-de-rotas)
- [Licença](#licença)

## Funcionalidades

- Criação de vendas com produtos associados.
- Listagem de todas as vendas.
- Atualização de informações de vendas existentes.
- Exclusão de vendas.
- Criação e gerenciamento de produtos.
- Criação e gerenciamento de clientes.
- Validação de dados durante as operações.

## Tecnologias Utilizadas

- Node.js
- Express
- Firebase Firestore
- CORS

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em seu computador:

- [Node.js](https://nodejs.org/) (versão recomendada: 14.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

## Instalação

1. Clone o repositório:

   git clone https://github.com/jonatasem/server-automec.git
   

2. Navegue até o diretório do projeto:

   cd server-automec


3. Instale as dependências:

   npm install
   

4. Configure as variáveis de ambiente. Você pode criar um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

   PORT=5000
   FIREBASE_CREDENTIALS='{"type": "service_account", ...}'  # Credenciais do Firebase
   FIREBASE_PROJECT_ID='seu-id-do-projeto'
   

## Uso

Para iniciar o servidor, use o seguinte comando:

npm run dev

O servidor estará rodando em `http://localhost:8080`.

## Estrutura de Rotas

### Vendas

- `POST /api/vendas` - Cria uma nova venda.
- `GET /api/vendas` - Lista todas as vendas.
- `PUT /api/vendas/:id` - Atualiza uma venda existente.
- `DELETE /api/vendas/:id` - Deleta uma venda.

### Produtos

- `POST /api/produtos` - Cria um novo produto.
- `GET /api/produtos` - Lista todos os produtos.
- `PUT /api/produtos/:id` - Atualiza um produto existente.
- `DELETE /api/produtos/:id` - Deleta um produto.

### Clientes

- `POST /api/clientes` - Cria um novo cliente.
- `GET /api/clientes` - Lista todos os clientes.
- `PUT /api/clientes/:id` - Atualiza um cliente existente.
- `DELETE /api/clientes/:id` - Deleta um cliente.

## Licença

Este projeto está sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
