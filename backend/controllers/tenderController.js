const knex = require('../utils/db');

const createTender = async (req, res) => {
  const { title, description, deadline, budget } = req.body;
  const companyId = req.user.company_id; // Assume company is mapped to the user
  try {
    const [id] = await knex('tenders').insert({
      title,
      description,
      deadline,
      budget,
      company_id: companyId,
    }).returning('id');
    res.status(201).json({ id });
  } catch {
    res.status(500).json({ message: 'Error creating tender' });
  }
};

const getTender = async (req, res) => {
  try {
    const tender = await knex('tenders').where({ id: req.params.id }).first();
    if (!tender) return res.status(404).json({ message: 'Not found' });
    res.json(tender);
  } catch {
    res.status(500).json({ message: 'Error fetching tender' });
  }
};

const updateTender = async (req, res) => {
  try {
    await knex('tenders')
      .where({ id: req.params.id, company_id: req.user.company_id })
      .update(req.body);
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: 'Error updating tender' });
  }
};

const deleteTender = async (req, res) => {
  try {
    await knex('tenders')
      .where({ id: req.params.id, company_id: req.user.company_id })
      .del();
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: 'Error deleting tender' });
  }
};

const listTenders = async (req, res) => {
  try {
    const tenders = await knex('tenders').orderBy('created_at', 'desc').limit(20); // pagination comes later
    res.json(tenders);
  } catch {
    res.status(500).json({ message: 'Error listing tenders' });
  }
};

const listCompanyTenders = async (req, res) => {
  try {
    const tenders = await knex('tenders').where({ company_id: req.params.companyId });
    res.json(tenders);
  } catch {
    res.status(500).json({ message: 'Error fetching tenders' });
  }
};

module.exports = {
  createTender,
  getTender,
  updateTender,
  deleteTender,
  listTenders,
  listCompanyTenders,
};
