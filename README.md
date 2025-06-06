# Sistema de Reserva de Salas

Este projeto oferece uma solução eficiente para a **reserva de salas de reunião** por colaboradores de uma empresa. A aplicação foi desenvolvida para otimizar a gestão de espaços compartilhados, permitindo aos usuários visualizar a disponibilidade, agendar reservas de forma prática e evitar conflitos de uso. O sistema busca resolver problemas comuns relacionados à previsão e ocupação de salas, promovendo um ambiente de trabalho mais organizado e produtivo, agora com uma **interface visual interativa** acessível via navegador.

---

## 🚀 Requisitos

Certifique-se de ter instalado:

* **Node.js**: Versão 20 ou superior.
* **PostgreSQL**: Versão 12 ou superior.

---

## 🛠️ Instalação e Configuração

1.  **Clonar o repositório:**

    ```bash
    git clone [https://github.com/Alexsander-Barbosa/Projeto-Individual.git](https://github.com/Alexsander-Barbosa/Projeto-Individual.git)
    cd Projeto-Individual
    ```

2.  **Entrar na pasta raiz do projeto (agora `src/`):**

    Todos os comandos `npm` e `node` devem ser executados de dentro da pasta `src/`.

    ```bash
    cd src/
    ```

3.  **Instalar as dependências:**

    ```bash
    npm install
    ```

4.  **Configurar o arquivo `.env`:**

    Na **raiz do seu projeto** (`Projeto-Individual/`), renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente para a conexão com seu banco de dados PostgreSQL.

    ### Exemplo de `.env`

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=nome_do_seu_banco
    DB_USER=seu_usuario_do_banco
    DB_PASSWORD=sua_senha_do_banco
    PORT=3000
    ```

---

## 🗄️ Configuração do Banco de Dados

1.  **Criar o banco de dados:**

    Crie um banco de dados PostgreSQL com o **nome especificado no seu arquivo `.env`**.

2.  **Executar o script SQL de inicialização (migrações):**

    Este comando cria as tabelas `employee`, `room` e `bookings` com suas colunas atualizadas, incluindo o horário de fim da reserva.

    ```bash
    node migration/runSQLscripts.js
    ```
    *(Execute este comando de dentro da pasta `src/`)*

---

## ▶️ Como Rodar o Projeto

Após a instalação e configuração do banco de dados (passos acima), inicie o servidor:

```bash
npm start
# ou, se você tiver nodemon configurado no package.json
# npm run dev
# ou, diretamente (de dentro da pasta src/):
# node server.js