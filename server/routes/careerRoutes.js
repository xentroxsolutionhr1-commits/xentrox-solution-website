const express = require('express');
const router = express.Router();
const { protect, superAdminOnly } = require('../middleware/auth');
const {
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer,
} = require('../controllers/careerController');

// Public route to view positions
router.get('/', getCareers);

// Protected admin routes
router.post('/', protect, superAdminOnly, createCareer);
router.put('/:id', protect, superAdminOnly, updateCareer);
router.delete('/:id', protect, superAdminOnly, deleteCareer);

module.exports = router;

