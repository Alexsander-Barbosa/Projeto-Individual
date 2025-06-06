const express = require('express');
const router = express.Router();
const RoomController = require('../../controllers/RoomController');

router.get('/', RoomController.listarRoomsView);

module.exports = router;