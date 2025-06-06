const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

// API endpoints
router.get('/', EmployeeController.listar);
router.get('/:id', EmployeeController.buscarPorId);

module.exports = router;