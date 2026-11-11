const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    service: { type: String, trim: true, default: 'General Inquiry' },
    message: { type: String, trim: true, default: 'No message provided', maxlength: 5000 },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

enquirySchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Enquiry', enquirySchema);
