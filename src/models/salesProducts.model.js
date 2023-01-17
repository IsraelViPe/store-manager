const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (infoSold) => {
  const columns = Object.keys(snakeize(infoSold)).join(', ');

  const placeholders = Object.keys(infoSold)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(`
  INSERT INTO (${columns}) VALUE (${placeholders})`,
    [...Object.values(infoSold)]);

  return insertId;
};

const findById = async (saleId) => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.sales_products WHERE sale_id = ?`, [saleId]);
  return result;
};

module.exports = {
  insert,
  findById,
};
