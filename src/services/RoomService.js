const RoomRepository = require('../repositories/RoomRepository');
const Room = require('../models/RoomModel'); // Importe o Model

const RoomService = {
    criar: async (dados) => {
        const newRoom = new Room(dados);
        newRoom.validate(); // Valida os dados de entrada
        return await RoomRepository.criar(newRoom); // Passa a instância validada
    },

    listar: async () => {
        return await RoomRepository.listar();
    },

    buscarPorId: async (id) => {
        return await RoomRepository.buscarPorId(id);
    },

    atualizar: async (id, dados) => {
        const updatedRoom = new Room({ id, ...dados }); // Crie uma instância com o ID
        updatedRoom.validate(true); // Valida os dados de entrada para atualização
        return await RoomRepository.atualizar(id, updatedRoom); // Passa a instância validada
    },

    excluir: async (id) => {
        return await RoomRepository.excluir(id);
    }
};

module.exports = RoomService;