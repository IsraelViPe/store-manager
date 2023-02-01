const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (infoSold) => {
  const columns = Object.keys(snakeize(infoSold)).join(', ');

  const placeholders = Object.keys(infoSold)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
  `INSERT INTO StoreManager.sales_products (${columns}) VALUE (${placeholders})`,
    [...Object.values(infoSold)],
  );

  return insertId;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.sales_products WHERE sale_id = ?`, [saleId]);
  return result;
};

const updateById = async (saleId, infoToUpdate, infoToSelect) => {
  const [result] = await connection.execute(`
  UPDATE StoreManager.sales_products
  SET product_id = ?, quantity = ?
  WHERE sale_id = ? AND product_id = ? AND quantity = ?
  `, [infoToUpdate.productId, infoToUpdate.quantity, saleId,
    infoToSelect.productId, infoToSelect.quantity]);

  return result;
};

module.exports = {
  insert,
  findById,
  updateById,
};
