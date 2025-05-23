const express = require('express');
const router = express.Router();

const employeeRoutes = require('./employeeRoutes');
const roomRoutes = require('./roomRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use(employeeRoutes);
router.use(roomRoutes);
router.use(bookingRoutes);

module.exports = router;