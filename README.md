# ORDER TOKEN API ![Em Andamento](https://img.shields.io/badge/status-em%20andamento-yellow)

A **Order Token API** é uma API desenvolvida em **NestJS** com **TypeScript**, **Prisma** e **PostgreSQL**, containerizada com **Docker** e testada usando **Jest**. Essa API tem como objetivo gerenciar os pedidos de um estabelecimento de alimentação, similar a um **Burger King**, incluindo integração com o **Mercado Pago** para pagamentos.

## Tecnologias
![Tecnologias](https://skillicons.dev/icons?i=nestjs,typescript,prisma,postgres,docker,jest)

## Índice

- [ORDER TOKEN API ](#order-token-api-)
  - [Tecnologias](#tecnologias)
  - [Índice](#índice)
  - [Sobre](#sobre)
  - [Funcionalidades](#funcionalidades)
  - [Instalação](#instalação)
  - [Uso](#uso)
  - [Imagens](#imagens)
  - [Contato](#contato)

## Sobre

A **Order Token API** foi criada para facilitar o gerenciamento de pedidos em um estabelecimento de alimentação, permitindo criar, atualizar, consultar e deletar pedidos, bem como gerenciar pagamentos e integrações financeiras através do **Mercado Pago**.

## Funcionalidades

- **Gestão de Pedidos**
  - Criação de pedidos
  - Atualização de pedidos
  - Consulta de pedidos por status
  - Deleção de pedidos

- **Integração de Pagamento**
  - Integração com Mercado Pago para processar pagamentos
  - Registro de status de pagamento (pendente, aprovado, recusado, cancelado)

- **Gestão de Usuários**
  - Criação e autenticação de usuários
  - Definição de permissões (admin, funcionário, cliente)

- **Gerenciamento de Produtos**
  - Cadastro de produtos (hambúrgueres, bebidas, sobremesas, combos)
  - Atualização e remoção de produtos
  - Consulta de produtos por categoria

## Instalação

Para rodar a **Order Token API** em sua máquina, siga os passos abaixo:

- **Clone o repositório**
  ```bash
  git clone https://github.com/SeuRepositorio/order-token-api.git
  ```
- **Instale as dependências**
  ```bash
  npm install
  ```
  ou
  ```bash
  pnpm install
  ```
- **Configure as variáveis de ambiente**
  Crie um arquivo `.env` na raiz do projeto e configure:
  ```env
  DATABASE_URL=postgresql://usuario:senha@localhost:5432/order-token-db
  MERCADO_PAGO_ACCESS_TOKEN=sua-chave-de-acesso
  ```
- **Suba os containers Docker**
  ```bash
  docker-compose up -d
  ```
- **Execute as migrações Prisma**
  ```bash
  npx prisma migrate deploy
  ```
- **Execute o projeto**
  ```bash
  npm run start:dev
  ```

## Uso

- **Crie um pedido** usando a rota POST `/orders`
- **Consulte os pedidos** usando a rota GET `/orders`
- **Atualize um pedido** usando a rota PATCH `/orders/:id`
- **Delete um pedido** usando a rota DELETE `/orders/:id`
- **Gerencie produtos** usando as rotas `/products`
- **Gerencie pagamentos** usando a integração com Mercado Pago


## Imagens

![Imagem da arquitetura](https://raw.githubusercontent.com/PedrOliveiraM/order-token-api/main/assets/Architecture%20-%20Token-API.png)
![Imagem dos relaciolamentos do banco de dados](https://raw.githubusercontent.com/PedrOliveiraM/order-token-api/main/assets/diagram-order-system.svg)


## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedro-oliveira-m/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:pedro.oliveira@monteirodev.com)

