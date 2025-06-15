const express = require('express');
const router = express.Router();
const BookingController = require('../../controllers/BookingController');

router.get('/', BookingController.listarBookingsView);
router.get('/form', BookingController.formBookingView);
router.get('/form/:id', BookingController.formBookingView);

module.exports = router;