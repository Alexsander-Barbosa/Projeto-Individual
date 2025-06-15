const express = require('express');
const router = express.Router();
const EmployeeController = require('../../controllers/EmployeeController');

router.get('/', EmployeeController.listarEmployeesView);

module.exports = router;