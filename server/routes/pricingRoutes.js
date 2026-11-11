const express = require('express');
const router = express.Router();
const { protect, superAdminOnly } = require('../middleware/auth');
const { getPricing, updatePricing } = require('../controllers/pricingController');

router.get('/', getPricing);
router.put('/', protect, superAdminOnly, updatePricing);

module.exports = router;
