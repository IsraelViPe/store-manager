const express = require('express');
// const camelize = require('camelize');
const { productsController, salesController } = require('./controllers');
const validateInputSale = require('./middlewares/validateInputSale');
const { productsModel } = require('./models');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', async (req, res) => {
  const { q } = req.query;
  const result = await productsModel.searchByQuery(q);

  res.status(200).json(result);
});

app.get('/products', productsController.findAll);

app.get('/products/:id', productsController.findById);

app.get('/sales', salesController.findAll);

app.get('/sales/:id', salesController.findById);

app.post('/products', productsController.insert);

app.post('/sales', validateInputSale, salesController.createSale);

app.put('/products/:id', productsController.updateById);

app.delete('/products/:id', productsController.deleteById);

app.delete('/sales/:id', salesController.deleteById);

app.put('/sales/:id', validateInputSale, salesController.updateById);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
