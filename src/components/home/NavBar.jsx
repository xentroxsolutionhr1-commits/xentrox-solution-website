import { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import AnimatedLogo from '../shared/AnimatedLogo.jsx';

export default function Navbar({ onOpenEnroll }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 15);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const enrollTimerRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLightNav =
    scrolled ||
    (pathname === '/' && !scrolled) ||
    pathname === '/enroll' ||
    pathname === '/contact' ||
    pathname === '/portfolio' ||
    pathname === '/services' ||
    pathname === '/careers' ||
    pathname === '/about' ||
    pathname === '/pricing' ||
    pathname === '/blog' ||
    pathname === '/blogs';

  const closeMobileMenu = () => {
    setMobileOpen(false);
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

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
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
          className={`pointer-events-auto relative mx-auto flex min-h-[3.5rem] w-full max-w-[1240px] items-center justify-between gap-3 rounded-2xl px-4 py-1.5 transition-all duration-300 sm:min-h-[3.75rem] sm:rounded-full sm:px-6 sm:gap-4 xl:min-h-[4rem] xl:grid xl:grid-cols-[auto_1fr_auto] xl:px-7 xl:gap-6 2xl:max-w-[1320px] 2xl:px-8 ${
            isLightNav ? 'text-[#062c23]' : 'text-white'
          } ${
            scrolled
              ? 'border border-white/70 bg-white/90 shadow-lg shadow-emerald-950/10 backdrop-blur-xl'
              : 'border-transparent bg-transparent shadow-none backdrop-blur-none'
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
              <span className={`text-[0.8rem] font-black tracking-tight sm:text-sm xl:text-base ${isLightNav ? 'text-[#062c23]' : 'text-white'}`}>
                XENTRO<span className={isLightNav ? 'text-[#16a34a]' : 'text-[#a3e635]'}>X</span>
              </span>
              <span className={`mt-0.5 text-[7px] font-bold tracking-[0.28em] sm:text-[8px] ${
                isLightNav ? 'text-[#062c23]/60' : 'text-white/55'
              }`}>
                SOLUTIONS
              </span>
            </span>
          </NavLink>

          {/* Desktop Nav — visible from xl (1280px) upwards */}
          <nav
            className="home-nav-type hidden items-center gap-4 xl:flex xl:justify-self-center 2xl:gap-5"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `group relative py-1 text-[13.5px] xl:text-[14px] tracking-normal no-underline transition-colors ${
                    isActive
                      ? (isLightNav ? 'font-bold text-[#062c23]' : 'font-semibold text-white')
                      : (isLightNav ? 'font-semibold text-[#062c23]/75 hover:text-[#16a34a]' : 'font-medium text-white/85 hover:text-[#a3e635]')
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    <span
                      className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full transition-all duration-300 ${
                        isLightNav ? 'bg-[#16a34a]' : 'bg-[#a3e635]'
                      } ${
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
              className={`inline-flex h-9 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4.5 text-[13px] font-semibold shadow-xs transition-all duration-200 active:scale-95 2xl:h-9.5 2xl:px-5 2xl:text-sm ${
                isLightNav
                  ? 'bg-[#064B38] text-white hover:bg-[#083e30] border border-emerald-950/20 shadow-md shadow-emerald-950/10'
                  : 'border border-[#72b513]/30 bg-[#84CC16] text-[#003831] hover:bg-[#92dc1d]'
              } ${
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
              className={`h-8 cursor-pointer rounded-full px-3 text-[11px] font-bold shadow-xs transition-transform active:scale-95 sm:h-10 sm:px-4 sm:text-sm ${
                isLightNav ? 'bg-[#064B38] text-white hover:bg-[#083e30]' : 'bg-[#84CC16] text-[#003831]'
              }`}
            >
              Get Started
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              className={`flex size-9 cursor-pointer items-center justify-center rounded-full border transition-all active:scale-90 ${
                isLightNav
                  ? 'border-emerald-900/20 bg-white/90 text-[#062c23] shadow-2xs'
                  : mobileOpen
                    ? 'border-[#a3e635] bg-[#a3e635]/15 text-[#a3e635]'
                    : 'border-white/20 bg-white/10 text-white hover:border-white/40'
              }`}
            >
              {mobileOpen ? <Icon name="close" size={16} className="animate-scale-in" /> : <Icon name="menu" size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation drawer */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="home-nav-type pointer-events-auto absolute left-3 right-3 top-[calc(100%+0.5rem)] z-50 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[1.5rem] border border-white/15 bg-[#062c23]/98 px-4 py-5 text-white shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] backdrop-blur-2xl animate-drawer sm:left-4 sm:right-4 sm:px-5 sm:py-6 sm:rounded-[1.75rem] xl:hidden"
          >
            <div className="flex flex-col space-y-1 mb-4 sm:space-y-1.5 sm:mb-5">
              {navLinks.map((link) => (
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
