require('dotenv').config();
const mongoose = require('mongoose');
const Project  = require('../models/Project');
const Admin    = require('../models/Admin');

// TODO: replace the githubUrl values with each repo's real link, and add liveUrl where you have a demo.
const projects = [
  {
    title: 'Kindsight',
    description: 'AI-assisted chest X-ray analysis web app with a Next.js frontend, FastAPI REST backend and Docker deployment. Includes authentication, report generation, DICOM image support and an LLM-powered conversational chat backed by ChromaDB retrieval.',
    techStack: ['Python', 'FastAPI', 'Next.js', 'MongoDB', 'ChromaDB', 'REST APIs', 'Docker'],
    emoji: '\u{1FA7B}', featured: true, order: 1,
    githubUrl: 'https://github.com/Ayushi-hi'
  },
  {
    title: 'VibeShare',
    description: 'Real-time social app for Gen-Z friend groups, built cross-platform with React Native. Features group chat, photo sharing, live friend location and synchronized music listening, with Firebase keeping chat, location and playback state in sync across devices.',
    techStack: ['React Native', 'Firebase'],
    emoji: '\u{1F4F1}', featured: false, order: 2,
    githubUrl: 'https://github.com/Ayushi-hi'
  },
  {
    title: 'ORBIT',
    description: 'Local AI developer assistant for the command line. Integrates an LLM API with streaming responses and persistent SQLite storage, with modular workflows for file operations, Git status/diff analysis and notes.',
    techStack: ['Python', 'OpenRouter API', 'SQLite', 'CLI', 'Git'],
    emoji: '\u{1F6F0}\uFE0F', featured: false, order: 3,
    githubUrl: 'https://github.com/Ayushi-hi'
  },
  {
    title: 'PawMatch',
    description: 'Full-stack pet adoption platform connecting users with NGO shelter animals. Designed relational schemas and REST endpoints for pet listings, user profiles and adoption request workflows.',
    techStack: ['Java', 'Spring Boot', 'JavaScript', 'REST APIs', 'SQL'],
    emoji: '\u{1F43E}', featured: false, order: 4,
    githubUrl: 'https://github.com/Ayushi-hi/PawMatch',
    liveUrl: 'https://pawmatch-txnh.onrender.com/'
  },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  await Project.deleteMany({});
  await Project.insertMany(projects);
  console.log('Projects seeded!');
  const existing = await Admin.findOne({});
  if (!existing) {
    await Admin.create({ email: process.env.ADMIN_EMAIL || 'ayushisingh1457@gmail.com', password: process.env.ADMIN_PASSWORD || 'Admin@1234', name: 'Ayushi Singh' });
    console.log('Admin created!');
  }
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });