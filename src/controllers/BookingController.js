const BookingService = require('../services/BookingService');
const EmployeeService = require('../services/EmployeeService');
const RoomService = require('../services/RoomService');

const BookingController = {
  criar: async (req, res) => {
    try {
      const booking = await BookingService.criar(req.body);
      res.status(201).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.criar:', err.message);
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const bookings = await BookingService.listar();
      res.status(200).json(bookings);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.listar (API):', err.message);
      res.status(500).json({ error: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const booking = await BookingService.buscarPorId(req.params.id);
      if (!booking) {
        console.warn(`CONTROLLER BUSCAR POR ID: Reserva com ID ${req.params.id} não encontrada.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.buscarPorId:', err.message);
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const booking = await BookingService.atualizar(req.params.id, req.body);
      if (!booking) {
        console.warn(`CONTROLLER ATUALIZAR: Reserva com ID ${req.params.id} não encontrada para atualização.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.atualizar:', err.message);
      res.status(500).json({ error: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const booking = await BookingService.excluir(req.params.id);
      if (!booking) {
        console.warn(`CONTROLLER EXCLUIR: Reserva com ID ${req.params.id} não encontrada para exclusão.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json({ message: 'Reserva excluída com sucesso' });
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.excluir:', err.message);
      res.status(500).json({ error: err.message });
    }
  },

  listarBookingsView: async (req, res) => {
    try {
      const bookings = await BookingService.listar();
      console.log('CONTROLLER VIEWS: Bookings carregados com sucesso. Quantidade:', bookings ? bookings.length : 0);
      res.render('bookings/index', { bookings });
    } catch (err) {
      console.error('CONTROLLER ERRO VIEWS: Erro ao carregar lista de reservas na view:', err.message);
      res.status(500).send('Erro ao carregar lista de reservas');
    }
  },

  formBookingView: async (req, res) => {
    try {
      const employees = await EmployeeService.listar();
      const rooms = await RoomService.listar();
      let booking = null;

      if (req.params.id) {
        booking = await BookingService.buscarPorId(req.params.id);
        if (!booking) {
          console.warn(`CONTROLLER VIEWS: Reserva com ID ${req.params.id} não encontrada para formulário.`);
          return res.status(404).send('Reserva não encontrada');
        }
      } else {
      }
      res.render('bookings/form', { booking, employees, rooms });
    } catch (err) {
      console.error('CONTROLLER ERRO VIEWS: Erro ao carregar formulário da reserva:', err.message);
      res.status(500).send('Erro ao carregar formulário da reserva');
    }
  }
};

module.exports = BookingController;