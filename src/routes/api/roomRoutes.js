const express = require('express');
const router = express.Router();
const RoomController = require('../../controllers/RoomController');

router.post('/', RoomController.criar);
router.get('/', RoomController.listar);
router.get('/:id', RoomController.buscarPorId);
router.put('/:id', RoomController.atualizar);
router.delete('/:id', RoomController.excluir);

module.exports = router;