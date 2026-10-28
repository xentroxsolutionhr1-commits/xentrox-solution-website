import { useEffect, useRef } from 'react';
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

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-in-view', entry.isIntersecting);
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
      mutationObserver.disconnect();
      observer.disconnect();
      delete root.dataset.scrollRevealEnabled;
    };
  }, [location.key]);

  return (
    <div ref={revealRoot} className="min-h-screen overflow-x-clip bg-[#f8faf9] text-[#17231f]">
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-[1200px] pt-24 pb-8 max-sm:pt-[5.5rem] max-sm:pb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default FullLayout;