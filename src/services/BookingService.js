const BookingRepository = require('../repositories/BookingRepository');

const BookingService = {
  criar: async (dados) => {
    return await BookingRepository.criar(dados);
  },

  listar: async () => {
    return await BookingRepository.listar();
  },

  buscarPorId: async (id) => {
    return await BookingRepository.buscarPorId(id);
  },

  atualizar: async (id, dados) => {
    return await BookingRepository.atualizar(id, dados);
  },

  excluir: async (id) => {
    return await BookingRepository.excluir(id);
  }
};

module.exports = BookingService;