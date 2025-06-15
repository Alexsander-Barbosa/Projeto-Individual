const db = require('../config/db');

const BookingRepository = {
  criar: async ({ employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas }) => {
    try {
      console.log('REPOSITORY: Tentando inserir reserva no DB...');
      const query = `
        INSERT INTO bookings (employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await db.query(query, [employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas]);
      console.log('REPOSITORY: Reserva inserida com sucesso.');
      return result.rows[0];
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro ao criar reserva no DB:', err.message);
      console.error('Stack Trace do Erro no Repository (criar):', err.stack);
      throw err;
    }
  },

  listar: async () => {
    try {
      console.log('REPOSITORY: Executando query SELECT para listar bookings.');
      const query = `
          SELECT
              b.id,
              b.employee_id,
              e.nome AS employee_nome,
              b.room_id,
              r.numero_sala,
              r.capacidade_maxima,
              b.dia_hora_reserva,
              b.dia_hora_fim_reserva,
              b.num_pessoas
          FROM
              bookings b
          JOIN
              employee e ON b.employee_id = e.id
          JOIN
              room r ON b.room_id = r.id
          ORDER BY
              b.dia_hora_reserva DESC;
      `;
      const result = await db.query(query);
      console.log('REPOSITORY: Query de listagem executada. Linhas retornadas:', result.rows.length);
      return result.rows;
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro em BookingRepository.listar ao executar query:', err.message);
      console.error('Stack Trace do Erro no Repository (listar):', err.stack);
      throw err;
    }
  },

  buscarPorId: async (id) => {
    try {
      console.log(`REPOSITORY: Executando query SELECT para booking ID: ${id}.`);
      const query = `
          SELECT
              b.id,
              b.employee_id,
              e.nome AS employee_nome,
              b.room_id,
              r.numero_sala,
              r.capacidade_maxima,
              b.dia_hora_reserva,
              b.dia_hora_fim_reserva,
              b.num_pessoas
          FROM
              bookings b
          JOIN
              employee e ON b.employee_id = e.id
          JOIN
              room r ON b.room_id = r.id
          WHERE
              b.id = $1;
      `;
      const result = await db.query(query, [id]);
      console.log('REPOSITORY: Query buscarPorId executada. Linhas retornadas:', result.rows.length);
      return result.rows[0];
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro em BookingRepository.buscarPorId:', err.message);
      console.error('Stack Trace do Erro no Repository (buscarPorId):', err.stack);
      throw err;
    }
  },

  atualizar: async (id, { employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas }) => {
    try {
      console.log(`REPOSITORY: Tentando atualizar reserva ID: ${id} no DB.`);
      const query = `
        UPDATE bookings
        SET employee_id = $1, room_id = $2, dia_hora_reserva = $3, dia_hora_fim_reserva = $4, num_pessoas = $5
        WHERE id = $6 RETURNING *;`;
      const result = await db.query(query, [employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas, id]);
      console.log('REPOSITORY: Reserva atualizada com sucesso.');
      return result.rows[0];
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro ao atualizar reserva no DB:', err.message);
      console.error('Stack Trace do Erro no Repository (atualizar):', err.stack);
      throw err;
    }
  },

  excluir: async (id) => {
    try {
      console.log(`REPOSITORY: Tentando excluir reserva ID: ${id} do DB.`);
      const result = await db.query('DELETE FROM bookings WHERE id = $1 RETURNING *', [id]);
      console.log('REPOSITORY: Reserva excluída com sucesso.');
      return result.rows[0];
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro ao excluir reserva no DB:', err.message);
      console.error('Stack Trace do Erro no Repository (excluir):', err.stack);
      throw err;
    }
  },

  verificarSobreposicao: async (roomId, inicio, fim, bookingId = null) => {
    try {
      console.log(`REPOSITORY: Verificando sobreposição para Sala ${roomId} de ${inicio} a ${fim}.`);
      let query = `
        SELECT id FROM bookings
        WHERE room_id = $1
        AND (
          (dia_hora_reserva, dia_hora_fim_reserva) OVERLAPS ($2::timestamp, $3::timestamp)
        )
      `;
      const params = [roomId, inicio, fim];

      if (bookingId) {
        query += ` AND id != $4`;
        params.push(bookingId);
      }

      const result = await db.query(query, params);
      console.log('REPOSITORY: Verificação de sobreposição executada. Resultados:', result.rows.length);
      return result.rows.length > 0;
    } catch (err) {
      console.error('REPOSITORY ERRO: Erro em BookingRepository.verificarSobreposicao:', err.message);
      console.error('Stack Trace do Erro no Repository (verificarSobreposicao):', err.stack);
      throw err;
    }
  }
};

module.exports = BookingRepository;