const RoomRepository = require('../repositories/RoomRepository');
const Room = require('../models/RoomModel');

const RoomService = {
    criar: async (dados) => {
        const newRoom = new Room(dados);
        newRoom.validate();
        return await RoomRepository.criar(newRoom);
    },

    listar: async () => {
        return await RoomRepository.listar();
    },

    buscarPorId: async (id) => {
        return await RoomRepository.buscarPorId(id);
    },

    atualizar: async (id, dados) => {
        const updatedRoom = new Room({ id, ...dados });
        updatedRoom.validate(true);
        return await RoomRepository.atualizar(id, updatedRoom);
    },

    excluir: async (id) => {
        return await RoomRepository.excluir(id);
    }
};

module.exports = RoomService;