# **Sistema de Reservas de Viagens Personalizadas**

## **Descrição do Projeto**

# Travelly

- Travelly é um sistema de reservas de viagens que permite aos usuários explorar destinos, personalizar itinerários e reservar pacotes turísticos com facilidade. O sistema é suportado por um banco de dados robusto, projetado para gerenciar todas as etapas da jornada de viagem, desde a pesquisa e reserva até avaliações pós-viagem.

## **Funcionalidades Principais** - a ser implementado

**Cadastro de Usuários**: Permite o registro e autenticação de usuários.

- [ ] Backend
- [ ] Frontend

**Criação de Pacotes de Viagem**: Os usuários podem personalizar pacotes de viagem escolhendo destinos, transportes e hospedagens.

- [ ] Backend
- [ ] Frontend

**Gerenciamento de Reservas**: Função para adicionar, editar ou cancelar reservas de viagem.

- [ ] Backend
- [ ] Frontend

**Avaliação de Serviços**: Os usuários podem avaliar destinos, hospedagens e transportes utilizados em suas viagens.

- [ ] Backend
- [ ] Frontend
      
**Pagamentos**: Integração com métodos de pagamento para finalizar as reservas.

- [ ] Backend
- [ ] Frontend
      
**Visualização de Itinerários**: Permite aos usuários visualizar e gerenciar seus itinerários de viagem.

- [ ] Backend
- [ ] Frontend
      
**Administração**: Módulo para gerenciamento de conteúdo e moderação das avaliações de usuários.
- [ ] Backend
- [ ] Frontend

## **Tecnologias Utilizadas** - proposta

- **Backend**:
  - **Linguagem**: TypeScript
  - **Framework**: Node.js com Express (Next.js talvez)
  - **ORM**: TypeORM para integração com PostgreSQL ou apenas o driver do Postgres (sem orm)
- **Banco de Dados**:
  - **SGBD**: PostgreSQL
  - **Modelagem**: BRModelo
- **Autenticação**: JWT (JSON Web Token)
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

## **Modelagem de Dados**

### **Modelo Entidade-Relacionamento (MER)**

O sistema foi modelado com as seguintes entidades principais:

1. **Usuário**
2. **Reserva**
3. **Viagem**
4. **Itinerário**
5. **Hospedagem**
6. **Transporte**
7. **Avaliação**
8. **Destino**
9. **Pacote Turístico**
10. **Pagamento**

Essas entidades foram modeladas com suas respectivas relações utilizando ferramentas como BRModelo. O MER foi posteriormente traduzido para o Modelo Relacional e implementado em PostgreSQL.

### **Modelo Relacional**

Cada entidade foi transformada em uma tabela no banco de dados PostgreSQL, com relações definidas por chaves estrangeiras e cardinalidades específicas, de acordo com as necessidades do sistema.
