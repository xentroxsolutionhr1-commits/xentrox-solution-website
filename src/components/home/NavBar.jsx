import { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const links = [
  ['Home', '/'], ['About us', '/about'], ['Services', '/services'],
  ['Portfolio', '/portfolio'], ['Courses', '/courses'], ['Careers', '/careers', '06'], ['Contact', '/contact', '07'],
];

export default function Navbar({ onOpenEnroll }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const getStarted = () => {
    setOpen(false);
    if (onOpenEnroll) onOpenEnroll();
    else navigate('/contact');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50  bg-transparent text-white shadow-[0_-12px_50px_rgba(0,0,0,0.34),0_-2px_14px_rgba(0,0,0,0.2)]">
        <div className="mx-auto flex h-[76px] w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <NavLink to="/" aria-label="XentroX Solutions home" className="inline-flex items-center gap-3 no-underline">
            <img src="/favicon.png" alt="" className="size-10 object-contain" />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-bold tracking-[.08em] text-white">XENTRO<span className="text-[#a3e635]">X</span></span>
              <span className="mt-1.5 text-[9px] font-semibold tracking-[.24em] text-white/65">SOLUTIONS</span>
            </span>
          </NavLink>

          <div className="flex items-center gap-4 sm:gap-5">
            <button type="button" onClick={getStarted} className="inline-flex h-11 items-center gap-2 bg-[#84CC16] px-4 text-sm font-semibold text-[#003831] transition-colors hover:bg-[#a3e635] sm:px-5">
              Get started <Icon name="arrowRight" size={15} />
            </button>
            <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} aria-controls="site-drawer" className={`grid size-11 place-items-center border border-white/35 bg-transparent transition-colors hover:border-[#a3e635] ${open ? 'border-[#a3e635]' : ''}`}>
              <span className="flex w-[19px] flex-col gap-[6px]">
                <span className={`h-[2px] w-full bg-white transition-transform ${open ? 'translate-y-[4px] rotate-45' : ''}`} />
                <span className={`h-[2px] w-full bg-white transition-transform ${open ? '-translate-y-[4px] -rotate-45' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[60] bg-[#062c23]/45 transition-opacity duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`} onClick={() => setOpen(false)} aria-hidden="true" />
      <aside id="site-drawer" aria-label="Site navigation" aria-hidden={!open} inert={!open} className={`fixed right-0 top-0 z-[70] flex h-dvh w-full max-w-[480px] flex-col bg-white text-[#173c2e] shadow-[-24px_0_70px_rgba(6,44,35,.22)] transition-transform duration-500 ease-[cubic-bezier(.22,.8,.22,1)] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#e2ebe5] px-6 sm:px-9">
          <span className="text-xs font-semibold uppercase tracking-[.2em] text-[#718078]">Explore XentroX</span>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close navigation menu" className="grid size-10 place-items-center border border-[#dce4eb] text-[#003831] transition hover:border-[#84CC16] hover:text-[#416d3b]"><Icon name="close" size={18} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-6 py-8 sm:px-9" aria-label="Main navigation">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[.18em] text-[#4d7f0f]">Navigation</p>
          <div className="divide-y divide-[#e8eee9] border-y border-[#e8eee9]">
            {links.map(([label, path, number]) => (
              <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `group flex items-center gap-5 py-[17px] no-underline transition-colors ${isActive ? 'text-[#416d3b]' : 'text-[#233b31] hover:text-[#416d3b]'}`}>
                <span className="w-6 text-[10px] font-medium tracking-wider text-[#91a096]">{number}</span>
                <span className="flex-1 text-[21px] font-medium tracking-[-.025em]">{label}</span>
                <Icon name="arrowRight" size={17} className="-translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </NavLink>
            ))}
          </div>
        </nav>
        <div className="border-t border-[#e2ebe5] bg-[#f5f8f4] px-6 py-7 sm:px-9">
          <p className="mb-4 text-sm leading-6 text-[#64766c]">Have a project in mind? Let’s make it happen.</p>
          <button type="button" onClick={getStarted} className="flex w-full items-center justify-between bg-[#84CC16] px-5 py-4 text-left text-sm font-semibold text-[#003831] transition-colors hover:bg-[#a3e635]">Start a conversation <Icon name="arrowRight" size={17} /></button>
        </div>
      </aside>
    </>
  );
}
