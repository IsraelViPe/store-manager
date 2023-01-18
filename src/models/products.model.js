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

const updateById = async (productId, productBody) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.products
     SET name = ? WHERE id = ?`,
    [productBody.name, productId],
  );

  return result;
};

const deleteById = async (productId) => {
  const [[result]] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return result;
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};
