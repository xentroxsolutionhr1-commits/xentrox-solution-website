import { useEffect, useRef, useState } from 'react';
import AnimatedLogo from '../shared/AnimatedLogo.jsx';

function Spinner({ onComplete }) {
  const markRef = useRef(null);
  const [leaving, setLeaving] = useState(false);
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    let moveTimer;
    let finishTimer;
    let animation;
    let cancelled = false;

    const finishIntro = () => {
      if (cancelled) return;
      setLeaving(true);
      finishTimer = window.setTimeout(onComplete, 320);
    };

    const startMove = () => {
      if (cancelled) return;
      const mark = markRef.current;
      const target = document.querySelector('[data-navbar-logo-mark]');
      if (!mark || !target) {
        finishIntro();
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        finishIntro();
        return;
      }

      const markBounds = mark.getBoundingClientRect();
      const targetBounds = target.getBoundingClientRect();
      const deltaX = targetBounds.left + targetBounds.width / 2 - (markBounds.left + markBounds.width / 2);
      const deltaY = targetBounds.top + targetBounds.height / 2 - (markBounds.top + markBounds.height / 2);
      const scale = Math.min(targetBounds.width, targetBounds.height) / Math.max(markBounds.width, markBounds.height);

      setMoving(true);
      animation = mark.animate([
        { transform: 'translate(-50%, -50%) scale(1)' },
        { transform: `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${scale})` },
      ], {
        duration: 850,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards',
      });
      animation.onfinish = finishIntro;
    };

    moveTimer = window.setTimeout(startMove, 1900);
    return () => {
      cancelled = true;
      window.clearTimeout(moveTimer);
      window.clearTimeout(finishTimer);
      animation?.cancel();
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center transition-[background-color,opacity] duration-300 ${moving ? 'bg-[#062c23]/90' : 'bg-[#062c23]'} ${leaving ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
      role="status"
      aria-label="Loading XentroX"
    >
      <div ref={markRef} className="absolute left-1/2 top-1/2 size-[104px]" style={{ transform: 'translate(-50%, -50%)' }}>
        <AnimatedLogo size="100%" alt="XentroX logo" />
      </div>
    </div>
  );
}

export default Spinner;
