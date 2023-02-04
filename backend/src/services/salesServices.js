const camelize = require('camelize');
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

const updateById = async (saleId, infoToUpdate) => {
  let error = await validateIdSale(saleId);
  if (error.type) return error;

  error = await saleIsValid(infoToUpdate);
  if (error.type) return error;

  const infoToSelect = await model.salesProductsModel.findById(saleId);

  if (infoToSelect) {
    await Promise.all(infoToUpdate.map(
      async (info, index) => model.salesProductsModel
        .updateById(saleId, info, camelize(infoToSelect[index])),
    ));
  } else {
  return { type: 'INTERNAL_SERVER_ERROR', message: 'internal server error' };
  }
  const response = {
    saleId,
    itemsUpdated: infoToUpdate,
  };
  return { type: null, message: response };
};

module.exports = {
  createSale,
  findAll,
  findById,
  deleteById,
  updateById,
};
