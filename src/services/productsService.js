const model = require('../models');

const doesProductExist = async (productId) => {
  const product = await model.productsModel.findById(productId);
  if (product) return true;
  return false;
};

const findAll = async () => {
  const products = await model.productsModel.findAll();
  return { message: products };
};

const findById = async (productId) => {
  if (!(await doesProductExist(productId))) {
    return { message: 'Product not found' };
  }
  const product = await model.productsModel.findById(productId);
  return { message: product };
};

module.exports = {
  findAll,
  findById,
};
