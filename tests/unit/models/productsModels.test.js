const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { productsList } = require('./mocks');

describe('PRODUCTS MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('findAll e findById', function () {
    it('se retorna a lista de todos os produtos corretamente', async function () {
      sinon.stub(connection, 'execute').resolves([productsList]);

      const result = await productsModel.findAll();

      expect(result).to.be.deep.equal(productsList);
    })
    it('se é possível buscar um produto por id', async function () {
      sinon.stub(connection, 'execute').resolves([[productsList[0]]]);

      const result = await productsModel.findById(1);

      expect(result).to.be.deep.equal(productsList[0])
    })
    describe('Cadastro de novos produtos', function () {
      it('é possível cadastrar um produto com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);

        const result = await productsModel.insert({name: 'Produto1'});

        expect(result).to.be.deep.equal({id:4,name:'Produto1'});
      });
    });
  })

})
