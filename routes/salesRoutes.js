
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
      // Obtém os dados da venda do corpo da requisição
      const newSale = await createSale(db, saleData); 
      // Chama a função para criar a venda
      res.status(201).json(newSale); 
      // Retorna a nova venda criada
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para obter todas as vendas
  router.get('/', async (req, res, next) => {
    try {
      const sales = await getSales(db); 
      // Chama a função para obter as vendas
      res.status(200).json(sales); 
      // Retorna as vendas
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para atualizar uma venda existente
  router.put('/:id', async (req, res, next) => {
    try {
      const saleId = req.params.id; 
      // Obtém o ID da venda a ser atualizada
      const saleData = req.body; 
      // Obtém os dados da venda do corpo da requisição
      const updatedSale = await updateSale(db, saleId, saleData); 
      // Chama a função para atualizar a venda
      res.status(200).json(updatedSale); 
      // Retorna a venda atualizada
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para deletar uma venda
  router.delete('/:id', async (req, res, next) => {
    try {
      const saleId = req.params.id; 
      // Obtém o ID da venda a ser deletada
      await deleteSale(db, saleId); 
      // Chama a função para deletar a venda
      res.status(204).send(); 
      // Retorna um status 204 sem conteúdo
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  return router; 
  // Retorna o roteador
};