const createSale = async (db, saleData) => {
  // Função para criar uma nova venda
  try {
    const { clientId, products } = saleData; // Desestrutura os dados da venda
    const clientDoc = await db.collection('clientes').doc(clientId).get();
    if (!clientDoc.exists) {
      throw { status: 400, message: 'Cliente não encontrado' }; // Lança um erro se o cliente não existir
    }

    let totalSaleValue = 0;
    const productsDetails = []; // Array para armazenar detalhes dos produtos

    for (const productId of products) {
      const productDoc = await db.collection('products').doc(productId).get();
      if (productDoc.exists) {
        const productData = productDoc.data();
        productsDetails.push({
          id: productDoc.id,
          nome: productData.nome,
          quantidade: 1, // Para simplicidade, assume-se uma quantidade de 1
          preco_unitario: productData.preco,
          valor_total: productData.preco,
        });
        totalSaleValue += productData.preco;
      } else {
        throw { status: 400, message: `Produto com ID ${productId} não encontrado` };
      }
    }

    const saleRef = await db.collection('vendas').add({
      clientId,
      products: productsDetails,
      totalValue: totalSaleValue,
      createdAt: new Date(),
    });

    return { id: saleRef.id, clientId, products: productsDetails, totalValue: totalSaleValue };
  } catch (error) {
    throw { status: 500, message: 'Erro ao criar venda' };
  }
};

const getSales = async (db) => {
  // Função para obter todas as vendas
  try {
    const salesSnapshot = await db.collection('vendas').get();
    const sales = salesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return sales;
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar vendas' };
  }
};

const updateSale = async (db, saleId, saleData) => {
  // Função para atualizar uma venda existente
  try {
    const saleRef = db.collection('vendas').doc(saleId);
    const saleDoc = await saleRef.get();

    if (!saleDoc.exists) {
      throw { status: 404, message: 'Venda não encontrada' }; // Lança um erro se a venda não existir
    }

    await saleRef.update(saleData); // Atualiza a venda com os novos dados
    return { id: saleId, ...saleData }; // Retorna os dados atualizados
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar venda' };
  }
};

const deleteSale = async (db, saleId) => {
  // Função para deletar uma venda
  try {
    const saleRef = db.collection('vendas').doc(saleId);
    const saleDoc = await saleRef.get();

    if (!saleDoc.exists) {
      throw { status: 404, message: 'Venda não encontrada' }; // Lança um erro se a venda não existir
    }

    await saleRef.delete(); // Deleta a venda
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar venda' };
  }
};

module.exports = { createSale, getSales, updateSale, deleteSale }; // Exporta as funções