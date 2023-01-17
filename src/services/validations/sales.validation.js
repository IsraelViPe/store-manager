const saleIsValid = async (saleInfo) => {
  const someProductIdIsMissing = saleInfo.some(({ productId }) => productId === undefined);

  if (someProductIdIsMissing) return { type: 'NOT_FOUND', message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  saleIsValid,
};
