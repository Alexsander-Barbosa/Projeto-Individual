# Sistema de Reserva de Salas

Este projeto oferece uma solução eficiente para a **reserva e gestão de salas de reunião** por colaboradores em ambientes corporativos. Desenvolvido para otimizar o uso de espaços compartilhados, o sistema permite aos usuários:

* **Visualizar a disponibilidade** das salas em tempo real.
* **Agendar e gerenciar reservas** de forma prática e intuitiva (incluindo operações de criação, visualização, atualização e exclusão).
* **Gerenciar dados de funcionários e salas** através de uma API dedicada.
* **Evitar conflitos de uso**, promovendo um ambiente de trabalho mais organizado e produtivo.

A aplicação conta com uma **interface web interativa** acessível via navegador e uma **API REST robusta** para integração com outros sistemas.

---

## 📸 **Demonstração**

Para ter uma ideia de como o sistema funciona:

* **Vídeo de Demonstração:**
    Assista a uma demonstração rápida do sistema em funcionamento:
    [Link para o seu vídeo de demonstração (YouTube, Vimeo, etc.)](https://link-para-o-seu-video-aqui.com)

---

## 🚀 **Requisitos do Sistema**

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* **Node.js**: Versão 20 ou superior.
* **PostgreSQL**: Versão 12 ou superior.

---

## 🛠️ **Instalação e Configuração**

Siga estes passos para configurar e rodar o projeto em seu ambiente de desenvolvimento:

1.  **Clonar o repositório:**
    Abra seu terminal e execute:
    ```bash
    git clone [https://github.com/Alexsander-Barbosa/Projeto-Individual.git]
    cd Projeto-Individual
    ```

2.  **Entrar na pasta principal do projeto (`src/`):**
    **IMPORTANTE:** Todos os comandos `npm` e `node` listados abaixo devem ser executados **de dentro da pasta `src/`**.
    ```bash
    cd src/
    ```

3.  **Instalar as dependências do projeto:**
    ```bash
    npm install
    ```

4.  **Configurar o arquivo `.env`:**
    Dentro da pasta **`src/`** do seu projeto (`Projeto-Individual/src/`), renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente para a conexão com seu banco de dados PostgreSQL e a porta da aplicação.

    ### Exemplo de `.env` (localizado em `src/.env`)
    ```env
    # Configurações do Banco de Dados PostgreSQL
    DB_HOST=localhost            # Ou o endereço do seu servidor de DB na nuvem
    DB_PORT=5432                 # Porta padrão do PostgreSQL
    DB_NAME=nome_do_seu_banco    # Nome do banco de dados a ser criado/usado
    DB_USER=seu_usuario_do_banco # Usuário do PostgreSQL
    DB_PASSWORD=sua_senha_do_banco # Senha do usuário do PostgreSQL

    # Configuração do Servidor da Aplicação
    PORT=3000                    # Porta em que a aplicação Node.js irá rodar
    ```

---

## 🗄️ **Configuração do Banco de Dados**

1.  **Criar o banco de dados:**
    Crie um banco de dados PostgreSQL com o **nome exato especificado na variável `DB_NAME` do seu arquivo `.env`**. Você pode usar ferramentas como `pgAdmin`, `DBeaver` ou a linha de comando `psql`.

2.  **Executar as migrações do banco de dados:**
    Este comando cria todas as tabelas (`employee`, `room`, `bookings`) e seus relacionamentos no banco de dados.
    ```bash
    npm run production
    ```
    * **Dica:** Para popular o banco com dados fictícios para fins de desenvolvimento, execute o comando:
        ```bash
        npm run development
        ```
        (Execute este comando **após** a execução das migrações de `production`).

---

## ▶️ **Como Rodar o Projeto**

Após a instalação e configuração do banco de dados (conforme os passos acima), inicie o servidor da aplicação:

* **Para Desenvolvimento (com reinício automático):**
    ```bash
    npm run dev
    ```
    * Este comando inicia o servidor e o reinicia automaticamente sempre que você faz alterações no código, ideal para o desenvolvimento.

* **Para Rodar em Produção:**
    ```bash
    npm start
    ```
    * Este comando inicia o servidor de forma mais robusta para ambientes de produção.

* **Para Executar as Migrações de Banco de Dados:**
    ```bash
    npm run production
    ```
    * Use este comando para criar ou atualizar o esquema do banco de dados (tabelas, colunas, etc.).

* **Para Inserir Dados Fictícios (apenas em desenvolvimento):**
    ```bash
    npm run development
    ```
    * Este comando insere dados de exemplo nas tabelas do seu banco de dados, útil para testar a aplicação sem precisar preencher tudo manualmente. **Execute-o após `npm run production`**.

---

## 🚨 **Solução de Problemas Comuns**

Se você encontrar o erro `AggregateError [ECONNREFUSED]` ao tentar rodar as migrações ou iniciar o servidor:

* **Servidor PostgreSQL não está rodando:** Certifique-se de que seu serviço PostgreSQL está ativo e em execução (verifique nos "Serviços" do Windows ou com `docker ps` se usa Docker).
* **Credenciais de conexão incorretas:** Revise cuidadosamente as variáveis `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` e `DB_NAME` no seu arquivo `.env` para garantir que estão 100% corretas.
* **Firewall bloqueando a conexão:**
    * **Localmente:** Seu firewall pode estar bloqueando a porta 5432 (ou a porta que seu DB usa).
    * **Nuvem:** Se seu banco de dados está na nuvem, você **precisa** adicionar o IP público da sua máquina à lista de IPs permitidos (whitelist) nas configurações do seu provedor de banco de dados.

---

## 📚 **Tecnologias Utilizadas**

Este projeto foi desenvolvido utilizando as seguintes tecnologias e bibliotecas:

* **Backend:**
    * [Node.js](https://nodejs.org/): Ambiente de tempo de execução JavaScript.
    * [Express.js](https://expressjs.com/): Framework web robusto para Node.js.
    * [PG (Node-Postgres)](https://node-postgres.com/): Cliente oficial do PostgreSQL para Node.js.
    * [Joi](https://joi.dev/): Biblioteca poderosa para validação de esquemas de dados.
    * [Dotenv](https://www.npmjs.com/package/dotenv): Módulo para carregar variáveis de ambiente de arquivos `.env`.
    * [Body-parser](https://www.npmjs.com/package/body-parser): Middleware para analisar os corpos das requisições HTTP.
    * [CORS](https://www.npmjs.com/package/cors): Middleware para habilitar o Cross-Origin Resource Sharing.
    * [Nodemon](https://nodemon.io/): Ferramenta para reiniciar automaticamente o servidor durante o desenvolvimento.
* **Frontend (Views):**
    * [EJS](https://ejs.com/): Linguagem de template JavaScript embutida para gerar HTML dinâmico.
    * **CSS Puro**: Para estilização e layout da interface.
    * **JavaScript (Vanilla)**: Para interatividade do lado do cliente e comunicação assíncrona (Fetch API).
* **Banco de Dados:**
    * [PostgreSQL](https://www.postgresql.org/): Sistema de gerenciamento de banco de dados relacional objeto-relacional de código aberto.