import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const services = [
  {
    id: 'webdev',
    num: '01',
    title: 'Web & App Development',
    tagline: 'High-performance websites and full-stack web applications',
    description:
      'From custom web applications to high-conversion corporate websites, we engineer resilient digital platforms using React, Next.js, Node.js, and modern cloud databases.',
    deliverables: [
      'Custom React & Next.js Web Apps',
      'Mobile-first responsive architecture',
      'Robust REST & GraphQL API engineering',
      'Database modeling & cloud deployment',
      'Sub-second page speeds & 95+ Lighthouse score',
    ],
    tech: ['React 19', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
    icon: 'code',
  },
  {
    id: 'seo',
    num: '02',
    title: 'SEO & Organic Growth',
    tagline: 'Technical, local and content-led search visibility that lasts',
    description:
      'We turn organic search into your most consistent revenue channel. We eliminate crawl bottlenecks, optimize Core Web Vitals, and build topic authority clusters that rank on Page 1.',
    deliverables: [
      'In-depth technical architecture audits',
      'Core Web Vitals & mobile page speed overhaul',
      'High-intent keyword mapping & content clusters',
      'Schema markup & rich structured data',
      'Local SEO & Google Business Profile dominance',
    ],
    tech: ['Ahrefs', 'Semrush', 'Google Search Console', 'GA4', 'Screaming Frog', 'Schema.org'],
    icon: 'target',
  },
  {
    id: 'smm',
    num: '03',
    title: 'Social Media & Performance Ads',
    tagline: 'Profitable customer acquisition across Meta, Google & LinkedIn',
    description:
      'We design and run high-ROI paid ad funnels paired with viral social content. From scroll-stopping video creatives to precision lookalike audience retargeting, we scale revenue predictably.',
    deliverables: [
      'Full-funnel paid advertising on Meta & Google',
      'Conversion tracking & server-side CAPI setup',
      'Ad creative production: video hooks & copy',
      'High-converting landing page optimization',
      'Transparent weekly ROI & CAC reporting',
    ],
    tech: ['Meta Ads Manager', 'Google Ads', 'TikTok Ads', 'LinkedIn Campaign Mgr', 'Klaviyo'],
    icon: 'zap',
  },
  {
    id: 'branding',
    num: '04',
    title: 'Branding & UI/UX Design',
    tagline: 'Distinctive visual identities and friction-free user experiences',
    description:
      'Make your business memorable. We craft complete brand systems, design tokens, responsive Figma design systems, and intuitive user experiences validated through user testing.',
    deliverables: [
      'Visual brand identity & logo design systems',
      'Comprehensive design token guidelines',
      'Figma wireframing, UX research & prototypes',
      'Conversion-optimized design heuristics',
      'Custom iconography & marketing assets',
    ],
    tech: ['Figma', 'Adobe Creative Suite', 'Illustrator', 'Design Systems', 'Micro-interactions'],
    icon: 'layers',
  },
  {
    id: 'cloud',
    num: '05',
    title: 'Cloud Infrastructure & DevOps',
    tagline: 'Scalable, secure, 99.99% uptime cloud architecture',
    description:
      'We deploy and manage containerized cloud infrastructures with automated CI/CD pipelines, autoscaling, and zero-downtime releases on AWS, GCP, and modern serverless platforms.',
    deliverables: [
      'Automated GitHub Actions CI/CD workflows',
      'Docker containerization & Kubernetes setup',
      'AWS / GCP cloud resource provisioning',
      'Database backup, replication & disaster recovery',
      '24/7 logging, monitoring & security audits',
    ],
    tech: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Datadog'],
    icon: 'cloud',
  },
  {
    id: 'ai-solutions',
    num: '06',
    title: 'Custom AI & Workflow Automation',
    tagline: 'Practical Generative AI tools and business process automation',
    description:
      'Empower your team with intelligent workflow automations. We build custom retrieval-augmented generation (RAG) agents, conversational chatbots, and internal automated data pipelines.',
    deliverables: [
      'Custom LLM & RAG integrations with company knowledge',
      'Internal team automation & workflow agents',
      'Intelligent customer support AI assistants',
      'Document parsing, OCR & automated data ingestion',
      'API connectors for CRM, ERP & communication apps',
    ],
    tech: ['OpenAI APIs', 'LangChain', 'Pinecone', 'Python', 'FastAPI', 'Webhook Integrations'],
    icon: 'cpu',
  },
];

export default function ServicesPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [hash]);

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
            Full-Lifecycle Agency Capabilities
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Everything You Need to Scale Your Brand
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            We combine cutting-edge software engineering, data-backed organic SEO, and high-converting performance marketing to build durable competitive advantages.
          </p>

          {/* Quick Service Anchor Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition hover:border-[#84cc16] hover:bg-[#84cc16] hover:text-[#062c23]"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid & Body */}
      <div className="pt-12 sm:pt-16 pb-16">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {services.map((service, idx) => (
            <article
              key={service.id}
              id={service.id}
              data-scroll-reveal
              style={{ '--reveal-delay': `${(idx % 2) * 100}ms` }}
              className="group flex flex-col justify-between scroll-mt-28 rounded-3xl border border-slate-200 bg-white p-7 sm:p-9 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16] hover:shadow-xl hover:shadow-[#062c23]/5"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold tracking-widest text-[#84cc16]">
                    {service.num}
                  </span>
                  <span className="rounded-xl bg-slate-100 p-2.5 text-[#062c23] transition-colors group-hover:bg-[#84cc16]/20 group-hover:text-[#064b38]">
                    <Icon name={service.icon} size={22} />
                  </span>
                </div>

                {/* Title & Tagline */}
                <h2 className="mt-5 text-2xl font-bold text-[#062c23] transition-colors group-hover:text-[#064b38]">
                  {service.title}
                </h2>
                <p className="mt-1 text-xs font-semibold text-[#65a30d]">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {service.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    What We Deliver
                  </p>
                  <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Icon name="check" size={16} className="mt-0.5 shrink-0 text-[#84cc16]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Badges */}
                <div className="mt-6 border-t border-slate-100 pt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies &amp; Tools
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Inquire Action */}
              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <Link
                  to={`/contact?service=${encodeURIComponent(service.title)}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#062c23] px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-[#083e30]"
                >
                  Inquire About {service.title}
                  <Icon name="arrowRight" size={14} />
                </Link>
                <Link
                  to="/pricing"
                  className="text-xs font-bold text-slate-500 hover:text-[#062c23] transition-colors"
                >
                  View Plans →
                </Link>
              </div>
            </article>
          ))}
        </section>

        {/* Process Section */}
        <section className="mt-20 rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 shadow-sm" data-scroll-reveal>
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-[#84cc16]">How We Work</p>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-[#062c23]">Our 4-Step Delivery Process</h2>
            <p className="mt-3 text-sm text-slate-600 max-w-xl mx-auto">
              A transparent, agile workflow designed to deliver measurable business impact from sprint one.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: '01', title: 'Discovery & Audit', text: 'We analyze your market, competitors, tech stack, and customer friction points.' },
              { step: '02', title: 'Strategy & Roadmap', text: 'We craft an actionable execution plan with clear milestones and ROI benchmarks.' },
              { step: '03', title: 'Agile Build & Launch', text: 'Rapid bi-weekly sprints with live preview environments and transparent updates.' },
              { step: '04', title: 'Scale & Optimization', text: 'Continuous A/B testing, speed tuning, conversion analysis, and growth scaling.' },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-100 bg-[#f8faf9] p-5">
                <span className="text-2xl font-black text-[#84cc16]">{item.step}</span>
                <h3 className="mt-3 text-base font-bold text-[#062c23]">{item.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-[#062c23] p-8 text-white sm:p-12 text-center" data-scroll-reveal>
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Ready to bring your vision to life?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-300 sm:text-base">
            Let’s discuss your project scope, timeline, and growth goals. Get a detailed proposal within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-[#84cc16] px-6 py-3 text-sm font-bold text-[#062c23] transition hover:bg-[#a3e635]"
            >
              Schedule a Discovery Call
              <Icon name="arrowRight" size={16} />
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Past Client Work
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
