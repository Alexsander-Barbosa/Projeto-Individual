const EmployeeService = require('../services/EmployeeService');

const EmployeeController = {
  criar: async (req, res) => {
    try {
      const employee = await EmployeeService.criar(req.body);
      res.status(201).json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  listar: async (req, res) => {
    try {
      const employees = await EmployeeService.listar();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  buscarPorId: async (req, res) => {
    try {
      const employee = await EmployeeService.buscarPorId(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado' });
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  atualizar: async (req, res) => {
    try {
      const employee = await EmployeeService.atualizar(req.params.id, req.body);
      if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado' });
      res.status(200).json(employee);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  excluir: async (req, res) => {
    try {
      const employee = await EmployeeService.excluir(req.params.id);
      if (!employee) return res.status(404).json({ message: 'Funcionário não encontrado' });
      res.status(200).json({ message: 'Funcionário excluído com sucesso' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = EmployeeController;