const EmployeeModel = require('../models/EmployeeModel');

exports.criarEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.criar(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listarEmployees = async (req, res) => {
  try {
    const employees = await EmployeeModel.listarTodos();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editarEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.editar(req.params.id, req.body);
    if (!employee) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.excluirEmployee = async (req, res) => {
  try {
    const employee = await EmployeeModel.excluir(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    res.status(200).json({ message: 'Funcionário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};