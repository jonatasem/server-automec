const createSale = async (db, saleData) => {
  try {
    const { clienteId, data_emissao, data_faturamento, forma_pagamento, status, produtos } = saleData;

    const clientDoc = await db.collection('clientes').doc(clienteId).get();
    if (!clientDoc.exists) {
      console.error("Cliente não encontrado:", clienteId); // Log para erro específico
      throw { status: 400, message: 'Cliente não encontrado' };
    }

    const productsDetails = [];
    let totalSaleValue = 0;

    for (const product of produtos) {
      const productDoc = await db.collection('products').doc(product.id).get();
      if (productDoc.exists) {
        const productData = productDoc.data();
        const valor_total = product.preco_unitario * product.quantidade;

        productsDetails.push({
          id: productDoc.id,
          descricao: product.descricao,
          quantidade: product.quantidade,
          preco_unitario: product.preco_unitario,
          valor_total: valor_total
        });

        totalSaleValue += valor_total;
      } else {
        console.error("Produto não encontrado:", product.id); // Log para erro específico
        throw { status: 400, message: `Produto com ID ${product.id} não encontrado` };
      }
    }

    const saleRef = await db.collection('vendas').add({
      clienteId,
      data_emissao,
      data_faturamento,
      forma_pagamento,
      status,
      produtos: productsDetails,
      valor_total: totalSaleValue,
      createdAt: new Date()
    });

    return {
      id: saleRef.id,
      clienteId,
      data_emissao,
      data_faturamento,
      forma_pagamento,
      status,
      produtos: productsDetails,
      valor_total: totalSaleValue
    };
  } catch (error) {
    console.error("Erro ao criar venda:", error); // Log do erro
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