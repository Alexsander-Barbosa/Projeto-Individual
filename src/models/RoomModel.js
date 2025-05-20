const pool = require('../config/db');

exports.criarRoom = async (nome, capacidade) => {
  const query = 'INSERT INTO room (nome, capacidade) VALUES ($1, $2) RETURNING *';
  const values = [nome, capacidade];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarRooms = async () => {
  const query = 'SELECT * FROM room ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

exports.editarRoom = async (id, nome, capacidade) => {
  const query = `
    UPDATE room SET nome = $1, capacidade = $2 WHERE id = $3 RETURNING *`;
  const values = [nome, capacidade, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirRoom = async (id) => {
  const query = 'DELETE FROM room WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};