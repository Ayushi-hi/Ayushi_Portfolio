const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ visible: true }).sort({ featured: -1, order: 1 });
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, visible: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    return res.json({ success: true, data: project });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json({ success: true, data: project });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    return res.json({ success: true, data: project });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found.' });
    return res.json({ success: true, message: 'Project deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getProjects, getProjectBySlug, createProject, updateProject, deleteProject };