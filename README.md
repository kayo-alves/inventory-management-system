# Sistema de Gerenciamento de Inventário

Este é um sistema de gerenciamento de inventário full-stack construído com React no frontend e Node.js/Express/PostgreSQL no backend.

## Pré-requisitos

Antes de começar, certifique-se de ter os seguintes softwares instalados em sua máquina:

- [Node.js](https://nodejs.org/en/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js)
- [PostgreSQL](https://www.postgresql.org/download/) (um servidor de banco de dados PostgreSQL rodando localmente ou remotamente)

## Como Executar o Projeto

Siga os passos abaixo para configurar e executar o projeto em seu ambiente de desenvolvimento.

### 1. Clone o Repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd inventory-management-system
```

### 2. Configure o Backend (Servidor)

O servidor é responsável pela API e pela comunicação com o banco de dados.

1.  **Navegue até a pasta do servidor:**
    ```bash
    cd server
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configure as Variáveis de Ambiente:**
    Crie um arquivo chamado `.env` na raiz da pasta `server` e adicione as seguintes variáveis. Substitua os valores pelos da sua configuração local.

    ```env
    # Configuração do Banco de Dados
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=seu_banco_de_dados
    DB_USER=seu_usuario_postgres
    DB_PASSWORD=sua_senha_postgres

    # Configuração do JWT (JSON Web Token)
    JWT_SECRET=seu_segredo_super_secreto_para_jwt
    JWT_EXPIRES_IN=1h

    # Configuração do Servidor
    PORT=3000
    FRONTEND_URL=http://localhost:5173
    ```

4.  **Configure o Banco de Dados:**
    *   Certifique-se de que seu servidor PostgreSQL está rodando.
    *   Crie um banco de dados com o nome que você especificou em `DB_NAME`.
    *   Execute o script `src/config/schema.sql` para criar as tabelas e inserir os dados iniciais. Você pode usar uma ferramenta como DBeaver, pgAdmin ou o comando `psql`.
        ```bash
        # Exemplo usando psql
        psql -U seu_usuario_postgres -d seu_banco_de_dados -f src/config/schema.sql
        ```

5.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    O servidor backend estará rodando em `http://localhost:3000`.

### 3. Configure o Frontend (Cliente)

O cliente é a interface do usuário construída com React.

1.  **Abra um novo terminal.** Navegue até a pasta do cliente:
    ```bash
    cd client
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o Servidor de Desenvolvimento:**
    ```bash
    npm run dev
    ```
    A aplicação React estará rodando em `http://localhost:5173`.

### 4. Acesse a Aplicação

Abra seu navegador e acesse `http://localhost:5173` para usar o sistema.
