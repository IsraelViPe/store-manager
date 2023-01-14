const { productsModel } = require('../models');

const doesProductExist = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return true;
  return false;
};

const findAll = async () => {
  const products = await productsModel.findAll();
  return { message: products };
};

const findById = async (productId) => {
  if (!(await doesProductExist(productId))) {
    return { message: 'Product not found' };
  }
  const product = await productsModel.findById(productId);
  return { message: product };
};

module.exports = {
  findAll,
  findById,
};
