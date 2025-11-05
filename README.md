# SmartMarket API

Projeto acadêmico desenvolvido para a cadeira de Criar Serviços Web com Rest.

API REST para gerenciamento administrativo de supermercado, permitindo cadastro de produtos, funcionários, autenticação e controle de promoções.

## Descrição do projeto

Um cliente apresentou a você o desafio de desenvolver um sistema administrativo que lhe permita adicionar produtos à sua loja e criar um ambiente de vendas online. Neste momento, ele deseja apenas um sistema administrativo onde possa cadastrar, editar, remover e listar todos os seus produtos, aplicar promoções e criar novos usuários para que seus funcionários tenham acesso ao sistema.

O problema apontado acima requer a construção de um sistema que permita que os funcionários acessem um site e ao logar recebam uma lista de produtos e possam aplicar promoções.

## Requisitos do Sistema

- ✅ **Cadastrar, atualizar, recuperar e remover um produto** (front e back)
- ✅ **Cadastrar, atualizar, recuperar e remover novos usuários do supermercado** (funcionário do supermercado) (front e back)
- ✅ **Permitir que um usuário do supermercado faça login.** Todo o sistema de autenticação deve ser feito com tokens (backend)
- ✅ **A senha deve ir para o banco criptografada** (backend)
- ✅ **Cadastrar e remover uma nova promoção.** O usuário poderá atualizar um item e todos os clientes terão acesso ao preço reduzido deste produto. Aplicar um desconto por exemplo a um chocolate específico. (front e back)

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Prisma**
- **PostgreSQL** l
- **JWT**
- **bcryptjs** s
- **Zod**
- **Docker**
- **Vitest**
- **Testcontainers**

## Configuração do Ambiente

### Pré-requisitos

- **Node.js** >= 22.0.0
- **pnpm** (ou npm/yarn)
- **Docker** e **Docker Compose** (para o banco de dados)
- **PostgreSQL** 16 (via Docker Compose ou instalação local)

### Variáveis de Ambiente

- Crie um arquivo `.env` na raiz do projeto, com base no arquivo `.env.example`.
- Preencha as variáveis de ambiente com os valores corretos para o seu ambiente. Exemplo:

```
DATABASE_URL=postgresql:/user:password@localhost:5432/smartmarket
ACCESS_TOKEN_SECRET=secret1
```

## Instalação

**Clone o repositório**

```bash
git clone <url-do-repositorio>
cd smartmarket-api
```

**Instale as dependências**:

```bash
pnpm install
```

ou

```bash
npm install
```

## Configuração do Banco de Dados

### Usando Docker Compose (Recomendado)

**Inicie o banco de dados PostgreSQL**:

```bash
docker-compose up -d
```

Isso criará um container PostgreSQL na porta 5432 com:

- Usuário: `postgres`
- Senha: `postgres`
- Banco: `smartmarket`

**Execute as migrations do Prisma**:

```bash
npx prisma migrate dev
```

ou

```bash
pnpm prisma migrate dev
```

Isso criará todas as tabelas necessárias no banco de dados.

**Execute o seed para criar dados iniciais**:

```bash
pnpm seed
```

ou

```bash
npm run seed
```

O seed criará um usuário administrador padrão:

- **Email**: `admin@smartmarket.com`
- **Senha**: `admin123`
- **CPF**: `000.000.000-00`

## Executando o Projeto

```bash
pnpm dev
```

ou

```bash
npm run dev
```

A API estará disponível em: `http://localhost:8080`

## Executando Testes

```bash
pnpm test
```

ou

```bash
npm test
```

### Testes com cobertura

```bash
pnpm test --coverage
```

## Estrutura da API

### Autenticação

Todos os endpoints de produtos e funcionários requerem autenticação via Bearer Token.

**Login:**

```http
POST /api/accounts/login
Content-Type: application/json

{
  "email": "admin@smartmarket.com",
  "password": "admin123"
}
```

**Resposta:**

```json
{
  "accessToken": "jwt-token"
}
```

### Endpoints de Produtos

Base URL: `/api/products`

| Método | Endpoint                | Descrição               | Autenticação |
| ------ | ----------------------- | ----------------------- | ------------ |
| GET    | `/`                     | Lista todos os produtos | ✅           |
| GET    | `/:productId`           | Busca produto por ID    | ✅           |
| POST   | `/`                     | Cria um novo produto    | ✅           |
| PATCH  | `/:productId`           | Atualiza um produto     | ✅           |
| DELETE | `/me/:productId`        | Remove um produto       | ✅           |
| PATCH  | `/:productId/promotion` | Aplica uma promoção     | ✅           |
| DELETE | `/:productId/promotion` | Desativa uma promoção   | ✅           |

### Endpoints de Funcionários

Base URL: `/api/employees`

| Método | Endpoint       | Descrição                   | Autenticação |
| ------ | -------------- | --------------------------- | ------------ |
| GET    | `/`            | Lista todos os funcionários | ✅           |
| GET    | `/:employeeId` | Busca funcionário por ID    | ✅           |
| POST   | `/`            | Cria um novo funcionário    | ✅           |
| PATCH  | `/:employeeId` | Atualiza um funcionário     | ✅           |
| DELETE | `/:employeeId` | Remove um funcionário       | ✅           |

## Arquitetura

O projeto segue os princípios de **Domain-Driven Design (DDD)** e **Clean Architecture**, organizando o código em camadas:

1. **Domain**: Contém as regras de negócio puras, entidades e objetos de valor, totalmente independentes de detalhes técnicos ou externos
2. **Application**: Implementa os casos de uso da aplicação, orquestrando a interação entre o domínio e as camadas externas
3. **Infrastructure**: Responsável pela comunicação com o mundo externo (banco de dados, frameworks, APIs, bibliotecas), traduzindo dados entre o ambiente técnico e as regras de negócio internas
