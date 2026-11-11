const express = require('express');
const router = express.Router();
const { protect, superAdminOnly } = require('../middleware/auth');
const { getEnquiries, createEnquiry, markEnquiryRead, deleteEnquiry } = require('../controllers/enquiryController');

router.post('/', createEnquiry); // public
router.get('/', protect, superAdminOnly, getEnquiries);
router.put('/:id/read', protect, superAdminOnly, markEnquiryRead);
router.delete('/:id', protect, superAdminOnly, deleteEnquiry);

module.exports = router;

