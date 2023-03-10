const service = require('../services');
const { httpErrorCode } = require('../utils/handleHTTPerror');

const findAll = async (_req, res) => {
  const { message } = await service.productsService.findAll();
  res.status(200).json(message);
};

const findById = async (req, res) => {
  const { params: { id } } = req;

  const response = await service.productsService.findById(id);

  if (response.type) {
    return res.status(404).json({ message: response.message });
  }

  return res.status(200).json(response.message);
};

const insert = async (req, res) => {
  const { type, message } = await service.productsService.insert(req.body);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(201).json(message);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.productsService.updateById(id, req.body);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(200).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.productsService.deleteById(id);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(204).end();
};

const searchByQuery = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await service.productsService.searchByQuery(q);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
  searchByQuery,
};
