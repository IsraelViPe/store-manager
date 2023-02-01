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

const newProduct = {
  id: 4,
  name: "Liquidificador",
};

const createSaleBody = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const correctResponseCreateSale = {
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

const createSaleBodyMissingProductId = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    quantity: 5,
  },
];

const createSaleBodyMissingQuantity = [
  {
    productId: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const createSaleBodyWrongQuantity = [
  {
    productId: 1,
    quantity: 0,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

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

const infoToUpdateSale = [
  {
    productId: 1,
    quantity: 10,
  },
  {
    productId: 2,
    quantity: 50,
  },
];

const updateSaleResponse = {
  saleId: 1,
  itemsUpdated: [
    {
      productId: 1,
      quantity: 10,
    },
    {
      productId: 2,
      quantity: 50,
    },
  ],
};


module.exports = {
  productsList,
  newProduct,
  createSaleBody,
  correctResponseCreateSale,
  createSaleBodyMissingProductId,
  createSaleBodyMissingQuantity,
  createSaleBodyWrongQuantity,
  salesList,
  responseFindSaleById,
  updatedProduct,
  infoToUpdateSale,
  updateSaleResponse,
};
