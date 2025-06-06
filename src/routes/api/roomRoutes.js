const express = require('express');
const router = express.Router();
const RoomController = require('../../controllers/RoomController');

router.get('/', RoomController.listar);
router.get('/:id', RoomController.buscarPorId);

module.exports = router;