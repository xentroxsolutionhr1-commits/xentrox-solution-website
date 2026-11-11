import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import './Portfolio.css';

const defaultProjects = [
  {
    id: 'citytiffin',
    projectName: 'CityTiffin Mobile App',
    client: 'CityTiffin',
    categoryName: 'MOBILE APPLICATION',
    categorySlug: 'mobile',
    projectDescription: 'A cross-platform food-ordering and cloud-kitchen management app connecting home chefs with local customers with real-time GPS dispatching and live status tracking.',
    projectTechStack: ['React Native', 'Node.js', 'Mobile UI', 'Payment Gateway', 'Maps API'],
    highlights: ['15k+ Monthly Orders', '4.9★ App Store Rating', 'Sub-second Order Sync'],
    imageUrl: '/portfolio/photos/citytiffin-food.jpg',
    testimonial: {
      quote: 'XentroX engineered our food ordering platform from zero to production launch in weeks. The UX is lightning fast, and our customer retention has surged.',
      author: 'Suhail K.',
      role: 'Co-founder, CityTiffin',
    },
  },
  {
    id: 'greenroots',
    projectName: 'GreenRoots Organics',
    client: 'GreenRoots Organics',
    categoryName: 'SEO & DIGITAL GROWTH',
    categorySlug: 'seo',
    projectDescription: 'Comprehensive local and technical SEO overhaul for an organic grocery chain — organic search impressions and store footfall tripled in six months.',
    projectTechStack: ['Technical SEO', 'Local Console', 'Schema Markup', 'Speed Optimization'],
    highlights: ['+310% Organic Traffic', '140+ Page-1 Rankings', '2.4x Store Footfall'],
    imageUrl: '/portfolio/photos/greenroots-organic.jpg',
  },
  {
    id: 'flowline',
    projectName: 'Flowline Fleet Logistics',
    client: 'Flowline Logistics',
    categoryName: 'WEB APPLICATION',
    categorySlug: 'web',
    projectDescription: 'A real-time fleet telemetry, driver management, and route optimization dashboard engineered for regional logistics operators.',
    projectTechStack: ['React', 'Node.js', 'PostgreSQL', 'Mapbox', 'WebSockets'],
    highlights: ['1,200+ Active Vehicles', '99.98% Telemetry Uptime', '-22% Dispatch Latency'],
    imageUrl: '/portfolio/photos/flowline-logistics.jpg',
  },
  {
    id: 'aura',
    projectName: 'Aura Skincare D2C',
    client: 'Aura Skincare',
    categoryName: 'BRANDING & UI/UX',
    categorySlug: 'branding',
    projectDescription: 'Full visual identity system, packaging design, and high-converting e-commerce design system for a clean-beauty skincare line.',
    projectTechStack: ['Brand Identity', 'Packaging Design', 'Figma', 'Shopify Plus'],
    highlights: ['+68% Checkout Rate', '50k+ Social Community', 'Featured in Vogue'],
    imageUrl: '/portfolio/photos/aura-skincare.jpg',
  },
  {
    id: 'novarealty',
    projectName: 'Nova Realty Portals',
    client: 'Nova Realty Group',
    categoryName: 'PERFORMANCE ADS',
    categorySlug: 'marketing',
    projectDescription: 'High-converting real estate listing platform paired with targeted Meta and Google ad funnels that halved customer acquisition costs.',
    projectTechStack: ['React', 'Google Ads', 'Meta CAPI', 'Lead Funnel Architecture'],
    highlights: ['-48% Cost Per Lead', '350+ Verified Buyer Leads', '2.8x Ad ROI'],
    imageUrl: '/portfolio/photos/novarealty-modern.jpg',
  },
  {
    id: 'harvestroots',
    projectName: 'Harvest Roots Artisan Cafe',
    client: 'Harvest Roots Cafe',
    categoryName: 'BRAND & LOCAL SEO',
    categorySlug: 'seo',
    projectDescription: 'Omnichannel brand design, digital QR menu, and Google Maps local dominance for a fast-growing artisan cafe chain.',
    projectTechStack: ['Brand Identity', 'Google Maps SEO', 'Interactive Menu', 'Analytics'],
    highlights: ['#1 on Local Search', '+180% Foot Traffic', '4.8★ with 1.2k Reviews'],
    imageUrl: '/portfolio/photos/harvestroots-cafe.jpg',
  },
  {
    id: 'carepulse',
    projectName: 'CarePulse Telemedicine',
    client: 'CarePulse Health',
    categoryName: 'HEALTHCARE WEB APP',
    categorySlug: 'web',
    projectDescription: 'HIPAA-ready patient appointment scheduling portal and encrypted WebRTC real-time doctor tele-consultation platform.',
    projectTechStack: ['Next.js', 'WebRTC', 'Cloud API', 'Twilio', 'PostgreSQL'],
    highlights: ['450+ Licensed Doctors', '12k+ Monthly Consults', '-40% Patient Wait Time'],
    imageUrl: '/about/team-collaboration.jpg',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'seo', label: 'SEO & Growth' },
  { id: 'branding', label: 'Branding & UI/UX' },
];

export default function Portfolio() {
  const [projectList, setProjectList] = useState(defaultProjects);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch portfolio');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((item, idx) => {
            const rawCat = (item.categoryId?.categoryName || item.categoryName || '').toLowerCase();
            const titleLower = (item.projectName || '').toLowerCase();
            const descLower = (item.projectDescription || '').toLowerCase();
            const combined = `${rawCat} ${titleLower} ${descLower}`;

            const catSlug = combined.includes('mobile') || combined.includes('app')
              ? 'mobile'
              : combined.includes('seo') || combined.includes('growth') || combined.includes('search')
                ? 'seo'
                : combined.includes('brand') || combined.includes('skin') || combined.includes('design') || combined.includes('ui')
                  ? 'branding'
                  : 'web';

            return {
              id: item.id || String(idx),
              projectName: item.projectName,
              client: item.projectName,
              categoryName: rawCat.toUpperCase(),
              categorySlug: catSlug,
              projectDescription: item.projectDescription || '',
              projectTechStack:
                item.projectTechStack && item.projectTechStack.length > 0
                  ? item.projectTechStack
                  : ['React Native', 'Node.js', 'Cloud API'],
              highlights: [
                'Live in Production',
                'Enterprise Performance',
                'Sub-second Architecture',
              ],
              imageUrl: item.imageUrl || '/portfolio/photos/citytiffin-food.jpg',
            };
          });
          setProjectList(formatted);
        }
      })
      .catch((err) => {
        console.warn('Using default portfolio projects:', err.message);
      });
  }, []);

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'all'
      ? projectList
      : projectList.filter((p) => p.categorySlug === activeCategory || activeCategory === 'all');

  const gridProjects = filteredProjects;

  return (
    <div className="portfolio-page">
      {/* 1. HERO SECTION */}
      <section className="pj-hero-section" aria-label="Portfolio Introduction">
        <div className="pj-container">
          <div className="pj-hero-bg-layer" aria-hidden="true">
            <img
              src="/portfolio-hero-friendly-robot.png"
              alt=""
              className="pj-hero-bg-img"
            />
          </div>

          <div className="pj-hero-content" data-scroll-reveal>
            <div className="pj-hero-text">

              <h1 className="pj-hero-title">
                <span className="pj-title-forest">Good work.</span>
                <span className="pj-title-lime">Real-world impact.</span>
              </h1>


            </div>
          </div>
        </div>

        <div className="pj-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#F4FAF6"
            />
          </svg>
        </div>
      </section>

      {/* 2. INTERACTIVE CATEGORY TABS & MORE WORK GRID */}
      <section className="pj-showcase-section" aria-label="Editorial Project Showcase">
        <div className="pj-container">
          <div className="pj-showcase-header" data-scroll-reveal>
            <div className="pj-section-tag">
              <span className="pj-tag-dash" aria-hidden="true" />
              <span>THE PROJECT JOURNAL</span>
            </div>
            <h2>Selected Client Work</h2>
        

            {/* Interactive Filter Pills */}
            <div className="pj-filter-bar">
              {categoryTabs.map((tab) => {
                const count =
                  tab.id === 'all'
                    ? projectList.length
                    : projectList.filter((p) => p.categorySlug === tab.id).length;

                // Hide empty categories so 0-count tabs don't show
                if (tab.id !== 'all' && count === 0) return null;

                return (
                  <button
                    key={tab.id}
                    className={`pj-filter-btn ${activeCategory === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(tab.id)}
                  >
                    <span>{tab.label}</span>
                    <span className="pj-filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="pj-grid-showcase" data-scroll-reveal>
            {gridProjects.map((project) => (
              <article
                className="pj-card-medium"
                aria-label={project.projectName}
                key={project.id}
              >
                <div className="pj-card-img-wrap">
                  <img
                    src={project.imageUrl}
                    alt={project.projectName}
                    className="pj-card-img"
                    loading="lazy"
                  />
                </div>

                <div className="pj-card-body">
                  <h3 className="pj-card-title">{project.projectName}</h3>

                  <p className="pj-card-desc">
                    {project.projectDescription}
                  </p>

                  <div className="pj-card-footer">
                    <Link to="/contact" className="pj-card-footer-link">
                      <span className="pj-card-action-text">Explore Project</span>
                      <span className="pj-arrow" aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLIENT TESTIMONIAL SPOTLIGHT */}
      <section className="pj-quote-section" aria-label="Client Review">
        <div className="pj-container">
          <div className="pj-quote-box" data-scroll-reveal>
            <div className="pj-quote-stars">★★★★★</div>
            <blockquote className="pj-quote-text">
              &ldquo;XentroX engineered our digital platform from zero to production launch in record time. The architecture is robust, the user interface is seamless, and our customer retention has surged over 300%.&rdquo;
            </blockquote>
            <div className="pj-quote-author">
              <span className="pj-author-name">Suhail K.</span>
              <span className="pj-author-role">Founder, CityTiffin &bull; Verified Client Partner</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. METRICS SECTION */}
      <section className="pj-metrics-section" aria-label="Portfolio Track Record and Statistics">
        <div className="pj-container">
          <div className="pj-metrics-grid" data-scroll-reveal>
            <div className="pj-metric-card">
              <span className="pj-metric-value">{projectList.length}+</span>
              <span className="pj-metric-label">Delivered Projects</span>
              <p className="pj-metric-detail">Custom web apps, mobile products, and brand rollouts shipped with precision.</p>
            </div>
            <div className="pj-metric-card">
              <span className="pj-metric-value">98.4%</span>
              <span className="pj-metric-label">Client Retention</span>
              <p className="pj-metric-detail">Long-term development partnerships and recurring growth retainers.</p>
            </div>
            <div className="pj-metric-card">
              <span className="pj-metric-value">3.2x</span>
              <span className="pj-metric-label">Average Traffic Growth</span>
              <p className="pj-metric-detail">Documented organic search rankings and high-conversion ad performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="pj-cta-section" aria-label="Start Your Next Project with XentroX">
        <div className="pj-container">
          <div className="pj-cta-card" data-scroll-reveal>
            <div className="pj-cta-content">
              <span className="pj-cta-tag">HAVE A PROJECT IN MIND?</span>
              <h2 className="pj-cta-headline">Let’s engineer something remarkable together.</h2>
              <p className="pj-cta-desc">
                From technical discovery and UI/UX design to enterprise cloud architecture, our team is ready to deliver.
              </p>
              <div className="pj-cta-actions">
                <Link to="/contact" className="pj-btn-primary">
                  <span>Start a Conversation</span>
                  <Icon name="arrowRight" size={16} />
                </Link>
                <Link to="/services" className="pj-btn-secondary">
                  <span>Explore Capabilities</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
