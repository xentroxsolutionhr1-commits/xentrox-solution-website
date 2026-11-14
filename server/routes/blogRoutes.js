const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, superAdminOnly } = require('../middleware/auth');
const {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/image\/(png|jpeg|jpg|webp)/.test(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PNG, JPEG, and WebP images are allowed.'));
    }
  },
});

router.get('/', getBlogs);
router.post('/', protect, superAdminOnly, upload.single('image'), createBlog);
router.put('/:id', protect, superAdminOnly, upload.single('image'), updateBlog);
router.delete('/:id', protect, superAdminOnly, deleteBlog);

module.exports = router;