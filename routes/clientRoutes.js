// Importa o Express
const express = require('express');

// Importa as funções do controlador de clientes
const { getClients, createClient, updateClient, deleteClient } = require('../controllers/clientController'); 

// Cria um roteador
const router = express.Router(); 

module.exports = (db) => {

  // Rota para listar todos os clientes
  router.get('/', async (req, res, next) => {
    try {
      const clients = await getClients(db); 
      // Chama a função para obter clientes
      res.json(clients); 
      // Retorna os clientes em formato JSON
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para criar um novo cliente
  router.post('/', async (req, res, next) => {
    try {
      const clientData = req.body; 
      // Obtém os dados do cliente do corpo da requisição
      const newClient = await createClient(db, clientData); 
      // Chama a função para criar o cliente
      res.status(201).json(newClient); 
      // Retorna o cliente criado
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para atualizar um cliente existente
  router.put('/:id', async (req, res, next) => {
    try {
      const clientId = req.params.id; 
      // Obtém o ID do cliente da URL
      const clientData = req.body; 
      // Obtém os dados do cliente do corpo da requisição
      const updatedClient = await updateClient(db, clientId, clientData); 
      // Chama a função para atualizar o cliente
      res.json(updatedClient); 
      // Retorna os dados atualizados do cliente
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  
  // Rota para deletar um cliente
  router.delete('/:id', async (req, res, next) => {
    try {
      const clientId = req.params.id; 
      // Obtém o ID do cliente da URL
      const result = await deleteClient(db, clientId); 
      // Chama a função para deletar o cliente
      res.json(result); 
      // Retorna a mensagem de sucesso
    } catch (error) {
      next(error); 
      // Passa o erro para o middleware de tratamento de erros
    }
  });

  return router; 
  // Retorna o roteador
};