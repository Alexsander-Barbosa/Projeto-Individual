const pool = require('../config/db');

const EmployeeModel = {
  criar: async ({ nome, departamento }) => {
    const query = 'INSERT INTO employee (nome, departamento) VALUES ($1, $2) RETURNING *';
    const values = [nome, departamento];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  listarTodos: async () => {
    const query = 'SELECT * FROM employee ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
  },

  editar: async (id, { nome, departamento }) => {
    const query = 'UPDATE employee SET nome = $1, departamento = $2 WHERE id = $3 RETURNING *';
    const values = [nome, departamento, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  excluir: async (id) => {
    const query = 'DELETE FROM employee WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};

module.exports = EmployeeModel;