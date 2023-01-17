const sinon = require("sinon");
const { expect } = require("chai");
const connection = require("../../../src/models/connection");

const { salesProductsModel } = require("../../../src/models");
const { correctBodyInsertSale: salesProductsList  } = require("./modelMocks");
const { execute } = require("../../../src/models/connection");

describe('SALES_PRODUCTS MODEL', function () {
  beforeEach(function () {
    sinon.restore();
  });
  describe('findById (lista relação de produtos por vendas)', function () {
    it('se ao iserir o id de uma venda retorna a lista de todos os produtos e quantidades', async function () {
      sinon.stub(connection, 'execute').resolves([salesProductsList]);

      const result = await salesProductsModel.findById(1);

      expect(result).to.be.deep.equal(salesProductsList);
    });
  })
  describe('insert (insere informaçoes de uma venda cadastrada)', function () {
    it('se é possível cadastrar uma nova relação de "id-venda/id-produto/quantidade-produtos"', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
      const infoSold =  {saleId: 1, productId: 1, quantity: 1 }

      const result = await salesProductsModel.insert(infoSold);

      expect(result).to.equal(1);
    })
  })
})
