const knex = require('../utils/db');

const searchCompanies = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'Search query required' });

  try {
    const results = await knex('companies')
      .leftJoin('goods_and_services', 'companies.id', 'goods_and_services.company_id')
      .whereILike('companies.name', `%${q}%`)
      .orWhereILike('companies.industry', `%${q}%`)
      .orWhereILike('goods_and_services.item', `%${q}%`)
      .distinct('companies.*');

    res.json(results);
  } catch {
    res.status(500).json({ message: 'Error searching companies' });
  }
};

module.exports = { searchCompanies };
