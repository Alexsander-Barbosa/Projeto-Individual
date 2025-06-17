const EmployeeRepository = require('../repositories/EmployeeRepository');
const Employee = require('../models/EmployeeModel');

const EmployeeService = {
    criar: async (dados) => {
        const newEmployee = new Employee(dados);
        newEmployee.validate();
        return await EmployeeRepository.criar(newEmployee);
    },

    listar: async () => {
        return await EmployeeRepository.listar();
    },

    buscarPorId: async (id) => {
        return await EmployeeRepository.buscarPorId(id);
    },

    atualizar: async (id, dados) => {
        const updatedEmployee = new Employee({ id, ...dados });
        updatedEmployee.validate(true);
        return await EmployeeRepository.atualizar(id, updatedEmployee);
    },

    excluir: async (id) => {
        return await EmployeeRepository.excluir(id);
    }
};

module.exports = EmployeeService;