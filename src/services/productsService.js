const { productsModel } = require('../models');

const findAll = async () => {
  const products = await productsModel.findAll();
  return products;
};

const findById = async (productId) => {
  const product = await productsModel.findById(productId);
  return product;
};

module.exports = {
  findAll,
  findById,
};
