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
          SECTION 1 – HERO & MISSION/VISION
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

        {/* Curved bottom edge wave like pricing */}
        <div className="about-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 – THE PHILOSOPHY (EDITORIAL SPLIT & HIGHLIGHT BANNER)
          ==================================================================== */}
      <section className="about-philosophy-section" aria-label="Our Philosophy">
        {/* Decorative Subtle Geometric Line Art Left & Right */}
        <svg
          className="about-philosophy-geo about-philosophy-geo--left"
          viewBox="0 0 260 420"
          fill="none"
          aria-hidden="true"
        >
          <line x1="-20" y1="140" x2="145" y2="-10" stroke="currentColor" strokeWidth="1" />
          <rect
            x="-45"
            y="105"
            width="160"
            height="220"
            rx="26"
            transform="rotate(-28 -45 105)"
            stroke="currentColor"
            strokeWidth="1"
          />
          <rect
            x="-28"
            y="128"
            width="140"
            height="195"
            rx="22"
            transform="rotate(-28 -28 128)"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        <svg
          className="about-philosophy-geo about-philosophy-geo--right"
          viewBox="0 0 260 420"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="95"
            y="35"
            width="190"
            height="270"
            rx="32"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line x1="125" y1="45" x2="270" y2="195" stroke="currentColor" strokeWidth="1" />
          <line x1="155" y1="20" x2="280" y2="150" stroke="currentColor" strokeWidth="1" />
        </svg>

        <div className="about-container about-philosophy-container">
          <div className="about-philosophy-wrap" data-scroll-reveal>
            {/* Top Centered Eyebrow & Headline */}
            <div className="about-philosophy-header">
              <span className="about-philosophy-eyebrow">THE PHILOSOPHY</span>
              <h2 className="about-philosophy-title">
                One <span className="about-philosophy-title-accent">studio</span>, two{' '}
                <span className="about-philosophy-title-accent">disciplines</span>,
                <br />
                endless possibilities.
              </h2>
            </div>

            {/* Middle Two-Column Comparison with Step-Arrow Connector */}
            <div className="about-philosophy-columns">
              {/* Left Column: The Observational Gap */}
              <div className="about-philosophy-col about-philosophy-col--left">
                <div className="about-philosophy-col-head">
                  <span className="about-philosophy-col-label">THE OBSERVATIONAL GAP</span>
                  <span className="about-philosophy-connector-line" aria-hidden="true">
                    <svg
                      className="about-philosophy-connector-elbow"
                      viewBox="0 0 36 44"
                      fill="none"
                    >
                      <path
                        d="M0 1H14C17.3137 1 20 3.68629 20 7V33C20 36.3137 22.6863 39 26 39H34"
                        stroke="#6E8078"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M30 35L34.5 39L30 43"
                        stroke="#6E8078"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="about-philosophy-col-text">
                  XentroX Solutions began with a simple observation: most businesses hire one agency for marketing and another for their website, and the two rarely talk to each other. Campaigns point to slow pages; sites launch with no plan to drive traffic to them.
                </p>
              </div>

              {/* Right Column: Our Unified Approach */}
              <div className="about-philosophy-col about-philosophy-col--right">
                <div className="about-philosophy-col-head">
                  <span className="about-philosophy-col-label">OUR UNIFIED APPROACH</span>
                </div>
                <p className="about-philosophy-col-text">
                  We started XentroX to close that gap — a single studio where strategists, designers and developers work from the same brief, so every campaign and every product decision serves the same growth goal.
                </p>
              </div>
            </div>

            {/* Bottom Mint-Green Highlight Banner Card */}
            <div className="about-philosophy-banner">
              {/* Left: India Map with Marthandam & Trivandrum Pins */}
              <div className="about-philosophy-banner-map">
                <img
                  src="/about/india-locations-map.png"
                  alt="India map highlighting Marthandam and Trivandrum studios"
                  className="about-philosophy-map-img"
                />
              </div>

              {/* Center: Studio Statement */}
              <p className="about-philosophy-banner-text">
                Headquartered across Marthandam, Tamil Nadu and Trivandrum, Kerala, we work with founders and marketing teams across India who want a partner that ships both the strategy and the code.
              </p>

              {/* Right: Strategy Clipboard + Code Window Icon */}
              <div className="about-philosophy-banner-icon" aria-hidden="true">
                <svg viewBox="0 0 56 56" fill="none" className="about-philosophy-strategy-svg">
                  {/* Strategy Clipboard */}
                  <path
                    d="M16 10H11C9.34315 10 8 11.3431 8 13V42C8 43.6569 9.34315 45 11 45H27"
                    stroke="#0A291D"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M27 10H32C33.6569 10 35 11.3431 35 13V26"
                    stroke="#0A291D"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Clipboard Top Clip */}
                  <rect
                    x="16"
                    y="7"
                    width="11"
                    height="5"
                    rx="1.5"
                    fill="#E7F4EA"
                    stroke="#0A291D"
                    strokeWidth="1.8"
                  />
                  {/* Tactical 'X' top-left of board */}
                  <path
                    d="M13 18L16.5 21.5M16.5 18L13 21.5"
                    stroke="#0A291D"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  {/* Strategy Curved Arrow & Target Circle */}
                  <circle cx="14.5" cy="35.5" r="2.2" stroke="#0A291D" strokeWidth="1.6" />
                  <path
                    d="M16.5 34C20 31.5 21 25 27.5 20"
                    stroke="#0A291D"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M24 19.5H28V23.5"
                    stroke="#0A291D"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Overlapping Code Window (Bottom-Right) */}
                  <rect
                    x="26"
                    y="28"
                    width="22"
                    height="18"
                    rx="2.5"
                    fill="#E7F4EA"
                    stroke="#0A291D"
                    strokeWidth="1.8"
                  />
                  <line x1="26" y1="33" x2="48" y2="33" stroke="#0A291D" strokeWidth="1.6" />
                  <circle cx="29.5" cy="30.5" r="0.8" fill="#0A291D" />
                  <circle cx="32" cy="30.5" r="0.8" fill="#0A291D" />
                  <circle cx="34.5" cy="30.5" r="0.8" fill="#0A291D" />
                  {/* Code Brackets </> */}
                  <path
                    d="M33.5 37.5L31 39.5L33.5 41.5"
                    stroke="#0A291D"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40.5 37.5L43 39.5L40.5 41.5"
                    stroke="#0A291D"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M38 36.8L36 42.2"
                    stroke="#0A291D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
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
