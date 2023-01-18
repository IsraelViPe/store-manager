const express = require('express');
// const camelize = require('camelize');
const { productsController, salesController } = require('./controllers');
const validateCreateSale = require('./middlewares/validateCreateSale');
const { productsModel } = require('./models');

const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productsController.findAll);

app.get('/products/:id', productsController.findById);

app.get('/sales', salesController.findAll);

app.get('/sales/:id', salesController.findById);

app.post('/products', productsController.insert);

app.post('/sales', validateCreateSale, salesController.createSale);

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await productsModel.updateById(id, req.body);

  res.status(200).json({ result });
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação
module.exports = app;
