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

module.exports = {
  productsList,
  newProduct,
  createSaleBody,
  correctResponseCreateSale,
  createSaleBodyMissingProductId,
  createSaleBodyMissingQuantity,
  createSaleBodyWrongQuantity
};
