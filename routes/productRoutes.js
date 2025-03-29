const express = require('express');
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

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
      const productData = req.body; // Obtém os dados do produto do corpo da requisição
      const newProduct = await createProduct(db, productData); // Chama a função para criar ou atualizar o produto
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  });

  // Rota para atualizar um produto existente
  router.put('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; // Obtém o ID do produto a ser atualizado
      const productData = req.body; // Obtém os dados do produto do corpo da requisição
      const updatedProduct = await updateProduct(db, productId, productData);
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  });

  // Rota para deletar um produto
  router.delete('/:id', async (req, res, next) => {
    try {
      const productId = req.params.id; // Obtém o ID do produto a ser deletado
      await deleteProduct(db, productId);
      res.status(204).send(); // Retorna um status 204 sem conteúdo
    } catch (error) {
      next(error);
    }
  });

  return router; // Retorna o roteador
};
