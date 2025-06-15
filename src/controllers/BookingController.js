const BookingService = require('../services/BookingService');
const EmployeeService = require('../services/EmployeeService');
const RoomService = require('../services/RoomService');

const BookingController = {
  criar: async (req, res) => {
    console.log('CONTROLLER CRIAR: Requisição POST recebida para bookings!');
    console.log('CONTROLLER CRIAR: Dados recebidos no corpo da requisição:', req.body);
    try {
      const booking = await BookingService.criar(req.body);
      res.status(201).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.criar:', err.message);
      console.error('Stack Trace do Erro no Controller (criar):', err.stack);
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      console.log('CONTROLLER LISTAR: Requisição GET recebida para listar bookings (API).');
      const bookings = await BookingService.listar();
      res.status(200).json(bookings);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.listar (API):', err.message);
      console.error('Stack Trace do Erro no Controller (listar API):', err.stack);
      res.status(500).json({ error: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      console.log(`CONTROLLER BUSCAR POR ID: Requisição GET recebida para booking ID: ${req.params.id} (API).`);
      const booking = await BookingService.buscarPorId(req.params.id);
      if (!booking) {
        console.warn(`CONTROLLER BUSCAR POR ID: Reserva com ID ${req.params.id} não encontrada.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.buscarPorId:', err.message);
      console.error('Stack Trace do Erro no Controller (buscarPorId):', err.stack);
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    console.log(`CONTROLLER ATUALIZAR: Requisição PUT recebida para booking ID: ${req.params.id}.`);
    console.log('CONTROLLER ATUALIZAR: Dados recebidos:', req.body);
    try {
      const booking = await BookingService.atualizar(req.params.id, req.body);
      if (!booking) {
        console.warn(`CONTROLLER ATUALIZAR: Reserva com ID ${req.params.id} não encontrada para atualização.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json(booking);
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.atualizar:', err.message);
      console.error('Stack Trace do Erro no Controller (atualizar):', err.stack);
      res.status(500).json({ error: err.message });
    }
  },

  excluir: async (req, res) => {
    console.log(`CONTROLLER EXCLUIR: Requisição DELETE recebida para booking ID: ${req.params.id}.`);
    try {
      const booking = await BookingService.excluir(req.params.id);
      if (!booking) {
        console.warn(`CONTROLLER EXCLUIR: Reserva com ID ${req.params.id} não encontrada para exclusão.`);
        return res.status(404).json({ message: 'Reserva não encontrada' });
      }
      res.status(200).json({ message: 'Reserva excluída com sucesso' });
    } catch (err) {
      console.error('CONTROLLER ERRO: Erro em BookingController.excluir:', err.message);
      console.error('Stack Trace do Erro no Controller (excluir):', err.stack);
      res.status(500).json({ error: err.message });
    }
  },

  listarBookingsView: async (req, res) => {
    try {
      console.log('CONTROLLER VIEWS: Tentando carregar lista de reservas para a view...');
      const bookings = await BookingService.listar();
      console.log('CONTROLLER VIEWS: Bookings carregados com sucesso. Quantidade:', bookings ? bookings.length : 0);
      res.render('bookings/index', { bookings });
    } catch (err) {
      console.error('CONTROLLER ERRO VIEWS: Erro ao carregar lista de reservas na view:', err.message);
      console.error('Stack Trace do Erro no Controller (listarBookingsView):', err.stack);
      res.status(500).send('Erro ao carregar lista de reservas');
    }
  },

  formBookingView: async (req, res) => {
    try {
      console.log('CONTROLLER VIEWS: Tentando carregar formulário de reserva...');
      const employees = await EmployeeService.listar();
      const rooms = await RoomService.listar();
      let booking = null;

      if (req.params.id) {
        console.log(`CONTROLLER VIEWS: Buscando reserva com ID: ${req.params.id} para edição.`);
        booking = await BookingService.buscarPorId(req.params.id);
        if (!booking) {
          console.warn(`CONTROLLER VIEWS: Reserva com ID ${req.params.id} não encontrada para formulário.`);
          return res.status(404).send('Reserva não encontrada');
        }
        console.log('CONTROLLER VIEWS: Reserva encontrada para edição.');
      } else {
        console.log('CONTROLLER VIEWS: Preparando formulário para nova reserva.');
      }
      res.render('bookings/form', { booking, employees, rooms });
    } catch (err) {
      console.error('CONTROLLER ERRO VIEWS: Erro ao carregar formulário da reserva:', err.message);
      console.error('Stack Trace do Erro no Controller (formBookingView):', err.stack);
      res.status(500).send('Erro ao carregar formulário da reserva');
    }
  }
};

module.exports = BookingController;