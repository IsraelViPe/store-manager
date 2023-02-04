const { productsModel, salesModel } = require('../../models');

const saleIsValid = async (saleInfo) => {
  const allProduct = await productsModel.findAll();

  const allProductsIdsInDB = allProduct.map(({ id }) => id);

  const allProductIdExists = saleInfo.every(({ productId }) => allProductsIdsInDB
    .includes(productId));


  if (!allProductIdExists) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

const doesSalesExist = async (saleId) => {
  const sale = await salesModel.findById(saleId);
  if (sale && sale.length !== 0) return true;
  return false;
};

const validateIdSale = async (saleId) => {
  if (!(await doesSalesExist(saleId))) {
    return { type: 'NOT_FOUND', message: 'Sale not found' };
  }
  return { type: null, message: '' };
  };

module.exports = {
  saleIsValid,
  validateIdSale,

};
