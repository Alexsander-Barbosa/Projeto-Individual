class Booking {
  constructor({ id, employee_id, room_id, dia_hora_reserva, num_pessoas }) {
    this.id = id;
    this.employee_id = employee_id;
    this.room_id = room_id;
    this.dia_hora_reserva = dia_hora_reserva;
    this.num_pessoas = num_pessoas;
  }
}

module.exports = Booking;