const EmployeeRepository = require('../repositories/EmployeeRepository');
const Employee = require('../models/EmployeeModel'); // Importe o Model

const EmployeeService = {
    criar: async (dados) => {
        const newEmployee = new Employee(dados);
        newEmployee.validate(); // Valida os dados de entrada
        return await EmployeeRepository.criar(newEmployee); // Passa a instância validada
    },

    listar: async () => {
        return await EmployeeRepository.listar();
    },

    buscarPorId: async (id) => {
        return await EmployeeRepository.buscarPorId(id);
    },

    atualizar: async (id, dados) => {
        const updatedEmployee = new Employee({ id, ...dados }); // Crie uma instância com o ID
        updatedEmployee.validate(true); // Valida os dados de entrada para atualização
        return await EmployeeRepository.atualizar(id, updatedEmployee); // Passa a instância validada
    },

    excluir: async (id) => {
        return await EmployeeRepository.excluir(id);
    }
};

module.exports = EmployeeService;