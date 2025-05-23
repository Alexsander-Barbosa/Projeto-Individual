const BookingModel = require('../models/BookingModel');

exports.criarBooking = async (req, res) => {
  const { employee_id, room_id, dia_hora_reserva, num_pessoas } = req.body;
  try {
    const booking = await BookingModel.criarBooking(employee_id, room_id, dia_hora_reserva, num_pessoas);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.listarBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarBooking = async (req, res) => {
  const { id } = req.params;
  const { employee_id, room_id, dia_hora_reserva, num_pessoas } = req.body;
  try {
    const booking = await BookingModel.editarBooking(id, employee_id, room_id, dia_hora_reserva, num_pessoas);
    if (!booking) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await BookingModel.excluirBooking(id);
    if (!booking) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};