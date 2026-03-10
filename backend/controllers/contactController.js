const Contact = require('../models/Contact');
const { sendContactEmail } = require('../utils/sendEmail');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ success: false, message: 'All fields are required.' });

    const contact = await Contact.create({ name, email, subject, message, ipAddress: req.ip });

    try { await sendContactEmail({ name, email, subject, message }); }
    catch (e) { console.error('Email failed:', e.message); }

    return res.status(201).json({ success: true, message: 'Message sent! I will reply within 24 hours.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, data: contacts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!contact) return res.status(404).json({ success: false, message: 'Contact not found.' });
    return res.json({ success: true, data: contact });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Deleted.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitContact, getContacts, updateContactStatus, deleteContact };