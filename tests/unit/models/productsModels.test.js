const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/models/connection');

const { productsModel } = require('../../../src/models');

const { productsList } = require('./productsModel.mock');

describe('PRODUCTS MODEL', function () {
  afterEach(function () {
    sinon.restore();
  });
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

})
