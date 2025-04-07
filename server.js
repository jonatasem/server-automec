// Importa o framework Express
const express = require('express');
// Importa o middleware CORS para permitir requisições de outros domínios
const cors = require('cors');
// Importa o middleware de tratamento de erros
const errorHandler = require('./middlewares/errorHandler');
// Importa as rotas de produtos
const productRoutes = require('./routes/productRoutes');
// Importa as rotas de clientes
const clientRoutes = require('./routes/clientRoutes');
// Importa as rotas de vendas
const salesRoutes = require('./routes/salesRoutes');
// Importa a instância do Firestore
const db = require('./config/db');

// Cria uma instância do Express
const app = express();
// Define a porta do servidor
const PORT = process.env.PORT || 5000;

// Usa o middleware CORS
app.use(cors());
// Permite que o Express entenda JSON no corpo das requisições
app.use(express.json());

// # Definição das rotas

// Rotas de produtos
app.use('/api/produtos', productRoutes(db));
// Rotas de clientes
app.use('/api/clientes', clientRoutes(db));
// Rotas de vendas
app.use('/api/vendas', salesRoutes(db)); 
// Middleware para tratamento de erros
app.use(errorHandler);

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});