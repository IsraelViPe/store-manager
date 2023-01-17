const model = require('../models');
const { validationNewProduct, doesProductExist } = require('./validations/products.validations');

const findAll = async () => {
  const products = await model.productsModel.findAll();
  return { type: null, message: products };
};

const findById = async (productId) => {
  if (!(await doesProductExist(productId))) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }
  const product = await model.productsModel.findById(productId);
  return { type: null, message: product };
};

const insert = async (productInfo) => {
  const error = validationNewProduct(productInfo);
  if (error.type) return error;

  const newProduct = await model.productsModel.insert(productInfo);
  return { type: null, message: newProduct };
};

module.exports = {
  findAll,
  findById,
  insert,
};
