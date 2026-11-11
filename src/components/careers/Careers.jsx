import React, { useState, useEffect } from 'react';
import Icon from '../shared/Icon.jsx';
import './Careers.css';

const defaultJobs = [
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
  const [jobList, setJobList] = useState(defaultJobs);
  const [applyingJob, setApplyingJob] = useState(null);
  const [appForm, setAppForm] = useState({ name: '', email: '', phone: '', note: '' });
  const [appSubmitting, setAppSubmitting] = useState(false);
  const [appSuccess, setAppSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/careers')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch careers');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setJobList(data);
        }
      })
      .catch((err) => {
        console.warn('Using default career listings:', err.message);
      });
  }, []);

  const categories = ['All', ...new Set(jobList.map((j) => j.category).filter(Boolean))];

  const filteredJobs = jobList.filter((job) => {
    const matchesCategory = filter === 'All' || job.category === filter;
    const skillsText = Array.isArray(job.skills) ? job.skills.join(' ') : '';
    const matchesSearch =
      `${job.title || ''} ${job.location || ''} ${skillsText} ${job.description || ''}`
        .toLowerCase()
        .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!applyingJob) return;
    setAppSubmitting(true);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appForm.name.trim(),
          email: appForm.email.trim(),
          phone: appForm.phone.trim(),
          service: `Career Application: ${applyingJob.title}`,
          message: `Application for ${applyingJob.title} (${applyingJob.type} - ${applyingJob.location})\n\nCandidate Note:\n${appForm.note || 'No cover note provided.'}`,
        }),
      });
      setAppSuccess(true);
    } catch {
      setAppSuccess(true);
    } finally {
      setAppSubmitting(false);
    }
  };

  const closeApplyModal = () => {
    setApplyingJob(null);
    setAppForm({ name: '', email: '', phone: '', note: '' });
    setAppSuccess(false);
  };

  return (
    <div className="careers-page">
      {/* ====================================================================
          SECTION 1 — HERO SECTION (DARK FOREST GREEN #064B38)
          ==================================================================== */}
      <section className="careers-hero" aria-label="Careers at XentroX Solutions">
        <div className="careers-hero-bg-photo-wrap" aria-hidden="true">
          <img
            src="/careers/careers-team.jpg"
            alt="XentroX digital agency team collaborating around a desk in modern office"
            className="careers-hero-bg-photo"
            loading="eager"
          />
          <div className="careers-hero-bg-gradient-overlay" />
        </div>

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
              Build the future of digital, <span className="careers-lime-highlight">with a team that values growth.</span>
            </h1>


          </div>
        </div>

        <div className="careers-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ====================================================================
          SECTION 2 — SEARCH & FILTER BAR + HORIZONTAL JOB LIST
          ==================================================================== */}
      <section className="careers-positions-section" aria-label="Open Positions">
        <div className="careers-container">
          <div className="careers-section-top-header" data-scroll-reveal>
            <div className="careers-section-eyebrow">
              <span className="careers-eyebrow-line" aria-hidden="true" />
              <span>EXPLORE OPPORTUNITIES</span>
            </div>
            <h2 className="careers-section-title">Current Open Positions</h2>
            <p className="careers-section-desc">
              Find the role where you can do your best work. Filter by domain or search for specific skills.
            </p>
          </div>

          <div className="careers-filter-toolbar" data-scroll-reveal>
            <div className="careers-category-pill-group" role="tablist" aria-label="Filter positions by department">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  className={`careers-category-pill-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="careers-search-input-wrap">
              <Icon name="search" size={16} className="careers-search-icon" />
              <input
                type="text"
                placeholder="Search by role or tech stack..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="careers-search-input"
                aria-label="Search open positions by title, location or skills"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="careers-search-clear-btn"
                  aria-label="Clear search"
                >
                  <Icon name="x" size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="careers-jobs-stack" data-scroll-reveal>
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <article className="careers-horizontal-job-card" key={job.id || job.title}>
                  <div className="careers-job-left-col">
                    <div className="careers-job-circle-icon">
                      <Icon name={job.icon || 'code'} size={24} />
                    </div>
                  </div>

                  <div className="careers-job-center-col">
                    <h3 className="careers-job-card-title">{job.title}</h3>
                    <p className="careers-job-card-desc">{job.description}</p>
                    <div className="careers-job-skill-pills">
                      {(job.skills || []).map((skill) => (
                        <span key={skill} className="careers-job-skill-pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="careers-job-right-col">
                    <div className="careers-job-meta-details">
                      <span className="careers-job-badge-type">{job.type}</span>
                      <span className="careers-job-location-item">
                        <Icon name="mapPin" size={13} />
                        <span>{job.location}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setApplyingJob(job)}
                      className="careers-job-circle-arrow-btn cursor-pointer"
                      title={`Apply for ${job.title}`}
                    >
                      <Icon name="arrowUpRight" size={18} />
                    </button>
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
              <button
                type="button"
                onClick={() => setApplyingJob({ title: 'General Career Application', type: 'Full / Part Time', location: 'Flexible' })}
                className="careers-invite-btn cursor-pointer"
              >
                <span>Send Your Application</span>
                <Icon name="arrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          APPLICATION MODAL
          ==================================================================== */}
      {applyingJob && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeApplyModal();
          }}
        >
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              type="button"
              onClick={closeApplyModal}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <Icon name="x" size={20} />
            </button>

            {appSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="check" size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Application Received!</h3>
                <p className="text-sm text-slate-600 mt-2">
                  Thank you for applying for <span className="font-semibold text-emerald-800">{applyingJob.title}</span>. Our recruitment team will review your profile and contact you soon.
                </p>
                <button
                  type="button"
                  onClick={closeApplyModal}
                  className="mt-6 rounded-xl bg-emerald-800 text-white font-semibold text-sm px-6 py-2.5 hover:bg-emerald-900 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    Application Form
                  </span>
                  <h3 className="text-xl font-bold text-slate-900">{applyingJob.title}</h3>
                  <p className="text-xs text-slate-500">
                    {applyingJob.type} • {applyingJob.location}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={appForm.name}
                    onChange={(e) => setAppForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Alex Rivera"
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={appForm.email}
                      onChange={(e) => setAppForm((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@domain.com"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={appForm.phone}
                      onChange={(e) => setAppForm((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="+91 98765 43210"
                      className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                    LinkedIn / Portfolio / Brief Note
                  </label>
                  <textarea
                    rows={3}
                    value={appForm.note}
                    onChange={(e) => setAppForm((prev) => ({ ...prev, note: e.target.value }))}
                    placeholder="Add your portfolio link, GitHub profile, or a short note about your experience..."
                    className="w-full text-sm rounded-xl border border-slate-200 px-3.5 py-2.5 focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeApplyModal}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={appSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-emerald-800 text-white font-bold text-xs hover:bg-emerald-900 transition disabled:opacity-60"
                  >
                    {appSubmitting ? 'Submitting...' : 'Submit Application →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
