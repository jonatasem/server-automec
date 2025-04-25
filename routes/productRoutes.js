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
      res.status(200).json(products);
    } catch (error) {
      next(error); 
    }
  });

  // Rota para criar um novo produto
  router.post('/', async (req, res, next) => {
    try {
      const productData = req.body;
      const newProduct = await createProduct(db, productData);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  });

  // Rota para atualizar um produto existente
  router.put('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id;
      const productData = req.body;
      const updatedProduct = await updateProduct(db, productId, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  });

  // Rota para deletar um produto
  router.delete('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; 
      await deleteProduct(db, productId); 
      res.status(204).send(); 
    } catch (error) {
      next(error); 
    }
  });

  return router; 
};