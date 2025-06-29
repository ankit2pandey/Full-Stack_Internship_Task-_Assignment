const knex = require('../utils/db');

const submitApplication = async (req, res) => {
  const { tender_id, proposal } = req.body;
  const companyId = req.user.company_id;

  try {
    await knex('applications').insert({
      tender_id,
      company_id: companyId,
      proposal,
    });
    res.status(201).json({ message: 'Application submitted' });
  } catch (err) {
    if (err.code === '23505') { // Unique constraint violation
      return res.status(400).json({ message: 'Already applied' });
    }
    res.status(500).json({ message: 'Error submitting application' });
  }
};

const getApplicationsForTender = async (req, res) => {
  try {
    const applications = await knex('applications')
      .join('companies', 'applications.company_id', 'companies.id')
      .select('applications.id', 'applications.proposal', 'companies.name')
      .where('applications.tender_id', req.params.tenderId);
    res.json(applications);
  } catch {
    res.status(500).json({ message: 'Error fetching applications' });
  }
};

const supabase = require('../utils/supabase');

const createCompany = async (req, res) => {
  const { name, industry, description, base64Image, filename } = req.body;
  const userId = req.user.id;

  try {
    let logo_url = null;

    if (base64Image && filename) {
      const buffer = Buffer.from(base64Image, 'base64');
      const { data, error } = await supabase
        .storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(`logos/${Date.now()}-${filename}`, buffer, {
          contentType: 'image/png',
        });

      if (error) return res.status(500).json({ message: 'Image upload failed' });

      logo_url = `${process.env.SUPABASE_URL}/storage/v1/object/public/${data.path}`;
    }

    const [id] = await knex('companies').insert({
      name,
      industry,
      description,
      logo_url,
      user_id: userId,
    }).returning('id');

    res.status(201).json({ id, logo_url });
  } catch (err) {
    res.status(500).json({ message: 'Error creating company' });
  }
};


module.exports = { submitApplication, getApplicationsForTender };
