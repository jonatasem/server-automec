// Função para criar uma nova venda
const createSale = async (db, saleData) => {
  try {
    // Desestrutura os dados da venda recebidos
    const { clienteId, data_emissao, data_faturamento, forma_pagamento, status, produtos } = saleData;
    // Verifica se o cliente existe no banco de dados
    const clientDoc = await db.collection('clientes').doc(clienteId).get();
    if (!clientDoc.exists) {
      console.error("Cliente não encontrado:", clienteId); 
      // Log para erro específico
      throw { status: 400, message: 'Cliente não encontrado' }; 
      // Lança erro se cliente não for encontrado
    }

    const productsDetails = []; 
    // Array para armazenar detalhes dos produtos
    let totalSaleValue = 0; 
    // Variável para armazenar o valor total da venda

    // Loop para processar cada produto na lista de produtos
    for (const product of produtos) {
      const productDoc = await db.collection('products').doc(product.id).get(); // Busca o produto no banco de dados

      if (productDoc.exists) {
        const productData = productDoc.data(); 
        // Obtém os dados do produto
        const valor_total = product.preco_unitario * product.quantidade; 
        // Calcula o valor total do produto

        // Adiciona os detalhes do produto ao array
        productsDetails.push({
          id: productDoc.id,
          descricao: productData.descricao, 
          // Obtém descrição do produto
          quantidade: product.quantidade, 
          // Armazena a quantidade
          preco_unitario: product.preco_unitario, 
          // Armazena o preço unitário
          valor_total: valor_total 
          // Armazena o valor total do produto
        });

        totalSaleValue += valor_total; 
        // Acumula o valor total da venda

      } else {
        console.error("Produto não encontrado:", product.id); 
        // Log para erro específico
        throw { status: 400, message: `Produto com ID ${product.id} não encontrado` }; 
        // Lança erro se produto não for encontrado
      }
    }

    // Adiciona a nova venda ao banco de dados
    const saleRef = await db.collection('vendas').add({
      clienteId,
      data_emissao,
      data_faturamento,
      forma_pagamento,
      status,
      produtos: productsDetails, 
      // Adiciona detalhes dos produtos
      valor_total: totalSaleValue, 
      // Adiciona o valor total da venda
      createdAt: new Date() 
      // Armazena a data de criação da venda
    });

    // Retorna os detalhes da nova venda criada
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
    console.error("Erro ao criar venda:", error); 
    // Log do erro
    throw { status: 500, message: 'Erro ao criar venda' }; 
    // Lança erro genérico em caso de falha
  }
};

// Função para obter todas as vendas
const getSales = async (db) => {
  try {
    const salesSnapshot = await db.collection('vendas').get();
    const sales = salesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return sales;
  } catch (error) {
    throw { status: 500, message: 'Erro ao buscar vendas' };
  }
};

// Função para atualizar uma venda existente
const updateSale = async (db, saleId, saleData) => {
  try {
    const saleRef = db.collection('vendas').doc(saleId); 
    const saleDoc = await saleRef.get(); 
    if (!saleDoc.exists) {
      throw { status: 404, message: 'Venda não encontrada' };
    }
    await saleRef.update(saleData); 
    return { id: saleId, ...saleData }; 
  } catch (error) {
    throw { status: 500, message: 'Erro ao atualizar venda' };
  }
};

// Função para deletar uma venda
const deleteSale = async (db, saleId) => {
  try {
    const saleRef = db.collection('vendas').doc(saleId); 
    const saleDoc = await saleRef.get();
    if (!saleDoc.exists) {
      throw { status: 404, message: 'Venda não encontrada' }; 
    }
    await saleRef.delete(); 
  } catch (error) {
    throw { status: 500, message: 'Erro ao deletar venda' };
  }
};

// Exporta as funções para serem utilizadas em outros módulos
module.exports = { createSale, getSales, updateSale, deleteSale };
