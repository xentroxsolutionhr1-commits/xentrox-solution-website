const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, superAdminOnly } = require('../middleware/auth');
const { getPortfolio, createPortfolioProject, updatePortfolioProject, deletePortfolioProject } = require('../controllers/portfolioController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `portfolio-${Date.now()}${ext}`);
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/image\/(png|jpeg|jpg|webp)/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only PNG, JPEG, and WebP images are allowed.'));
  },
});

router.get('/', getPortfolio);
router.post('/', protect, superAdminOnly, upload.single('image'), createPortfolioProject);
router.put('/:id', protect, superAdminOnly, upload.single('image'), updatePortfolioProject);
router.delete('/:id', protect, superAdminOnly, deletePortfolioProject);

module.exports = router;

