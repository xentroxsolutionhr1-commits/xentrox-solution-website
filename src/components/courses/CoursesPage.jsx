import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const courseCatalog = [
  {
    id: 'fullstack-web',
    title: 'Full Stack Web Development',
    category: 'Software Development',
    badge: 'Most Popular',
    duration: '16 Weeks',
    level: 'Beginner to Advanced',
    format: 'Live Interactive + Mentorship',
    rating: 4.9,
    reviews: 128,
    description: 'Master frontend to backend engineering. Build production-ready web apps with React, Node.js, Express, and PostgreSQL.',
    highlights: ['React 19 & Next.js', 'REST APIs & GraphQL', 'Database Design & Prisma', 'Full Deployment to Cloud'],
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack Engineering',
    category: 'Software Development',
    badge: 'High Demand',
    duration: '14 Weeks',
    level: 'Intermediate',
    format: 'Hands-on Coding Labs',
    rating: 4.8,
    reviews: 94,
    description: 'Deep dive into MongoDB, Express.js, React, and Node.js with state management, JWT auth, and scalable architectural patterns.',
    highlights: ['MongoDB Aggregations', 'Redux Toolkit & Zustand', 'Microservices Basics', 'CI/CD Pipelines'],
  },
  {
    id: 'python-dsa',
    title: 'Python & Data Structures',
    category: 'Software Development',
    badge: 'Foundation',
    duration: '12 Weeks',
    level: 'All Levels',
    format: 'Problem Solving Focus',
    rating: 4.9,
    reviews: 110,
    description: 'Strengthen problem-solving with Python fundamentals, algorithmic thinking, and competitive programming mastery.',
    highlights: ['Core Python & OOP', 'DSA (Trees, Graphs, DP)', 'LeetCode Practice Track', 'Technical Interview Prep'],
  },
  {
    id: 'java-enterprise',
    title: 'Java Enterprise Development',
    category: 'Software Development',
    badge: 'Enterprise',
    duration: '16 Weeks',
    level: 'Intermediate',
    format: 'Corporate Project Based',
    rating: 4.7,
    reviews: 76,
    description: 'Learn modern Java with Spring Boot, Hibernate, microservices architecture, and secure enterprise integration.',
    highlights: ['Spring Boot 3 & JPA', 'Microservices with Docker', 'Kafka Event Streaming', 'Enterprise Security'],
  },
  {
    id: 'generative-ai',
    title: 'Generative AI & LLM Applications',
    category: 'AI, Cloud & DevOps',
    badge: 'Cutting Edge',
    duration: '10 Weeks',
    level: 'Intermediate',
    format: 'AI Lab Projects',
    rating: 5.0,
    reviews: 82,
    description: 'Build modern AI applications using LangChain, OpenAI APIs, vector databases, RAG architectures, and AI agent frameworks.',
    highlights: ['Prompt Engineering & RAG', 'LangChain & LlamaIndex', 'Pinecone Vector DBs', 'Autonomous Agents'],
  },
  {
    id: 'cloud-computing',
    title: 'Cloud Computing (AWS / GCP)',
    category: 'AI, Cloud & DevOps',
    badge: 'Industry Cert',
    duration: '12 Weeks',
    level: 'Beginner to Intermediate',
    format: 'Hands-on Cloud Console',
    rating: 4.8,
    reviews: 65,
    description: 'Architect resilient, scalable, and secure cloud infrastructures across AWS and Google Cloud Platform services.',
    highlights: ['EC2, S3, Lambda & VPC', 'IAM & Cloud Security', 'Serverless Architecture', 'Terraform IaC Basics'],
  },
  {
    id: 'devops-engineering',
    title: 'DevOps Engineering & CI/CD',
    category: 'AI, Cloud & DevOps',
    badge: 'High Salary',
    duration: '14 Weeks',
    level: 'Advanced',
    format: 'Infrastructure Projects',
    rating: 4.9,
    reviews: 58,
    description: 'Automate build, test, and release cycles using Docker, Kubernetes, GitHub Actions, Linux, and monitoring stacks.',
    highlights: ['Docker & Containerization', 'Kubernetes Orchestration', 'GitHub Actions Pipelines', 'Prometheus & Grafana'],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    category: 'Marketing & Media',
    badge: 'Comprehensive',
    duration: '12 Weeks',
    level: 'All Levels',
    format: 'Live Campaign Budgets',
    rating: 4.9,
    reviews: 142,
    description: 'Become a full-funnel digital marketer. Master performance marketing, inbound growth, conversion optimization, and analytics.',
    highlights: ['Google Ads & GA4', 'Conversion Rate Opt (CRO)', 'Email Automation & CRM', 'ROI Attribution Models'],
  },
  {
    id: 'technical-seo',
    title: 'Technical SEO & Search Analytics',
    category: 'Marketing & Media',
    badge: 'Specialized',
    duration: '8 Weeks',
    level: 'Intermediate',
    format: 'Live Site Audits',
    rating: 4.8,
    reviews: 89,
    description: 'Dominate organic search with technical crawl audits, Core Web Vitals optimization, schema markup, and content clustering.',
    highlights: ['Core Web Vitals & Speed', 'Schema.org & Structured Data', 'Keyword Clustering & Intent', 'Ahrefs & Semrush Mastery'],
  },
  {
    id: 'social-media-ads',
    title: 'Social Media & Meta Ads',
    category: 'Marketing & Media',
    badge: 'High ROI',
    duration: '8 Weeks',
    level: 'All Levels',
    format: 'Real Ad Spend Labs',
    rating: 4.9,
    reviews: 97,
    description: 'Scale businesses using Instagram, Facebook, and LinkedIn ads with creative frameworks and high-converting retargeting loops.',
    highlights: ['Meta Business Manager', 'Audience Retargeting', 'Creative Copywriting', 'Video Ad Strategies'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design & Prototyping',
    category: 'Marketing & Media',
    badge: 'Design Track',
    duration: '12 Weeks',
    level: 'All Levels',
    format: 'Figma Portfolio Sprint',
    rating: 4.9,
    reviews: 114,
    description: 'Craft elegant, user-centric interfaces. Conduct user research, build wireframes, design systems, and clickable Figma prototypes.',
    highlights: ['Figma Mastery & Auto Layout', 'Design Systems & Tokens', 'User Journey Mapping', 'Usability Testing'],
  },
  {
    id: 'video-editing',
    title: 'Video Editing & Motion Graphics',
    category: 'Marketing & Media',
    badge: 'Creative',
    duration: '10 Weeks',
    level: 'All Levels',
    format: 'Studio Footage Projects',
    rating: 4.8,
    reviews: 62,
    description: 'Tell compelling brand stories with Adobe Premiere Pro and After Effects. Master pacing, color grading, sound design, and motion.',
    highlights: ['Premiere Pro & After Effects', 'Short-form Reels & TikToks', 'Color Grading & LUTs', 'Sound Mixing & FX'],
  },
  {
    id: 'graphic-design',
    title: 'Graphic Design & Visual Identity',
    category: 'Marketing & Media',
    badge: 'Brand Craft',
    duration: '10 Weeks',
    level: 'All Levels',
    format: 'Brand Guidelines Sprint',
    rating: 4.8,
    reviews: 80,
    description: 'Build unforgettable visual identities. Master typography, logo design, color theory, vector illustration, and print collateral.',
    highlights: ['Illustrator & Photoshop', 'Logo & Icon Design', 'Typography & Layout', 'Brand Guideline Books'],
  },
];

const categories = ['All', 'Software Development', 'AI, Cloud & DevOps', 'Marketing & Media'];

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredCourses = useMemo(() => {
    return courseCatalog.filter((course) => {
      const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

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
            Industry-Accredited Curriculum
          </div>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Future-Ready Professional Courses
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200 sm:text-lg">
            Master in-demand tech and digital marketing skills with practical projects, personal mentorship, and direct placement support.
          </p>

          {/* Search & Filter Bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Icon name="search" size={20} className="absolute left-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, technology (e.g. React, Python, SEO)..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-slate-300 shadow-sm backdrop-blur transition focus:border-[#84cc16] focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-[#84cc16]/30"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                    isActive
                      ? 'bg-[#84cc16] text-[#062c23] font-bold shadow-md'
                      : 'bg-white/10 text-white border border-white/20 hover:border-[#84cc16] hover:bg-[#84cc16] hover:text-[#062c23]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Course Cards Grid & Body */}
      <div className="pt-12 sm:pt-16 pb-16">
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course, idx) => (
            <article
              key={course.id}
              data-scroll-reveal
              style={{ '--reveal-delay': `${(idx % 3) * 80}ms` }}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#84cc16] hover:shadow-xl hover:shadow-[#062c23]/5"
            >
              <div>
                {/* Card Meta Top */}
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#84cc16]/15 px-3 py-1 text-xs font-bold text-[#064b38]">
                    {course.badge}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Icon name="star" size={14} className="fill-amber-400 text-amber-400" />
                    <span>{course.rating}</span>
                    <span className="text-slate-400 font-normal">({course.reviews})</span>
                  </div>
                </div>

                {/* Title & Category */}
                <h3 className="mt-4 text-xl font-bold text-[#062c23] transition-colors group-hover:text-[#064b38]">
                  {course.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-slate-500">{course.category}</p>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {course.description}
                </p>

                {/* Specs Badge Row */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1">
                    <Icon name="clock" size={12} className="text-[#064b38]" />
                    {course.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1">
                    <Icon name="award" size={12} className="text-[#064b38]" />
                    {course.level}
                  </span>
                </div>

                {/* Key Highlights */}
                <div className="mt-5 border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Focus Modules</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-slate-600">
                    {course.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#84cc16]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <Link
                  to={`/enroll?course=${encodeURIComponent(course.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#062c23] px-4 py-2.5 text-center text-xs sm:text-sm font-bold text-white transition hover:bg-[#083e30] group-hover:shadow-md"
                >
                  Enroll Now
                  <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </section>

        {filteredCourses.length === 0 && (
          <div className="py-16 text-center" data-scroll-reveal>
            <p className="text-lg font-semibold text-slate-700">No courses found matching "{searchQuery}"</p>
            <p className="mt-2 text-sm text-slate-500">Try searching for another keyword or clear your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
              }}
              className="mt-4 rounded-xl bg-[#062c23] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#083e30]"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Bottom CTA Banner */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-[#062c23] p-8 text-white sm:p-12" data-scroll-reveal>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-[#84cc16]/20 px-3 py-1 text-xs font-bold text-[#a3e635]">
                Guaranteed Career Assistance
              </span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Not sure which track is right for you?
              </h2>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                Talk to our senior career mentors for personalized guidance based on your academic background and career goals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 lg:justify-end">
              <Link
                to="/contact?inquiry=career-guidance"
                className="inline-flex items-center gap-2 rounded-xl bg-[#84cc16] px-6 py-3 text-sm font-bold text-[#062c23] transition hover:bg-[#a3e635]"
              >
                Book Free Counseling
                <Icon name="arrowRight" size={16} />
              </Link>
              <Link
                to="/career-assistance"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Learn About Placements
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
