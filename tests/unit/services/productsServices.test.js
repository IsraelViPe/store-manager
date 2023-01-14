const sinon = require("sinon");
const { expect } = require("chai");

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsList } = require('./productsServices.mocks');

describe('PRODUCTS SERVICE', function () {
  describe('Testando método findAll', function () {
    it('se lista todos os produtos corretamente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList);
      const result = await productsService.findAll();
      expect(result).to.be.deep.equal(productsList);
      sinon.restore();
    })
  })
  describe('Testando busca por id', function () {
    afterEach(function () {
      sinon.restore();
    })
    it('se não é possível listar um produto que não existe', async function () {
      const result = await productsService.findById(9999);
      expect(result.message).to.equal("Product not found");
    });
    it('se é possível encontrar um produto existente por id', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsList[0]);
      const result = await productsService.findById(1);
      expect(result).to.deep.equal(productsList[0]);
    });
  })
})
