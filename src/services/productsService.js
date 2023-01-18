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

const updateById = async (productId, productBody) => {
   const error = validationNewProduct(productBody);
  if (error.type) return error;

  if (!(await doesProductExist(productId))) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const response = await model.productsModel.updateById(productId, productBody);
  if (response.affectedRows === 0) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'internal server error' };
  }

    const updatedProduct = await model.productsModel.findById(productId);
    return { type: null, message: updatedProduct };
};

const deleteById = async (productId) => {
  if (!(await doesProductExist(productId))) {
    return { type: 'NOT_FOUND', message: 'Product not found' };
  }

  const response = await model.productsModel.deleteById(productId);

  if (response.affectedRows === 0) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'internal server error' };
  }
  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};
