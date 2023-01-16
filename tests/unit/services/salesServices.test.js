const sinon = require("sinon");
const { expect } = require("chai");

const { salesModel } = require("../../../src/models");
const { salesServices } = require("../../../src/services");
const { correctSaleInsert, insertSaleResponse } = require("./servicesMocks");

describe('SALES SERVICE', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('Validando a criação de uma nova venda (FALHA)', function () {
    it(`não é possível realizar operações em uma venda com o campo "productId"
    inexistente, em uma requisição com um único items`, async function () {

    })
    it(`não é possível realizar operações em uma venda com o campo "productId"
    inexistente, em uma requisição com vários items `, async function () {

    });
    describe.only("Validando a criação de uma nova venda (SUCESSO)", function () {
      it('é possível cadastrar uma venda com sucesso', async function () {
        sinon.stub(salesModel, 'insert').resolves(3);
        sinon.stub(salesProductsModel, 'insert')
          .onFirstCall()
          .resolves(1)
          .onSecondCall()
          .resolves(2)

        const result = await salesServices.createSale(correctSaleInsert);

        expect(result.message).to.be.deep.equal(insertSaleResponse);
      });
  });

  })
})
