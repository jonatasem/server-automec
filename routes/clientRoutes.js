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
      res.json(clients);
    } catch (error) {
      next(error);
    }
  });

  
  // Rota para criar um novo cliente
  router.post('/', async (req, res, next) => {
    try {
      const clientData = req.body;
      const newClient = await createClient(db, clientData);
      res.status(201).json(newClient);
    } catch (error) {
      next(error);
    }
  });

  
  // Rota para atualizar um cliente existente
  router.put('/:id', async (req, res, next) => {
    try {
      const clientId = req.params.id;
      const clientData = req.body;
      const updatedClient = await updateClient(db, clientId, clientData);
      res.json(updatedClient);
    } catch (error) {
      next(error);
    }
  });

  
  // Rota para deletar um cliente
  router.delete('/:id', async (req, res, next) => {
    try {
      const clientId = req.params.id;
      const result = await deleteClient(db, clientId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  });

  return router; 
};