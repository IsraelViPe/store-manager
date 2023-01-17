const productsList = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

const correctProductInsert = {
  id: 2,
  name: "Traje de encolhimento",
};

const correctSaleInsert = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

incorrectSaleInsert = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 9999,
    quantity: 5,
  },
];

const insertSaleResponse = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  productsList,
  correctProductInsert,
  correctSaleInsert,
  insertSaleResponse,
  incorrectSaleInsert
};
