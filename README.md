# Sistema de Reserva de Salas

Este projeto tem como objetivo oferecer uma solução eficiente para a reserva de salas de reunião por colaboradores de uma empresa. A aplicação foi desenvolvida para otimizar a gestão de espaços compartilhados, permitindo aos usuários visualizar a disponibilidade em tempo real, agendar reservas de forma prática e evitar conflitos de uso. Com isso, busca-se resolver problemas comuns relacionados à previsão e ocupação de salas, promovendo um ambiente de trabalho mais organizado e produtivo.

## Requisitos

- Node.js (versão 24.0.1)
- PostgreSQL (versão 17.5)

## Instalação

1. **Clonar o repositório:**

```bash
git clone https://github.com/Alexsander-Barbosa/Projeto-Individual.git
```

2. **Instalar as dependências:**

```bash
npm install
```

3. **Configurar o arquivo `.env`:**

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.

### Exemplo de `.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
PORT=3000
```


## Configuração do Banco de Dados

1. **Criar banco de dados:**

Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.

2. **Executar o script SQL de inicialização:**

```bash
npm run migration
```

Esse comando executa o script SQL que cria as tabelas `employee`, `room` e `bookings`, além de inserir dados fictícios para testes.

## Funcionalidades

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária nas tabelas `employee`, `room` e `bookings`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
* **Testes:** Inclui estrutura básica para testes automatizados.

## Arquitetura MVC

Este projeto segue o padrão MVC:

- **Model**: Interage diretamente com o banco de dados PostgreSQL.
- **View**: Neste projeto, representada pelas requisições feitas por clientes HTTP (como Postman).
- **Controller**: Contém a lógica da aplicação que responde às requisições da View e manipula os Models.

![Diagrama da Arquitetura MVC](https://github.com/usuario/repositorio/imagens/diagrama-mvc.png)

## Testando a API

Você pode usar o Postman ou Insomnia para testar os seguintes endpoints:

### Funcionários (`/api/employees`)
- `GET /api/employees`: Lista todos os funcionários.
- `POST /api/employees`: Cria um novo funcionário.
- `PUT /api/employees/:id`: Atualiza um funcionário.
- `DELETE /api/employees/:id`: Remove um funcionário.

Exemplo de criação de funcionário (`POST`)
```json
{
  "nome": "Maria Silva",
  "departamento": "Recursos Humanos"
}
```
Resposta de sucesso (201):
```json
{
  "id": 1,
  "nome": "Maria Silva",
  "departamento": "Recursos Humanos"
}
```

### Salas (`/api/rooms`)
- `GET /api/rooms`: Lista todas as salas.
- `POST /api/rooms`: Cria uma nova sala.
- `PUT /api/rooms/:id`: Atualiza uma sala.
- `DELETE /api/rooms/:id`: Remove uma sala.


### Reservas (`/api/bookings`)
- `GET /api/bookings`: Lista todas as reservas.
- `POST /api/bookings`: Cria uma nova reserva.
- `PUT /api/bookings/:id`: Atualiza uma reserva.
- `DELETE /api/bookings/:id`: Remove uma reserva.

## Scripts Disponíveis

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.
* `npm run migration`: Executa a criação das tabelas e popula o banco com dados fictícios.

## Estrutura de Diretórios

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.

## Como Rodar o Projeto

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`

3. Crie o banco de dados no PostgreSQL com o nome definido no `.env`

4. Execute o script de migração:

```bash
npm run migration
```

5. Inicie o servidor:

```bash
npm run dev
```

A API estará disponível em: `http://localhost:3000/api`