const getClients = async (db) => {
  // Função para buscar todos os clientes
  try {
    const clientsSnapshot = await db.collection('clientes').get(); // Busca todos os clientes
    const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeia os dados dos clientes
    return clients; // Retorna os clientes
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar clientes' }; // Captura erros
  }
};

const createClient = async (db, clientData) => {
  // Função para criar um novo cliente
  try {
    const { nome, endereco, documento } = clientData;
    
    // Verifica se os dados do cliente têm a estrutura correta
    if (!nome || !endereco || !documento) {
      throw { status: 400, message: 'Dados do cliente inválidos' };
    }

    // Aqui você pode validar ainda mais a estrutura do endereco e documento, se necessário
    if (!endereco.rua || !endereco.numero || !documento.cnpj_cpf) {
      throw { status: 400, message: 'Dados do endereço ou documento inválidos' };
    }

    const clientRef = await db.collection('clientes').add(clientData); // Adiciona o cliente ao Firestore
    return { id: clientRef.id, ...clientData }; // Retorna os dados do cliente criado
    
  } catch (error) {
    console.error('Erro ao criar cliente:', error); // Log do erro
    throw { status: 500, message: 'Erro ao criar cliente' };
  }
};

const updateClient = async (db, clientId, clientData) => {
  // Função para atualizar um cliente existente
  try {
    await db.collection('clientes').doc(clientId).update(clientData); // Atualiza os dados do cliente no Firestore
    return { id: clientId, ...clientData }; // Retorna os dados atualizados do cliente
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar cliente' }; // Captura erros
  }
};

const deleteClient = async (db, clientId) => {
  // Função para deletar um cliente
  try {
    await db.collection('clientes').doc(clientId).delete(); // Deleta o cliente do Firestore
    return { message: 'Cliente deletado com sucesso' }; // Retorna uma mensagem de sucesso
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar cliente' }; // Captura erros
  }
};

module.exports = { getClients, createClient, updateClient, deleteClient }; // Exporta as funções