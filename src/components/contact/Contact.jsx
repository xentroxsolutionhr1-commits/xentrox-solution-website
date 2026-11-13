import { useState } from 'react';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
import { useSearchParams } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import './Contact.css';

const serviceOptions = [
  'Web & App Development',
  'Mobile Product / App',
  'Cloud Architecture & AI',
  'Branding & UI/UX Design',
  'SEO & Organic Growth',
  'Custom Software / Retainer',
];

const contactDetails = {
  email: 'hello@xentroxsolutions.com',
  phone: '+91 98765 43210',
  phoneHref: '+919876543210',
};

function mapServiceParamToOption(serviceParam) {
  if (!serviceParam) return '';
  if (serviceOptions.includes(serviceParam)) return serviceParam;
  const normalized = serviceParam.toLowerCase();
  if (/mobile|api integration|maintenance/.test(normalized)) return 'Mobile Product / App';
  if (/website|react|node\.js|web app/.test(normalized)) return 'Web & App Development';
  if (/brand|graphic|logo|video|photography/.test(normalized)) return 'Branding & UI/UX Design';
  if (/seo|content marketing|social media|facebook|instagram|linkedin|google ads/.test(normalized)) {
    return 'SEO & Organic Growth';
  }
  return 'Custom Software / Retainer';
}

function getQueryPrefill(planParam, serviceParam) {
  if (planParam) {
    const planName = planParam.charAt(0).toUpperCase() + planParam.slice(1);
    return {
      service: 'Custom Software / Retainer',
      message: `Hi, I would like to get started with the ${planName} Plan.`,
    };
  }
  if (serviceParam) {
    return {
      service: mapServiceParamToOption(serviceParam),
      message: `Hi, I would like to learn more about ${serviceParam}.`,
    };
  }
  return { service: '', message: '' };
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');
  const serviceParam = searchParams.get('service');
  const queryKey = `${planParam || ''}|${serviceParam || ''}`;

  const [prevQueryKey, setPrevQueryKey] = useState(queryKey);
  const [formData, setFormData] = useState(() => {
    const prefill = getQueryPrefill(planParam, serviceParam);
    return {
      name: '',
      email: '',
      phone: '',
      company: '',
      service: prefill.service,
      message: prefill.message,
    };
  });

  if (prevQueryKey !== queryKey) {
    setPrevQueryKey(queryKey);
    const prefill = getQueryPrefill(planParam, serviceParam);
    if (prefill.service || prefill.message) {
      setFormData((prev) => ({
        ...prev,
        service: prefill.service || prev.service,
        message: prev.message || prefill.message,
      }));
    }
  }

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) {
      errs.message = 'Message is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    try {
      const messageContent = formData.company.trim()
        ? `[Company: ${formData.company.trim()}] ${formData.message.trim()}`
        : formData.message.trim();

      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service || 'General Inquiry',
          message: messageContent,
        }),
      });

      if (!response.ok) {
        let msg = 'Failed to submit enquiry';
        try {
          const data = await response.json();
          if (data.error) msg = data.error;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: '',
    });
    setErrors({});
    setSubmitError('');
    setIsSubmitted(false);
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero" aria-label="Contact XentroX Solutions">
        <div className="contact-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/contact/contact-hero.jpg"
            alt="XentroX digital workspace"
            className="contact-hero-bg-photo"
            loading="eager"
            decoding="async"
          />
          <div className="contact-hero-bg-gradient-overlay" />
        </div>

        <div className="contact-container contact-hero-container">
          <div className="contact-hero-content">
            <h1 className="contact-hero-heading">
              Let&apos;s build something <span className="contact-lime-highlight">remarkable.</span>
            </h1>
            <p className="contact-hero-desc">
              Have an ambitious product in mind, need technical acceleration, or want to scale your digital presence? Connect directly with our team.
            </p>
          </div>
        </div>

        <div className="contact-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#F4FAF6"
            />
          </svg>
        </div>
      </section>

      {/* Main Clean Contact Section */}
      <section className="contact-main-section" aria-label="Contact form and studio details">
        <div className="contact-container">
          <div className="contact-clean-grid">
            {/* Left Column: Simple Clean Form Card */}
            <div className="contact-form-card">
              {isSubmitted ? (
                <div className="contact-form-success">
                  <div className="contact-success-icon">
                    <Icon name="check" size={28} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. We received your message and will get back to you within 24 hours.
                  </p>
                  <button type="button" onClick={handleReset} className="contact-send-another-btn">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-simple-form" noValidate>
                  {submitError && <div className="contact-simple-alert">{submitError}</div>}

                  {/* Row 1: Name & Email */}
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-name" className="contact-label">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`contact-input ${errors.name ? 'input-error' : ''}`}
                        autoComplete="name"
                      />
                      {errors.name && <span className="contact-field-error">{errors.name}</span>}
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-email" className="contact-label">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`contact-input ${errors.email ? 'input-error' : ''}`}
                        autoComplete="email"
                      />
                      {errors.email && <span className="contact-field-error">{errors.email}</span>}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label htmlFor="contact-phone" className="contact-label">Phone</label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="contact-input"
                        autoComplete="tel"
                      />
                    </div>

                    <div className="contact-form-group">
                      <label htmlFor="contact-company" className="contact-label">Company</label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="contact-input"
                        autoComplete="organization"
                      />
                    </div>
                  </div>

                  {/* Row 3: Required Service */}
                  <div className="contact-form-group">
                    <label htmlFor="contact-service" className="contact-label">Required Service</label>
                    <div className="contact-select-wrap">
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="contact-select"
                      >
                        <option value="">Select a service</option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span className="contact-select-arrow" aria-hidden="true">
                        <Icon name="chevronDown" size={16} />
                      </span>
                    </div>
                  </div>

                  {/* Row 4: Message */}
                  <div className="contact-form-group">
                    <label htmlFor="contact-message" className="contact-label">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or goals..."
                      className={`contact-textarea ${errors.message ? 'input-error' : ''}`}
                    />
                    {errors.message && <span className="contact-field-error">{errors.message}</span>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="contact-submit-button"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Icon name="arrowRight" size={16} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Clean Cards (Map, Office Info, Direct Info) */}
            <div className="contact-side-cards">
              {/* Card 1: Stylized Map Card (Clickable to Google Maps) */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=XentroX+Solutions+Mamootukadai"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-map-card"
                title="View XentroX Solutions Mamootukadai on Google Maps"
              >
                <div className="contact-map-grid-bg" aria-hidden="true">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="clean-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(16, 185, 129, 0.14)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#clean-grid)" />
                  </svg>
                </div>
                <div className="contact-map-pin-wrap">
                  <div className="contact-map-pin-pulse" />
                  <div className="contact-map-pin-icon">
                    <Icon name="mapPin" size={20} />
                  </div>
                  <span className="contact-map-pin-label">XentroX Studios — TN &amp; KL</span>
                  <span className="contact-map-hint">Open in Google Maps ↗</span>
                </div>
              </a>

              {/* Card 2: Office Information */}
              <div className="contact-info-card">
                <h3 className="contact-info-card-title">Office Information</h3>

                <div className="contact-office-item">
                  <h4 className="contact-office-city">Marthandam, Tamil Nadu</h4>
                  <p className="contact-office-desc">Founding studio &amp; client delivery hub.</p>
                </div>

                <div className="contact-office-item">
                  <h4 className="contact-office-city">Trivandrum, Kerala</h4>
                  <p className="contact-office-desc">Engineering &amp; product development studio.</p>
                </div>
              </div>

              {/* Card 3: Direct Contact */}
              <div className="contact-info-card">
                <h3 className="contact-info-card-title">Direct Contact</h3>

                <div className="contact-office-item">
                  <span className="contact-direct-label">Email</span>
                  <a href={`mailto:${contactDetails.email}`} className="contact-direct-val">
                    {contactDetails.email}
                  </a>
                </div>

                <div className="contact-office-item">
                  <span className="contact-direct-label">Phone &amp; WhatsApp</span>
                  <a href={`tel:${contactDetails.phoneHref}`} className="contact-direct-val">
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
