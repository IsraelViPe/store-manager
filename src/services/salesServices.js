const camelize = require('camelize');
const { salesServices } = require('.');
const model = require('../models');

const { saleIsValid, validateIdSale } = require('./validations/sales.validation');

const findAll = async () => {
  const salesList = await model.salesModel.findAll();
  if (!salesList) return { type: 'INTERNAL_SERVER_ERROR', message: 'internal server error' };
  return { type: null, message: salesList };
};

const findById = async (saleId) => {
  const error = await validateIdSale(saleId);
  if (error.type) return error;

  const sale = await model.salesModel.findById(saleId);

  return { type: null, message: sale };
};

const createSale = async (saleInfo) => {
  const error = await saleIsValid(saleInfo);
  if (error.type) return error;

  const saleId = await model.salesModel.insert();

  await Promise.all(saleInfo.map(
    async (info) => model.salesProductsModel.insert({ saleId, ...info }),
  ));

  const itemsSold = saleInfo;

  const response = { id: saleId, itemsSold };

  return { type: null, message: camelize(response) };
};

const deleteById = async (saleId) => {
  const error = await validateIdSale(saleId);
  if (error.type) return error;

  const response = await model.salesModel.deleteById(saleId);

  if (response.affectedRows === 0) {
    return { type: 'INTERNAL_SERVER_ERROR', message: 'internal server error' };
  }

  return { type: null, message: '' };
};

module.exports = {
  createSale,
  findAll,
  findById,
  deleteById,
};
