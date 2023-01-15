const service = require('../services');

const findAll = async (_req, res) => {
  const { message } = await service.productsService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { params: { id } } = req;

  const response = await service.productsService.findById(id);

  if (response.type) {
    return res.status(404).json(response.message);
  }

  return res.status(200).json(response.message);
 };

module.exports = {
  findAll,
  findById,
};
