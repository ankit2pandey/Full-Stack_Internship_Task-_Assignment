const knex = require('../utils/db');

const createCompany = async (req, res) => {
  const { name, industry, description, logo_url } = req.body;
  const userId = req.user.id;

  try {
    const [id] = await knex('companies').insert({
      name,
      industry,
      description,
      logo_url,
      user_id: userId,
    }).returning('id');

    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ message: 'Error creating company' });
  }
};

const getCompany = async (req, res) => {
  try {
    const company = await knex('companies').where({ id: req.params.id }).first();
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch {
    res.status(500).json({ message: 'Error fetching company' });
  }
};

const updateCompany = async (req, res) => {
  try {
    await knex('companies').where({ id: req.params.id, user_id: req.user.id }).update(req.body);
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: 'Error updating company' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    await knex('companies').where({ id: req.params.id, user_id: req.user.id }).del();
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: 'Error deleting company' });
  }
};
const getMyCompany = async (req, res) => {
  try {
    const company = await knex('companies')
      .where({ user_id: req.user.id })
      .first();

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(company);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching company' });
  }
};


module.exports = { createCompany, getCompany, updateCompany, deleteCompany };
