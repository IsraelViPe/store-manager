const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { salesModel } = require('../../../src/models');
const {  correctBodyInsertSale, salesList, responseFindSaleById, responseToUpdate } = require('./modelMocks');

describe('SALES MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('insert', function () {
    it('se é possível cadastrar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }])

      const result = await salesModel.insert(correctBodyInsertSale);

      expect(result).to.equal(3);
    });
  });
  describe('findAll e findById', function () {
    it('se é possível listar todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([salesList])

      const result = await salesModel.findAll();

      expect(result).to.be.deep.equal(salesList);
    });
    it('se é possível listar uma venda especifica com sucesso (ID)', async function () {
      sinon.stub(connection, 'execute').resolves([responseFindSaleById])

      const result = await salesModel.findById(1)

      expect(result).to.be.deep.equal(responseFindSaleById);
    });
  })
  describe('deleteById', function () {
    it('é possível deletar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(responseToUpdate);

      const result = await salesModel.deleteById(1);

      expect(result.affectedRows).to.be.equal(1);
    });
  })
});
