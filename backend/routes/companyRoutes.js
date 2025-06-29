const express = require('express');
const router = express.Router();
const { createCompany, getCompany, updateCompany, deleteCompany } = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createCompany);
router.get('/:id', getCompany);
router.put('/:id', authMiddleware, updateCompany);
router.delete('/:id', authMiddleware, deleteCompany);
router.get('/me', authMiddleware, getMyCompany);


module.exports = router;
