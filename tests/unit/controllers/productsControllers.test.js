const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsList } = require('./productsController.mock');

describe('PRODUCTS CONTROLLER', function() {
  describe('Rota /products', function () {
    it('Se lista todos os produtos com sucesso retornando stautus 200', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findAll')
        .resolves({ message: productsList })

      await productsController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productsList);
    });
  });
});
