
// Importa o Express
const express = require('express');

// Importa as funções do controlador de vendas
const { createSale, getSales, updateSale, deleteSale } = require('../controllers/salesController'); 

const router = express.Router(); 
// Cria um roteador

// Exporta as rotas
module.exports = (db) => {
  
  // Rota para criar uma nova venda
  router.post('/', async (req, res, next) => {
    try {
      const saleData = req.body; 
      const newSale = await createSale(db, saleData); 
      res.status(201).json(newSale); 
    } catch (error) {
      next(error); 
    }
  });

  
  // Rota para obter todas as vendas
  router.get('/', async (req, res, next) => {
    try {
      const sales = await getSales(db);
      res.status(200).json(sales);
    } catch (error) {
      next(error); 
    }
  });

  
  // Rota para atualizar uma venda existente
  router.put('/:id', async (req, res, next) => {
    try {
      const saleId = req.params.id;
      const saleData = req.body;
      const updatedSale = await updateSale(db, saleId, saleData); 
      res.status(200).json(updatedSale); 
    } catch (error) {
      next(error); 
    }
  });

  
  // Rota para deletar uma venda
  router.delete('/:id', async (req, res, next) => {
    try {
      const saleId = req.params.id; 
      await deleteSale(db, saleId); 
      res.status(204).send(); 
    } catch (error) {
      next(error); 
    }
  });

  return router; 
};