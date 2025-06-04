const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

// Rotas para páginas (views)
router.get('/', EmployeeController.listarEmployeesView);
router.get('/form', EmployeeController.formEmployeeView);
router.get('/form/:id', EmployeeController.formEmployeeView);

module.exports = router;