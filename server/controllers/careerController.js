const Career = require('../models/Career');

// GET /api/careers (public)
const getCareers = async (req, res) => {
  try {
    // If request contains ?all=true and is authenticated, show all; otherwise return active
    const query = req.query.all === 'true' ? {} : { active: true };
    const careers = await Career.find(query).sort({ createdAt: -1 });
    res.json(careers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/careers (protected)
const createCareer = async (req, res) => {
  try {
    const { title, type, location, category, description, skills, icon, active } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Job title and description are required.' });
    }
    const parsedSkills = typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : (Array.isArray(skills) ? skills : []);

    const career = await Career.create({
      title: title.trim(),
      type: type || 'Full Time',
      location: location || 'Hybrid',
      category: category || 'Development',
      description: description.trim(),
      skills: parsedSkills,
      icon: icon || 'code',
      active: active !== false && active !== 'false',
    });
    res.status(201).json(career);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/careers/:id (protected)
const updateCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ error: 'Career position not found.' });

    const { title, type, location, category, description, skills, icon, active } = req.body;
    if (title) career.title = title.trim();
    if (type) career.type = type;
    if (location) career.location = location;
    if (category) career.category = category;
    if (description) career.description = description.trim();
    if (skills !== undefined) {
      career.skills = typeof skills === 'string'
        ? skills.split(',').map((s) => s.trim()).filter(Boolean)
        : (Array.isArray(skills) ? skills : []);
    }
    if (icon) career.icon = icon;
    if (active !== undefined) {
      career.active = active !== false && active !== 'false';
    }

    await career.save();
    res.json(career);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/careers/:id (protected)
const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ error: 'Career position not found.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCareers, createCareer, updateCareer, deleteCareer };

