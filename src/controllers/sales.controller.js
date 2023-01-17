const service = require('../services');
const { httpErrorCode } = require('../utils/handleHTTPerror');

const createSale = async (req, res) => {
  const { type, message } = await service.salesServices.createSale(req.body);

  if (type) return res.status(httpErrorCode(type)).json({ message });

  return res.status(201).json(message);
};

module.exports = {
  createSale,
};
