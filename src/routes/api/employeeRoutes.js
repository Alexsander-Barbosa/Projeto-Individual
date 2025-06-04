const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

// API endpoints
router.post('/', EmployeeController.criar);
router.get('/', EmployeeController.listar);
router.get('/:id', EmployeeController.buscarPorId);
router.put('/:id', EmployeeController.atualizar);
router.delete('/:id', EmployeeController.excluir);

module.exports = router;