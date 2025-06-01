const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/config/db');
const routes = require('./src/routes/index');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(cors());
app.use(bodyParser.json());

app.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    const horaAtual = result.rows[0].now;
    res.render('index', { hora: horaAtual });
  } catch (err) {
    res.status(500).send('Erro ao conectar com o banco.');
  }
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});