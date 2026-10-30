import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer.jsx';
import Navbar from '../components/home/NavBar.jsx';

function FullLayout() {
  const revealRoot = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const root = revealRoot.current;
    if (
      !root ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return undefined;

    // Track scroll direction for bidirectional animations
    let lastScrollY = window.scrollY;
    let isScrollingDown = true;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      isScrollingDown = currentScrollY >= lastScrollY;
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animations = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const wasInView = target.classList.contains('is-in-view');
        if (entry.isIntersecting === wasInView) return;

        target.classList.toggle('is-in-view', entry.isIntersecting);

        // Directional offsets
        let fromX = 0;
        if (target.dataset.revealFrom === 'left') fromX = -32;
        else if (target.dataset.revealFrom === 'right') fromX = 32;

        const fromY = isScrollingDown ? 36 : -36;
        const exitY = isScrollingDown ? -24 : 24;

        animations.get(target)?.pause();
        animations.delete(target);

        if (entry.isIntersecting) {
          // Entering viewport: glide in with luxury fade
          const animation = animate(target, {
            opacity: [0, 1],
            translateX: fromX !== 0 ? [fromX, 0] : 0,
            translateY: [fromY, 0],
            delay: Number.parseFloat(getComputedStyle(target).getPropertyValue('--reveal-delay')) || 0,
            duration: 750,
            ease: 'outCubic',
          });
          animations.set(target, animation);
        } else {
          // Exiting viewport: smoothly fade out so reverse scroll re-triggers cleanly
          const animation = animate(target, {
            opacity: [1, 0],
            translateX: fromX !== 0 ? [0, fromX] : 0,
            translateY: [0, exitY],
            duration: 480,
            ease: 'outCubic',
          });
          animations.set(target, animation);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -5% 0px',
    });

    const observedTargets = new WeakSet();
    const observeTargets = (node) => {
      if (!(node instanceof Element)) return;

      if (node.matches('[data-scroll-reveal]') && !observedTargets.has(node)) {
        observedTargets.add(node);
        observer.observe(node);
      }

      node.querySelectorAll('[data-scroll-reveal]').forEach((target) => {
        if (observedTargets.has(target)) return;
        observedTargets.add(target);
        observer.observe(target);
      });
    };

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(observeTargets);
      });
    });

    root.dataset.scrollRevealEnabled = 'true';
    observeTargets(root);
    mutationObserver.observe(root, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mutationObserver.disconnect();
      observer.disconnect();
      animations.forEach((animation) => animation.pause());
      delete root.dataset.scrollRevealEnabled;
    };
  }, [location.key]);

  return (
    /* overflow-x-clip prevents full-bleed sections from adding a horizontal scrollbar */
    <div ref={revealRoot} className="min-h-screen overflow-x-clip bg-[#f8faf9] text-[#17231f]">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 pt-24 pb-8 max-sm:pt-20 max-sm:pb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default FullLayout;
