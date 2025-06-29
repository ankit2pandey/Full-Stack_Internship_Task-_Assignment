const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
// Add other routes as you create them

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const companyRoutes = require('./routes/companyRoutes');
app.use('/api/companies', companyRoutes);

const tenderRoutes = require('./routes/tenderRoutes');
app.use('/api/tenders', tenderRoutes);

const applicationRoutes = require('./routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const searchRoutes = require('./routes/searchRoutes');
app.use('/api/search', searchRoutes);


module.exports = app;
