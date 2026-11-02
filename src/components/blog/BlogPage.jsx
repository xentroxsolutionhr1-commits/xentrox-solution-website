import { useState, useMemo } from 'react';
import Icon from '../shared/Icon.jsx';

const articles = [
  {
    id: 'react-19-actions',
    title: 'How React 19 Actions & Server Components Change Web Architecture',
    slug: 'react-19-actions-server-components',
    category: 'Web Development',
    date: 'Oct 28, 2026',
    readTime: '6 min read',
    author: 'Sherin Singh S R',
    authorRole: 'Founder & Head of Engineering',
    summary:
      'Explore how React 19 simplifies async workflows, eliminates boilerplate state machines with Actions, and leverages optimistic UI updates for instant perceived performance.',
    content: `React 19 represents one of the most practical leaps forward in modern frontend engineering. With native support for Server Actions, the useActionState hook, and automatic batching of async transitions, the boundary between client interactivity and backend processing has become fluid.

Key architectural takeaways:
1. Native Form Handling without Redux or heavy client state: Forms now natively handle pending states, optimistic rollbacks, and server validation responses.
2. The compiler advantage: React Compiler reduces manual useMemo and useCallback ceremonies, allowing developers to write idiomatic JavaScript.
3. Enhanced asset loading: Stylesheets, fonts, and scripts now support native hoist precedence to eliminate flash of unstyled content (FOUC).

At XentroX Solutions, adopting these patterns in production projects has reduced client bundle sizes by up to 28% while improving Core Web Vitals across every measurable metric.`,
  },
  {
    id: 'seo-2026-tactics',
    title: 'The 2026 Technical SEO Playbook: Passing Core Web Vitals & Search Generative Experience',
    slug: 'technical-seo-2026-playbook',
    category: 'SEO & Growth',
    date: 'Oct 15, 2026',
    readTime: '8 min read',
    author: 'Shahaban B',
    authorRole: 'Founder & Marketing Lead',
    summary:
      'Search engines increasingly prioritize direct answers and real user experience. Here is how to structure your site architecture, schema data, and page speed to dominate search rankings.',
    content: `Search engines in 2026 demand more than just keywords. With AI Overviews and Google's emphasis on Interaction to Next Paint (INP), technical precision dictates who wins Page 1.

Essential pillars for 2026:
1. Interaction to Next Paint (INP): Replacing FID, INP measures whole-session responsiveness. Long-running JavaScript tasks on the main thread will kill your organic visibility.
2. Entity-Based Semantic Schema: Schema.org markup is no longer optional. Feeding clean JSON-LD knowledge graphs helps search models attribute authoritativeness to your brand.
3. Topic Depth over Keyword Stuffing: AI search summaries reward pages that answer questions comprehensively with proprietary data, real quotes, and structured tables.`,
  },
  {
    id: 'first-tech-job-guide',
    title: 'Breaking Into Tech in 2026: Why Production Projects Beat Tutorial Certificates',
    slug: 'breaking-into-tech-production-projects',
    category: 'Career & Tech',
    date: 'Oct 02, 2026',
    readTime: '5 min read',
    author: 'Subin S',
    authorRole: 'Founder & CEO',
    summary:
      'Recruiters review hundreds of resumes a week. Discover why deploying real-world applications with automated testing, CI/CD, and user metrics gets you hired faster.',
    content: `The tech hiring landscape has evolved. Watching a 40-hour tutorial and following along to build another generic clone won't stand out to hiring managers. 

What engineering leads look for in 2026:
1. Live, deployed URL with custom domains, SSL, and responsive design across all devices.
2. Production hygiene: Clean commit history, pull request descriptions, TypeScript typing, and automated testing.
3. Quantifiable impact: Did you optimize database queries? Did you reduce API latency? Document your architectural decisions in your GitHub README.

At XentroX Academy, every student builds at least two commercial-grade capstones with live monitoring, directly preparing them for senior-level code reviews.`,
  },
  {
    id: 'generative-ai-business',
    title: 'Beyond the Hype: How Small Businesses Are Using RAG & AI Agents Profitably',
    slug: 'generative-ai-business-rag-agents',
    category: 'AI & Automation',
    date: 'Sep 22, 2026',
    readTime: '7 min read',
    author: 'Dr. S. Priya Vasanth',
    authorRole: 'Founder & Strategy Director',
    summary:
      'How modern companies are using retrieval-augmented generation (RAG) and private vector databases to automate customer inquiries, document processing, and internal knowledge access.',
    content: `Generative AI has moved from speculative experiments to everyday utility. Companies that integrate LLMs into targeted internal workflows are realizing 30-40% operational efficiency gains.

High-impact production use cases:
1. Knowledge Base RAG Assistants: Ingesting company SOPs, warranty docs, and technical manuals so support staff can answer complex customer questions in seconds.
2. Automated Invoicing & Document Extraction: Vision-enabled LLMs parsing unstructured supplier receipts directly into ERP systems without human intervention.
3. Personalized Outbound Messaging: Drafting highly context-aware client proposals based on past project histories and client goals.`,
  },
  {
    id: 'ux-microinteractions',
    title: 'The Psychology of Micro-Interactions: Designing High-Conversion Web Experiences',
    slug: 'ux-microinteractions-conversion-design',
    category: 'Design & UX',
    date: 'Sep 10, 2026',
    readTime: '6 min read',
    author: 'Shahaban B',
    authorRole: 'Founder & Marketing Lead',
    summary:
      'Subtle animations, tactile button feedback, and intuitive progress indicators can increase e-commerce conversion rates by up to 24%. Learn the science behind interactive UX.',
    content: `Great design is often invisible. When a user taps a button or toggles a filter, their brain expects immediate confirmation. Micro-interactions bridge the sensory gap between digital software and physical reality.

Best practices for friction-free UX:
1. Immediate visual feedback (< 100ms): A button must acknowledge user touch with a ripple or state transition before background network requests finish.
2. Directional continuity: Modals and dropdowns should animate from their origin points, preserving spatial orientation for the user.
3. Accessible motion: Always respect the 'prefers-reduced-motion' media query for users who experience vestibular discomfort.`,
  },
];

const categories = ['All', 'Web Development', 'SEO & Growth', 'Career & Tech', 'AI & Automation', 'Design & UX'];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="relative isolate -mt-24 max-sm:-mt-20">
      {/* Full-Bleed Dark Forest Green Hero starting at margin 0 */}
      <section
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#064B38] px-4 pt-28 pb-20 text-white sm:px-6 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
        data-scroll-reveal
      >
        <div className="mx-auto w-full max-w-[1080px] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#84cc16]/40 bg-[#84cc16]/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#a3e635]">
            <span className="h-2 w-2 rounded-full bg-[#84cc16] animate-pulse" />
            XentroX Knowledge Hub
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Insights, Tech Trends &amp; Growth Strategies
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Practical articles written by our software engineers, digital marketing leads, and design architects.
          </p>

          {/* Categories */}
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

        {/* Curved bottom edge wave like Pricing & About */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 w-full h-[clamp(50px,6vw,75px)] z-10" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="h-full w-full block" fill="none">
            <path
              d="M0,45 C360,85 740,15 1100,55 C1260,72 1380,65 1440,45 L1440,80 L0,80 Z"
              fill="#f8faf9"
            />
          </svg>
        </div>
      </section>

      {/* Articles Grid & Body — Occupying the exact 1080px width of the navbar */}
      <div className="mx-auto w-full max-w-[1080px] pt-12 sm:pt-16 pb-16">
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id}
              data-scroll-reveal
              style={{ '--reveal-delay': `${(idx % 3) * 80}ms` }}
              className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16] hover:shadow-xl hover:shadow-[#062c23]/5"
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                  <span className="rounded-full bg-[#84cc16]/15 px-3 py-1 font-bold text-[#064b38]">
                    {article.category}
                  </span>
                  <span>{article.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="mt-4 text-xl font-bold text-[#062c23] group-hover:text-[#064b38] transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600 line-clamp-3">
                  {article.summary}
                </p>
              </div>

              {/* Author & Read Action */}
              <div className="mt-6 border-t border-slate-100 pt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#062c23]">{article.author}</p>
                  <p className="text-[11px] text-slate-400">{article.date}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#84cc16] hover:text-[#064b38] transition-colors"
                >
                  Read Article
                  <Icon name="arrowRight" size={12} />
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Article Modal */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setActiveArticle(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="rounded-full bg-[#84cc16]/20 px-3 py-1 text-xs font-bold text-[#064b38]">
                  {activeArticle.category} • {activeArticle.readTime}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
                >
                  <Icon name="x" size={18} />
                </button>
              </div>

              <div className="mt-6">
                <h2 className="text-2xl font-bold text-[#062c23]">{activeArticle.title}</h2>
                <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
                  <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>

                <div className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                  {activeArticle.content}
                </div>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="rounded-xl bg-[#062c23] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#083e30]"
                >
                  Close Article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter Signup */}
        <section className="mt-16 rounded-3xl bg-[#062c23] p-8 text-white sm:p-12" data-scroll-reveal>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-[#84cc16]/20 px-3 py-1 text-xs font-bold text-[#a3e635]">
                Stay Ahead in Tech
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Subscribe to the XentroX Tech Digest</h2>
              <p className="mt-2 text-sm text-slate-300">
                Get our monthly breakdown of web architecture best practices, SEO case studies, and modern growth playbooks directly to your inbox.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="rounded-2xl bg-white/10 p-5 text-center border border-white/20">
                  <p className="text-sm font-bold text-[#a3e635]">✓ You're on the list!</p>
                  <p className="mt-1 text-xs text-slate-300">Thank you for subscribing. Look out for our next issue.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-[#84cc16] focus:outline-none focus:ring-2 focus:ring-[#84cc16]/30"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#84cc16] px-6 py-3 text-xs sm:text-sm font-bold text-[#062c23] transition hover:bg-[#a3e635]"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
