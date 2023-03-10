const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { productsList, responseToUpdate, responseSearchByQuery } = require('./modelMocks');

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
  describe('updateById', function () {
    it('é possível alterar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([responseToUpdate])

      const [result] = await productsModel.updateById(1, {name:'quebra-cabeça'});

      expect(result.affectedRows).to.be.equal(1);
      expect(result.changedRows).to.be.equal(1);
    })
  })
  describe('delete', function () {
    it('é possível deletar um produto com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves(responseToUpdate);

      const result = await productsModel.deleteById(1);

       expect(result.affectedRows).to.be.equal(1);
    })
  });
  describe('searchByQuery', function () {
    it('é possível buscar um produto pelo name', async function () {
      sinon.stub(connection, 'execute').resolves(responseSearchByQuery);

      const result = await productsModel.searchByQuery('Martelo');

      expect([result]).to.be.deep.equal(responseSearchByQuery);
    });
    it('retorna um a lista com todos os produtos quando a query for vazia', async function () {
      sinon.stub(connection, "execute").resolves([productsList]);

      const result = await productsModel.searchByQuery();

      expect(result).to.be.deep.equal(productsList);
    });
  });
})
