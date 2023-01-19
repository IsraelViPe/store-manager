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

const infoToUpdateSale = [
  {
    productId: 1,
    quantity: 20,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const incorrectSaleInsert = [
  {
    productId: 1,
    quantity: 1,
  },
  {
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

const deleteResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 0  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0,
  },
];

const updateResponse = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: "Rows matched: 1  Changed: 0  Warnings: 0",
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
];

module.exports = {
  productsList,
  correctProductInsert,
  correctSaleInsert,
  incorrectSaleInsert,
  insertSaleResponse,
  salesList,
  responseFindSaleById,
  updatedProduct,
  deleteResponse,
  updateResponse,
  infoToUpdateSale
};
