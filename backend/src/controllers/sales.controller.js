const camelize = require('camelize');
const service = require('../services');
const { httpErrorCode } = require('../utils/handleHTTPerror');

const findAll = async (_req, res) => {
  const { type, message } = await service.salesServices.findAll();
  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(200).json(camelize(message));
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.salesServices.findById(id);

   if (type) return res.status(httpErrorCode(type)).json({ message });

   return res.status(200).json(camelize(message));
};

const createSale = async (req, res) => {
  const { type, message } = await service.salesServices.createSale(req.body);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(201).json(message);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await service.salesServices.deleteById(id);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(204).end();
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await service.salesServices.updateById(id, req.body);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(200).json(message);
};

module.exports = {
  createSale,
  findAll,
  findById,
  deleteById,
  updateById,
};
