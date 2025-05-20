// routes/index.js
const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');
const EmployeeController = require('../controllers/EmployeeController');
const RoomController = require('../controllers/RoomController');


// Rotas Booking
router.post('/bookings', BookingController.criarBooking);
router.get('/bookings', BookingController.listarBookings);
router.put('/bookings/:id', BookingController.editarBooking);
router.delete('/bookings/:id', BookingController.excluirBooking);

// Rotas Employee
router.post('/employees', EmployeeController.criarEmployee);
router.get('/employees', EmployeeController.listarEmployees);
router.put('/employees/:id', EmployeeController.editarEmployee);
router.delete('/employees/:id', EmployeeController.excluirEmployee);

// Rotas Room
router.post('/rooms', RoomController.criarRoom);
router.get('/rooms', RoomController.listarRooms);
router.put('/rooms/:id', RoomController.editarRoom);
router.delete('/rooms/:id', RoomController.excluirRoom);

module.exports = router;