import { useState, useMemo, useEffect } from 'react';
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '');
import { X } from 'lucide-react';
import './BlogPage.css';

const defaultArticles = [
  {
    id: 'web-architecture-speed',
    title: 'How Modern Web Architecture Drives Conversion & Speed',
    category: 'Web Development',
    date: 'Nov 04, 2026',
    readTime: '5 min read',
    imageUrl: '/about/office-laptop-desk.jpg',
    summary:
      'Why component-driven architectures, sub-second load speeds, and intuitive UI patterns drive 3x higher user retention for modern businesses.',
    content: `In the modern digital landscape, speed is no longer just an engineering metric — it is your most direct conversion lever. A single second of delay in page load time can reduce conversions by over 7% and increase bounce rates significantly.

At XentroX Solutions, we engineer digital platforms that pass Google Core Web Vitals on real-world mobile devices. By combining lightweight React architectures, server-rendered components, and aggressive asset optimization, we ensure sub-second interaction speeds.

Key Principles We Implement:
1. Sub-second First Contentful Paint: Eliminate blocking third-party scripts and prioritize above-the-fold render paths.
2. Responsive Micro-interactions: Ensure tactile feedback on every button click and form interaction within 50 milliseconds.
3. Clean State Management: Avoid bloated client-side bundles by leveraging native async transitions and scoped API hooks.

Building with these fundamentals ensures your users enjoy an effortless experience from their very first visit.`,
  },
  {
    id: 'local-seo-playbook',
    title: 'The 2026 Local SEO & Search Ranking Playbook',
    category: 'SEO & Growth',
    date: 'Oct 28, 2026',
    readTime: '4 min read',
    imageUrl: '/portfolio/photos/greenroots-organic.jpg',
    summary:
      'How optimizing Google Business Profiles, structured schema data, and mobile core web vitals turns local search into a predictable customer acquisition channel.',
    content: `Organic search dominance in 2026 requires hyper-targeted relevance. When high-intent local customers search for services near them, search engines prioritize verified authority, structured metadata, and authentic reviews.

Our Core Local SEO Blueprint:
1. Google Business Profile Optimization: Maintain complete, high-resolution listings with localized service keywords and active updates.
2. Structured JSON-LD Schema: Mark up organizational data, physical coordinates, and client reviews to feed clean knowledge graphs to search engines.
3. Technical Crawlability: Fix broken canonicals, redirect chains, and indexing barriers that quietly waste crawl budgets.

Businesses that systematically follow this framework consistently capture the local map pack and generate high-intent inquiries week after week.`,
  },
  {
    id: 'brand-identity-converts',
    title: 'Creating Distinctive Brand Identities That Convert',
    category: 'Branding & Design',
    date: 'Oct 18, 2026',
    readTime: '5 min read',
    imageUrl: '/portfolio/photos/aura-skincare.jpg',
    summary:
      'A cohesive visual system and consistent design language across web, social, and print establishes instant credibility and long-term brand equity.',
    content: `Your brand is the sum of every touchpoint a customer experiences. From your typography choices and color palette to social templates and micro-copy, consistency builds subconscious trust.

What Makes a Brand Scalable:
1. Distinctive Visual Tokens: A signature color accent, accessible contrast ratios, and a clear typographic hierarchy that works from phone screens to billboards.
2. Friction-free User Experience: Visual design should guide user attention toward value, not distract with unnecessary ornaments.
3. Unified Brand Guidelines: Providing your marketing and development teams with a reusable component library prevents brand drift as your business expands.

Investing in intentional design from day one sets premium brands apart from forgettable commodities.`,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeArticle, setActiveArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [blogList, setBlogList] = useState(defaultArticles);

  // Close modal on escape key and scroll to top when opening an article
  useEffect(() => {
    if (!activeArticle) return undefined;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveArticle(null);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle]);

  // Attempt backend API fetch if available, fallback gracefully to curated default articles
  useEffect(() => {
   fetch(`${API_BASE_URL}/api/blogs`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch blogs');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Filter out dummy/gibberish single-word test strings like 'dfgujdfghj'
          const validArticles = data.filter(
            (b) => b.title && b.title.trim().length > 12 && b.title.includes(' ')
          );

          if (validArticles.length > 0) {
            const fallbackImages = [
              '/about/office-laptop-desk.jpg',
              '/portfolio/photos/greenroots-organic.jpg',
              '/portfolio/photos/aura-skincare.jpg',
              '/about/agency-workspace.jpg',
            ];
            const formatted = validArticles.map((b, idx) => ({
              id: b.id || b._id,
              title: b.title,
              category: (b.tags && b.tags[0]) || 'Web Development',
              date: new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(b.createdAt)),
              readTime: `${Math.max(1, Math.ceil((b.content || '').split(' ').length / 180))} min read`,
              author: b.author || 'XentroX Team',
              authorRole: 'Author & Architect',
              authorInitials: (b.author || 'XT').slice(0, 2).toUpperCase(),
              summary: b.content?.slice(0, 160) + (b.content?.length > 160 ? '...' : ''),
              content: b.content,
              imageUrl: b.imageUrl || fallbackImages[idx % fallbackImages.length],
            }));
            setBlogList(formatted);
          }
        }
      })
      .catch((err) => {
        console.warn('Using default blog articles:', err.message);
      });
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(blogList.map((a) => a.category).filter(Boolean))];
  }, [blogList]);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return blogList;
    return blogList.filter((a) => a.category === activeCategory);
  }, [activeCategory, blogList]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      try {
     await fetch(`${API_BASE_URL}/api/enquiries`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Newsletter Subscriber',
            email: newsletterEmail.trim(),
            service: 'Newsletter Subscription',
            message: `User subscribed to XentroX Tech Digest: ${newsletterEmail.trim()}`,
          }),
        });
      } catch {
        // silent
      }
      setNewsletterEmail('');
    }
  };

  return (
    <div className="blog-page">
      {!activeArticle && (
        <>
          {/* 1. HERO / HEADER SECTION WITH BLENDED ILLUSTRATION */}
          <section className="blog-hero-section" aria-label="Blog Header">
            {/* Background Artwork Layer */}
            <div className="blog-hero-art-layer" aria-hidden="true">
              <img
                src="/blog/career-growth-hero.png"
                alt=""
                className="blog-hero-art-img"
                loading="eager"
                decoding="async"
              />
              <div className="blog-hero-art-scrim" />
            </div>

            <div className="blog-container blog-hero-container">
              <div className="blog-hero-content">
                <div className="blog-tag" data-scroll-reveal>
                  <span className="blog-tag-dash" aria-hidden="true" />
                  <span>The XentroX Journal</span>
                </div>

                <h1 className="blog-hero-title" data-scroll-reveal>
                  Insights, Tech Trends &amp; <span className="blog-title-highlight">Growth</span>
                </h1>

                {/* Category Filter Pills */}
                <div className="blog-filter-bar" data-scroll-reveal>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`blog-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Soft bottom wave transition */}
            <div className="blog-hero-wave" aria-hidden="true">
              <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
                <path
                  d="M0,30 C360,60 740,10 1100,45 C1260,58 1380,50 1440,30 L1440,60 L0,60 Z"
                  fill="#F4FAF6"
                />
              </svg>
            </div>
          </section>

          {/* 2. BLOG CARDS GRID SECTION */}
          <section className="blog-grid-section" aria-label="Articles Grid">
            <div className="blog-container">
              <div className="blog-cards-grid" data-scroll-reveal>
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="blog-card"
                    onClick={() => setActiveArticle(article)}
                  >
                    {/* Blog Card Image */}
                    <div className="blog-card-img-wrap">
                      <img
                        src={article.imageUrl || '/about/office-laptop-desk.jpg'}
                        alt={article.title}
                        className="blog-card-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="blog-card-category-overlay">
                        <span className="blog-card-category">{article.category}</span>
                      </div>
                    </div>

                    <div className="blog-card-body">
                      <div className="blog-card-meta">
                        <span className="blog-card-time">{article.readTime}</span>
                        <span className="blog-meta-dot">•</span>
                        <span className="blog-post-date">{article.date}</span>
                      </div>

                      <h2 className="blog-card-title">{article.title}</h2>

                      <p className="blog-card-summary">{article.summary}</p>

                      <div className="blog-card-footer">
                        <span className="blog-card-read-link">
                          <span>Read Article</span>
                          <span className="blog-arrow" aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* 3. NEWSLETTER BANNER (MATCHING HOME THEME) */}
              <div className="blog-newsletter-box" data-scroll-reveal>
                <div>
                  <span className="blog-nl-tag">Stay Ahead</span>
                  <h2 className="blog-nl-title">Subscribe to the XentroX Digest</h2>
                  <p className="blog-nl-desc">
                    Get monthly breakdowns of web architecture best practices, SEO case studies, and digital growth playbooks.
                  </p>
                </div>

                <div>
                  {subscribed ? (
                    <div style={{ padding: '1rem', background: '#FFFFFF', borderRadius: '0.85rem', border: '1px solid #C6E7D2' }}>
                      <p style={{ margin: 0, fontWeight: 800, color: '#16A34A', fontSize: '0.9rem' }}>✓ You are subscribed!</p>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#526E62' }}>Thank you for joining our monthly digest.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubscribe} className="blog-nl-form">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Enter your email address..."
                        className="blog-nl-input"
                      />
                      <button type="submit" className="blog-nl-submit">
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 4. CLEAN ARTICLE READER MODAL */}
      {activeArticle && (
        <div
          className="blog-modal-backdrop"
          onClick={() => setActiveArticle(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="blog-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveArticle(null)}
              className="blog-modal-close-btn"
              aria-label="Close article"
            >
              <X size={18} />
            </button>

            {activeArticle.imageUrl && (
              <div className="blog-modal-img-wrap">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="blog-modal-img"
                />
              </div>
            )}

            <div className="blog-modal-meta">
              <span className="blog-card-category">{activeArticle.category}</span>
              <span className="blog-card-time">{activeArticle.readTime}</span>
            </div>

            <h2 className="blog-modal-title">{activeArticle.title}</h2>

            <div className="blog-modal-author-row">
              <span>{activeArticle.date}</span>
              <span>•</span>
              <span>{activeArticle.readTime}</span>
              <span>•</span>
              <span>XentroX Solutions</span>
            </div>

            <div className="blog-modal-content">
              {activeArticle.content}
            </div>

            <div className="blog-modal-footer">
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="blog-modal-done-btn"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
