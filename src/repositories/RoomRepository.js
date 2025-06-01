const db = require('../config/db');

const RoomRepository = {
  criar: async ({ numero_sala, capacidade_maxima }) => {
    const query = `
      INSERT INTO room (numero_sala, capacidade_maxima)
      VALUES ($1, $2) RETURNING *`;
    const result = await db.query(query, [numero_sala, capacidade_maxima]);
    return result.rows[0];
  },

  listar: async () => {
    const result = await db.query('SELECT * FROM room ORDER BY id');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM room WHERE id = $1', [id]);
    return result.rows[0];
  },

  atualizar: async (id, { numero_sala, capacidade_maxima }) => {
    const query = `
      UPDATE room
      SET numero_sala = $1, capacidade_maxima = $2
      WHERE id = $3 RETURNING *`;
    const result = await db.query(query, [numero_sala, capacidade_maxima, id]);
    return result.rows[0];
  },

  excluir: async (id) => {
    const result = await db.query('DELETE FROM room WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = RoomRepository;