import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import AnimatedLogo from '../shared/AnimatedLogo.jsx';

export default function Navbar({ onOpenEnroll }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 15);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const enrollTimerRef = useRef(null);
  const servicesRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isServiceRoute = pathname.startsWith('/services');

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile drawer is open to prevent overlapping scroll bugs
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  useEffect(() => () => window.clearTimeout(enrollTimerRef.current), []);

  useEffect(() => {
    if (!servicesOpen) return undefined;

    const handleOutsideClick = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [servicesOpen]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];
  const navLinksBeforeServices = navLinks.slice(0, 2);
  const navLinksAfterServices = navLinks.slice(2);

  const serviceLinks = [
    { label: 'SEO & Content', path: '/services#seo', detail: 'Grow organic visibility' },
    { label: 'Social Media Marketing', path: '/services#smm', detail: 'Build your community' },
    { label: 'Web & App Development', path: '/services#webdev', detail: 'Build digital products' },
    { label: 'Branding & Design', path: '/services#branding', detail: 'Create a memorable brand' },
  ];

  const handleEnrollClick = () => {
    setIsEnrolling(true);
    window.clearTimeout(enrollTimerRef.current);
    enrollTimerRef.current = window.setTimeout(() => {
      setIsEnrolling(false);
      closeMobileMenu();
      if (onOpenEnroll) {
        onOpenEnroll();
      } else {
        navigate('/enroll');
      }
    }, 150);
  };

  return (
    <>
      <header
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 text-white sm:px-4 sm:pt-4 lg:pt-5"
      >
        {/*
          Pill navbar:
          - Full width on mobile with small horizontal margin (px-3)
          - Caps at max-w-[1080px] on large screens and centers
          - min-h scales: 3.75rem phone → 4rem tablet → 4.25rem desktop
        */}
        <div
          className={`pointer-events-auto relative mx-auto flex min-h-[3.75rem] w-full max-w-[1080px] items-center justify-between gap-3 rounded-2xl px-4 py-2 shadow-[0_16px_48px_-24px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-colors duration-300 sm:min-h-[4rem] sm:rounded-full sm:px-5 sm:gap-4 xl:min-h-[4.25rem] xl:grid xl:grid-cols-[1fr_auto_1fr] xl:px-6 xl:gap-4 2xl:px-8 2xl:gap-5 ${
            scrolled ? 'bg-[#062c23]/90' : 'bg-[#062c23]/80'
          }`}
        >

          {/* Logo */}
          <NavLink
            to="/"
            aria-label="XentroX Solutions home"
            className="group inline-flex shrink-0 items-center gap-2 text-white no-underline sm:gap-2.5 xl:justify-self-start"
          >
            <span data-navbar-logo-mark className="grid size-8 place-items-center opacity-100 transition-opacity sm:size-9">
              <AnimatedLogo size="100%" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[0.8rem] font-black tracking-tight sm:text-sm xl:text-base">
                XENTRO<span className="text-[#a3e635]">X</span>
              </span>
              <span className="mt-0.5 text-[7px] font-bold tracking-[0.28em] text-white/55 sm:text-[8px]">
                SOLUTIONS
              </span>
            </span>
          </NavLink>

          {/* Desktop Nav — visible from xl (1280px) upwards */}
          <nav
            className="home-nav-type hidden items-center gap-4 xl:flex xl:justify-self-center 2xl:gap-5"
            aria-label="Main Navigation"
          >
            {navLinksBeforeServices.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `group relative py-1 text-[15px] tracking-normal no-underline transition-colors 2xl:text-base ${
                    isActive ? 'font-semibold text-white' : 'font-medium text-white/85 hover:text-[#a3e635]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-[#a3e635] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            {/* Services dropdown */}
            <div
              className="relative"
              ref={servicesRef}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false);
              }}
            >
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-menu"
                onClick={() => setServicesOpen((open) => !open)}
                className={`group relative inline-flex items-center gap-1 py-1 text-[15px] tracking-normal transition-colors 2xl:text-base ${
                  servicesOpen || isServiceRoute
                    ? 'font-semibold text-white'
                    : 'font-medium text-white/85 hover:text-[#a3e635]'
                }`}
              >
                Services
                <Icon name="chevronDown" size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                <span
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-[#a3e635] transition-all duration-300 ${
                    isServiceRoute ? 'w-full' : 'w-0'
                  }`}
                />
              </button>
              {servicesOpen && (
                <div
                  id="desktop-services-menu"
                  className="absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#062c23]/95 p-2 shadow-xl backdrop-blur-xl">
                    {serviceLinks.map((service) => (
                      <NavLink
                        key={service.path}
                        to={service.path}
                        onClick={() => setServicesOpen(false)}
                        className="block rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-white/10"
                      >
                        <span className="block text-sm font-semibold text-white">{service.label}</span>
                        <span className="mt-0.5 block text-xs font-normal text-white/55">{service.detail}</span>
                      </NavLink>
                    ))}
                    <NavLink
                      to="/services"
                      onClick={() => setServicesOpen(false)}
                      className="mt-1 flex items-center justify-between border-t border-white/10 px-3 py-3 text-xs font-semibold text-[#a3e635] no-underline"
                    >
                      Explore all services
                      <Icon name="arrowRight" size={14} />
                    </NavLink>
                  </div>
                </div>
              )}
            </div>
            {navLinksAfterServices.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `group relative py-1 text-[15px] tracking-normal no-underline transition-colors 2xl:text-base ${
                    isActive ? 'font-semibold text-white' : 'font-medium text-white/85 hover:text-[#a3e635]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-[#a3e635] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA — xl+ */}
          <div className="home-nav-type hidden shrink-0 items-center gap-2.5 xl:flex xl:justify-self-end">
            <button
              type="button"
              onClick={handleEnrollClick}
              className={`inline-flex h-10 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#72b513]/30 bg-[#84CC16] px-4 text-sm font-bold text-[#003831] shadow-xs transition-all duration-200 hover:bg-[#92dc1d] hover:shadow-sm active:scale-95 active:bg-[#78ba14] 2xl:h-11 2xl:px-5 2xl:text-base ${
                isEnrolling ? 'scale-95' : ''
              }`}
            >
              <span>Get Started</span>
              <Icon name="arrowRight" size={13} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Compact nav for tablet & mobile (< xl) */}
          <div className="home-nav-type z-50 flex shrink-0 items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={handleEnrollClick}
              className="h-8 cursor-pointer rounded-full bg-[#84CC16] px-3 text-[11px] font-bold text-[#003831] shadow-xs transition-transform active:scale-95 sm:h-10 sm:px-4 sm:text-sm"
            >
              Get Started
            </button>

            <button
              type="button"
              onClick={() => {
                if (mobileOpen) setMobileServicesOpen(false);
                setMobileOpen((open) => !open);
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className={`flex size-8 cursor-pointer items-center justify-center rounded-full border transition-all sm:size-9 ${
                mobileOpen
                  ? 'border-lime-500 bg-[#84CC16] text-[#003831]'
                  : 'border-white/15 bg-white/5 text-white'
              } active:scale-90`}
            >
              {mobileOpen ? <Icon name="close" size={16} className="animate-scale-in" /> : <Icon name="menu" size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="home-nav-type absolute left-3 right-3 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#062c23]/97 px-4 py-5 text-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl animate-drawer sm:left-4 sm:right-4 sm:px-5 sm:py-6 sm:rounded-[1.75rem] xl:hidden"
          >
            <div className="flex flex-col space-y-1 mb-4 sm:space-y-1.5 sm:mb-5">
              {navLinksBeforeServices.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between sm:px-3.5 sm:py-3 sm:text-base ${
                      isActive
                        ? 'border border-[#a3e635]/30 bg-[#a3e635]/10 font-bold text-[#c8f589]'
                        : 'text-white/85 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <Icon name="arrowRight" size={13} className="opacity-40" />
                </NavLink>
              ))}
              {/* Mobile Services accordion */}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-colors sm:px-3.5 sm:py-3 sm:text-base ${
                    isServiceRoute ? 'bg-[#a3e635]/10 text-[#c8f589]' : 'text-white/85 hover:bg-white/10'
                  }`}
                >
                  <span>Services</span>
                  <Icon
                    name="chevronDown"
                    size={15}
                    className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div id="mobile-services-menu" className="ml-3 mt-1 border-l border-white/15 pl-3">
                    {serviceLinks.map((service) => (
                      <NavLink
                        key={service.path}
                        to={service.path}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 no-underline hover:bg-white/10 hover:text-white"
                      >
                        {service.label}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/services"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2.5 text-sm font-bold text-[#a3e635] no-underline hover:bg-white/10"
                    >
                      Explore all services
                    </NavLink>
                  </div>
                )}
              </div>
              {navLinksAfterServices.filter((link) => link.path !== '/contact').map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between sm:px-3.5 sm:py-3 sm:text-base ${
                      isActive
                        ? 'border border-[#a3e635]/30 bg-[#a3e635]/10 font-bold text-[#c8f589]'
                        : 'text-white/85 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <Icon name="arrowRight" size={13} className="opacity-40" />
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-white/85 no-underline transition-colors hover:bg-white/10 sm:px-3.5 sm:py-3 sm:text-base"
              >
                <span>Contact</span>
                <Icon name="arrowRight" size={13} className="opacity-40" />
              </NavLink>
            </div>

            <div className="border-t border-white/15 pt-3">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#84CC16] py-3 text-sm font-black text-[#003831] shadow-md cursor-pointer transition-all active:scale-95 sm:py-3.5"
              >
                <span>GET STARTED</span>
                <Icon name="arrowRight" size={15} />
              </button>
              <p className="mt-3 text-center text-xs font-medium text-white/50">
                XentroX Solutions • Digital growth, engineered.
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay on mobile/tablet */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs xl:hidden animate-fade-in"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
