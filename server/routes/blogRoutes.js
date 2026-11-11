const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { protect, superAdminOnly } = require('../middleware/auth');
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `blog-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', getBlogs);
router.post('/', protect, superAdminOnly, upload.single('image'), createBlog);
router.put('/:id', protect, superAdminOnly, upload.single('image'), updateBlog);
router.delete('/:id', protect, superAdminOnly, deleteBlog);

module.exports = router;

