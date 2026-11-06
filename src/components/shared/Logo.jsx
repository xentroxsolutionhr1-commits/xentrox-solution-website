import { Link } from 'react-router-dom';
import AnimatedLogo from './AnimatedLogo.jsx';

// Standalone Logo Symbol component for navbar, sidebar, login, etc.
export function LogoSymbol({ size = 38, className = '' }) {
  return <AnimatedLogo size={size} className={className} alt="XentroX symbol" />;
}

export default function Logo({ size = 'md', className = '', href = '/' }) {
  // Size mapping for logo symbol and typography
  const sizeMap = {
    sm: { symbol: 28, title: 'text-lg', sub: 'text-[8px] tracking-[3px]' },
    md: { symbol: 38, title: 'text-xl sm:text-2xl', sub: 'text-[9px] sm:text-[10px] tracking-[4px]' },
    lg: { symbol: 48, title: 'text-2xl sm:text-3xl', sub: 'text-[10px] sm:text-[11px] tracking-[5px]' },
    xl: { symbol: 56, title: 'text-3xl sm:text-4xl', sub: 'text-[11px] sm:text-[12px] tracking-[6px]' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const logoContent = (
    <div className={`group inline-flex items-center gap-2.5 sm:gap-3 shrink-0 select-none cursor-pointer ${className}`}>
      {/* LEFT: Exact XentroX Logo Symbol */}
      <div className="relative flex shrink-0 items-center justify-center">
        <AnimatedLogo size={currentSize.symbol} />
      </div>

      {/* RIGHT: XENTROX LABS Brand Text with Dark Green + Vibrant Lime */}
      <span className="flex flex-col leading-none text-left">
        <span className={`whitespace-nowrap font-black tracking-tight font-heading text-[#003831] ${currentSize.title}`}>
          XENTRO<span className="text-[#84CC16] group-hover:text-lime-400 transition-colors">X</span>
        </span>

        <span className={`mt-0.5 font-bold uppercase text-[#84CC16] font-mono tracking-widest ${currentSize.sub}`}>
          SOLUTIONS
        </span>
      </span>
    </div>
  );

  if (href) {
    // If internal route, use React Router Link
    if (href.startsWith('/')) {
      return (
        <Link to={href} aria-label="XentroX Solutions Home" className="inline-flex items-center no-underline outline-none">
          {logoContent}
        </Link>
      );
    }
    return (
      <a href={href} aria-label="XentroX Solutions Home" className="inline-flex items-center no-underline outline-none">
        {logoContent}
      </a>
    );
  }

  return logoContent;
}
