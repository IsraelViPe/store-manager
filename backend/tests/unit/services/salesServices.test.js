const sinon = require("sinon");
const { expect } = require("chai");

const { salesModel, salesProductsModel, productsModel } = require("../../../src/models");
const { salesServices } = require("../../../src/services");
const {
  correctSaleInsert,
  insertSaleResponse,
  incorrectSaleInsert,
  productsList,
  salesList,
  responseFindSaleById,
  deleteResponse,
  updatedSale,
  updateResponse,
  infoToUpdateSale
} = require("./servicesMocks");


describe('SALES SERVICE', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('Validando a consulta de vendas (FALHA)', function () {
    it('não é possível listar uma venda que não existe', async function () {
      sinon.stub(salesModel, 'findById').resolves(undefined);

      result = await salesServices.findById(9999);

      expect(result.type).to.be.equal("NOT_FOUND");
      expect(result.message).to.be.deep.equal("Sale not found");
    });
  });
  describe('Validando a consulta de vendas (SUCESSO)', function () {
    it('se retorna todas a lista de todas as vendas', async function () {
      sinon.stub(salesModel, "findAll").resolves(salesList);

      result = await salesServices.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(salesList);
    });
    it('se retorna uma venda buscada por id', async function () {
       sinon.stub(salesModel, "findById").resolves(responseFindSaleById);

       result = await salesServices.findById(1);

       expect(result.type).to.be.equal(null);
       expect(result.message).to.be.deep.equal(responseFindSaleById);
    });
  });
  describe('Validando a criação de uma nova venda (FALHA)', function () {

    it(`não é possível realizar operações em uma venda com o campo "productId"
    inexistente, em uma requisição com um único items`, async function () {
      sinon.stub(productsModel, 'findAll').resolves(productsList)

      const result = await salesServices.createSale([{ productId: 9999, quantity: 5 }]);

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
  });
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
   describe("Testando operação delete (excluir uma venda da base)", function () {
     it("falha ao tentar excluir venda que não existe", async function () {
       sinon.stub(salesModel, 'findById').resolves(undefined);

       const result = await salesServices.deleteById(9999);

       expect(result.message).to.be.deep.equal("Sale not found");
     });
    //  it("é possível deletar um produto com sucesso", async function () {
    //    sinon.stub(salesModel, "deleteById").resolves([deleteResponse]);

    //    const result = await salesServices.deleteById(1);

    //    expect(result.message).to.be.equal("");
    //  });
   });
  describe("Validando a atualização das informaçoes de uma venda", function () {
    it("falha ao tentar atualizar uma venda não existente no banco", async function () {
      sinon.stub(salesModel, 'findById').resolves(undefined);

      const result = await salesServices.updateById(9999, infoToUpdateSale);

      expect(result.type).to.be.equal('NOT_FOUND');
      expect(result.message).to.be.equal("Sale not found");
    });
    it("é possível atualizar uma venda com sucesso", async function () {
      sinon.stub(salesProductsModel, "findById").resolves(correctSaleInsert);
      sinon
        .stub(salesProductsModel, "updateById")
        .onFirstCall()
        .resolves(updateResponse)
        .onSecondCall()
        .resolves(updateResponse);

      const result = await salesServices.updateById(1, infoToUpdateSale);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.be.deep.equal(updatedSale);
    });
  });
});
