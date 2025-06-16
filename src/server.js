const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const apiEmployeeRoutes = require('./routes/api/employeeRoutes');
const apiRoomRoutes = require('./routes/api/roomRoutes');
const apiBookingRoutes = require('./routes/api/bookingRoutes');
const pagesEmployeeRoutes = require('./routes/pages/employeePages');
const pagesRoomRoutes = require('./routes/pages/roomPages');
const pagesBookingRoutes = require('./routes/pages/bookingPages');

app.get('/', (req, res) => {
  res.redirect('/bookings');
});

app.use('/api/employees', apiEmployeeRoutes);
app.use('/api/rooms', apiRoomRoutes);
app.use('/api/bookings', apiBookingRoutes);

app.use('/employees', pagesEmployeeRoutes);
app.use('/rooms', pagesRoomRoutes);
app.use('/bookings', pagesBookingRoutes);

app.use((err, req, res, next) => {
  console.error('ERRO GLOBAL NÃO TRATADO:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Ocorreu um erro inesperado no servidor.',
      status: err.status || 500
    }
  });
});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});