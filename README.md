# **Sistema de Reservas de Viagens Personalizadas**

## **Descrição do Projeto**

## Travelly

- Travelly é um sistema de reservas de viagens que permite aos usuários explorar destinos, personalizar itinerários e reservar pacotes turísticos com facilidade. O sistema é suportado por um banco de dados robusto, projetado para gerenciar todas as etapas da jornada de viagem, desde a pesquisa e reserva até avaliações pós-viagem.

## **Andamento do Projeto**

- [x] **Introdução**

  - [x] Definir o escopo do projeto.
  - [x] Explicar o objetivo do sistema de reservas de viagens personalizadas.
  - [x] Descrever a importância e as funcionalidades principais do sistema.

- [x] **Modelo de Entidade Relacionamento (MER)**

  - [x] Criar o Modelo de Entidade Relacionamento.
  - [x] Usar uma ferramenta de modelagem (BRModelo).

- [x] **Modelo Relacional (MR)**

  - [x] Criar o Modelo Relacional.
  - [x] Usar uma ferramenta de modelagem (BRModelo).

- [x] **Consultas em Álgebra Relacional**

  - [x] Desenvolver 5 consultas, cada uma envolvendo pelo menos 3 tabelas.

- [x] **Avaliação das Formas Normais**

  - [x] Analisar 5 tabelas para verificar as formas normais.
  - [x] Documentar a avaliação.

- [x] **Script SQL**

  - [x] Criar o script SQL que gera o banco de dados.
  - [x] Garantir que o script esteja livre de erros e consistente com o MR.

- [x] **Camada de Persistência**

  - [x] Desenvolver a camada de persistência em TypeScript.
  - [x] Criar um diagrama mostrando como a interface gráfica acessa a camada de persistência.

- [x] **CRUD (Create, Read, Update, Delete)**

  - [x] Implementar funções de CRUD para um conjunto de no mínimo 3 tabelas com relacionamento entre elas.
  - [x] Testar as funções para garantir o funcionamento correto.

- [x] **Utilização de View**

  - [x] Criar pelo menos uma view.
  - [x] Garantir que a view tenha uma complexidade adequada e documentar sua função.

- [x] **Utilização de Procedure**

  - [x] Criar pelo menos uma procedure com comandos condicionais.
  - [x] Documentar a complexidade e a lógica da procedure.

- [x] **Inserção de Dado Binário**
  - [x] Adicionar um dado binário no banco de dados (ex: foto, arquivo PDF).
  - [x] Garantir que o dado binário seja corretamente inserido e recuperado.

## **Funcionalidades Principais**

Consultas básicas de avaliações, usuários e destinos:

- [x] backend
- [x] frontend

## **Tecnologias Utilizadas**

- **Backend**:
  - **Linguagem**: TypeScript
  - **Framework**: Node.js com Express (Next.js talvez)
  - **ORM**: Driver do Postgres (sem orm)
- **Banco de Dados**:
  - **SGBD**: PostgreSQL
  - **Modelagem**: BRModelo
- **Infraestrutura**:
  - **Docker**: Contêineres para facilitar o desenvolvimento e a implantação.

- **Frontend**:
  - styled-components
  - axios
  - react-icons
  - react-toastify
  - react-router-dom
  - Bootstrap
  - next.js
## **Como rodar o projeto**

1. **Subir o banco de dados:**
   - Após clonar o projeto, navegue até a pasta principal e execute o seguinte comando para subir o banco de dados:
     ```bash
     docker-compose up -d
     ```

2. **Subir o backend:**
   - Navegue até a pasta `travelly-backend`, instale os pacotes necessários e rode o servidor:
     ```bash
     cd travelly-backend
     npm i
     npm run dev
     ```

3. **Subir o frontend:**
   - Navegue até a pasta `travelly-frontend`, instale os pacotes necessários e rode o servidor:
     ```bash
     cd travelly-frontend
     npm i
     npm run dev
     ```

O projeto estará rodando localmente com o backend e o frontend conectados ao banco de dados.
