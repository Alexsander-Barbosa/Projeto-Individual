const express = require('express');
const router = express.Router();
const BookingController = require('../../controllers/BookingController');

router.post('/', BookingController.criar);
router.get('/', BookingController.listar);
router.get('/:id', BookingController.buscarPorId);
router.put('/:id', BookingController.atualizar);
router.delete('/:id', BookingController.excluir);

module.exports = router;