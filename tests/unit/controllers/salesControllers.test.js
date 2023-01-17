const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const validateCreateSale = require('../../../src/middlewares/validateCreateSale');
const {  salesServices } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { createSaleBody, correctResponseCreateSale,
  createSaleBodyMissingProductId,
  createSaleBodyMissingQuantity, createSaleBodyWrongQuantity } = require("./controller.mock");


describe.only('SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  })
  describe('Rota POST /sale (FALHA de validação)', function () {
    it("não é possível realizar operações em uma venda sem o campo productId]", async function () {

      const res = {};
      const req = { body: createSaleBodyMissingProductId };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      validateCreateSale(req.body);
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required'
      });
    });
    it("não é possível realizar operações em uma venda sem o campo quantity]", async function () {
      const res = {};
      const req = { body: createSaleBodyMissingQuantity };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      validateCreateSale(body);
      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" is required',
      });
    });
    it("não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0", async function () {
      const res = {};
      const req = { body: createSaleBodyWrongQuantity };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"quantity" must be greater than or equal to 1'
      });
    });
  })
  describe('Rota POST /sales (cadastra uma nova venda com SUCESSO)', function () {
    it('é possível cadastrar uma nova venda com sucesso', async function () {
       const res = {};
       const req = { body: createSaleBody };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
       sinon
         .stub(salesServices, 'createSale')
         .resolves({type: null, message: correctResponseCreateSale});

       await salesController.createSale(req, res);

       expect(res.status).to.have.been.calledWith(201);
       expect(res.json).to.have.been.calledWith({message: correctResponseCreateSale});
    });
  });
})


