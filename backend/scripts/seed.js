require('dotenv').config();
const mongoose = require('mongoose');
const Project  = require('../models/Project');
const Admin    = require('../models/Admin');

const projects = [
  { title: 'PawMatch', description: 'Full-stack pet adoption platform connecting users with NGO pets.', techStack: ['HTML', 'CSS', 'JavaScript', 'Spring Boot'], emoji: '🐾', featured: true, order: 1, githubUrl: 'https://github.com/Ayushi-hi' },
  { title: 'SheCoder', description: 'Platform encouraging girl students to learn coding through structured paths.', techStack: ['React', 'Node.js', 'JavaScript'], emoji: '👩‍💻', featured: false, order: 2, githubUrl: 'https://github.com/Ayushi-hi' },
  { title: 'Forage-Midas', description: 'Decentralized blockchain solution using smart contracts.', techStack: ['Blockchain', 'Smart Contracts'], emoji: '⛓️', featured: false, order: 3, githubUrl: 'https://github.com/Ayushi-hi' },
  { title: 'TODO App', description: 'First full-stack mobile app with React Native and Convex.', techStack: ['React Native', 'Convex'], emoji: '✅', featured: false, order: 4, githubUrl: 'https://github.com/Ayushi-hi' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('✅ Projects seeded!');
  const existing = await Admin.findOne({});
  if (!existing) {
    await Admin.create({ email: process.env.ADMIN_EMAIL || 'ayushisingh1457@gmail.com', password: process.env.ADMIN_PASSWORD || 'Admin@1234', name: 'Ayushi Singh' });
    console.log('✅ Admin created!');
  }
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });