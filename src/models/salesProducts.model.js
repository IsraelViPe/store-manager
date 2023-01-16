const connection = require('./connection');

const insert = async (saleId, itemSold) => {
  const columns = Object.keys(itemSold).join(', ');
  const placeholders = Object.keys(itemSold)
    .map((_key) => '?')
    .join(', ');
  const result = connection.execute(`
  INSERT INTO (${columns}) VALUE (${placeholders})`,
    [saleId, ...Object.values(itemSold)]);

  console.log(result);
};

const findById = async (saleId) => {
  const result = connection.execute(`
  SELECT * FROM StoreManager.sales_products WHERE sale_id = ?`, [saleId]);
  console.log(result);
};

module.exports = {
  insert,
  findById,
};
