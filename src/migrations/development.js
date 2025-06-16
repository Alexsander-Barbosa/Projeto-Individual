const db = require('../config/db');

(async () => {
  try {
    console.log('🚀 Inserindo dados fictícios para o Sistema de Reserva de Salas...');

    const employeeNames = [
      'João Silva', 'Maria Santos', 'Carlos Oliveira',
      'Ana Pereira', 'Pedro Costa', 'Fernanda Lima'
    ];
    const employeeDepartments = [
      'TI', 'Marketing', 'Recursos Humanos', 'Finanças', 'TI', 'Marketing'
    ];

    const insertedEmployees = [];
    for (let i = 0; i < employeeNames.length; i++) {
      const nome = employeeNames[i];
      const departamento = employeeDepartments[i]; 
      const { rows } = await db.query(
        'INSERT INTO employee (nome, departamento) VALUES ($1, $2) RETURNING id;',
        [nome, departamento]
      );
      insertedEmployees.push(rows[0].id);
    }
    console.log(`✅ ${insertedEmployees.length} funcionários inseridos.`);

    const roomNumbers = [101, 102, 201, 202];
    const roomCapacities = [5, 8, 12, 10];

    const insertedRooms = [];
    for (let i = 0; i < roomNumbers.length; i++) {
      const { rows } = await db.query(
        'INSERT INTO room (numero_sala, capacidade_maxima) VALUES ($1, $2) RETURNING id;',
        [roomNumbers[i], roomCapacities[i]]
      );
      insertedRooms.push(rows[0].id);
    }
    console.log(`✅ ${insertedRooms.length} salas inseridas.`);

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const dayAfterTomorrow = new Date(now);
    dayAfterTomorrow.setDate(now.getDate() + 2);

    const generateBookingTime = (baseDate, hour, minute = 0) => {
      const date = new Date(baseDate);
      date.setHours(hour, minute, 0, 0);
      return date;
    };

    const bookingsToInsert = [
      {
        employee_id: insertedEmployees[0],
        room_id: insertedRooms[0],
        dia_hora_reserva: generateBookingTime(tomorrow, 10),
        dia_hora_fim_reserva: generateBookingTime(tomorrow, 12),
        num_pessoas: 4
      },
      {
        employee_id: insertedEmployees[1],
        room_id: insertedRooms[1],
        dia_hora_reserva: generateBookingTime(tomorrow, 14),
        dia_hora_fim_reserva: generateBookingTime(tomorrow, 16),
        num_pessoas: 7
      },
      {
        employee_id: insertedEmployees[2],
        room_id: insertedRooms[2],
        dia_hora_reserva: generateBookingTime(dayAfterTomorrow, 9),
        dia_hora_fim_reserva: generateBookingTime(dayAfterTomorrow, 11),
        num_pessoas: 10
      },
      {
        employee_id: insertedEmployees[3],
        room_id: insertedRooms[0],
        dia_hora_reserva: generateBookingTime(dayAfterTomorrow, 11),
        dia_hora_fim_reserva: generateBookingTime(dayAfterTomorrow, 13),
        num_pessoas: 3
      }
    ];

    const insertedBookings = [];
    for (const booking of bookingsToInsert) {
      const { rows } = await db.query(
        'INSERT INTO bookings (employee_id, room_id, dia_hora_reserva, dia_hora_fim_reserva, num_pessoas) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
        [
          booking.employee_id,
          booking.room_id,
          booking.dia_hora_reserva.toISOString(),
          booking.dia_hora_fim_reserva.toISOString(),
          booking.num_pessoas
        ]
      );
      insertedBookings.push(rows[0].id);
    }
    console.log(`✅ ${insertedBookings.length} reservas inseridas.`);

    console.log('🎉 Todos os dados fictícios foram inseridos com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inserir dados fictícios:', error.message);
    console.error('Stack Trace:', error.stack);
    process.exit(1);
  }
})();