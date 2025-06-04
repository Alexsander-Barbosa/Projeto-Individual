const express = require('express');
const router = express.Router();
const BookingController = require('../../controllers/BookingController');

router.post('/', BookingController.criar); // Corrigido
router.get('/', BookingController.listar); // Corrigido
router.get('/:id', BookingController.buscarPorId); // Adicionado para API
router.put('/:id', BookingController.atualizar); // Corrigido
router.delete('/:id', BookingController.excluir); // Corrigido

module.exports = router;