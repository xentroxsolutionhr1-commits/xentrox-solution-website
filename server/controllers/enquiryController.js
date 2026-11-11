const Enquiry = require('../models/Enquiry');

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required.' });
    }
    const enquiry = await Enquiry.create({
      name: name.trim(),
      email: email.trim(),
      phone: (phone || '').trim(),
      service: (service || 'General Inquiry').trim(),
      message: (message || 'No message provided').trim(),
    });
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const markEnquiryRead = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found.' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found.' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getEnquiries, createEnquiry, markEnquiryRead, deleteEnquiry };
