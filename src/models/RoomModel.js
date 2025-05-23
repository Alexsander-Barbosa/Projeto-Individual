const pool = require('../config/db');

exports.criarRoom = async (numero_sala, capacidade_maxima) => {
  const query = 'INSERT INTO room (numero_sala, capacidade_maxima) VALUES ($1, $2) RETURNING *';
  const values = [numero_sala, capacidade_maxima];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarRooms = async () => {
  const query = 'SELECT * FROM room ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

exports.editarRoom = async (id, numero_sala, capacidade_maxima) => {
  const query = `
    UPDATE room SET numero_sala = $1, capacidade_maxima = $2 WHERE id = $3 RETURNING *`;
  const values = [numero_sala, capacidade_maxima, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirRoom = async (id) => {
  const query = 'DELETE FROM room WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};