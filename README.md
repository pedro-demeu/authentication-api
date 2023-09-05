# API de Autenticação

Bem-vindo à API de Autenticação! Esta API permite gerenciar usuários e realizar login para autenticação.

## Rotas

### Gerenciamento de Usuários

#### Listar Usuários

```
GET /v1/api/users/
```

Essa rota permite listar todos os usuários registrados.

#### Criar Usuário

```
POST /v1/api/users/
```

Use esta rota para criar um novo usuário. Certifique-se de fornecer os dados necessários no corpo da solicitação.

#### Obter Usuário por ID

```
GET /v1/api/users/:id
```

Essa rota permite recuperar informações de um usuário específico com base no ID fornecido.

#### Atualizar Usuário por ID

```
PUT /v1/api/users/:id
```

Use esta rota para atualizar as informações de um usuário existente com base no ID fornecido.

#### Excluir Usuário por ID

```
DELETE /v1/api/users/:id
```

Esta rota permite excluir um usuário com base no ID fornecido.

#### Autenticação

```
POST /v1/api/auth/login
```

Use esta rota para fazer login na aplicação. Fornecer credenciais válidas no corpo da solicitação para autenticação.

## Exemplo de Uso

Aqui está um exemplo de como fazer login usando a rota de login:

```
POST /v1/api/auth/login
Content-Type: application/json

{
  "username": "seu-username",
  "password": "sua-senha"
}
```

Lembre-se de substituir "seu-username" e "sua-senha" pelos valores reais.

## Como rodar o projeto

Para rodar o projeto em sua máquina execute os comandos:

```
    git clone esse-repositorio

    yarn

    yarn dev
```

Isso vai clonar o repositório do projeto em sua máquina, instalar as dependências e executar o código-fonte.

Lembre-se de criar o `.env` com as variáveis de ambiente corretas seguindo o exemplo do "`.env-example`"
