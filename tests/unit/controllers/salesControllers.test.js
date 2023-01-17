const sinon = require("sinon");
const chai = require("chai");
const { expect } = chai;
const sinonChai = require("sinon-chai");

chai.use(sinonChai);

const { salesModel } = require("../../../src/models");
const { productsService, salesServices } = require("../../../src/services");
const { salesController } = require("../../../src/controllers");
const { createSaleBody, correctResponseCreateSale } = require("./controller.mock");


describe('SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  })
  describe('Rota POST /sale (FALHA de validação)', function () {
    it("não é possível realizar operações em uma venda sem o campo productId]", async function () {

    });
    it("não é possível realizar operações em uma venda sem o campo quantity]", async function () {

    });
    it("não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0", async function () {

    });
  })
  describe.only('Rota POST /sales (cadastra uma nova venda com SUCESSO)', function () {
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


