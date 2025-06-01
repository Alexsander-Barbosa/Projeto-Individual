const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');
const RoomController = require('../controllers/RoomController');
const BookingController = require('../controllers/BookingController');

router.post('/employees', EmployeeController.criar);
router.get('/employees', EmployeeController.listar);
router.get('/employees/:id', EmployeeController.buscarPorId);
router.put('/employees/:id', EmployeeController.atualizar);
router.delete('/employees/:id', EmployeeController.excluir);

router.post('/rooms', RoomController.criar);
router.get('/rooms', RoomController.listar);
router.get('/rooms/:id', RoomController.buscarPorId);
router.put('/rooms/:id', RoomController.atualizar);
router.delete('/rooms/:id', RoomController.excluir);

router.post('/bookings', BookingController.criar);
router.get('/bookings', BookingController.listar);
router.get('/bookings/:id', BookingController.buscarPorId);
router.put('/bookings/:id', BookingController.atualizar);
router.delete('/bookings/:id', BookingController.excluir);

module.exports = router;