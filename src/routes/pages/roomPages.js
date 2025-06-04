const express = require('express');
const router = express.Router();
const RoomController = require('../../controllers/RoomController');

router.get('/', RoomController.listarRoomsView);
router.get('/form', RoomController.formRoomView);
router.get('/form/:id', RoomController.formRoomView);

module.exports = router;