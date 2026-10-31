import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

export default function FloatingActionWidgets() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollProgress(Math.min(100, Math.max(0, progress)));
          // Hide on the first screen / top fold of each page; show once scrolled past 260px
          setShowScrollTop(scrollTop > 260);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initialize check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG Circular progress constants
  const size = 48; // px
  const strokeWidth = 3.5;
  const radius = (size - strokeWidth) / 2; // ~22.25
  const circumference = 2 * Math.PI * radius; // ~139.8
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <aside
      aria-label="Floating quick actions"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-3 pointer-events-none"
    >
      {/* 1. Scroll-To-Top Circular Progress Button */}
      {/* Hidden on the first page / initial screen fold, smoothly appears when scrolled down */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top"
        className={`group relative flex size-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_10px_25px_-5px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-110 hover:shadow-[0_14px_30px_-5px_rgba(132,204,22,0.4)] active:scale-95 ${
          showScrollTop
            ? 'opacity-100 pointer-events-auto translate-y-0 scale-100'
            : 'opacity-0 pointer-events-none translate-y-4 scale-75'
        }`}
      >
        {/* SVG Circular Progress Ring */}
        <svg
          className="absolute inset-0 size-full -rotate-90 pointer-events-none"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Subtle background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-slate-100"
          />
          {/* Active progress stroke ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="text-[#84cc16] transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Upward Arrow Icon */}
        <span className="relative z-10 text-[#07241a] transition-transform duration-200 group-hover:-translate-y-0.5">
          <Icon name="arrowUp" size={17} />
        </span>

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md opacity-0 transition-opacity duration-200 sm:group-hover:opacity-100 lg:inline-block">
          Back to top ({Math.round(scrollProgress)}%)
        </span>
      </button>

      {/* 2. WhatsApp Floating Action Button (Present on all pages, positioned below scroll-to-top) */}
      <a
        href="https://wa.me/919944988454?text=Hi%20XentroX%20Solutions,%20I'd%20like%20to%20inquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with XentroX on WhatsApp"
        title="Chat with us on WhatsApp"
        className="group relative pointer-events-auto flex size-12 sm:size-13 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_25px_-4px_rgba(37,211,102,0.5)] transition-all duration-300 hover:bg-[#20ba59] hover:scale-105 hover:shadow-[0_14px_32px_-4px_rgba(37,211,102,0.65)] active:scale-95"
      >
        {/* Subtle breathing radar ring */}
        <span className="absolute inset-0 -z-10 rounded-full bg-[#25D366] opacity-35 animate-ping duration-1000" />

        {/* WhatsApp Icon */}
        <span className="relative z-10 transition-transform duration-200 group-hover:scale-110">
          <Icon name="whatsapp" size={26} />
        </span>

        {/* Hover Tooltip (Desktop) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-lg bg-slate-900/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-md opacity-0 transition-opacity duration-200 sm:group-hover:opacity-100 lg:inline-block">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}

