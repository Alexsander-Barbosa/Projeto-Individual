# Projeto-Pessoal
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
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run migration
```
    
Isso criará as tabelas `employee`, `room` e `bookings` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária na tabela `users`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
* **Testes:** Inclui estrutura básica para testes automatizados.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
