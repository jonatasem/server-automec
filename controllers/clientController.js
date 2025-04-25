  // Função para buscar todos os clientes

const getClients = async (db) => {
  try {
    const clientsSnapshot = await db.collection('clientes').get(); 
    // Busca todos os clientes
    const clients = clientsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    // Mapeia os dados dos clientes
    return clients; 
    // Retorna os clientes
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar clientes' }; 
    // Captura erros
  }
};

// Função para criar um novo cliente
const createClient = async (db, clientData) => {
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

    const clientRef = await db.collection('clientes').add(clientData); 
    // Adiciona o cliente ao Firestore
    return { id: clientRef.id, ...clientData }; 

    
  } catch (error) {
    console.error('Erro ao criar cliente:', error); 
    throw { status: 500, message: 'Erro ao criar cliente' };
  }
};

// Função para atualizar um cliente existente
const updateClient = async (db, clientId, clientData) => {
  try {
    await db.collection('clientes').doc(clientId).update(clientData); 
    return { id: clientId, ...clientData }; 
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar cliente' }; 
  }
};

// Função para deletar um cliente
const deleteClient = async (db, clientId) => {
  try {
    await db.collection('clientes').doc(clientId).delete(); 
    return { message: 'Cliente deletado com sucesso' }; 
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar cliente' }; 
  }
};

module.exports = { getClients, createClient, updateClient, deleteClient }; 
