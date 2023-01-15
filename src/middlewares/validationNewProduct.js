const Joi = require('joi');

const addProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const validationNewProduct = (productInfo) => {
  const { error } = addProductSchema.validate(productInfo);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validationNewProduct,
};
