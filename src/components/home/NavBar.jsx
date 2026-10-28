import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import Logo from '../shared/Logo.jsx';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-header ${
          scrolled ? 'shadow-xs py-2 bg-white/95 backdrop-blur-md' : 'py-2.5 bg-white/90 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-3">

          {/* Logo with official Dark Teal + Lime theme */}
          <div className="shrink-0 max-w-[210px] sm:max-w-none">
            <Logo size="md" href="/" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-4 xl:gap-6" aria-label="Main Navigation">
            {navLinksBeforeServices.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `relative py-1 text-[13px] tracking-normal no-underline transition-colors group ${
                    isActive ? 'text-[#003831] font-semibold' : 'text-slate-600 hover:text-[#003831] font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#84CC16] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
            <div className="relative" ref={servicesRef}>
              <button
                type="button"
                aria-expanded={servicesOpen}
                aria-controls="desktop-services-menu"
                onClick={() => setServicesOpen((open) => !open)}
                className={`inline-flex items-center gap-1 py-1 text-[13px] tracking-normal transition-colors ${
                  servicesOpen || isServiceRoute
                    ? 'text-[#003831] font-semibold'
                    : 'text-slate-600 hover:text-[#003831] font-medium'
                }`}
              >
                Services
                <Icon name="chevronDown" size={14} className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
              </button>
              {servicesOpen && (
                <div
                  id="desktop-services-menu"
                  className="absolute left-1/2 top-full z-50 mt-4 w-72 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#E2EBE5] bg-white p-2 shadow-xl"
                >
                  {serviceLinks.map((service) => (
                    <NavLink
                      key={service.path}
                      to={service.path}
                      onClick={() => setServicesOpen(false)}
                      className="block rounded-xl px-3 py-2.5 no-underline transition-colors hover:bg-[#F4F9F6]"
                    >
                      <span className="block text-sm font-bold text-slate-800">{service.label}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{service.detail}</span>
                    </NavLink>
                  ))}
                  <NavLink
                    to="/services"
                    onClick={() => setServicesOpen(false)}
                    className="mt-1 flex items-center justify-between border-t border-[#E2EBE5] px-3 py-3 text-xs font-bold text-[#003831] no-underline"
                  >
                    Explore all services
                    <Icon name="arrowRight" size={14} />
                  </NavLink>
                </div>
              )}
            </div>
            {navLinksAfterServices.filter((link) => link.path !== '/contact').map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative py-1 text-[13px] tracking-normal no-underline transition-colors group ${
                    isActive ? 'text-[#003831] font-semibold' : 'text-slate-600 hover:text-[#003831] font-medium'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#84CC16] transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop contact and primary action */}
          <div className="hidden xl:flex items-center gap-2.5 shrink-0">
            <NavLink
              to="/contact"
              className="group relative py-1 text-[13px] font-medium tracking-normal text-slate-600 no-underline transition-colors hover:text-[#003831]"
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'font-semibold text-[#003831]' : ''}>Contact</span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#84CC16] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>

            <button
              type="button"
              onClick={handleEnrollClick}
              className={`inline-flex items-center justify-center gap-1.5 h-9 px-3.5 text-xs font-bold rounded-lg bg-[#84CC16] hover:bg-[#92dc1d] active:bg-[#78ba14] text-[#003831] shadow-xs hover:shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer select-none border border-[#72b513]/30 active:scale-95 ${
                isEnrolling ? 'scale-95' : ''
              }`}
            >
              <span>Get Started</span>
              <Icon name="arrowRight" size={13} className="stroke-[2.5]" />
            </button>
          </div>

          {/* Compact navigation for tablet and mobile */}
          <div className="flex xl:hidden items-center gap-2 shrink-0 z-50">
            <button
              type="button"
              onClick={handleEnrollClick}
              className="px-3 py-1 h-8 text-[11px] font-bold rounded-lg bg-[#84CC16] text-[#003831] shadow-xs active:scale-95 transition-transform cursor-pointer"
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
              className={`w-8.5 h-8.5 flex items-center justify-center rounded-lg border transition-all cursor-pointer ${
                mobileOpen
                  ? 'bg-[#84CC16] text-[#003831] border-lime-500'
                  : 'bg-[#F4F9F6] border-[#E2EBE5] text-slate-800'
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
            className="xl:hidden absolute top-full left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-[#E2EBE5] px-5 py-6 shadow-2xl max-h-[calc(100vh-70px)] overflow-y-auto animate-drawer"
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
                        ? 'bg-[#F0FDF4] text-[#003831] border border-[#BDE8CA] font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
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
                    isServiceRoute ? 'bg-[#F0FDF4] text-[#003831]' : 'text-slate-800'
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
                  <div id="mobile-services-menu" className="ml-3 border-l border-[#E2EBE5] pl-3">
                    {serviceLinks.map((service) => (
                      <NavLink
                        key={service.path}
                        to={service.path}
                        onClick={closeMobileMenu}
                        className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 no-underline hover:bg-[#F4F9F6] hover:text-[#003831]"
                      >
                        {service.label}
                      </NavLink>
                    ))}
                    <NavLink
                      to="/services"
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-3 py-2.5 text-sm font-bold text-[#003831] no-underline hover:bg-[#F4F9F6]"
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
                        ? 'bg-[#F0FDF4] text-[#003831] border border-[#BDE8CA] font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
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
                className="flex items-center justify-between rounded-xl px-3.5 py-3 text-base font-semibold text-slate-800 no-underline transition-colors hover:bg-slate-50"
              >
                <span>Contact</span>
                <Icon name="arrowRight" size={14} className="opacity-40" />
              </NavLink>
            </div>

            <div className="pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="w-full btn-primary py-3.5 text-sm justify-center font-black shadow-md cursor-pointer"
              >
                <span>GET STARTED</span>
                <Icon name="arrowRight" size={16} />
              </button>
              <p className="text-center text-xs text-slate-500 mt-3 font-medium">
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