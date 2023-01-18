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

const salesList = [
  {
    saleId: 1,
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    saleId: 1,
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const responseFindSaleById = [
  {
    date: "2021-09-09T04:54:29.000Z",
    productId: 1,
    quantity: 2,
  },
  {
    date: "2021-09-09T04:54:54.000Z",
    productId: 2,
    quantity: 2,
  },
];

const updatedProduct = {
  id: 1,
  name: "Martelo do Batman",
};


module.exports = {
  productsList,
  correctProductInsert,
  correctSaleInsert,
  insertSaleResponse,
  incorrectSaleInsert,
  salesList,
  responseFindSaleById,
  updatedProduct
};
