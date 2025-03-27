const getProducts = async (db) => {
  // Função para buscar todos os produtos
  try {
    const productsSnapshot = await db.collection('products').get(); // Busca todos os produtos
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mapeia os dados dos produtos
    return products; // Retorna os produtos
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar produtos' }; // Captura erros
  }
};

const createProduct = async (db, productData) => {
  // Função para criar um novo produto
  try {
    const productRef = await db.collection('products').add(productData); // Adiciona o produto ao Firestore
    return { id: productRef.id, ...productData }; // Retorna os dados do produto criado
  } catch (error) {
    throw { status: 500, message: 'Erro ao criar produto' }; // Captura erros
  }
};

const updateProduct = async (db, productId, productData) => {
  // Função para atualizar um produto existente
  try {
    await db.collection('products').doc(productId).update(productData); // Atualiza os dados do produto no Firestore
    return { id: productId, ...productData }; // Retorna os dados atualizados do produto
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar produto' }; // Captura erros
  }
};

const deleteProduct = async (db, productId) => {
  // Função para deletar um produto
  try {
    await db.collection('products').doc(productId).delete(); // Deleta o produto do Firestore
    return { message: 'Produto deletado com sucesso' }; // Retorna uma mensagem de sucesso
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar produto' }; // Captura erros
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct }; // Exporta as funções