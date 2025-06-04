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