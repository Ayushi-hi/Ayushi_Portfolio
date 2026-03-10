const { Analytics, TotalHits } = require('../models/Analytics');

const recordHit = async (req, res) => {
  try {
    const page  = req.body.page || '/';
    const today = new Date().toISOString().split('T')[0];
    await Analytics.findOneAndUpdate({ page, date: today }, { $inc: { views: 1 } }, { upsert: true });
    await TotalHits.findOneAndUpdate({ page }, { $inc: { totalViews: 1 } }, { upsert: true });
    return res.json({ success: true });
  } catch (err) {
    return res.status(200).json({ success: false });
  }
};

const getSummary = async (req, res) => {
  try {
    const totals     = await TotalHits.find({});
    const totalViews = totals.reduce((s, t) => s + t.totalViews, 0);
    const today      = new Date().toISOString().split('T')[0];
    const todayDocs  = await Analytics.find({ date: today });
    const todayViews = todayDocs.reduce((s, d) => s + d.views, 0);
    return res.json({ success: true, data: { totalViews, todayViews, pageBreakdown: totals } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { recordHit, getSummary };