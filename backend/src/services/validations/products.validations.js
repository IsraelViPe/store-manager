const { addProductSchema } = require('./schema');
const { productsModel } = require('../../models');

const doesProductExist = async (productId) => {
  const product = await productsModel.findById(productId);
  if (product) return true;
  return false;
};

const validationNewProduct = (productInfo) => {
  const { error } = addProductSchema.validate(productInfo);

  if (error) {
    const joiTypeError = error.details[0].type;
    const msgTypeError = joiTypeError === 'any.required' ? 'BAD_REQUEST' : 'UNPROCESSABLE_ENTITY';
    return { type: msgTypeError, message: error.message };
  }

  return { type: null, message: '' };
};

module.exports = {
  validationNewProduct,
  doesProductExist,
};
