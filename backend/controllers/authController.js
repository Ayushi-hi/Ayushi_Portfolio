const jwt   = require('jsonwebtoken');
const Admin = require('../models/Admin');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required.' });

    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');
    if (!admin || !(await admin.matchPassword(password)))
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });

    admin.lastLogin = new Date();
    await admin.save();

    return res.json({ success: true, token: generateToken(admin._id), admin: { id: admin._id, email: admin.email, name: admin.name } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getMe = async (req, res) => {
  return res.json({ success: true, admin: { id: req.admin._id, email: req.admin.email, name: req.admin.name } });
};

const seedAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne({});
    if (existing) return res.status(400).json({ success: false, message: 'Admin already exists.' });
    const admin = await Admin.create({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD, name: 'Ayushi Singh' });
    return res.status(201).json({ success: true, message: 'Admin created!', email: admin.email });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { login, getMe, seedAdmin };