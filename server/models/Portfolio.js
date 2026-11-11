const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true, trim: true, maxlength: 200 },
    projectDescription: { type: String, required: true, trim: true, maxlength: 3000 },
    projectTechStack: [{ type: String, trim: true }],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

portfolioSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model('Portfolio', portfolioSchema);

