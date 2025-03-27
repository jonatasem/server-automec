const express = require('express'); // Importa o framework Express
const cors = require('cors'); // Importa o middleware CORS para permitir requisições de outros domínios
const errorHandler = require('./middlewares/errorHandler'); // Importa o middleware de tratamento de erros
const productRoutes = require('./routes/productRoutes'); // Importa as rotas de produtos
const clientRoutes = require('./routes/clientRoutes'); // Importa as rotas de clientes
const salesRoutes = require('./routes/salesRoutes'); // Importa as rotas de vendas
const db = require('./config/db'); // Importa a instância do Firestore

// Cria uma instância do Express
const app = express();
const PORT = process.env.PORT || 5000; // Define a porta do servidor

app.use(cors()); // Usa o middleware CORS
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições

// Definição das rotas
app.use('/api/produtos', productRoutes(db)); // Rotas de produtos
app.use('/api/clientes', clientRoutes(db)); // Rotas de clientes
app.use('/api/vendas', salesRoutes(db)); // Rotas de vendas

// Middleware para tratamento de erros
app.use(errorHandler); // Adiciona o middleware de tratamento de erros

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});