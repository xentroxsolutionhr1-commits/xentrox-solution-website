const cloudinary = require('../config/cloudinary');
const Portfolio = require('../models/Portfolio');

const uploadToCloudinary = (file) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'xentrox/portfolio',
        resource_type: 'image',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });

const getPortfolio = async (req, res) => {
  try {
    const projects = await Portfolio.find({})
      .populate('categoryId', 'categoryName')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createPortfolioProject = async (req, res) => {
  try {
    let projectData;

    if (req.body.project) {
      projectData = JSON.parse(req.body.project);
    } else {
      projectData = req.body;

      if (typeof projectData.projectTechStack === 'string') {
        projectData.projectTechStack = [projectData.projectTechStack];
      }
    }

    const {
      projectName,
      projectDescription,
      projectTechStack,
      categoryId,
    } = projectData;

    if (!projectName || !projectDescription || !categoryId) {
      return res.status(400).json({
        error: 'Project name, description, and category are required.',
      });
    }

    let imageUrl = '';

    if (req.file) {
      imageUrl = await uploadToCloudinary(req.file);
    }

    const project = await Portfolio.create({
      projectName,
      projectDescription,
      projectTechStack: projectTechStack || [],
      categoryId,
      imageUrl,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePortfolioProject = async (req, res) => {
  try {
    const project = await Portfolio.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    let projectData;

    if (req.body.project) {
      projectData = JSON.parse(req.body.project);
    } else {
      projectData = req.body;

      if (typeof projectData.projectTechStack === 'string') {
        projectData.projectTechStack = [projectData.projectTechStack];
      }
    }

    const {
      projectName,
      projectDescription,
      projectTechStack,
      categoryId,
    } = projectData;

    if (projectName) project.projectName = projectName;
    if (projectDescription) project.projectDescription = projectDescription;
    if (projectTechStack) project.projectTechStack = projectTechStack;
    if (categoryId) project.categoryId = categoryId;

    if (req.file) {
      project.imageUrl = await uploadToCloudinary(req.file);
    }

    await project.save();

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePortfolioProject = async (req, res) => {
  try {
    const project = await Portfolio.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found.' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getPortfolio,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
};