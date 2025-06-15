const express = require('express');
const router = express.Router();

const employeeApiRoutes = require('./api/employeeRoutes');
const roomApiRoutes = require('./api/roomRoutes');
const bookingApiRoutes = require('./api/bookingRoutes');

const employeePageRoutes = require('./pages/employeePageRoutes');
const roomPageRoutes = require('./pages/roomPageRoutes');
const bookingPageRoutes = require('./pages/bookingPageRoutes');

router.use('/api/employees', employeeApiRoutes);
router.use('/api/rooms', roomApiRoutes);
router.use('/api/bookings', bookingApiRoutes);

router.use('/employees', employeePageRoutes);
router.use('/rooms', roomPageRoutes);
router.use('/bookings', bookingPageRoutes);

module.exports = router;