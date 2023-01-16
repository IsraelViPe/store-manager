const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { salesModel, productsModel } = require('../../../src/models');
const { correctInsertSale, correctBodyInsertSale } = require('./mocks');

describe('SALES MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe.only('insert', function () {
    it('se é possível cadastrar uma venda com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([{ insertId: 3 }])

      const result = await salesModel.insert(correctBodyInsertSale);

      expect(result).to.equal(3);
    });
  });
});
