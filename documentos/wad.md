# Reserva de salas

## Introdução
Este projeto tem como objetivo oferecer uma solução eficiente para a reserva de salas de reunião por colaboradores de uma empresa. A aplicação foi desenvolvida para otimizar a gestão de espaços compartilhados, permitindo aos usuários visualizar a disponibilidade em tempo real, agendar reservas de forma prática e evitar conflitos de uso. Com isso, busca-se resolver problemas comuns relacionados à previsão e ocupação de salas, promovendo um ambiente de trabalho mais organizado e produtivo.

## Modelo relacional do banco de dados

  <img src="../assets/banco-relacional.png" alt="Diagrama - modelo relacional">
 


## Modelo físico do banco de dados

```
CREATE TABLE IF NOT EXISTS employee (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  departamento VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS room (
  id SERIAL PRIMARY KEY,
  numero_sala INTEGER NOT NULL UNIQUE,
  capacidade_maxima INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  employee_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  dia_hora_reserva TIMESTAMP NOT NULL,
  dia_hora_fim_reserva TIMESTAMP NOT NULL,
  num_pessoas INTEGER NOT NULL,
  FOREIGN KEY (employee_id) REFERENCES employee(id),
  FOREIGN KEY (room_id) REFERENCES room(id),
  UNIQUE (employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva)
);
```
## Prints das Views (Interface do Usuário)

Esta seção mostra as principais telas da aplicação, demonstrando a interação com o sistema e a exibição dos dados.

### 1. Página de Listagem de Reservas (`/bookings`)

  <img src="../assets/listagem-reservas.png" alt="Listagem de Reservas">

### 2. Formulário de Reserva (Criação/Edição - /`bookings/form` ou `/bookings/form/:id`)

  <img src="../assets/criacao-reservas.png" alt="Criação de Reservas">

### 3. Página de Listagem de Funcionários (`/employees`)

  <img src="../assets/listagem-funcionarios.png" alt="Listagem de Funcionários">

### 4. Página de Listagem de Salas (`/rooms`)

  <img src="../assets/listagem-salas.png" alt="Listagem de Salas">