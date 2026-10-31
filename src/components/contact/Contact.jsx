import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import './Contact.css';

const servicesList = [
  'Web & App Development',
  'SEO & Content Marketing',
  'Social Media Marketing',
  'Branding & UI/UX Design',
  'Custom Software Engineering',
  'Growth Retainer / Plan Inquiry',
  'General Inquiry',
];

const contactDetails = {
  email: 'hello@xentroxsolutions.com',
  phone: '+91 98765 43210',
  phoneHref: '+919876543210',
  hours: 'Mon – Fri, 9:00 AM – 6:00 PM IST',
  website: 'https://xentroxsolutions.com',
  studios: [
    {
      name: 'Marthandam Studio',
      address: 'Kanyakumari District, Tamil Nadu, India',
    },
    {
      name: 'Trivandrum Tech Hub',
      address: 'Technopark Corridor, Kerala, India',
    },
  ],
  socials: [
    { name: 'linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
    { name: 'twitter', href: 'https://twitter.com', label: 'Twitter' },
    { name: 'github', href: 'https://github.com', label: 'GitHub' },
    { name: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
    { name: 'facebook', href: 'https://facebook.com', label: 'Facebook' },
  ],
};

export default function Contact() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Web & App Development',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (planParam) {
      const planName = planParam.charAt(0).toUpperCase() + planParam.slice(1);
      setFormData((prev) => ({
        ...prev,
        service: 'Growth Retainer / Plan Inquiry',
        message: prev.message || `Hi, I am interested in getting started with the ${planName} Plan.`,
      }));
    }
  }, [planParam]);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    }
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief message or project details';
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate realistic async submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: 'Web & App Development',
      message: '',
    });
    setErrors({});
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* ====================================================================
          SECTION 1 — HERO SECTION (FULL-WIDTH DARK FOREST GREEN #064B38)
          ==================================================================== */}
      <section className="contact-hero" aria-label="Contact XentroX Solutions">
        {/* Right-Side Full-Bleed Blended Photograph */}
        <div className="contact-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/contact/contact-hero.jpg"
            alt="Modern digital agency workspace with laptop and communication interface"
            className="contact-hero-bg-photo"
            loading="eager"
          />
          <div className="contact-hero-bg-gradient-overlay" />
        </div>

        {/* Subtle decorative curved background lines */}
        <div className="contact-hero-lines" aria-hidden="true">
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

        <div className="contact-container contact-hero-container">
          <div className="contact-hero-grid">
            {/* Left Content Column */}
            <div className="contact-hero-content" data-scroll-reveal>
              <h1 className="contact-hero-heading">
                Let&apos;s <span className="contact-lime-highlight">Talk</span>
              </h1>
              <p className="contact-hero-desc">
                Have a project in mind? Let&apos;s build something great together.
              </p>
            </div>
          </div>
        </div>

        {/* Curved bottom edge wave transition */}
        <div className="contact-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — CONTACT SECTION (CLEAN WHITE BACKGROUND #FFFFFF)
          Two-column layout: Form on Left, Contact Info on Right
          ==================================================================== */}
      <section className="contact-main-section" aria-label="Send a message or get in touch">
        <div className="contact-container">
          <div className="contact-main-grid">
            {/* Left Column: Contact Form */}
            <div className="contact-form-column" data-scroll-reveal>
              <div className="contact-form-card">
                <div className="contact-section-intro">
                  <span className="contact-section-eyebrow">MESSAGE US</span>
                  <h2 className="contact-section-heading">Send Us a Message</h2>
                  <p className="contact-section-subtext">
                    Fill out the form below and we will get back to you with ideas and next steps.
                  </p>
                </div>

                {isSubmitted ? (
                  <div className="contact-success-box" role="status">
                    <div className="contact-success-icon-wrap">
                      <Icon name="check" size={28} />
                    </div>
                    <h3 className="contact-success-title">Message Received!</h3>
                    <p className="contact-success-desc">
                      Thank you, <strong className="contact-success-name">{formData.name}</strong>. We have received your inquiry and our team will get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="contact-btn-secondary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    {/* Name & Email Row */}
                    <div className="contact-form-row">
                      <div className="contact-field-group">
                        <label htmlFor="contact-name" className="contact-label">
                          Full Name <span className="contact-required">*</span>
                        </label>
                        <input
                          id="contact-name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Alex Morgan"
                          className={`contact-input ${errors.name ? 'contact-input-error' : ''}`}
                          autoComplete="name"
                        />
                        {errors.name && (
                          <span className="contact-error-msg">{errors.name}</span>
                        )}
                      </div>

                      <div className="contact-field-group">
                        <label htmlFor="contact-email" className="contact-label">
                          Email Address <span className="contact-required">*</span>
                        </label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className={`contact-input ${errors.email ? 'contact-input-error' : ''}`}
                          autoComplete="email"
                        />
                        {errors.email && (
                          <span className="contact-error-msg">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Phone & Service Row */}
                    <div className="contact-form-row">
                      <div className="contact-field-group">
                        <label htmlFor="contact-phone" className="contact-label">
                          Phone Number <span className="contact-optional">(Optional)</span>
                        </label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="contact-input"
                          autoComplete="tel"
                        />
                      </div>

                      <div className="contact-field-group">
                        <label htmlFor="contact-service" className="contact-label">
                          Service of Interest
                        </label>
                        <div className="contact-select-wrap">
                          <select
                            id="contact-service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="contact-select"
                          >
                            {servicesList.map((svc) => (
                              <option key={svc} value={svc}>
                                {svc}
                              </option>
                            ))}
                          </select>
                          <span className="contact-select-arrow" aria-hidden="true">
                            <Icon name="chevronDown" size={14} />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div className="contact-field-group">
                      <label htmlFor="contact-message" className="contact-label">
                        Project Details &amp; Message <span className="contact-required">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project, goals, or timeline..."
                        className={`contact-textarea ${errors.message ? 'contact-input-error' : ''}`}
                      />
                      {errors.message && (
                        <span className="contact-error-msg">{errors.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="contact-form-actions">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="contact-submit-btn"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="contact-spinner" aria-hidden="true" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Icon name="arrowRight" size={16} />
                          </>
                        )}
                      </button>
                      <span className="contact-response-promise">
                        <span className="contact-promise-dot" />
                        Dedicated response within 24 hours
                      </span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: Contact Information */}
            <div className="contact-info-column" data-scroll-reveal>
              <div className="contact-info-card">
                <div className="contact-section-intro">
                  <span className="contact-section-eyebrow">CONTACT DETAILS</span>
                  <h2 className="contact-section-heading">Get in Touch</h2>
                  <p className="contact-section-subtext">
                    Reach out directly through email, phone, or connect with our studios.
                  </p>
                </div>

                <div className="contact-details-list">
                  {/* Email Channel */}
                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Icon name="mail" size={20} />
                    </div>
                    <div className="contact-detail-body">
                      <span className="contact-detail-tag">EMAIL US</span>
                      <a
                        href={`mailto:${contactDetails.email}`}
                        className="contact-detail-link"
                      >
                        {contactDetails.email}
                      </a>
                      <span className="contact-detail-meta">Inquiries &amp; proposals</span>
                    </div>
                  </div>

                  <div className="contact-divider" />

                  {/* Phone Channel */}
                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Icon name="phone" size={20} />
                    </div>
                    <div className="contact-detail-body">
                      <span className="contact-detail-tag">CALL &amp; WHATSAPP</span>
                      <a
                        href={`tel:${contactDetails.phoneHref}`}
                        className="contact-detail-link"
                      >
                        {contactDetails.phone}
                      </a>
                      <span className="contact-detail-meta">{contactDetails.hours}</span>
                    </div>
                  </div>

                  <div className="contact-divider" />

                  {/* Studio Locations */}
                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Icon name="mapPin" size={20} />
                    </div>
                    <div className="contact-detail-body">
                      <span className="contact-detail-tag">STUDIO LOCATIONS</span>
                      <div className="contact-studios-stack">
                        {contactDetails.studios.map((studio) => (
                          <div key={studio.name} className="contact-studio-entry">
                            <h4 className="contact-studio-name">{studio.name}</h4>
                            <p className="contact-studio-address">{studio.address}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="contact-divider" />

                  {/* Website & Official Academy */}
                  <div className="contact-detail-item">
                    <div className="contact-icon-box">
                      <Icon name="globe" size={20} />
                    </div>
                    <div className="contact-detail-body">
                      <span className="contact-detail-tag">ONLINE STUDIO &amp; ACADEMY</span>
                      <a
                        href={contactDetails.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="contact-detail-link"
                      >
                        xentroxsolutions.com
                      </a>
                      <span className="contact-detail-meta">
                        Official Academy: <strong className="contact-labs-highlight">XentroX Labs</strong>
                      </span>
                    </div>
                  </div>

                  <div className="contact-divider" />

                  {/* Social Links */}
                  <div className="contact-socials-block">
                    <span className="contact-detail-tag">CONNECT WITH US</span>
                    <div className="contact-social-icons">
                      {contactDetails.socials.map((s) => (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={s.label}
                          className="contact-social-btn"
                        >
                          <Icon name={s.name} size={16} />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

