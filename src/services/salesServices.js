const camelize = require('camelize');
const model = require('../models');

const { saleIsValid } = require('./validations/sales.validation');

const createSale = async (saleInfo) => {
  const error = await saleIsValid(saleInfo);
  if (error.type) return error;

  const saleId = await model.salesModel.insert();

  await Promise.all(saleInfo.map(
    async (info) => model.salesProductsModel.insert({ saleId, ...info }),
  ));

  const itemsSold = saleInfo;

  console.log(itemsSold, 'item sold');

  const response = { id: saleId, itemsSold };

  return { type: null, message: camelize(response) };
};

module.exports = {
  createSale,
};
