const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// GET /api/auth/setup-status
const getSetupStatus = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'SUPER_ADMIN' });
    res.json({ setupRequired: count === 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/setup
const setupAdmin = async (req, res) => {
  try {
    const count = await User.countDocuments({ role: 'SUPER_ADMIN' });
    if (count > 0) return res.status(409).json({ error: 'Admin already set up.' });
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'All fields are required.' });
    const user = await User.create({ name, email, password, role: 'SUPER_ADMIN' });
    res.status(201).json({ accessToken: generateToken(user._id), user });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Email already in use.' });
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    res.json({ accessToken: generateToken(user._id), user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getSetupStatus, setupAdmin, loginAdmin };

