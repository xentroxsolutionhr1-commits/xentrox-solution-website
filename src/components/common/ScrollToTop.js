import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop({ children }) {
  const { key, pathname, hash, state } = useLocation();

  useEffect(() => {
    if (hash || state?.preserveScroll) return;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [key, hash, pathname, state]);

  return children || null;
}