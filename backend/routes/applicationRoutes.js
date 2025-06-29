const express = require('express');
const router = express.Router();
const { submitApplication, getApplicationsForTender } = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, submitApplication);
router.get('/tender/:tenderId', getApplicationsForTender);

module.exports = router;
