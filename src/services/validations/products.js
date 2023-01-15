const { addProductSchema } = require('./schema');

const validationNewProduct = (productInfo) => {
  const { error } = addProductSchema.validate(productInfo);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validationNewProduct,
};
