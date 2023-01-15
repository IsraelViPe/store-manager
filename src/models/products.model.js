const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products;',
  );
  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM StoreManager.products WHERE id = ?
    ORDER BY id;`,
    [productId],
  );
  return result;
};

const insert = async (productInfo) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [productInfo.name],
  );
  return { id: insertId, ...productInfo };
};

module.exports = {
  findAll,
  findById,
  insert,
};
