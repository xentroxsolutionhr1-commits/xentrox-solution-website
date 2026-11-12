import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/common/Footer.jsx';
import Navbar from '../components/home/NavBar.jsx';
import FloatingActionWidgets from '../components/common/FloatingActionWidgets.jsx';

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

    const animations = new Map();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (!entry.isIntersecting) return;

        // Unobserve immediately so fast scrolling doesn't restart mid-flight reveals
        observer.unobserve(target);

        // Directional offsets
        let fromX = 0;
        if (target.dataset.revealFrom === 'left') fromX = -28;
        else if (target.dataset.revealFrom === 'right') fromX = 28;

        const fromY = target.dataset.revealFrom === 'bottom' ? 28 : 22;

        animations.get(target)?.pause();
        animations.delete(target);

        // Temporarily promote to GPU layer only while actively animating in
        target.style.willChange = 'opacity, transform';

        const delayVal = Number.parseFloat(getComputedStyle(target).getPropertyValue('--reveal-delay')) || 0;

        const animation = animate(target, {
          opacity: [0, 1],
          translateX: fromX !== 0 ? [fromX, 0] : 0,
          translateY: [fromY, 0],
          delay: delayVal,
          duration: 520,
          ease: 'outCubic',
          onComplete: () => {
            // Once revealed, clear transform and willChange so the element merges
            // back into the static page raster without lingering composited layers or blur.
            target.style.willChange = 'auto';
            target.style.transform = '';
            target.style.opacity = '';
            target.classList.add('is-in-view');
            animations.delete(target);
          },
        });
        animations.set(target, animation);
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 40px 0px',
    });

    const observedTargets = new WeakSet();
    const observeTargets = (node) => {
      if (!(node instanceof Element)) return;

      if (
        node.matches('[data-scroll-reveal]') &&
        !observedTargets.has(node) &&
        !node.classList.contains('is-in-view')
      ) {
        observedTargets.add(node);
        observer.observe(node);
      }

      node.querySelectorAll('[data-scroll-reveal]').forEach((target) => {
        if (observedTargets.has(target) || target.classList.contains('is-in-view')) return;
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
      mutationObserver.disconnect();
      observer.disconnect();
      animations.forEach((animation, target) => {
        animation.pause();
        target.style.willChange = 'auto';
        target.style.transform = '';
        target.style.opacity = '';
      });
      animations.clear();
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
      {/* Floating Scroll-to-Top with Progress Bar & WhatsApp Action */}
      <FloatingActionWidgets />
    </div>
  );
}

export default FullLayout;
