const express = require('express');
const router = express.Router();
const BookingController = require('../../controllers/BookingController');

// Rotas para páginas (views)
router.get('/', BookingController.listarBookingsView);
router.get('/form', BookingController.formBookingView); // Formulário para criar
router.get('/form/:id', BookingController.formBookingView); // Formulário para editar

module.exports = router;