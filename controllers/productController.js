  // Função para buscar todos os produtos
const getProducts = async (db) => {
  try {
    const productsSnapshot = await db.collection('products').get(); 
    // Busca todos os produtos
    const products = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    // Mapeia os dados dos produtos
    return products; 
    // Retorna os produtos
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar produtos' }; 
    // Captura erros
  }
};

// Função para criar um produto
const createProduct = async (db, productData) => {
  try {
    const { nome, descricao, preco, quantidade = 1 } = productData; 

    // Valida que todos os campos necessários estão presentes
    if (!nome || !descricao || typeof preco !== 'number' || typeof quantidade !== 'number') {
      throw { status: 400, message: 'Nome, descrição, preço e quantidade são obrigatórios' };
    }

    // Verifica se o produto já existe pelo nome
    const existingProductQuery = await db.collection('products').where('nome', '==', nome).get();
    if (!existingProductQuery.empty) {
      // Se o produto já existe, atualiza a quantidade somando a nova quantidade
      const existingProduct = existingProductQuery.docs[0];
      const newQuantity = (existingProduct.data().quantidade || 0) + quantidade; 
      // Incrementa a quantidade
      await db.collection('products').doc(existingProduct.id).update({ quantidade: newQuantity });
      return { id: existingProduct.id, nome, descricao, preco, quantidade: newQuantity }; 
      // Retorna os dados atualizados
    }

    // Se não existe, cria um novo produto
    const productRef = await db.collection('products').add({
      nome,
      descricao,
      preco,
      quantidade 
      // Inicializa a quantidade conforme fornecida
    });

    return { id: productRef.id, nome, descricao, preco, quantidade }; 
    // Retorna os dados do novo produto
  } catch (error) {
    throw { status: 500, message: 'Erro ao criar produto' }; 
  }
};

// Função para atualizar um produto
const updateProduct = async (db, productId, productData) => {
  try {
    const { nome, descricao, preco, quantidade } = productData; 

    const updatedData = {};
    if (nome) updatedData.nome = nome;
    if (descricao) updatedData.descricao = descricao;
    if (typeof preco === 'number') updatedData.preco = preco;
    if (typeof quantidade === 'number') updatedData.quantidade = quantidade;
    await db.collection('products').doc(productId).update(updatedData);
    return { id: productId, ...updatedData }; 
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar produto' }; 
  }
};

// Função para deletar um produto
const deleteProduct = async (db, productId) => {
  try {
    await db.collection('products').doc(productId).delete(); 
    return { message: 'Produto deletado com sucesso' }; 
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar produto' }; 
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };