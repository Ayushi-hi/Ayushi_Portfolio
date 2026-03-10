const express  = require('express');
const router   = express.Router();
const { protect } = require('../middleware/auth');
const { recordHit, getSummary } = require('../controllers/analyticsController');

router.post('/hit',    recordHit);
router.get('/summary', protect, getSummary);

module.exports = router;