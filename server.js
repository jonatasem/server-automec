require('dotenv').config(); // Carregando variáveis de ambiente

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000; // Definindo a porta como 5000

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
