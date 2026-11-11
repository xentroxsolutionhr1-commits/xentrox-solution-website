const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    type: { type: String, required: true, trim: true, default: 'Full Time' },
    location: { type: String, required: true, trim: true, default: 'Hybrid' },
    category: { type: String, required: true, trim: true, default: 'Development' },
    description: { type: String, required: true, trim: true, maxlength: 3000 },
    skills: [{ type: String, trim: true }],
    icon: { type: String, default: 'code' },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

careerSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Career', careerSchema);

