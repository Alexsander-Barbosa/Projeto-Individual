CREATE TABLE IF NOT EXISTS room (
  id SERIAL PRIMARY KEY,
  numero_sala INTEGER NOT NULL UNIQUE,
  capacidade_maxima INTEGER NOT NULL
);