import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import './Portfolio.css';

export default function Portfolio() {
  return (
    <div className="portfolio-page">

      {/* ====================================================================
          1. HERO SECTION – THE PROJECT JOURNAL / SELECTED WORK
          Editorial Split Layout: Left Headline & Intro, Right Studio Photo
          ==================================================================== */}
      <section className="pj-hero-section" aria-label="Portfolio Introduction">
        <div className="pj-container">
          <div className="pj-hero-split" data-scroll-reveal>

            {/* Left Side: Headline & Editorial Intro */}
            <div className="pj-hero-text">
              <div className="pj-journal-badge">
                <span className="pj-badge-dot" aria-hidden="true" />
                <span>SELECTED WORK / 2026</span>
              </div>

              <h1 className="pj-hero-title">
                <span className="pj-title-forest">Good work.</span>
                <span className="pj-title-lime">Real-world impact.</span>
              </h1>

              <p className="pj-hero-lead">
                Explore our creative projects where strategy, design and technology help businesses grow.
              </p>

              <div className="pj-hero-caption-wrap">
                <span className="pj-hero-caption-line" aria-hidden="true" />
                <span className="pj-hero-caption-text">A selection of work built with purpose.</span>
              </div>
            </div>

            {/* Right Side: Large Realistic Agency Studio Photograph */}
            <div className="pj-hero-photo-wrap">
              <div className="pj-hero-photo-frame">
                <img
                  src="/about/team-collaboration.jpg"
                  alt="XentroX digital studio team collaborating on client strategy in a modern workspace"
                  className="pj-hero-photo"
                  loading="eager"
                />
                <div className="pj-hero-photo-overlay" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          2. FEATURED PROJECT – 01 / GREENROOTS ORGANICS
          Full-Width Visual Highlight on Deep Forest Green Canvas
          ==================================================================== */}
      <section className="pj-featured-section" aria-label="Featured Project: GreenRoots Organics">
        <div className="pj-container">
          <div className="pj-featured-card" data-scroll-reveal>

            {/* Featured Left Content */}
            <div className="pj-featured-content">
              <div className="pj-featured-meta">
                <span className="pj-featured-num">01</span>
                <span className="pj-meta-sep" aria-hidden="true">/</span>
                <span className="pj-featured-client">GREENROOTS ORGANICS</span>
              </div>

              <span className="pj-featured-tag">SEO &amp; DIGITAL GROWTH</span>

              <h2 className="pj-featured-headline">
                Turning local discovery into lasting growth.
              </h2>

              <p className="pj-featured-desc">
                Local and technical SEO overhaul for a farm-to-table grocery chain — organic sessions tripled in six months.
              </p>

              <div className="pj-featured-tags-row">
                <span className="pj-tech-chip">Technical SEO</span>
                <span className="pj-tech-chip">Local Console</span>
                <span className="pj-tech-chip">Schema Markup</span>
                <span className="pj-tech-chip">Speed Optimization</span>
              </div>

              <div className="pj-featured-cta">
                <Link to="/contact" className="pj-link-lime">
                  <span>Explore case study</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Featured Right Realistic Organic Produce Imagery */}
            <div className="pj-featured-visual">
              <div className="pj-featured-img-frame">
                <img
                  src="/portfolio/photos/greenroots-organic.jpg"
                  alt="Fresh farm-to-table organic produce and sustainable grocery store display"
                  className="pj-featured-img"
                  loading="lazy"
                />
                <div className="pj-featured-img-overlay" aria-hidden="true" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================================
          3. EDITORIAL PROJECT SHOWCASE (02 - 06)
          Curated Grid: Row 1 has 2 medium showcases, Row 2 has 3 balanced showcases
          ==================================================================== */}
      <section className="pj-showcase-section" aria-label="Editorial Project Showcase">
        <div className="pj-container">

          {/* Section Header */}
          <div className="pj-showcase-header" data-scroll-reveal>
            <div className="pj-section-tag">
              <span className="pj-tag-dash" aria-hidden="true" />
              <span>THE PROJECT JOURNAL</span>
            </div>
            <h2>Selected Client Work</h2>
            <p>
              Each project represents a bespoke collaboration designed to solve complex business challenges through elegant code and measurable marketing.
            </p>
          </div>

          {/* ROW 1: Two Medium-Width Showcases (Projects 02 & 03) */}
          <div className="pj-grid-row-two" data-scroll-reveal>

            {/* PROJECT 02: Flowline Logistics */}
            <article className="pj-card-medium" aria-label="Project 02: Flowline Logistics">
              <div className="pj-card-img-wrap">
                <img
                  src="/portfolio/photos/flowline-logistics.jpg"
                  alt="Modern commercial logistics fleet and freight operations"
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-num-badge">02</div>
              </div>

              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-category-badge">WEB APP</span>
                  <span className="pj-client-name">Flowline Logistics</span>
                </div>

                <h3 className="pj-card-title">Smarter logistics. Greater efficiency.</h3>

                <p className="pj-card-desc">
                  A real-time fleet-tracking dashboard built for a regional logistics operator.
                </p>

                <div className="pj-chips-list">
                  <span className="pj-chip">React</span>
                  <span className="pj-chip">Node.js</span>
                  <span className="pj-chip">Dashboard</span>
                </div>

                <Link to="/contact" className="pj-card-link">
                  <span>View Project</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* PROJECT 03: Aura Skincare */}
            <article className="pj-card-medium" aria-label="Project 03: Aura Skincare">
              <div className="pj-card-img-wrap">
                <img
                  src="/portfolio/photos/aura-skincare.jpg"
                  alt="Aura Skincare premium botanical cosmetic bottles and luxury packaging"
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-num-badge">03</div>
              </div>

              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-category-badge">BRANDING</span>
                  <span className="pj-client-name">Aura Skincare</span>
                </div>

                <h3 className="pj-card-title">Pure care. Powerful brand.</h3>

                <p className="pj-card-desc">
                  Full identity system and Instagram-first launch campaign for a D2C skincare line.
                </p>

                <div className="pj-chips-list">
                  <span className="pj-chip">Branding</span>
                  <span className="pj-chip">Logo</span>
                  <span className="pj-chip">Instagram</span>
                </div>

                <Link to="/contact" className="pj-card-link">
                  <span>View Project</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

          </div>

          {/* ROW 2: Three Balanced Showcases (Projects 04, 05 & 06) */}
          <div className="pj-grid-row-three" data-scroll-reveal>

            {/* PROJECT 04: CityTiffin */}
            <article className="pj-card-compact" aria-label="Project 04: CityTiffin">
              <div className="pj-card-img-wrap pj-aspect-compact">
                <img
                  src="/portfolio/photos/citytiffin-food.jpg"
                  alt="Delicious authentic Indian home-cooked meal prepared with fresh ingredients"
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-num-badge">04</div>
              </div>

              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-category-badge">MOBILE APP</span>
                  <span className="pj-client-name">CityTiffin</span>
                </div>

                <h3 className="pj-card-title">Homemade food. Now closer.</h3>

                <p className="pj-card-desc">
                  A cross-platform food-ordering app connecting home chefs with local customers.
                </p>

                <div className="pj-chips-list">
                  <span className="pj-chip">React Native</span>
                  <span className="pj-chip">Node.js</span>
                  <span className="pj-chip">Mobile</span>
                </div>

                <Link to="/contact" className="pj-card-link">
                  <span>View Project</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* PROJECT 05: Nova Realty */}
            <article className="pj-card-compact" aria-label="Project 05: Nova Realty">
              <div className="pj-card-img-wrap pj-aspect-compact">
                <img
                  src="/portfolio/photos/novarealty-modern.jpg"
                  alt="Modern contemporary luxury residential architecture with sunlit glass facade"
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-num-badge">05</div>
              </div>

              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-category-badge">DIGITAL MARKETING</span>
                  <span className="pj-client-name">Nova Realty</span>
                </div>

                <h3 className="pj-card-title">More leads. More opportunities.</h3>

                <p className="pj-card-desc">
                  Google &amp; Facebook ad funnels that cut cost-per-lead in half for a real estate developer.
                </p>

                <div className="pj-chips-list">
                  <span className="pj-chip">Google Ads</span>
                  <span className="pj-chip">Facebook Ads</span>
                  <span className="pj-chip">Lead Gen</span>
                </div>

                <Link to="/contact" className="pj-card-link">
                  <span>View Project</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

            {/* PROJECT 06: Harvest Roots Cafe */}
            <article className="pj-card-compact" aria-label="Project 06: Harvest Roots Cafe">
              <div className="pj-card-img-wrap pj-aspect-compact">
                <img
                  src="/portfolio/photos/harvestroots-cafe.jpg"
                  alt="Warm artisan cafe interior with coffee, bakery, natural lighting and welcoming seats"
                  className="pj-card-img"
                  loading="lazy"
                />
                <div className="pj-card-num-badge">06</div>
              </div>

              <div className="pj-card-body">
                <div className="pj-card-meta">
                  <span className="pj-category-badge">WEBSITE DEVELOPMENT</span>
                  <span className="pj-client-name">Harvest Roots Cafe</span>
                </div>

                <h3 className="pj-card-title">A richer cafe experience.</h3>

                <p className="pj-card-desc">
                  A conversion-focused restaurant website with online ordering and table reservations.
                </p>

                <div className="pj-chips-list">
                  <span className="pj-chip">Website Design</span>
                  <span className="pj-chip">React</span>
                  <span className="pj-chip">SEO</span>
                </div>

                <Link to="/contact" className="pj-card-link">
                  <span>View Project</span>
                  <span className="pj-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ====================================================================
          4. CLOSING SECTION – PROJECT INVITATION
          Light Mint-Green Section: "Your Next Big Idea Starts Here."
          ==================================================================== */}
      <section className="pj-invitation-section" aria-label="Project Invitation">
        <div className="pj-container">
          <div className="pj-invitation-box" data-scroll-reveal>
            {/* Subtle botanical accent */}
            <div className="pj-invitation-accent" aria-hidden="true">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <path
                  d="M20 100 C 40 40, 80 40, 100 20 C 60 40, 40 80, 20 100 Z"
                  fill="url(#botanicalGrad)"
                  fillOpacity="0.12"
                />
                <defs>
                  <linearGradient id="botanicalGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#168B46" />
                    <stop offset="1" stopColor="#A3E635" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="pj-invitation-pill">LET&apos;S BUILD SOMETHING GREAT</div>

            <h2 className="pj-invitation-heading">
              Your Next Big Idea <span className="pj-invitation-highlight">Starts Here.</span>
            </h2>

            <p className="pj-invitation-subtext">
              Have an idea or business challenge? Let&apos;s turn it into something meaningful.
            </p>

            <Link to="/contact" className="pj-invitation-btn">
              <span>Talk to Our Team</span>
              <span className="pj-btn-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
