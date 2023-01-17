const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT a.sale_id, b.date, a.product_id, a.quantity
     FROM StoreManager.sales_products AS a
     INNER JOIN StoreManager.sales AS b
     ON a.sale_id = b.id
     ORDER BY a.sale_id, a.product_id`,
  );
  return result;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT b.date, a.product_id, a.quantity
     FROM StoreManager.sales_products AS a
     INNER JOIN StoreManager.sales AS b
     ON a.sale_id = b.id
     WHERE a.sale_id = ?
     ORDER BY a.product_id`, [saleId],
  );
  return result;
};

const insert = async () => {
const [{ insertId }] = await connection.execute(
  'INSERT INTO StoreManager.sales(date) VALUE(NOW())',
);
  return insertId;
};

module.exports = {
  insert,
  findAll,
  findById,
};
