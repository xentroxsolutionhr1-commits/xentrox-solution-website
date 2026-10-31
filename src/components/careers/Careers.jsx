import React, { useState } from 'react';
import Icon from '../shared/Icon.jsx';
import './Careers.css';

const jobs = [
  {
    id: 'frontend-dev',
    title: 'Frontend Developer',
    type: 'Full Time',
    location: 'Hybrid / Remote',
    category: 'Development',
    description: 'Build modern, responsive user interfaces with React, JavaScript and CSS.',
    skills: ['React', 'JavaScript', 'CSS'],
    icon: 'code',
  },
  {
    id: 'python-dev',
    title: 'Python Developer',
    type: 'Full Time',
    location: 'Remote',
    category: 'Development',
    description: 'Develop reliable applications, APIs and efficient backend solutions.',
    skills: ['Python', 'SQL', 'APIs'],
    icon: 'cpu',
  },
  {
    id: 'uiux-designer',
    title: 'UI/UX Designer',
    type: 'Full Time',
    location: 'Hybrid',
    category: 'Design',
    description: 'Create intuitive digital experiences through thoughtful design and research.',
    skills: ['Figma', 'UI Design', 'Prototyping'],
    icon: 'layers',
  },
  {
    id: 'cloud-support',
    title: 'Cloud Support Associate',
    type: 'Entry Level',
    location: 'On-site / Hybrid',
    category: 'Cloud',
    description: 'Help troubleshoot cloud services and support reliable infrastructure.',
    skills: ['AWS', 'Linux', 'Networking'],
    icon: 'globe',
  },
];

export default function Careers() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const categories = ['All', 'Development', 'Design', 'Cloud'];

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = filter === 'All' || job.category === filter;
    const matchesSearch =
      `${job.title} ${job.location} ${job.skills.join(' ')} ${job.description}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="careers-page">
      {/* ====================================================================
          SECTION 1 — HERO SECTION (DARK FOREST GREEN #064B38)
          Full-width canvas with photograph filling and blending right side
          ==================================================================== */}
      <section className="careers-hero" aria-label="Careers at XentroX Solutions">
        {/* Right-Side Full-Bleed Blended Photograph */}
        <div className="careers-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/careers/careers-team.jpg"
            alt="XentroX digital agency team collaborating around a desk in modern office"
            className="careers-hero-bg-photo"
            loading="eager"
          />
          <div className="careers-hero-bg-gradient-overlay" />
        </div>

        {/* Subtle decorative curved background lines in slightly lighter green */}
        <div className="careers-hero-lines" aria-hidden="true">
          <svg viewBox="0 0 1440 640" fill="none" preserveAspectRatio="none">
            <path
              d="M-50 260 C260 110, 580 430, 980 180 C1240 30, 1420 250, 1600 190"
              stroke="#A3E635"
              strokeWidth="1.2"
              strokeOpacity="0.12"
            />
            <path
              d="M-50 360 C300 190, 700 470, 1100 240 C1320 110, 1480 310, 1600 260"
              stroke="#A3E635"
              strokeWidth="0.8"
              strokeOpacity="0.06"
            />
          </svg>
        </div>

        <div className="careers-container careers-hero-container">
          <div className="careers-hero-content-wrap" data-scroll-reveal>
            <h1 className="careers-hero-heading">
              <span className="careers-hero-heading-line1">Turn Your Ideas</span>
              <span className="careers-lime-highlight">Into Impact.</span>
            </h1>
          </div>
        </div>

        {/* Organic curved wave transition into the white section below */}
        <div className="careers-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 90" preserveAspectRatio="none" fill="none">
            <path
              d="M0,50 C340,95 720,10 1100,60 C1260,82 1380,72 1440,50 L1440,90 L0,90 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — CURRENT OPENINGS (WHITE BACKGROUND #FFFFFF)
          ==================================================================== */}
      <section className="careers-openings-section" id="open-positions">
        <div className="careers-container">
          {/* Section Header */}
          <div className="careers-openings-header" data-scroll-reveal>
            <div className="careers-openings-title-col">
              <span className="careers-section-eyebrow">CURRENT OPENINGS</span>
              <h2 className="careers-openings-heading">
                Find Your <span className="careers-lime-gradient-text">Opportunity.</span>
              </h2>
            </div>

            <div className="careers-openings-actions-col">
              <button
                type="button"
                onClick={() => {
                  setFilter('All');
                  setSearch('');
                }}
                className="careers-view-all-link"
              >
                <span>View All Jobs</span>
                <Icon name="arrowRight" size={15} />
              </button>
            </div>
          </div>

          {/* Minimal Editorial Filter & Search Bar */}
          <div className="careers-filter-bar" data-scroll-reveal>
            <div className="careers-category-pills" role="tablist">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={filter === category}
                  className={`careers-category-btn ${filter === category ? 'is-active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="careers-search-wrap">
              <Icon name="search" size={16} className="careers-search-icon" />
              <input
                type="search"
                placeholder="Search jobs or skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="careers-search-input"
                aria-label="Search jobs or skills"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="careers-search-clear"
                  aria-label="Clear search"
                >
                  <Icon name="close" size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Horizontal Full-Width Job Cards List */}
          <div className="careers-horizontal-jobs-list" data-scroll-reveal>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <article className="careers-horizontal-job-card" key={job.title}>
                  {/* LEFT: Circular light-green background with job icon */}
                  <div className="careers-job-left-col">
                    <div className="careers-job-circle-icon">
                      <Icon name={job.icon} size={24} />
                    </div>
                  </div>

                  {/* CENTER: Title, description, skill pill tags */}
                  <div className="careers-job-center-col">
                    <h3 className="careers-job-card-title">{job.title}</h3>
                    <p className="careers-job-card-desc">{job.description}</p>
                    <div className="careers-job-skill-pills">
                      {job.skills.map((skill) => (
                        <span key={skill} className="careers-job-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT: Employment type badge, location, circular arrow button */}
                  <div className="careers-job-right-col">
                    <div className="careers-job-meta-details">
                      <span className="careers-job-badge-type">{job.type}</span>
                      <span className="careers-job-location-item">
                        <Icon name="mapPin" size={13} />
                        <span>{job.location}</span>
                      </span>
                    </div>

                    <a
                      href={`mailto:careers@example.com?subject=${encodeURIComponent(`Application for ${job.title}`)}`}
                      className="careers-job-circle-arrow-btn"
                      aria-label={`Apply for ${job.title}`}
                    >
                      <Icon name="arrowUpRight" size={18} />
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div className="careers-empty-state">
                <div className="careers-empty-icon-wrap">
                  <Icon name="search" size={28} />
                </div>
                <h3>No matching positions found</h3>
                <p>Try searching for a different skill, title, or clear the active category filter.</p>
                <button
                  type="button"
                  className="careers-reset-btn"
                  onClick={() => {
                    setFilter('All');
                    setSearch('');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 3 — GENERAL APPLICATION INVITATION BANNER
          ==================================================================== */}
      <section className="careers-invite-section">
        <div className="careers-container">
          <div className="careers-invite-box" data-scroll-reveal>
            <div className="careers-invite-content">
              <span className="careers-invite-badge">CONNECT WITH US</span>
              <h2 className="careers-invite-title">Don't see your specific role?</h2>
              <p className="careers-invite-text">
                We are always excited to connect with ambitious developers, designers, and strategists.
                Drop your resume and tell us what you'd love to build with us.
              </p>
            </div>
            <div className="careers-invite-action">
              <a
                href="mailto:careers@example.com?subject=General%20Application%20-%20XentroX%20Solutions"
                className="careers-invite-btn"
              >
                <span>Send Your Resume</span>
                <Icon name="arrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
