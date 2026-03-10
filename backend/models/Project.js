const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title:       { type: String, required: true, trim: true },
  slug:        { type: String, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true, trim: true },
  techStack:   { type: [String], required: true },
  githubUrl:   { type: String, trim: true },
  liveUrl:     { type: String, trim: true },
  emoji:       { type: String, default: '💻' },
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
  visible:     { type: Boolean, default: true },
}, { timestamps: true });

projectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Project', projectSchema);