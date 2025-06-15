const RoomService = require('../services/RoomService');

const RoomController = {
  criar: async (req, res) => {
    try {
      const room = await RoomService.criar(req.body);
      res.status(201).json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const rooms = await RoomService.listar();
      res.status(200).json(rooms);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const room = await RoomService.buscarPorId(req.params.id);
      if (!room) return res.status(404).json({ message: 'Sala não encontrada' });
      res.status(200).json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const room = await RoomService.atualizar(req.params.id, req.body);
      if (!room) return res.status(404).json({ message: 'Sala não encontrada' });
      res.status(200).json(room);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const room = await RoomService.excluir(req.params.id);
      if (!room) return res.status(404).json({ message: 'Sala não encontrada' });
      res.status(200).json({ message: 'Sala excluída com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listarRoomsView: async (req, res) => {
    try {
      const rooms = await RoomService.listar();
      res.render('rooms/index', { rooms });
    } catch (err) {
      res.status(500).send('Erro ao carregar lista de salas');
    }
  },

  formRoomView: async (req, res) => {
    try {
      if (req.params.id) {
        const room = await RoomService.buscarPorId(req.params.id);
        if (!room) return res.status(404).send('Sala não encontrada');
        res.render('rooms/form', { room });
      } else {
        res.render('rooms/form', { room: null });
      }
    } catch (err) {
      res.status(500).send('Erro ao carregar formulário da sala');
    }
  }
};

module.exports = RoomController;