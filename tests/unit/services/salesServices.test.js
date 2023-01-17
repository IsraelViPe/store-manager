const sinon = require("sinon");
const { expect } = require("chai");

const { salesModel, salesProductsModel, productsModel } = require("../../../src/models");
const { salesServices } = require("../../../src/services");
const { correctSaleInsert, insertSaleResponse, incorrectSaleInsert, productsList } = require("./servicesMocks");

describe('SALES SERVICE', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('Validando a criação de uma nova venda (FALHA)', function () {

    it(`não é possível realizar operações em uma venda com o campo "productId"
    inexistente, em uma requisição com um único items`, async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList)

      const result = await salesServices.createSale([{productId: 9999, quantity: 5}]);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal("Product not found");
    })

    it(`não é possível realizar operações em uma venda com o campo "productId"
    inexistente, em uma requisição com vários items `, async function () {
      sinon.stub(productsModel, "findAll").resolves(productsList);

      const result = await salesServices.createSale(incorrectSaleInsert);

      expect(result.type).to.be.equal("NOT_FOUND");
      expect(result.message).to.be.equal("Product not found");
    });
  })
  describe("Validando a criação de uma nova venda (SUCESSO)", function () {
    it("é possível cadastrar uma venda com sucesso", async function () {
      sinon.stub(productsModel, "findAll").resolves(productsList);
      sinon.stub(salesModel, "insert").resolves(3);
      sinon
        .stub(salesProductsModel, "insert")
        .onFirstCall()
        .resolves(1)
        .onSecondCall()
        .resolves(2);
      sinon.stub(salesProductsModel, "findById").resolves(correctSaleInsert);

      const result = await salesServices.createSale(correctSaleInsert);

      expect(result.message).to.be.deep.equal(insertSaleResponse);
    });
  });
})
