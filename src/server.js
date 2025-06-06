const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Adicionado para facilitar o path estático
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Caminho correto para o .env

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Caminho correto para as views

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Importante para formulários HTML
app.use(express.static(path.join(__dirname, 'public'))); // <--- CORRIGIDO AQUI: removeu o 'src' duplicado

// Importação das rotas
const apiEmployeeRoutes = require('./routes/api/employeeRoutes');
const apiRoomRoutes = require('./routes/api/roomRoutes');
const apiBookingRoutes = require('./routes/api/bookingRoutes');
const pagesEmployeeRoutes = require('./routes/pages/employeePages');
const pagesRoomRoutes = require('./routes/pages/roomPages');
const pagesBookingRoutes = require('./routes/pages/bookingPages');

// Redireciona / para a lista de funcionários ou uma página inicial geral
app.get('/', (req, res) => {
  res.redirect('/bookings');
});

// Rotas de API
app.use('/api/employees', apiEmployeeRoutes);
app.use('/api/rooms', apiRoomRoutes);
app.use('/api/bookings', apiBookingRoutes);

// Rotas para páginas (views)
app.use('/employees', pagesEmployeeRoutes);
app.use('/rooms', pagesRoomRoutes);
app.use('/bookings', pagesBookingRoutes);

// Middleware Global de Tratamento de Erros
// Este middleware deve ser o último app.use() antes do app.listen()
app.use((err, req, res, next) => {
  console.error('ERRO GLOBAL NÃO TRATADO:', err.stack); // Loga o stack trace completo do erro
  // Garante que a resposta seja JSON e envia a mensagem de erro
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