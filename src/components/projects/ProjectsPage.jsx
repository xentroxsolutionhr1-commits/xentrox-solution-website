import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const projects = [
  {
    id: 'greenroots',
    title: 'GreenRoots Organics',
    category: 'Digital Growth & SEO',
    client: 'Farm-to-Table E-Commerce Brand',
    impact: '+310% Organic Traffic',
    duration: '6 Months',
    description:
      'Complete local and technical SEO overhaul for an organic grocery distributor. Optimized crawl depth, structured product schemas, and launched localized content clusters.',
    metrics: [
      { label: 'Organic Traffic', val: '+310%' },
      { label: 'Keywords on Page 1', val: '140+' },
      { label: 'Online Sales Growth', val: '2.4x' },
    ],
    tech: ['Next.js', 'Technical SEO', 'Schema.org', 'Google Search Console', 'Ahrefs'],
  },
  {
    id: 'finnova-pay',
    title: 'FinNova Payment Gateway',
    category: 'Web Applications',
    client: 'FinTech Merchant Services',
    impact: '150k+ Daily Txns',
    duration: '4 Months',
    description:
      'Engineered a lightning-fast merchant dashboard with real-time settlement telemetry, multi-currency routing, webhook listeners, and role-based access control.',
    metrics: [
      { label: 'P99 Latency', val: '< 85ms' },
      { label: 'Daily Volume', val: '150k+' },
      { label: 'Platform Uptime', val: '99.99%' },
    ],
    tech: ['React 19', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Tailwind CSS'],
  },
  {
    id: 'zenith-health',
    title: 'Zenith Health Telemedicine',
    category: 'Web Applications',
    client: 'Healthcare Network',
    impact: '4.9/5 Patient Rating',
    duration: '5 Months',
    description:
      'HIPAA-compliant telemedicine platform with WebRTC real-time video consults, prescription management, automated doctor scheduling, and SMS appointment reminders.',
    metrics: [
      { label: 'Active Doctors', val: '450+' },
      { label: 'Monthly Consults', val: '12,000+' },
      { label: 'No-Show Reduction', val: '-42%' },
    ],
    tech: ['React', 'WebRTC', 'FastAPI', 'AWS ECS', 'Twilio API', 'PostgreSQL'],
  },
  {
    id: 'aura-lifestyle',
    title: 'Aura Lifestyle D2C',
    category: 'UI/UX Systems',
    client: 'Premium Apparel Brand',
    impact: '+68% Checkout Rate',
    duration: '3 Months',
    description:
      'Designed a luxury minimalist design system and interactive product customizer. Re-architected checkout funnels to reduce mobile friction and cart abandonment.',
    metrics: [
      { label: 'Checkout Conversion', val: '+68%' },
      { label: 'Average Order Value', val: '+22%' },
      { label: 'Mobile Bounce Rate', val: '-35%' },
    ],
    tech: ['Figma', 'Design Systems', 'Shopify Plus', 'Tailwind CSS', 'Micro-interactions'],
  },
  {
    id: 'apex-logistics',
    title: 'Apex Global Logistics Cloud',
    category: 'Web Applications',
    client: 'Freight & Supply Chain Leader',
    impact: 'Real-Time Fleet GPS',
    duration: '7 Months',
    description:
      'Enterprise IoT fleet tracking dashboard managing 2,000+ trucks across 6 countries. Features predictive ETA calculation, sensor telemetry, and automatic driver dispatch.',
    metrics: [
      { label: 'Tracked Assets', val: '2,200+' },
      { label: 'Fuel Cost Savings', val: '18%' },
      { label: 'On-Time Deliveries', val: '98.4%' },
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Kafka', 'Google Maps API', 'TimescaleDB'],
  },
  {
    id: 'pulse-fitness',
    title: 'Pulse Fitness Community',
    category: 'Mobile',
    client: 'Boutique Gym Chain',
    impact: '85k+ Downloads',
    duration: '4 Months',
    description:
      'Cross-platform fitness companion with personalized workout plans, live class booking, community leaderboards, and Bluetooth heart-rate sensor syncing.',
    metrics: [
      { label: 'Total Downloads', val: '85k+' },
      { label: 'Daily Active Users', val: '24k' },
      { label: 'App Store Rating', val: '4.8 ★' },
    ],
    tech: ['React Native', 'Firebase', 'Redux Toolkit', 'HealthKit API', 'Stripe'],
  },
];

const categories = ['All', 'Web Applications', 'Digital Growth & SEO', 'UI/UX Systems', 'Mobile'];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="relative isolate -mt-24 max-sm:-mt-20">
      {/* Full-Bleed Dark Forest Green Hero starting at margin 0 */}
      <section
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#064B38] px-4 pt-28 pb-14 text-white sm:px-6 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20"
        data-scroll-reveal
      >
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#84cc16]/40 bg-[#84cc16]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
            <span className="h-2 w-2 rounded-full bg-[#84cc16] animate-pulse" />
            Engineered for Tangible Impact
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Featured Projects &amp; Case Studies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Explore how our development, digital marketing, and design solutions solve complex business challenges and drive bottom-line results.
          </p>

          {/* Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  activeCategory === cat
                    ? 'bg-[#84cc16] text-[#062c23] font-bold shadow-md'
                    : 'bg-white/10 text-white border border-white/20 hover:border-[#84cc16] hover:bg-[#84cc16] hover:text-[#062c23]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid & Body */}
      <div className="pt-12 sm:pt-16 pb-16">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((p, idx) => (
            <article
              key={p.id}
              data-scroll-reveal
              style={{ '--reveal-delay': `${(idx % 3) * 80}ms` }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16] hover:shadow-xl hover:shadow-[#062c23]/5"
            >
              <div>
                {/* Category & Impact Pill */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#65a30d]">
                    {p.category}
                  </span>
                  <span className="rounded-full bg-[#062c23] px-3 py-1 text-xs font-bold text-[#a3e635]">
                    {p.impact}
                  </span>
                </div>

                {/* Title & Client */}
                <h2 className="mt-4 text-xl font-bold text-[#062c23] group-hover:text-[#064b38] transition-colors">
                  {p.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-500">{p.client}</p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {p.description}
                </p>

                {/* Metrics Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-50 p-3 text-center">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-sm font-extrabold text-[#062c23]">{m.val}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech Badges */}
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedProject(p)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#062c23] hover:text-[#84cc16] transition-colors"
                >
                  View Details &amp; Architecture
                  <Icon name="arrowRight" size={13} />
                </button>
                <span className="text-xs text-slate-400 font-medium">{p.duration}</span>
              </div>
            </article>
          ))}
        </section>

        {/* Project Details Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="w-full max-w-xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold text-[#062c23]">{selectedProject.title}</h3>
                  <p className="text-xs text-slate-500">{selectedProject.client}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Problem &amp; Scope</h4>
                  <p className="mt-1 text-sm text-slate-600 leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Achieved Milestones</h4>
                  <div className="mt-2 grid grid-cols-3 gap-3">
                    {selectedProject.metrics.map((m) => (
                      <div key={m.label} className="rounded-xl bg-[#f8faf9] p-3 text-center border border-slate-100">
                        <p className="text-base font-bold text-[#062c23]">{m.val}</p>
                        <p className="text-[10px] uppercase font-bold text-slate-400 mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tech Architecture</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span key={t} className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Link
                  to={`/contact?project=${encodeURIComponent(selectedProject.title)}`}
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 rounded-xl bg-[#062c23] py-3 text-center text-xs font-bold text-white hover:bg-[#083e30]"
                >
                  Build Something Similar
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <section className="mt-16 rounded-3xl bg-[#062c23] p-8 text-white sm:p-12 text-center" data-scroll-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl">Have a project in mind?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-slate-300">
            From early-stage MVPs to high-scale enterprise platforms, we turn ambitious ideas into high-performing reality.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#84cc16] px-6 py-3 text-sm font-bold text-[#062c23] hover:bg-[#a3e635]"
            >
              Start Your Project
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white hover:bg-white/10"
            >
              View Portfolio Journal
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
