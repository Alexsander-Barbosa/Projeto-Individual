const EmployeeRepository = require('../repositories/EmployeeRepository');

const EmployeeService = {
  criar: async (dados) => {
    return await EmployeeRepository.criar(dados);
  },

  listar: async () => {
    return await EmployeeRepository.listar();
  },

  buscarPorId: async (id) => {
    return await EmployeeRepository.buscarPorId(id);
  },

  atualizar: async (id, dados) => {
    return await EmployeeRepository.atualizar(id, dados);
  },

  excluir: async (id) => {
    return await EmployeeRepository.excluir(id);
  }
};

module.exports = EmployeeService;