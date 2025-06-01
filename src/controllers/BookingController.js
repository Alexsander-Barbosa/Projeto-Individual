const BookingService = require('../services/BookingService');

const BookingController = {
  criar: async (req, res) => {
    try {
      const booking = await BookingService.criar(req.body);
      res.status(201).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const bookings = await BookingService.listar();
      res.status(200).json(bookings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const booking = await BookingService.buscarPorId(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Reserva não encontrada' });
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const booking = await BookingService.atualizar(req.params.id, req.body);
      if (!booking) return res.status(404).json({ message: 'Reserva não encontrada' });
      res.status(200).json(booking);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const booking = await BookingService.excluir(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Reserva não encontrada' });
      res.status(200).json({ message: 'Reserva excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = BookingController;