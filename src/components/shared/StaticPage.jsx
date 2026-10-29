import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { posterCategories } from '../../data/courseCategories.js';

const pageTitles = {
  '/courses': 'Courses',
  '/projects': 'Projects',
  '/career-assistance': 'Career Assistance',
  '/blogs': 'Blogs',
  '/contact': 'Contact Us',
  '/enroll': 'Enroll Now',
  '/services': 'Services',
  '/portfolio': 'Portfolio',
  '/pricing': 'Pricing',
  '/blog': 'Blog',
  '/careers': 'Careers',
};

const services = [
  {
    id: 'seo',
    title: 'SEO & Content',
    description: 'Technical, local and content-led search work to build durable organic visibility.',
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    description: 'Platform-native strategy and creative to grow engaged communities around your brand.',
  },
  {
    id: 'webdev',
    title: 'Web & App Development',
    description: 'Fast, thoughtful web and app experiences built to support your next stage of growth.',
  },
  {
    id: 'branding',
    title: 'Branding & Design',
    description: 'Clear visual identities and design systems that make your business memorable.',
  },
];

function StaticPage() {
  const { pathname, hash } = useLocation();
  const [searchParams] = useSearchParams();
  const title = pageTitles[pathname] ?? 'XentroX';
  const query = searchParams.get('search')?.trim() ?? '';
  const courses = posterCategories.flatMap((category) =>
    category.courses.map((course) => ({ course, category: category.title })),
  );
  const matchingCourses = courses.filter(({ course }) =>
    course.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (pathname !== '/services' || !hash) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [hash, pathname]);

  if (pathname === '/services') {
    return (
      <section className="grid gap-4 px-4 py-[clamp(2rem,6vw,5rem)] sm:px-6 lg:px-8">
        <p className="m-0 text-xs font-extrabold uppercase tracking-[0.15em] text-[#4d7f0f]" data-scroll-reveal>
          From strategy to launch
        </p>
        <h1 className="m-0 text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight text-[#093226]" data-scroll-reveal style={{ '--reveal-delay': '90ms' }}>
          Our services
        </h1>
        <p className="m-0 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg" data-scroll-reveal style={{ '--reveal-delay': '180ms' }}>
          Connected marketing, design and technology to move your business forward.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((service, index) => (
            <article
              className="min-h-52 scroll-mt-28 rounded-2xl border border-[#e2ebe5] bg-white p-[clamp(1.25rem,3vw,2rem)] transition duration-200 hover:-translate-y-1 hover:border-[#b7d09a] hover:shadow-lg hover:shadow-[#093226]/5"
              id={service.id}
              key={service.id}
              data-scroll-reveal
              style={{ '--reveal-delay': `${index * 100}ms` }}
            >
              <span className="text-xs font-extrabold tracking-[0.1em] text-[#6b9b36]">
                0{index + 1}
              </span>
              <h2 className="mt-6 mb-2 text-[clamp(1.15rem,2.4vw,1.6rem)] font-semibold text-[#093226]">
                {service.title}
              </h2>
              <p className="m-0 leading-[1.7] text-[#53645c]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (pathname === '/courses') {
    return (
      <section className="grid gap-4 px-4 py-[clamp(2rem,8vw,6rem)] sm:px-6 lg:px-8">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.15em] text-[#4d7f0f]" data-scroll-reveal>
          Learn with XentroX
        </p>
        <h1 className="m-0 text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight text-[#093226]" data-scroll-reveal style={{ '--reveal-delay': '90ms' }}>
          {query ? 'Course search results' : 'Courses'}
        </h1>
        {query && (
          <p className="m-0 max-w-2xl break-words leading-7 text-slate-600">
            Results for “{query}”
          </p>
        )}
        {matchingCourses.length > 0 ? (
          <ul className="m-0 grid max-w-2xl list-none gap-3 p-0">
            {matchingCourses.map(({ course, category }) => (
              <li
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#e2ebe5] bg-white p-4"
                key={course}
                data-scroll-reveal
              >
                <Link
                  className="font-bold text-[#093226] no-underline transition-colors hover:text-[#4d7f0f]"
                  to={`/courses?search=${encodeURIComponent(course)}`}
                >
                  {course}
                </Link>
                <span className="text-sm text-slate-500">{category}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-0 leading-7 text-slate-600">
            No courses match your search. Try another term.
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="grid gap-4 px-4 py-[clamp(2rem,8vw,6rem)] sm:px-6 lg:px-8">
      <p className="m-0 text-xs font-bold uppercase tracking-[0.15em] text-[#4d7f0f]" data-scroll-reveal>
        XentroX Solutions
      </p>
      <h1 className="m-0 text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight text-[#093226]" data-scroll-reveal style={{ '--reveal-delay': '90ms' }}>
        {title}
      </h1>
      <p className="m-0 max-w-2xl leading-7 text-slate-600" data-scroll-reveal style={{ '--reveal-delay': '180ms' }}>
        More information about {title.toLowerCase()} will be available soon.
      </p>
    </section>
  );
}

export default StaticPage;
