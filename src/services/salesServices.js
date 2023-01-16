const model = require('../models');

const createSale = async (saleInfo) => {
  const saleId = await model.salesModel.insert();

  await Promise.all(saleInfo.map(
    async (info) => model.salesProductsModel.insert(saleId, info),
  ));

  const itemsSold = await model.salesProductsModel.findById(saleId);

  const response = { id: saleId, itemsSold };

  return { type: null, message: response };
};

module.exports = {
  createSale,
};
