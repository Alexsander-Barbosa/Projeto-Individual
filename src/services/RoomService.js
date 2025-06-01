const RoomRepository = require('../repositories/RoomRepository');

const RoomService = {
  criar: async (dados) => {
    return await RoomRepository.criar(dados);
  },

  listar: async () => {
    return await RoomRepository.listar();
  },

  buscarPorId: async (id) => {
    return await RoomRepository.buscarPorId(id);
  },

  atualizar: async (id, dados) => {
    return await RoomRepository.atualizar(id, dados);
  },

  excluir: async (id) => {
    return await RoomRepository.excluir(id);
  }
};

module.exports = RoomService;