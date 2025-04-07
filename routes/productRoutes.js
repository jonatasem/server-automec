// Importa o Express para as rotas de produtos
const express = require('express');
// Importa as funções do controlador de produtos
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

// Cria um roteador para as rotas de produtos
const router = express.Router(); 

// Exporta as rotas de produtos
module.exports = (db) => {
  
  // Rota para obter todos os produtos
  router.get('/', async (req, res, next) => {
    try {
      const products = await getProducts(db); 
      // Chama a função para obter todos os produtos
      res.status(200).json(products);
      // Retorna os produtos com status 200
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para criar um novo produto
  router.post('/', async (req, res, next) => {
    try {
      const productData = req.body; 
      // Obtém os dados do produto do corpo da requisição
      const newProduct = await createProduct(db, productData); 
      // Chama a função para criar o novo produto
      res.status(201).json(newProduct); 
      // Retorna o produto criado com status 201
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para atualizar um produto existente
  router.put('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; 
      // Obtém o ID do produto a ser atualizado
      const productData = req.body; 
      // Obtém os dados do produto do corpo da requisição
      const updatedProduct = await updateProduct(db, productId, productData); 
      // Chama a função para atualizar o produto
      res.status(200).json(updatedProduct); 
      // Retorna o produto atualizado com status 200
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  // Rota para deletar um produto
  router.delete('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; 
      // Obtém o ID do produto a ser deletado
      await deleteProduct(db, productId); 
      // Chama a função para deletar o produto
      res.status(204).send(); 
      // Retorna um status 204 sem conteúdo
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  return router; 
  // Retorna o roteador para uso nas rotas de produtos
};