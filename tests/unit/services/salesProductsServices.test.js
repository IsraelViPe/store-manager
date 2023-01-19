const sinon = require("sinon");
const { expect } = require("chai");

const {
  salesModel,
  salesProductsModel,
  productsModel,
} = require("../../../src/models");
const { salesServices } = require("../../../src/services");
const {updateResponse, correctSaleInsert, infoToUpdateSale, updatedSale} = require("./servicesMocks");

describe('SALES_PRODUCTS SERVICE', function () {
  describe('Validando a atualização das informaçoes de uma venda', function () {
    it('falha ao tentar atualizar uma venda não existente no banco', async function () {

    });
    // it('é possível atualizar uma venda com sucesso', async function () {
    //   sinon.stub(salesProductsModel, 'findById').resolves(correctSaleInsert);
    //   sinon.stub(salesProductsModel, 'updateById')
    //     .onFirstCall()
    //     .resolves(updateResponse)
    //     .onSecondCall()
    //     .resolves(updateResponse);

    //   const result = await salesServices.updateById(1, infoToUpdateSale);

    //   expect(result.type).to.be.equal(null);
    //   expect(result.message).to.be.deep.equal(updatedSale)
    // });
  })
})
