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
  createSaleBodyMissingQuantity,
  createSaleBodyWrongQuantity,
  salesList, responseFindSaleById} = require("./controller.mock");


describe('SALES CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  })
  describe('Rota GET /sale lista todas as vendas', function () {
    it('deve listar todas as vendas corretamente', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, 'findAll')
        .resolves({ type: null, message: salesList });

      await salesController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(salesList);
    });
  })
  describe('Rota GET /sales/:id busca venda por id', function () {
    it('deve falhar ao tentar buscar uma venda inexistente no banco', async function () {
       const res = {};
      const req = {
         params: { id: 999}
       };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
       sinon
         .stub(salesServices, "findById")
         .resolves({ type: 'NOT_FOUND', message: 'Sale not found' });

       await salesController.findById(req, res);

       expect(res.status).to.have.been.calledWith(404);
       expect(res.json).to.have.been.calledWith({ message: "Sale not found" });
    });
    it('deve trazer a venda referente ao id buscado', async function () {
      const res = {};
      const req = {
        params: {id : 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(salesServices, "findById")
        .resolves({ type: null, message: responseFindSaleById });

      await salesController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(responseFindSaleById);
    });
  })
  describe('Rota POST /sales (FALHA de validação)', function () {
    it("não é possível realizar operações em uma venda sem o campo productId]", async function () {

      const res = {};
      const req = { body: createSaleBodyMissingProductId };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub().returns(validateCreateSale(req, res));

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({
        message: '"productId" is required'
      });
    });
    // it("não é possível realizar operações em uma venda sem o campo quantity]", async function () {
    //   const res = {};
    //   const req = { body: createSaleBodyMissingQuantity };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   sinon.stub().returns(validateCreateSale(req, res));

    //   await salesController.createSale(req, res);

    //   expect(res.status).to.have.been.calledWith(400);
    //   expect(res.json).to.have.been.calledWith({
    //     message: '"quantity" is required',
    //   });
    // });
    // it("não é possível realizar operações em uma venda com o campo quantity menor ou igual a 0", async function () {
    //   const res = {};
    //   const req = { body: createSaleBodyWrongQuantity };

    //   res.status = sinon.stub().returns(res);
    //   res.json = sinon.stub().returns();

    //   //  sinon.stub().returns(validateCreateSale(req, res));

    //   await salesController.createSale(req, res);

    //   expect(res.status).to.have.been.calledWith(422);
    //   expect(res.json).to.have.been.calledWith({
    //     message: '"quantity" must be greater than or equal to 1'
    //   });
    // });
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
       expect(res.json).to.have.been.calledWith(correctResponseCreateSale);
    });
  });
  describe('Rota DELETE /sales/:id (deleta uma venda por id', function () {
     it("retorna status 404 ao tentar deletar um produto que não existe", async function () {
       const res = {};
       const req = { params: { id: 9999 } };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
       sinon
         .stub(salesServices, "deleteById")
         .resolves({ type: "NOT_FOUND", message: "Sale not found" });

       await salesController.deleteById(req, res);

       expect(res.status).to.have.been.calledWith(404);
       expect(res.json).to.have.been.calledWith({
         message: "Sale not found",
       });
     });
     it("retorna 204 ao deletar um produto com sucesso", async function () {
       const res = {};
       const req = { params: { id: 1 } };

       res.status = sinon.stub().returns(res);
       res.end = sinon.stub().returns();
       sinon
         .stub(salesServices, "deleteById")
         .resolves({ type: null, message: "" });

       await salesController.deleteById(req, res);

       expect(res.status).to.have.been.calledWith(204);
     });
  })

})


