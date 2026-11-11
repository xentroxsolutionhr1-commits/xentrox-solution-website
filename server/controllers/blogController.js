const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, content, author, tags, published } = req.body;
    if (!title || !content || !author) return res.status(400).json({ error: 'Title, content, and author are required.' });
    const parsedTags = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : tags || [];
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const blog = await Blog.create({ title, content, author, tags: parsedTags, published: published !== 'false', imageUrl });
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    const { title, content, author, tags, published } = req.body;
    if (title) blog.title = title;
    if (content) blog.content = content;
    if (author) blog.author = author;
    if (tags !== undefined) {
      blog.tags = typeof tags === 'string' ? tags.split(',').map((t) => t.trim()).filter(Boolean) : tags || [];
    }
    if (published !== undefined) blog.published = published !== 'false' && published !== false;
    if (req.file) blog.imageUrl = `/uploads/${req.file.filename}`;
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };

