import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

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
        navigate('/contact');
      }
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 text-white shadow-[0_8px_32px_rgb(0_0_0_/_10%)] backdrop-blur-xl transition-colors duration-300 ${
          scrolled ? 'bg-[#062c23]/75' : 'bg-[#062c23]/45'
        }`}
      >
        <div
          className="mx-auto flex min-h-[4.5rem] w-full max-w-[1440px] items-center justify-between gap-4 px-5 py-2 sm:px-8 lg:px-12 xl:px-16"
        >

          {/* Logo with official Dark Teal + Lime theme */}
          <NavLink
            to="/"
            aria-label="XentroX Solutions home"
            className="group inline-flex shrink-0 items-center gap-2.5 text-white no-underline"
          >
            <span className="grid size-9 place-items-center">
              <img src="/favicon.png" alt="" className="size-full object-contain drop-shadow-[0_0_12px_rgb(163_230_53_/_25%)]" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-black tracking-tight sm:text-base">
                XENTRO<span className="text-[#a3e635]">X</span>
              </span>
              <span className="mt-1 text-[8px] font-bold tracking-[0.28em] text-white/55">
                SOLUTIONS
              </span>
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-7 xl:flex"
            aria-label="Main Navigation"
          >
            {navLinksBeforeServices.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `group relative py-1 text-sm tracking-normal no-underline transition-colors ${
                    isActive ? 'font-semibold text-white' : 'font-normal text-white/85 hover:text-[#a3e635]'
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
                className={`group relative inline-flex items-center gap-1 py-1 text-sm tracking-normal transition-colors ${
                  servicesOpen || isServiceRoute
                    ? 'font-semibold text-white'
                    : 'font-normal text-white/85 hover:text-[#a3e635]'
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
                  `group relative py-1 text-sm tracking-normal no-underline transition-colors ${
                    isActive ? 'font-semibold text-white' : 'font-normal text-white/85 hover:text-[#a3e635]'
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

          {/* Desktop contact and primary action */}
          <div className="hidden shrink-0 items-center gap-2.5 xl:flex">
            <button
              type="button"
              onClick={handleEnrollClick}
              className={`inline-flex h-9 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-[#72b513]/30 bg-[#84CC16] px-3.5 text-xs font-bold text-[#003831] shadow-xs transition-all duration-200 hover:bg-[#92dc1d] hover:shadow-sm active:scale-95 active:bg-[#78ba14] ${
                isEnrolling ? 'scale-95' : ''
              }`}
            >
              <span>Get Started</span>
              <Icon name="arrowRight" size={13} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Compact navigation for tablet and mobile */}
          <div className="z-50 flex shrink-0 items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={handleEnrollClick}
              className="h-8 cursor-pointer rounded-lg bg-[#84CC16] px-3 text-[11px] font-bold text-[#003831] shadow-xs transition-transform active:scale-95"
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
              className={`flex size-9 cursor-pointer items-center justify-center rounded-full border transition-all ${
                mobileOpen
                  ? 'border-lime-500 bg-[#84CC16] text-[#003831]'
                  : 'border-white/15 bg-white/5 text-white'
              } active:scale-90`}
            >
              {mobileOpen ? <Icon name="close" size={18} className="animate-scale-in" /> : <Icon name="menu" size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="absolute top-full left-0 right-0 z-50 max-h-[calc(100vh-70px)] overflow-y-auto border-b border-white/10 bg-[#062c23]/95 px-5 py-6 text-white shadow-2xl backdrop-blur-xl animate-drawer xl:hidden"
          >
            <div className="flex flex-col space-y-1.5 mb-5">
              {navLinksBeforeServices.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `px-3.5 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'border border-[#a3e635]/30 bg-[#a3e635]/10 font-bold text-[#c8f589]'
                        : 'text-white/85 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <Icon name="arrowRight" size={14} className="opacity-40" />
                </NavLink>
              ))}
              <div>
                <button
                  type="button"
                  aria-expanded={mobileServicesOpen}
                  aria-controls="mobile-services-menu"
                  onClick={() => setMobileServicesOpen((open) => !open)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-base font-semibold transition-colors hover:bg-slate-50 ${
                    isServiceRoute ? 'bg-[#a3e635]/10 text-[#c8f589]' : 'text-white/85'
                  }`}
                >
                  <span>Services</span>
                  <Icon
                    name="chevronDown"
                    size={16}
                    className={`transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {mobileServicesOpen && (
                  <div id="mobile-services-menu" className="ml-3 border-l border-white/15 pl-3">
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
                    `px-3.5 py-3 rounded-xl text-base font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'border border-[#a3e635]/30 bg-[#a3e635]/10 font-bold text-[#c8f589]'
                        : 'text-white/85 hover:bg-white/10'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <Icon name="arrowRight" size={14} className="opacity-40" />
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={closeMobileMenu}
                className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-white/85 no-underline transition-colors hover:bg-white/10"
              >
                <span>Contact</span>
                <Icon name="arrowRight" size={14} className="opacity-40" />
              </NavLink>
            </div>

            <div className="border-t border-white/15 pt-3">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="w-full btn-primary py-3.5 text-sm justify-center font-black shadow-md cursor-pointer"
              >
                <span>GET STARTED</span>
                <Icon name="arrowRight" size={16} />
              </button>
              <p className="mt-3 text-center text-xs font-medium text-white/50">
                XentroX Solutions • Digital growth, engineered.
              </p>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop overlay on phone view */}
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