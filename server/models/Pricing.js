const mongoose = require('mongoose');

const planPriceSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, enum: ['starter', 'professional', 'enterprise'] },
    price: { type: String, required: true, trim: true, maxlength: 40 },
    period: { type: String, required: true, trim: true, maxlength: 32 },
  },
  { _id: false }
);

const pricingSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'main' },
    plans: {
      type: [planPriceSchema],
      required: true,
      validate: {
        validator: (plans) =>
          plans.length === 3 &&
          ['starter', 'professional', 'enterprise'].every((id) =>
            plans.some((plan) => plan.id === id)
          ),
        message: 'All three pricing plans must be provided.',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pricing', pricingSchema);
