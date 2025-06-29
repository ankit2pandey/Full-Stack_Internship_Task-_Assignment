const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const knex = require('../utils/db');

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await knex('users').where({ email }).first();
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user and get their ID
    const [userId] = await knex('users')
      .insert({ email, password: hashedPassword })
      .returning('id');

    // Create blank company profile for the new user
    const [companyId] = await knex('companies')
      .insert({
        user_id: userId,
        name: 'Untitled Company',
        industry: '',
        description: '',
        logo_url: '',
      })
      .returning('id');

    // Sign JWT with both user and company info
    const token = jwt.sign(
      { id: userId, company_id: companyId },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};
