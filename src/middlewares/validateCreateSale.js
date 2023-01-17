module.exports = (req, res, next) => {
  console.log(req.body);
  const someProductIdMissing = req.body.some(({ productId }) => productId === undefined);
  const someQuantityMissing = req.body.some(({ quantity }) => quantity === undefined);
  const someInvalidQuantity = req.body.some(({ quantity }) => quantity <= 0);

  if (someProductIdMissing) return res.status(400).json({ message: '"productId" is required' });
  if (someQuantityMissing) return res.status(400).json({ message: '"quantity" is required' });
  if (someInvalidQuantity) {
 return res.status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' });
  }
  return next();
};
