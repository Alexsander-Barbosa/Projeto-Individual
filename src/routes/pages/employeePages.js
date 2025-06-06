const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

// Rotas para páginas (views)
router.get('/', EmployeeController.listarEmployeesView);

module.exports = router;