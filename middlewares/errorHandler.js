const errorHandler = (err, req, res, next) => {
  // Middleware para tratar erros
  console.error(err.stack); // Loga o erro no console
  res.status(err.status || 500).json({ // Retorna a resposta com o status e a mensagem de erro
    message: err.message || 'Erro interno do servidor',
  });
};

module.exports = errorHandler; // Exporta o middleware