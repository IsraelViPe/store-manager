const { addProductSchema } = require('./schema');

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
};
