const db = require('../config/db');

const EmployeeRepository = {
  criar: async ({ nome, departamento }) => {
    const query = `
      INSERT INTO employee (nome, departamento)
      VALUES ($1, $2) RETURNING *`;
    const result = await db.query(query, [nome, departamento]);
    return result.rows[0];
  },

  listar: async () => {
    const result = await db.query('SELECT * FROM employee ORDER BY id');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM employee WHERE id = $1', [id]);
    return result.rows[0];
  },

  atualizar: async (id, { nome, departamento }) => {
    const query = `
      UPDATE employee
      SET nome = $1, departamento = $2
      WHERE id = $3 RETURNING *`;
    const result = await db.query(query, [nome, departamento, id]);
    return result.rows[0];
  },

  excluir: async (id) => {
    const result = await db.query('DELETE FROM employee WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = EmployeeRepository;