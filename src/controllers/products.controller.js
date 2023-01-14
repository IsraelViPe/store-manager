const service = require('../services');

const findAll = async (_req, res) => {
  const { message } = await service.productsService.findAll();
  res.status(200).json(message);
};

const findById = (productId) => { };

module.exports = {
  findAll,
  findById,
};
