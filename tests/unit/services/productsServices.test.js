const sinon = require("sinon");
const { expect } = require("chai");

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsList, correctProductInsert } = require('./productsServices.mocks');

describe('PRODUCTS SERVICE', function () {
  describe('Testando operação findAll (listar todos produtos)', function () {
    it('se lista todos os produtos corretamente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList);
      const result = await productsService.findAll();
      expect(result.message).to.be.deep.equal(productsList);
      sinon.restore();
    })
  })
  describe('Testando operação  findById (listar por id)', function () {
    afterEach(function () {
      sinon.restore();
    })
    it('se não é possível listar um produto que não existe', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined)

      const result = await productsService.findById(9999);

      expect(result.message).to.equal("Product not found");
    });
    it('se é possível encontrar um produto existente por id', async function () {
      sinon.stub(productsModel, 'findById').resolves(productsList[0]);

      const result = await productsService.findById(1);

      expect(result.message).to.deep.equal(productsList[0]);
    });
  })
  describe('Testando operação insert (inserir um novo produto)', function () {
    it('é possível cadastrar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'insert').resolves(correctProductInsert);

      const result = await productsService.insert({ name: correctProductInsert.name })

      expect(result.message).to.be.deep.equal(correctProductInsert);
    });
    it("não é possível realizar operações em um produto sem o campo name", async function () {
      const result = await productsService.insert({ modelo: "modeloX" });

      expect(result.message).to.be.deep.equal('"name" is required');
    });
    it("não é possível realizar operações em um produto com o campo name menor que 5 caracteres", async function () {
      const result = await productsService.insert({ name: "x" });

      expect(result.message).to.be.deep.equal('"name" length must be at least 5 characters long');
    });
  })
})
