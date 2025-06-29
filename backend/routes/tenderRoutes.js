const express = require('express');
const router = express.Router();
const { createTender, getTender, updateTender, deleteTender, listTenders, listCompanyTenders } = require('../controllers/tenderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createTender);
router.get('/:id', getTender);
router.put('/:id', authMiddleware, updateTender);
router.delete('/:id', authMiddleware, deleteTender);
router.get('/', listTenders);
router.get('/company/:companyId', listCompanyTenders);

module.exports = router;
