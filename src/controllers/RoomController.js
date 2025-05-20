const RoomModel = require('../models/RoomModel');

exports.criarRoom = async (req, res) => {
  const { nome, capacidade } = req.body;
  try {
    const room = await RoomModel.criarRoom(nome, capacidade);
    res.status(201).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.listarRooms();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarRoom = async (req, res) => {
  const { id } = req.params;
  const { nome, capacidade } = req.body;
  try {
    const room = await RoomModel.editarRoom(id, nome, capacidade);
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirRoom = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await RoomModel.excluirRoom(id);
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }
    res.status(200).json({ message: 'Sala excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};