const express = require('express');
const router = express.Router();
const { getSetupStatus, setupAdmin, loginAdmin } = require('../controllers/authController');

router.get('/setup-status', getSetupStatus);
router.post('/setup', setupAdmin);
router.post('/login', loginAdmin);

module.exports = router;

