const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  page:           { type: String, required: true, default: '/' },
  date:           { type: String, required: true },
  views:          { type: Number, default: 0 },
  uniqueIPs:      { type: [String], default: [] },
  uniqueVisitors: { type: Number, default: 0 },
}, { timestamps: true });

analyticsSchema.index({ page: 1, date: 1 }, { unique: true });

const totalHitsSchema = new mongoose.Schema({
  page:       { type: String, default: '/' },
  totalViews: { type: Number, default: 0 },
}, { timestamps: true });

totalHitsSchema.index({ page: 1 }, { unique: true });

const Analytics = mongoose.model('Analytics', analyticsSchema);
const TotalHits = mongoose.model('TotalHits', totalHitsSchema);

module.exports = { Analytics, TotalHits };