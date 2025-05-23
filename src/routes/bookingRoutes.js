const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/BookingController');

router.post('/bookings', BookingController.criarBooking);
router.get('/bookings', BookingController.listarBookings);
router.put('/bookings/:id', BookingController.editarBooking);
router.delete('/bookings/:id', BookingController.excluirBooking);

module.exports = router;