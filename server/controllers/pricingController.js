const Pricing = require('../models/Pricing');
const { DEFAULT_PRICING } = require('../config/pricingDefaults');

const getPricing = async (req, res) => {
  try {
    const pricing = await Pricing.findOne({ key: 'main' }).lean();
    res.json({ plans: pricing?.plans ?? DEFAULT_PRICING });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updatePricing = async (req, res) => {
  try {
    const { plans } = req.body;
    const validIds = ['starter', 'professional', 'enterprise'];
    if (
      !Array.isArray(plans) ||
      plans.length !== validIds.length ||
      plans.some((plan) => !plan || typeof plan !== 'object') ||
      !validIds.every((id) =>
        plans.some((plan) =>
          plan.id === id &&
          typeof plan.price === 'string' &&
          plan.price.trim() &&
          plan.price.trim().length <= 40 &&
          typeof plan.period === 'string' &&
          plan.period.trim() &&
          plan.period.trim().length <= 32
        )
      )
    ) {
      return res.status(400).json({ error: 'Provide a price and billing period for each plan.' });
    }

    const normalizedPlans = validIds.map((id) => {
      const plan = plans.find((item) => item.id === id);
      return { id, price: plan.price.trim(), period: plan.period.trim() };
    });

    const pricing = await Pricing.findOneAndUpdate(
      { key: 'main' },
      { $set: { plans: normalizedPlans } },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json({ plans: pricing.plans });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getPricing, updatePricing };
