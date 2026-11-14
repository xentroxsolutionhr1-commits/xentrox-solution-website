const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, superAdminOnly } = require('../middleware/auth');
const {
  getPortfolio,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
} = require('../controllers/portfolioController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/image\/(png|jpeg|jpg|webp)/.test(file.mimetype)) cb(null, true);
    else cb(new Error('Only PNG, JPEG, and WebP images are allowed.'));
  },
});

router.get('/', getPortfolio);

router.post(
  '/',
  protect,
  superAdminOnly,
  upload.single('image'),
  createPortfolioProject
);

router.put(
  '/:id',
  protect,
  superAdminOnly,
  upload.single('image'),
  updatePortfolioProject
);

router.delete(
  '/:id',
  protect,
  superAdminOnly,
  deletePortfolioProject
);
router.use((err, req, res, next) => {
  console.error('[Portfolio Upload Error]', err);

 if (err instanceof multer.MulterError) {
  return res.status(400).json({
    error: `Multer error: ${err.message} (field: ${err.field || 'unknown'})`,
    field: err.field || null,
  });
}

  return res.status(400).json({
    error: err.message || 'Portfolio upload failed.',
  });
});
module.exports = router;