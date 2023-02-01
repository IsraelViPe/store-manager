const express = require('express');
const cors = require('cors');

const { productsController, salesController } = require('./controllers');
const validateInputSale = require('./middlewares/validateInputSale');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_request, response) => {
  response.send();
});

app.get('/products/search', productsController.searchByQuery);

app.get('/products', productsController.findAll);

app.get('/products/:id', productsController.findById);

app.get('/sales', salesController.findAll);

app.get('/sales/:id', salesController.findById);

app.post('/products', productsController.insert);

app.post('/sales', validateInputSale, salesController.createSale);

app.put('/products/:id', productsController.updateById);

app.put('/sales/:id', validateInputSale, salesController.updateById);

app.delete('/products/:id', productsController.deleteById);

app.delete('/sales/:id', salesController.deleteById);

module.exports = app;
