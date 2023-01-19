const sinon = require("sinon");
const { expect } = require("chai");

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { productsList, correctProductInsert,
  updatedProduct, deleteResponse } = require('./servicesMocks');

describe('PRODUCTS SERVICE', function () {
    afterEach(function () {
      sinon.restore();
    });
  describe('Testando operação findAll (listar todos produtos)', function () {
    it('se lista todos os produtos corretamente', async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList);
      const result = await productsService.findAll();
      expect(result.message).to.be.deep.equal(productsList);
      sinon.restore();
    })
  })
  describe('Testando operação  findById (listar por id)', function () {
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
  describe('Testando operação de updateById (atualizar produto por id)', function () {
    it('não é possível alterar um produto que não existe', async function () {
      sinon
        .stub(productsModel, "updateById")
        .resolves({ type: "NOT_FOUND", message: "Product not found" });
      sinon.stub(productsModel, "findById").resolves(undefined);

      result = await productsService.updateById(9999, {
        name: "Martelo do Batman",
      });

      expect(result.type).to.be.equal("NOT_FOUND");
      expect(result.message).to.be.equal("Product not found");
    });
    it('é possível alterar um produto com sucesso', async function () {
      sinon.stub(productsModel, 'updateById').resolves(updatedProduct);
      sinon.stub(productsModel, 'findById').resolves(updatedProduct);

      result = await productsService.updateById(1, { name: 'Martelo do Batman' });

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.equal(updatedProduct);

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
  describe('Testando operação delete (excluir um produto da base)', function () {
    it('falha ao tentar excluir produto que não existe', async function () {
       sinon.stub(productsModel, 'findById').resolves(undefined)

      const result = await productsService.deleteById(9999);

      console.log(result.message);

       expect(result.message).to.be.deep.equal('Product not found');
    });
    // it('é possível deletar um produto com sucesso', async function () {
    //   sinon.stub(productsModel, 'deleteById').resolves([deleteResponse]);

    //   const result = await productsService.deleteById(3);

    //   expect(result.message).to.be.equal('');
    // });
  })
})
