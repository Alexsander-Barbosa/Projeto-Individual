const express = require('express');
const router = express.Router();
const RoomController = require('../controllers/RoomController');

router.post('/rooms', RoomController.criarRoom);
router.get('/rooms', RoomController.listarRooms);
router.put('/rooms/:id', RoomController.editarRoom);
router.delete('/rooms/:id', RoomController.excluirRoom);

module.exports = router;