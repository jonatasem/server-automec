const express = require('express'); // Importa o Express
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController'); // Importa as funções do controlador de produtos

const router = express.Router(); // Cria um roteador

module.exports = (db) => {
  // Rota para listar todos os produtos
  router.get('/', async (req, res, next) => {
    try {
      const products = await getProducts(db); // Chama a função para obter produtos
      res.json(products); // Retorna os produtos em formato JSON
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para criar um novo produto
  router.post('/', async (req, res, next) => {
    try {
      const productData = req.body; // Obtém os dados do produto do corpo da requisição
      const newProduct = await createProduct(db, productData); // Chama a função para criar o produto
      res.status(201).json(newProduct); // Retorna o produto criado
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para atualizar um produto existente
  router.put('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; // Obtém o ID do produto da URL
      const productData = req.body; // Obtém os dados do produto do corpo da requisição
      const updatedProduct = await updateProduct(db, productId, productData); // Chama a função para atualizar o produto
      res.json(updatedProduct); // Retorna os dados atualizados do produto
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para deletar um produto
  router.delete('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; // Obtém o ID do produto da URL
      const result = await deleteProduct(db, productId); // Chama a função para deletar o produto
      res.json(result); // Retorna a mensagem de sucesso
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento de erros
    }
  });

  return router; // Retorna o roteador
};