import { Link } from 'react-router-dom';
import { LogoSymbol } from '../shared/Logo.jsx';
import Icon from '../shared/Icon.jsx';

const quickLinks = [
  ['/', 'Home'],
  ['/about', 'About Us'],
  ['/services', 'Services'],
  ['/portfolio', 'Portfolio'],
  ['/pricing', 'Pricing'],
  ['/blog', 'Blogs'],
  ['/careers', 'Careers'],
  ['/contact', 'Contact Us'],
];

const serviceLinks = [
  ['/services/seo', 'Search Engine Optimization'],
  ['/services/smm', 'Social Media & Meta Ads'],
  ['/services/branding', 'Branding & Graphic Design'],
  ['/services/webdev', 'Website Development'],
  ['/services/appdev', 'Mobile App Development'],
  ['/services/consulting', 'Digital Consulting'],
];

const socialLinks = [
  {
    label: 'Facebook',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/xentrox_solutions/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: 'X (Twitter)',
    href: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-3.5">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#051F17] text-[#C5D8CE]"
      style={{
        background:
          'radial-gradient(ellipse 60% 55% at 12% 15%, rgba(22, 163, 74, 0.16) 0%, transparent 70%), radial-gradient(ellipse 55% 60% at 88% 85%, rgba(132, 204, 22, 0.12) 0%, transparent 72%), linear-gradient(180deg, #072920 0%, #051F17 55%, #03150F 100%)',
      }}
    >
      {/* Top Luminous Emerald/Lime Accent Border */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, #84CC16 25%, #16A36A 50%, #84CC16 75%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Subtle Texture Grain Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='footerNoise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23footerNoise)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pt-12 pb-20 sm:px-10 sm:pt-16 sm:pb-8 lg:px-14 lg:pt-20 lg:pb-10">
        {/* Main 4-Column Structured Grid */}
        <div className="grid grid-cols-1 gap-8 pb-10 sm:grid-cols-2 sm:gap-10 sm:pb-12 lg:grid-cols-[1.35fr_0.85fr_1.05fr_1.25fr] lg:gap-12 lg:pb-14">
          {/* 1. Brand, Bio & Socials Column */}
          <div
            className="space-y-5 sm:col-span-2 lg:col-span-1"
            data-scroll-reveal
            data-reveal-from="left"
          >
            <Link
              to="/"
              aria-label="XentroX Solutions Home"
              className="group inline-flex items-center gap-3 no-underline outline-none"
            >
              <LogoSymbol size={36} />
              <span className="flex flex-col leading-none text-left">
                <span className="whitespace-nowrap font-heading text-xl font-black tracking-tight text-white">
                  XENTRO<span className="text-[#84CC16] transition-colors group-hover:text-lime-300">X</span>
                </span>
                <span className="mt-1 font-mono text-[8.5px] font-bold uppercase tracking-[3.2px] text-[#84CC16]">
                  SOLUTIONS
                </span>
              </span>
            </Link>

            <p className="m-0 max-w-[300px] text-[13.5px] leading-[1.75] text-[#B5C9BE]">
              XentroX Solutions is a software development and digital marketing company delivering innovative solutions for business growth.
            </p>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) =>
                social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex size-9.5 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#D1E2D9] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#84CC16] hover:bg-[#84CC16] hover:text-[#041B14]"
                  >
                    {social.icon}
                  </a>
                ) : (
                  <span
                    key={social.label}
                    aria-hidden="true"
                    className="flex size-9.5 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-[#D1E2D9]"
                  >
                    {social.icon}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* 2. Quick Links Column */}
          <div data-scroll-reveal style={{ '--reveal-delay': '70ms' }}>
            <h4 className="m-0 mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              <span className="h-3.5 w-1 rounded-full bg-[#84CC16]" aria-hidden="true" />
              <span>QUICK LINKS</span>
            </h4>
            <ul className="m-0 list-none space-y-2.5 p-0 text-[14px] font-medium">
              {quickLinks.map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-1.5 text-[#C2D6CC] no-underline transition-colors duration-200 hover:text-[#A3E635]"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/enroll"
                  className="inline-flex items-center gap-1.5 font-bold text-[#A3E635] no-underline transition-colors duration-200 hover:text-white"
                >
                  <span>Enroll Now</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Marketing & Services Column */}
          <div data-scroll-reveal style={{ '--reveal-delay': '140ms' }}>
            <h4 className="m-0 mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              <span className="h-3.5 w-1 rounded-full bg-[#84CC16]" aria-hidden="true" />
              <span>MARKETING &amp; MEDIA</span>
            </h4>
            <ul className="m-0 list-none space-y-2.5 p-0 text-[14px] font-medium">
              {serviceLinks.map(([to, label]) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="inline-flex items-center gap-1.5 text-[#C2D6CC] no-underline transition-colors duration-200 hover:text-[#A3E635]"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Locations Cards Column */}
          <div data-scroll-reveal data-reveal-from="right">
            <h4 className="m-0 mb-5 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-white">
              <span className="h-3.5 w-1 rounded-full bg-[#84CC16]" aria-hidden="true" />
              <span>LOCATIONS</span>
            </h4>
            <div className="space-y-3.5">
              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-xs transition-colors duration-200 hover:border-[#84CC16]/40 hover:bg-white/[0.07]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#84CC16]/15 text-[#A3E635]">
                  <Icon name="mapPin" size={15} />
                </span>
                <div>
                  <p className="m-0 text-[13.5px] font-bold leading-snug text-white sm:text-[14px]">
                    Marthandam Studio
                  </p>
                  <p className="m-0 mt-1 text-xs leading-relaxed text-[#9AB5A8]">
                    Kanyakumari District, Tamil Nadu, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-xs transition-colors duration-200 hover:border-[#84CC16]/40 hover:bg-white/[0.07]">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#84CC16]/15 text-[#A3E635]">
                  <Icon name="mapPin" size={15} />
                </span>
                <div>
                  <p className="m-0 text-[13.5px] font-bold leading-snug text-white sm:text-[14px]">
                    Trivandrum Tech Hub
                  </p>
                  <p className="m-0 mt-1 text-xs leading-relaxed text-[#9AB5A8]">
                    Technopark Corridor, Kerala, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright Bar */}
        <div
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-[#8FA99C] sm:flex-row"
          data-scroll-reveal
        >
          <p className="m-0 tracking-[0.01em]">
            © {new Date().getFullYear()} XentroX Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              to="/contact"
              className="text-[#8FA99C] no-underline transition-colors hover:text-[#A3E635]"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20" aria-hidden="true">•</span>
            <Link
              to="/contact"
              className="text-[#8FA99C] no-underline transition-colors hover:text-[#A3E635]"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
