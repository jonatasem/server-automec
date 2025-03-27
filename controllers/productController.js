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
  try {
    const { id, nome, descricao, preco } = productData;

    // Valida que todos os campos necessários estão presentes
    if (!nome || !descricao || typeof preco !== 'number') {
      throw { status: 400, message: 'Nome, descrição e preço são obrigatórios' };
    }

    const productRef = await db.collection('products').add({
      nome,
      descricao,
      preco
    });

    return { id: productRef.id, nome, descricao, preco };
  } catch (error) {
    throw { status: 500, message: 'Erro ao criar produto' };
  }
};

const updateProduct = async (db, productId, productData) => {
  try {
    const { nome, descricao, preco } = productData; // Desestrutura os dados do produto

    // Valida que pelo menos um campo está presente para atualização
    if (!nome && !descricao && typeof preco !== 'number') {
      throw { status: 400, message: 'Pelo menos um dos campos nome, descrição ou preço deve ser fornecido' };
    }

    const updatedData = {};
    if (nome) updatedData.nome = nome;
    if (descricao) updatedData.descricao = descricao;
    if (typeof preco === 'number') updatedData.preco = preco;

    await db.collection('products').doc(productId).update(updatedData); // Atualiza os dados do produto no Firestore
    return { id: productId, ...updatedData }; // Retorna os dados atualizados do produto
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar produto' };
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