const express = require('express');
const router = express.Router();
const { searchCompanies } = require('../controllers/searchController');

router.get('/companies', searchCompanies);

module.exports = router;
