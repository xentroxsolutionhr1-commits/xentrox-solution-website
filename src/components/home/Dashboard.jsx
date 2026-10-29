
import { useEffect, useRef, useState } from 'react';
import { animate, svg } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import ShinyText from '../react-bits/ShinyText.jsx';

const growthPrinciples = [
  {
    number: '01',
    category: 'Direction',
    title: 'Start with the outcome.',
    description: 'Set a clear goal first. Then choose the right strategy to get there.',
  },
  {
    number: '02',
    category: 'Clarity',
    title: 'Measure what matters.',
    description: 'Look beyond surface-level numbers to understand what is working.',
  },
  {
    number: '03',
    category: 'Momentum',
    title: 'Improve with intent.',
    description: 'Use what you learn to make the next move more effective.',
  },
];

function MagneticLink({ to, variant, children }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.1;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.1;
    event.currentTarget.style.translate = `${offsetX}px ${offsetY}px`;
  };

  const resetPosition = (event) => {
    event.currentTarget.style.translate = '0px 0px';
  };

  const variantClasses = variant === 'primary'
    ? 'border border-transparent bg-[#a3e635] text-[#102719] hover:bg-[#b5f34b]'
    : 'border border-white/25 text-white hover:border-white/55 hover:bg-white/5';

  return (
    <Link
      className={`inline-flex min-h-[3.25rem] items-center justify-center gap-[0.7rem] rounded-xl px-5 py-[0.85rem] text-[0.94rem] font-bold no-underline transition-[translate,background-color,border-color,box-shadow] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635] max-[640px]:min-h-12 max-[640px]:px-[0.95rem] max-[640px]:text-[0.84rem] ${variantClasses}`}
      to={to}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      {children}
    </Link>
  );
}

function PrincipleCard({ principle }) {
  return (
    <article className="group relative min-h-[12.5rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#092f25] p-5 text-white shadow-[0_26px_64px_-34px_rgba(2,25,18,0.72)] max-[640px]:min-h-[11.5rem] max-[640px]:rounded-[1.1rem] max-[640px]:p-4">
      <div
        className="pointer-events-none absolute -right-14 -top-20 size-64 rounded-full border border-[#a3e635]/10 transition-transform duration-700 group-hover:scale-110 max-[640px]:size-52"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-5 -top-12 size-48 rounded-full bg-[#a3e635]/[0.07] blur-3xl max-[640px]:size-40"
        aria-hidden="true"
      />
      <div className="relative flex min-h-[10.5rem] flex-col justify-between max-[640px]:min-h-[9.5rem]">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[#c5e1a0]">
            {principle.category}
          </span>
          <span className="font-mono text-[0.75rem] tracking-[0.16em] text-white/45">
            {principle.number} <span className="text-[#a3e635]">/ 03</span>
          </span>
        </div>
        <div className="max-w-[27rem] pb-1">
          <h3 className="mb-2 text-[clamp(1.4rem,2.3vw,1.8rem)] font-semibold leading-[1.08] tracking-[-0.05em] max-[640px]:text-[1.45rem]">
            {principle.title}
          </h3>
          <p className="m-0 max-w-[24rem] text-[0.84rem] leading-[1.65] text-[#d3e2d9]/75">
            {principle.description}
          </p>
        </div>
        <span className="absolute bottom-0 left-0 h-[3px] w-12 bg-[#a3e635] transition-[width] duration-500 group-hover:w-24" aria-hidden="true" />
      </div>
    </article>
  );
}

function Dashboard() {
  const heroDrawingRef = useRef(null);
  const principleTrackRef = useRef(null);
  const activeCardRef = useRef(null);
  const [activePrinciple, setActivePrinciple] = useState(0);

  useEffect(() => {
    const track = principleTrackRef.current;
    if (!track) return undefined;

    let frameId = 0;
    const updateActivePrinciple = () => {
      frameId = 0;
      if (window.innerWidth <= 900) {
        setActivePrinciple(0);
        return;
      }

      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      const stickyTop = window.innerHeight * 0.5 - 100;
      const stepSize = window.innerHeight * 0.68;
      const progress = window.scrollY + stickyTop - trackTop;
      const nextIndex = Math.max(
        0,
        Math.min(growthPrinciples.length - 1, Math.floor(progress / stepSize)),
      );
      setActivePrinciple((current) => current === nextIndex ? current : nextIndex);
    };

    const scheduleUpdate = () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(updateActivePrinciple);
    };

    updateActivePrinciple();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    const card = activeCardRef.current;
    if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const entrance = animate(card, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 420,
      ease: 'outCubic',
    });

    return () => entrance.pause();
  }, [activePrinciple]);

  useEffect(() => {
    const target = heroDrawingRef.current;
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const paths = target.querySelectorAll('[data-draw-path]');
    const drawables = svg.createDrawable(paths);

    const drawing = animate(drawables, {
      draw: ['0 0', '0 1'],
      duration: 1800,
      delay: (_, index) => 350 + index * 180,
      ease: 'inOutSine',
    });

    const heroImage = target.querySelector('[data-hero-image]');
    const imageMotion = heroImage
      ? animate(heroImage, {
        translateX: [-4, 4],
        scale: [1.015, 1.035],
        duration: 9000,
        ease: 'inOutSine',
        alternate: true,
        loop: true,
      })
      : null;

    return () => {
      drawing.pause();
      imageMotion?.pause();
    };
  }, []);

  return (
    <>
    <section className="relative isolate left-1/2 -ml-[50vw] -mt-24 flex h-screen min-h-svh w-screen flex-col justify-center overflow-hidden bg-[#062c23] px-[max(1.25rem,calc((100vw-1200px)/2))] pt-32 pb-8 text-white max-[900px]:h-svh max-[900px]:pt-32 max-[640px]:-mt-[5.5rem] max-[640px]:px-[1.1rem] max-[640px]:pt-28 max-[640px]:pb-6">

      {/* Keep the statue visible while the image gently drifts */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 -z-20 w-[68%] overflow-hidden max-[900px]:w-full"
        aria-hidden="true"
      >

      </div>

      {/* Preserve readable contrast over the image */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(4,35,27,0.97)_0%,rgba(4,44,33,0.90)_32%,rgba(4,44,33,0.55)_58%,rgba(4,44,33,0.16)_100%)] max-[900px]:bg-[linear-gradient(180deg,rgba(4,35,27,0.92)_0%,rgba(4,44,33,0.80)_52%,rgba(4,35,27,0.2)_100%)]"
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255_/_3%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_3%)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:linear-gradient(90deg,transparent,#000_55%,#000)]"
        aria-hidden="true"
      />

      {/* Green ambient glow */}
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] -z-10 aspect-square w-[clamp(16rem,34vw,32rem)] rounded-full bg-[#75c943] opacity-[0.12] blur-[130px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-[30%] left-[18%] -z-10 aspect-square w-[clamp(16rem,34vw,32rem)] rounded-full bg-[#75c943] opacity-[0.08] blur-[130px]"
        aria-hidden="true"
      />

      <div
        ref={heroDrawingRef}
        className="relative mx-auto my-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-4"
      >

        {/* Animated decorative lines */}
        <svg
          className="pointer-events-none absolute -left-[2%] top-[2%] z-0 hidden h-[58%] w-[42%] overflow-visible opacity-35 xl:block"
          viewBox="0 0 600 400"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <filter id="hero-left-line-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="soft-glow" />
              <feMerge>
                <feMergeNode in="soft-glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d="M-24 350C44 315 98 286 154 235S270 158 334 132 427 78 486 25"
            pathLength="1"
            stroke="#C7FF5E"
            strokeOpacity=".7"
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#hero-left-line-glow)"
            data-draw-path
          />

          <path
            d="M38 392C106 357 160 328 216 277S332 200 396 174 489 120 548 67"
            pathLength="1"
            stroke="#69F5B0"
            strokeOpacity=".64"
            strokeWidth="1.3"
            strokeLinecap="round"
            filter="url(#hero-left-line-glow)"
            data-draw-path
          />

          <path
            d="M102 434C170 399 224 370 280 319S396 242 460 216 553 162 612 109"
            pathLength="1"
            stroke="#C7FF5E"
            strokeOpacity=".48"
            strokeWidth="1.1"
            strokeLinecap="round"
            filter="url(#hero-left-line-glow)"
            data-draw-path
          />
        </svg>

        {/* Hero content */}
        <div
          className="relative z-10 max-w-[660px] max-[900px]:max-w-[740px]"
          data-scroll-reveal
          data-reveal-from="left"
        >


          <h1 className="m-0 text-[clamp(2.5rem,4.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.05em] max-[640px]:text-[clamp(2.2rem,10vw,3.5rem)] max-[640px]:leading-[1.08]">
            <span className="block">Wisdom rooted</span>
            <span className="block">in heritage.</span>
            <span className="block text-[#b8ed58]">
              <ShinyText
                color="#b8ed58"
                shineColor="#efffc0"
                speed={4}
                shineWidth={24}
                trigger="view"
              >
                Ready for
              </ShinyText>
            </span>
            <span className="block text-[#b8ed58]">
              <ShinyText
                color="#b8ed58"
                shineColor="#efffc0"
                speed={4}
                shineWidth={24}
                trigger="view"
              >
                what&apos;s next.
              </ShinyText>
            </span>
          </h1>
          <p
            className="mt-7 max-w-[480px] text-[1.02rem] leading-[1.8] text-[#d3e2d9] max-[640px]:mt-5 max-[640px]:max-w-[38rem] max-[640px]:text-[0.93rem] max-[640px]:leading-[1.7]"
            data-hero-copy
          >
            We empower ambitious learners with cutting-edge technology skills to
            innovate, build, and shape the digital future.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-[0.85rem] max-[640px]:mt-[1.4rem] max-[640px]:gap-[0.65rem]">
            <MagneticLink to="/contact" variant="primary">
              Get started
              <Icon name="arrowRight" size={17} />
            </MagneticLink>

            <MagneticLink to="/services" variant="secondary">
              Explore programs
            </MagneticLink>
          </div>

          <div className="mt-[2.2rem] flex items-center gap-[0.8rem] text-[#d0e2d8] max-[640px]:mt-[1.3rem]">


            <p className="m-0 text-[0.84rem] leading-6 max-[640px]:text-[0.75rem]">
              Learn today. Create tomorrow.
            </p>
          </div>
        </div>


        <div
          className="relative mx-auto min-h-[440px] w-full max-w-[550px] max-[900px]:hidden"
          aria-hidden="true"
        />
      </div>

      {/* Bottom section */}
      <div
        className="mx-auto mt-8 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-[clamp(0.7rem,2vw,1.5rem)] gap-y-2 pt-5 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-white/55 max-[640px]:mt-4 max-[640px]:gap-x-[0.6rem] max-[640px]:text-[0.55rem] max-[640px]:tracking-[0.1em]"
        data-scroll-reveal
      >

      </div>
    </section>
    <section
      className="relative left-1/2 -ml-[50vw] w-screen bg-[#f4f6ef] px-[max(1.25rem,calc((100vw-1200px)/2))] py-[clamp(5rem,9vw,8rem)] text-[#102719] max-[640px]:px-[1.1rem] max-[640px]:py-16"
      aria-labelledby="why-xentrox-title"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] items-start gap-[clamp(3rem,7vw,7rem)] max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <div className="sticky top-32 pt-3 max-[900px]:static max-[900px]:pt-0">
          <p className="mb-6 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#527a3a] max-[640px]:mb-5">
            <span className="h-px w-8 bg-[#82b545]" />
            Why XentroX
          </p>
          <h2
            id="why-xentrox-title"
            className="m-0 text-[clamp(2.8rem,4.3vw,4rem)] font-semibold leading-[1.02] tracking-[-0.065em] max-[900px]:max-w-[700px] max-[640px]:text-[clamp(2.5rem,10vw,3.6rem)]"
          >
            <span className="block">Built for</span>
            <span className="block">measurable</span>
            <span className="block text-[#618c39]">growth, not</span>
            <span className="block text-[#618c39]">vanity metrics.</span>
          </h2>
          <p className="mt-7 max-w-[25rem] text-[0.98rem] leading-[1.8] text-[#536158] max-[900px]:max-w-[38rem]">
            Every decision has a reason. Every next step moves your business
            closer to something that matters.
          </p>
        </div>

        <div ref={principleTrackRef} className="relative max-[900px]:hidden">
          <div className="sticky" style={{ top: 'calc(50svh - 6.25rem)' }}>
            <div ref={activeCardRef} key={growthPrinciples[activePrinciple].number}>
              <PrincipleCard principle={growthPrinciples[activePrinciple]} />
            </div>
          </div>
          {growthPrinciples.map((principle) => (
            <div key={principle.number} className="h-[68svh]" aria-hidden="true" />
          ))}
        </div>

        <div className="hidden space-y-3 max-[900px]:block">
          {growthPrinciples.map((principle) => (
            <PrincipleCard key={principle.number} principle={principle} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}

export default Dashboard;
