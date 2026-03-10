const express  = require('express');
const router   = express.Router();
const { protect } = require('../middleware/auth');
const { getContacts, updateContactStatus, deleteContact } = require('../controllers/contactController');

router.use(protect);
router.get('/contacts',              getContacts);
router.patch('/contacts/:id/status', updateContactStatus);
router.delete('/contacts/:id',       deleteContact);

module.exports = router;