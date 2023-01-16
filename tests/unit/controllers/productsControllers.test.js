const sinon = require('sinon');
const chai = require('chai');
const { expect } = chai;
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsList, newProduct } = require('./productsController.mock');

describe('PRODUCTS CONTROLLER', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('Rota GET /products (lista todos os produtos)', function () {
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
  describe('Rota GET /products/:id (busca por id)', function () {
    it('deve retornar um erro "Product not fount" ao buscar um produto inexistente', async function () {
      const res = {};
      const req = { params: { id: 9999 }};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "findById")
        .resolves({ type: "PRODUCT_NOT_FOUND", message: "Product not found" });

      await productsController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: "Product not found"});
    });
    it('deve retornar status 200 e o produto no corpo da mensagem caso o produto exista', async function () {
        const res = {};
        const req = { params: { id: 1 } };

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon
          .stub(productsService, "findById")
          .resolves({
            type: null, message: productsList[0]});

        await productsController.findById(req, res);

        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(productsList[0]);
    });
  })
  describe('Rota POST /products (insere um novo produto)', function () {
    it('é possível cadastrar um produto com sucesso', async function () {
      const res = {};
      const req = { body: { name: 'Liquidificador' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon
        .stub(productsService, "insert")
        .resolves({ type: null, message: newProduct });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(newProduct);
    });
    it('falha ao tentar cadastrar produto sem campo name', async function () {
       const res = {};
       const req = { body: { modelo: "modeloX" } };

       res.status = sinon.stub().returns(res);
       res.json = sinon.stub().returns();
       sinon
         .stub(productsService, "insert")
         .resolves({ type: "BAD_REQUEST", message: '"name" is required"' });

       await productsController.insert(req, res);

       expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required"' });
    })
    it('falha ao tentar cadastrar produto com name inferior a 5 caracteres', async function () {
      const res = {};
      const req = { body: { name: "A" } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, "insert").resolves({
        type: "UNPROCESSABLE_ENTITY",
        message: '"name" length must be at least 5 characters long'
      });

      await productsController.insert(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({
        message: '"name" length must be at least 5 characters long'
      });
    })

  })
});
