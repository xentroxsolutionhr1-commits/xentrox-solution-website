import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="relative z-10 bg-[#0c3f2f] text-white">
      <div className="mx-auto flex min-h-16 w-[min(100%_-_2rem,1200px)] items-center justify-between sm:min-h-[4.5rem]">
        <NavLink
          className="text-2xl font-bold tracking-[0.02em] text-inherit no-underline"
          to="/"
          onClick={closeMenu}
        >
          XentroX
        </NavLink>
        <button
          className="flex size-11 cursor-pointer flex-col items-center justify-center gap-[0.3rem] rounded-lg border border-white/35 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8bc34a] sm:hidden"
          type="button"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
          <span className="h-0.5 w-5 bg-white" />
        </button>
        <nav
          className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col items-stretch gap-0 bg-[#093226] px-4 pt-2 pb-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-8 sm:bg-transparent sm:p-0`}
          id="site-navigation"
          aria-label="Main navigation"
        >
          <NavLink
            className={({ isActive }) =>
              `px-2 py-3 font-semibold no-underline hover:text-[#8bc34a] sm:px-0 sm:py-2 ${
                isActive ? 'text-[#8bc34a]' : 'text-white'
              }`
            }
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `px-2 py-3 font-semibold no-underline hover:text-[#8bc34a] sm:px-0 sm:py-2 ${
                isActive ? 'text-[#8bc34a]' : 'text-white'
              }`
            }
            to="/about"
            onClick={closeMenu}
          >
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default NavigationBar;
