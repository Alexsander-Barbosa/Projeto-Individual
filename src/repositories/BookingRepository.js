const db = require('../config/db');

const BookingRepository = {
  criar: async ({ employee_id, room_id, dia_hora_reserva, num_pessoas }) => {
    const query = `
      INSERT INTO bookings (employee_id, room_id, dia_hora_reserva, num_pessoas)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const result = await db.query(query, [employee_id, room_id, dia_hora_reserva, num_pessoas]);
    return result.rows[0];
  },

  listar: async () => {
    const result = await db.query('SELECT * FROM bookings ORDER BY id');
    return result.rows;
  },

  buscarPorId: async (id) => {
    const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
  },

  atualizar: async (id, { employee_id, room_id, dia_hora_reserva, num_pessoas }) => {
    const query = `
      UPDATE bookings
      SET employee_id = $1, room_id = $2, dia_hora_reserva = $3, num_pessoas = $4
      WHERE id = $5 RETURNING *`;
    const result = await db.query(query, [employee_id, room_id, dia_hora_reserva, num_pessoas, id]);
    return result.rows[0];
  },

  excluir: async (id) => {
    const result = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
};

module.exports = BookingRepository;