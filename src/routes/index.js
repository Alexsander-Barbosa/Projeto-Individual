const express = require('express');
const router = express.Router();

// Importa rotas da API
const employeeApiRoutes = require('./api/employeeRoutes');
const roomApiRoutes = require('./api/roomRoutes');
const bookingApiRoutes = require('./api/bookingRoutes');

// Importa rotas das páginas (views)
const employeePageRoutes = require('./pages/employeePageRoutes');
const roomPageRoutes = require('./pages/roomPageRoutes');
const bookingPageRoutes = require('./pages/bookingPageRoutes');

// Usa as rotas API com prefixo /api
router.use('/api/employees', employeeApiRoutes);
router.use('/api/rooms', roomApiRoutes);
router.use('/api/bookings', bookingApiRoutes);

// Usa as rotas das páginas sem prefixo ou com prefixo para páginas
router.use('/employees', employeePageRoutes);
router.use('/rooms', roomPageRoutes);
router.use('/bookings', bookingPageRoutes);

module.exports = router;