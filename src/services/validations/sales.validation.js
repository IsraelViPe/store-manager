const { productsModel } = require('../../models');

const saleIsValid = async (saleInfo) => {
  const allProduct = await productsModel.findAll();

  const allProductsIdsInDB = allProduct.map(({ id }) => id);

  const allProductIdExists = saleInfo.every(({ productId }) => allProductsIdsInDB
    .includes(productId));

  if (!allProductIdExists) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  saleIsValid,
};
