const pool = require('../config/db');

exports.criarBooking = async (employee_id, room_id, dia_hora_reserva, num_pessoas) => {
  const query = `
    INSERT INTO bookings (employee_id, room_id, dia_hora_reserva, num_pessoas)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [employee_id, room_id, dia_hora_reserva, num_pessoas];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.listarBookings = async () => {
  const query = 'SELECT * FROM bookings ORDER BY id';
  const result = await pool.query(query);
  return result.rows;
};

exports.editarBooking = async (id, employee_id, room_id, dia_hora_reserva, num_pessoas) => {
  const query = `
    UPDATE bookings
    SET employee_id = $1, room_id = $2, dia_hora_reserva = $3, num_pessoas = $4
    WHERE id = $5 RETURNING *`;
  const values = [employee_id, room_id, dia_hora_reserva, num_pessoas, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.excluirBooking = async (id) => {
  const query = 'DELETE FROM bookings WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};