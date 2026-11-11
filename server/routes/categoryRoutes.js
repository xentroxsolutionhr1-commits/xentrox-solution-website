const express = require('express');
const router = express.Router();
const { protect, superAdminOnly } = require('../middleware/auth');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

router.get('/', getCategories);
router.post('/', protect, superAdminOnly, createCategory);
router.put('/:id', protect, superAdminOnly, updateCategory);
router.delete('/:id', protect, superAdminOnly, deleteCategory);

module.exports = router;

