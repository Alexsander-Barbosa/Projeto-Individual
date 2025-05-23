const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');

router.post('/employees', EmployeeController.criarEmployee);
router.get('/employees', EmployeeController.listarEmployees);
router.put('/employees/:id', EmployeeController.editarEmployee);
router.delete('/employees/:id', EmployeeController.excluirEmployee);

module.exports = router;