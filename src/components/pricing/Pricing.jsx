import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import './Pricing.css';

const plans = [
  {
    name: 'Starter',
    price: '₹19,999',
    period: '/month',
    description: 'For small businesses starting their digital journey.',
    popular: false,
    buttonText: 'Get Started',
    buttonLink: '/contact?plan=starter',
    features: [
      'Local SEO & Google Business setup',
      '8 social media posts / month',
      '1 platform managed (Instagram or Facebook)',
      'Monthly performance report',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '₹49,999',
    period: '/month',
    description: 'For growing brands ready to scale across channels.',
    popular: true,
    buttonText: 'Get Started',
    buttonLink: '/contact?plan=professional',
    features: [
      'Full technical & content SEO',
      '20 social posts + paid ad management',
      'Instagram, Facebook & LinkedIn',
      'Google Ads management',
      'Bi-weekly strategy calls',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'Pricing',
    description: 'For established businesses needing a full growth team.',
    popular: false,
    buttonText: 'Contact Sales',
    buttonLink: '/contact?plan=enterprise',
    features: [
      'Everything in Professional',
      'Dedicated growth team',
      'Custom website / web app development',
      'Mobile app development',
      'Advanced analytics & attribution',
      'Dedicated account manager',
    ],
  },
];

const faqs = [
  {
    question: 'Can I switch plans later?',
    answer:
      'Yes, absolutely. You can upgrade, downgrade, or customize your plan at any time to match your evolving business needs. Your changes will take effect at the start of your next billing cycle.',
  },
  {
    question: 'Is there a minimum contract length?',
    answer:
      'Our standard plans are billed on a flexible month-to-month basis with no long-term lock-in required. For enterprise custom builds or dedicated growth pods, we typically recommend a 3 to 6-month partnership for compounding impact.',
  },
  {
    question: 'Do website and app projects fit these plans?',
    answer:
      'Web and mobile application development is included directly in our Enterprise plan. For standalone design or development sprints outside a monthly growth retainer, we also offer custom fixed-scope project quotes.',
  },
];

export default function Pricing() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="pricing-page">
      {/* ====================================================================
          SECTION 1 — HERO SECTION (FULL-WIDTH DARK FOREST GREEN #064B38)
          ==================================================================== */}
      <section className="pricing-hero" aria-label="XentroX Pricing Plans">
        {/* Right-side Integrated Financial Growth Visual */}
        <div className="pricing-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/pricing/pricing-hero.jpg"
            alt="Business professionals analyzing financial growth charts and investments"
            className="pricing-hero-bg-photo"
            loading="eager"
          />
          <div className="pricing-hero-bg-gradient-overlay" />
        </div>

        {/* Subtle decorative curved background lines */}
        <div className="pricing-hero-lines" aria-hidden="true">
          <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <path
              d="M-50 240 C260 110, 560 390, 960 160 C1240 20, 1420 230, 1600 180"
              stroke="#A3E635"
              strokeWidth="1.2"
              strokeOpacity="0.12"
            />
            <path
              d="M-50 340 C300 180, 680 440, 1080 220 C1320 90, 1480 290, 1600 240"
              stroke="#A3E635"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
          </svg>
        </div>

        <div className="pricing-container pricing-hero-container">
          <div className="pricing-hero-grid">
            {/* Left Content Column */}
            <div className="pricing-hero-content" data-scroll-reveal>
              <h1 className="pricing-hero-heading">
                Flexible Plans for Your{' '}
                <span className="pricing-lime-highlight">Growth</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Curved bottom edge wave */}
        <div className="pricing-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — PRICING CARDS SECTION (CLEAN WHITE BACKGROUND #FFFFFF)
          ==================================================================== */}
      <section className="pricing-plans-section" id="plans">
        <div className="pricing-container">
          <div className="pricing-cards-grid">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`pricing-card ${plan.popular ? 'pricing-card-popular' : 'pricing-card-standard'}`}
                data-scroll-reveal
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="pricing-popular-badge">
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="pricing-card-header">
                  <h2 className="pricing-card-title">{plan.name}</h2>
                  <p className="pricing-card-desc">{plan.description}</p>
                </div>

                <div className="pricing-card-price-wrap">
                  <div className="pricing-card-price">
                    <span className="pricing-price-num">{plan.price}</span>
                    <span className="pricing-price-period">{plan.period}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="pricing-features-list">
                  {plan.features.map((feature) => (
                    <li key={feature} className="pricing-feature-item">
                      <span className="pricing-feature-icon">
                        <Icon name="check" size={15} />
                      </span>
                      <span className="pricing-feature-text">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="pricing-card-cta-wrap">
                  <Link
                    to={plan.buttonLink}
                    className={`pricing-card-btn ${
                      plan.popular ? 'pricing-btn-primary' : 'pricing-btn-secondary'
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <Icon name="arrowRight" size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4 — FAQ SECTION (CLEAN MODERN EXPANDABLE ACCORDION)
          ==================================================================== */}
      <section className="pricing-faq-section" id="faq">
        <div className="pricing-container">
          <div className="pricing-faq-header" data-scroll-reveal>
            <span className="pricing-faq-eyebrow">COMMON QUESTIONS</span>
            <h2 className="pricing-faq-heading">Frequently Asked Questions</h2>
            <p className="pricing-faq-desc">
              Everything you need to know about our flexible plans, delivery, and onboarding.
            </p>
          </div>

          <div className="pricing-faq-list" data-scroll-reveal>
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`pricing-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    className="pricing-faq-trigger"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="pricing-faq-question">{faq.question}</span>
                    <span className="pricing-faq-icon-wrap" aria-hidden="true">
                      <Icon
                        name="chevronDown"
                        size={18}
                        className={`pricing-faq-chevron ${isOpen ? 'is-rotated' : ''}`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pricing-faq-content">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5 — FINAL CTA SECTION (DARK FOREST GREEN BANNER)
          ==================================================================== */}
      <section className="pricing-cta-section">
        <div className="pricing-container">
          <div className="pricing-cta-banner" data-scroll-reveal>
            <div className="pricing-cta-content">
              <h2 className="pricing-cta-heading">Ready to take the next step?</h2>
              <p className="pricing-cta-desc">
                Choose your plan and start building something amazing today.
              </p>
            </div>
            <div className="pricing-cta-action">
              <Link to="/contact" className="pricing-cta-btn">
                <span>Get Started</span>
                <Icon name="arrowRight" size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

