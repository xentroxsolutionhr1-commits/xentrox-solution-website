import { useEffect } from 'react';
import Icon from '../shared/Icon.jsx';
import './About.css';

const founders = [
  {
    name: 'Dr. S. Priya Vasanth',
    role: 'FOUNDER',
    bio: 'Sets the strategic direction across client growth programs and studio operations.',
    image: '/team/priya.jpg',
  },
  {
    name: 'Shahaban B',
    role: 'FOUNDER',
    bio: "Leads client delivery and the studio's marketing & creative practice.",
    image: '/team/shahaban.jpg',
  },
  {
    name: 'Sherin Singh S R',
    role: 'FOUNDER',
    bio: 'Oversees engineering standards across every web and app build.',
    image: '/team/sherin.jpg',
  },
  {
    name: 'Subin S',
    role: 'FOUNDER & CEO',
    bio: 'Drives company vision, partnerships and long-term growth strategy.',
    image: '/team/subin.jpg',
  },
];

export default function About() {
  useEffect(() => {
    // Smooth scroll if navigated with #journey hash
    if (window.location.hash === '#journey') {
      const el = document.getElementById('journey');
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  return (
    <div className="about-page">

      {/* ====================================================================
          SECTION 1 – HERO & MISSION/VISION (DARK FOREST GREEN #064B38 ONLY)
          Unified canvas matching exact visual composition
          ==================================================================== */}
      <section className="about-story-hero" aria-label="About XentroX Solutions">
        {/* Right-Side Integrated Realistic Digital Studio Photograph */}
        <div className="about-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/about/hero-silhouette.jpg"
            alt="Corporate builders and leaders collaborating across modern cityscape"
            className="about-hero-bg-photo"
            loading="eager"
          />
          <div className="about-hero-bg-gradient-overlay" />
        </div>

        {/* Subtle Organic Curved Accent Lines in Background */}
        <div className="about-hero-curves-bg" aria-hidden="true">
          <svg viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none">
            <path
              d="M -50 240 C 260 120, 520 380, 940 180 C 1220 60, 1420 280, 1600 210"
              stroke="#A3E635"
              strokeWidth="1.2"
              strokeOpacity="0.12"
            />
            <path
              d="M -50 340 C 280 180, 620 460, 1040 240 C 1310 120, 1490 340, 1600 270"
              stroke="#A3E635"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
          </svg>
        </div>

        <div className="about-container about-hero-container">
          {/* Upper Hero: Left-aligned Headline */}
          <div className="about-hero-headline-wrap" data-scroll-reveal>
            <h1 className="about-hero-main-title">
              <span className="about-hero-title-line1">Built by builders,</span>
              <span className="about-hero-title-line2">for brands ready to grow.</span>
            </h1>
          </div>

          {/* Lower Hero: Mission & Vision Row directly underneath */}
          <div className="about-hero-vm-row" data-scroll-reveal>
            {/* Left Column: MISSION */}
            <div className="about-vm-item">
              <div className="about-vm-icon-box">
                <Icon name="target" size={26} />
              </div>
              <div className="about-vm-content">
                <h3 className="about-vm-title">MISSION</h3>
                <p className="about-vm-text">
                  To give growing businesses an integrated digital partner — combining marketing strategy, design and engineering — so they can compete with much larger competitors.
                </p>
              </div>
            </div>

            {/* Vertical Divider */}
            <div className="about-vm-divider" aria-hidden="true" />

            {/* Right Column: VISION */}
            <div className="about-vm-item">
              <div className="about-vm-icon-box">
                <Icon name="rocket" size={26} />
              </div>
              <div className="about-vm-content">
                <h3 className="about-vm-title">VISION</h3>
                <p className="about-vm-text">
                  To be South India&apos;s most trusted full-stack digital growth studio, known for measurable results and products that actually ship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 – THE PHILOSOPHY (WHITE / LIGHT BACKGROUND)
          Strict boundary: dark green ends, crisp light background begins
          ==================================================================== */}
      <section className="about-philosophy-section" aria-label="Our Philosophy">
        <div className="about-container">
          <div className="about-philosophy-grid" data-scroll-reveal>
            <div className="about-philosophy-headline">
              <div className="about-philosophy-tag-wrap">
                <span className="about-philosophy-dash" aria-hidden="true" />
                <span className="about-philosophy-mini-tag">THE PHILOSOPHY</span>
              </div>
              <h2>
                One studio, two <br />
                disciplines, endless <br />
                possibilities.
              </h2>
            </div>

            <div className="about-philosophy-body">
              <p>
                XentroX Solutions began with a simple observation: most businesses hire one agency for marketing and another for their website, and the two rarely talk to each other. Campaigns point to slow pages; sites launch with no plan to drive traffic to them.
              </p>
              <p>
                We started XentroX to close that gap — a single studio where strategists, designers and developers work from the same brief, so every campaign and every product decision serves the same growth goal.
              </p>
              <p className="about-philosophy-highlight-p">
                Headquartered across Marthandam, Tamil Nadu and Trivandrum, Kerala, we work with founders and marketing teams across India who want a partner that ships both the strategy and the code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3 – FOUNDERS & LEADERSHIP TEAM (PRESERVED)
          ==================================================================== */}
      <section className="about-leadership-section" aria-label="Founders and Leadership Team">
        <div className="about-container">
          <div className="about-section-header" data-scroll-reveal>
            <div className="about-leadership-pill">
              <span className="about-pill-dash" aria-hidden="true" />
              <span>LEADERSHIP</span>
            </div>
            <h2>Founders &amp; Leadership Team</h2>
            <p>
              The team steering XentroX&apos;s strategy, delivery and culture.
            </p>
          </div>

          <div className="about-founders-grid" data-scroll-reveal>
            {founders.map((founder) => (
              <div key={founder.name} className="about-founder-card">
                <div className="about-founder-photo-box">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="about-founder-img"
                    loading="lazy"
                  />
                </div>
                <div className="about-founder-details">
                  <h3 className="about-founder-name">{founder.name}</h3>
                  <p className="about-founder-role">{founder.role}</p>
                  <p className="about-founder-bio">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 4 – COMPANY MILESTONES / OUR JOURNEY (PRESERVED)
          ==================================================================== */}
      <section className="about-roadmap" id="journey" aria-label="Company Journey and Milestones">
        <div className="about-roadmap-glow" aria-hidden="true" />

        <div className="about-container">
          <div className="about-section-header" data-scroll-reveal>
            <h2>
              Our Journey of{' '}
              <span className="about-roadmap-highlight">Continuous Innovation</span>
            </h2>
            <p>
              From our foundational roots uniting marketing and code to establishing strategic tech hubs and our dedicated academy.
            </p>
          </div>

          {/* ── Roadmap Canvas ── */}
          <div className="about-roadmap-canvas" data-scroll-reveal>
            {/* Curved SVG Pathway (Desktop) */}
            <svg
              className="about-roadmap-svg"
              viewBox="0 0 1200 900"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="roadmapPathGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#A3E635" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#15803D" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#063B2E" stopOpacity="0.5" />
                </linearGradient>
                <filter id="roadmapGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Main curved path */}
              <path
                d="M 600 40 C 600 100, 280 100, 280 200 C 280 300, 920 300, 920 420 C 920 540, 280 540, 280 650 C 280 760, 600 760, 600 860"
                stroke="url(#roadmapPathGrad)"
                strokeWidth="3"
                strokeDasharray="12 6"
                fill="none"
                className="about-roadmap-path"
              />
              {/* Glow trail behind */}
              <path
                d="M 600 40 C 600 100, 280 100, 280 200 C 280 300, 920 300, 920 420 C 920 540, 280 540, 280 650 C 280 760, 600 760, 600 860"
                stroke="#A3E635"
                strokeWidth="1.5"
                strokeOpacity="0.25"
                fill="none"
                filter="url(#roadmapGlow)"
              />

              {/* Milestone Markers on Path */}
              <circle cx="600" cy="40" r="8" fill="#15803D" />
              <circle cx="600" cy="40" r="4" fill="#A3E635" className="about-roadmap-inner-dot" />

              <circle cx="280" cy="200" r="8" fill="#15803D" />
              <circle cx="280" cy="200" r="4" fill="#A3E635" className="about-roadmap-inner-dot" />

              <circle cx="920" cy="420" r="8" fill="#15803D" />
              <circle cx="920" cy="420" r="4" fill="#A3E635" className="about-roadmap-inner-dot" />

              <circle cx="280" cy="650" r="8" fill="#15803D" />
              <circle cx="280" cy="650" r="4" fill="#A3E635" className="about-roadmap-inner-dot" />
            </svg>

            {/* Milestone 01 */}
            <div className="about-roadmap-panel about-rp-1">
              <div className="about-rp-number">01</div>
              <div className="about-rp-card">
                <div className="about-rp-icon-wrap">
                  <Icon name="layers" size={20} />
                </div>
                <span className="about-rp-label">INTEGRATED PODS</span>
                <h3>Company Foundation</h3>
                <p>
                  Establishment of XentroX Solutions with a vision to combine modern technology, creative design, and digital growth under one roof.
                </p>
              </div>
            </div>

            {/* Milestone 02 */}
            <div className="about-roadmap-panel about-rp-2">
              <div className="about-rp-number">02</div>
              <div className="about-rp-card">
                <div className="about-rp-icon-wrap">
                  <Icon name="mapPin" size={20} />
                </div>
                <span className="about-rp-label">TECH CORRIDORS</span>
                <h3>Regional Expansion</h3>
                <p>
                  <strong>Marthandam &amp; Trivandrum.</strong> Expanded operations across our studio and tech hub, harnessing regional engineering talent.
                </p>
              </div>
            </div>

            {/* Milestone 03 */}
            <div className="about-roadmap-panel about-rp-3">
              <div className="about-rp-number">03</div>
              <div className="about-rp-card">
                <div className="about-rp-icon-wrap">
                  <Icon name="shield" size={20} />
                </div>
                <span className="about-rp-label">SKILLS ACADEMY</span>
                <h3>Academy Inception</h3>
                <p>
                  Founded our official academy, bridging academic education with real client systems and industry mentorship.
                </p>
              </div>
            </div>

            {/* Milestone 04 */}
            <div className="about-roadmap-panel about-rp-4">
              <div className="about-rp-number">04</div>
              <div className="about-rp-card">
                <div className="about-rp-icon-wrap">
                  <Icon name="rocket" size={20} />
                </div>
                <span className="about-rp-label">ENTERPRISE SCALE</span>
                <h3>Engineering Excellence</h3>
                <p>
                  Building scalable software solutions, modern digital experiences, and measurable business growth for our partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 5 – BUSINESS LOCATIONS (PRESERVED)
          ==================================================================== */}
      <section className="about-locations-section" aria-label="Studio Locations">
        <div className="about-container">
          <div className="about-locations-wrapper" data-scroll-reveal>
            <div className="about-locations-header">
              <h2>Operating Across South India&apos;s Tech Corridors</h2>
            </div>

            <div className="about-locations-grid">
              <div className="about-location-card">
                <div className="about-location-icon-wrap">
                  <Icon name="mapPin" size={24} />
                </div>
                <div className="about-location-content">
                  <span className="about-location-badge">DELIVERY STUDIO</span>
                  <h3>Marthandam Studio</h3>
                  <p className="about-location-region">Kanyakumari District, Tamil Nadu, India</p>
                  <p className="about-location-desc">
                    Home to our primary creative studio, client pod management, and the XentroX Labs engineering academy.
                  </p>
                </div>
              </div>

              <div className="about-location-card">
                <div className="about-location-icon-wrap">
                  <Icon name="mapPin" size={24} />
                </div>
                <div className="about-location-content">
                  <span className="about-location-badge">TECH HUB</span>
                  <h3>Trivandrum Tech Hub</h3>
                  <p className="about-location-region">Technopark Corridor, Kerala, India</p>
                  <p className="about-location-desc">
                    Embedded in the Technopark corridor, driving enterprise software engineering and cloud infrastructure sprints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
