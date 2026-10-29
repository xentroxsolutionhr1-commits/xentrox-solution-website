import { useEffect, useRef, useState, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import ShinyText from '../react-bits/ShinyText.jsx';
import Ribbons from '../../bits/Ribbons.jsx';

const carouselCards = [
  {
    number: '01',
    category: 'Direction',
    tagline: 'Strategic North Star',
    title: 'Start with the outcome.',
    description: 'Set a clear goal first. Then choose the right architectural strategy to get there without costly scope drift or guesswork.',
    metricNum: 100,
    metricSuffix: '% Target Focus',
    decimals: 0,
    statLabel: 'Alignment Score',
    statValue: '100%',
    statusTone: 'border-emerald-200/80 bg-emerald-50 text-emerald-800',
    topBarGradient: 'from-[#84cc16] via-[#22c55e] to-[#059669]',
    highlights: [
      'Define quantified, contract-grade end-states',
      'Eliminate guesswork, waste & scope creep',
      'Directly align engineering with commercial value',
    ],
    telemetryCode: 'NODE_01 // END_STATE_LOCKED',
  },
  {
    number: '02',
    category: 'Clarity',
    tagline: 'Precision Telemetry',
    title: 'Measure what matters.',
    description: 'Look beyond superficial vanity numbers. We instrument real-time telemetry to know exactly what drives customer and business value.',
    metricNum: 99.9,
    metricSuffix: '% Zero Vanity',
    decimals: 1,
    statLabel: 'Data Fidelity',
    statValue: '99.9%',
    statusTone: 'border-lime-200/80 bg-lime-50 text-lime-800',
    topBarGradient: 'from-[#65a30d] via-[#84cc16] to-[#10b981]',
    highlights: [
      'Real-time behavioral & performance telemetry',
      'Distinguish high-impact signal from superficial noise',
      'Evidence-backed product iteration cycles',
    ],
    telemetryCode: 'NODE_02 // TELEMETRY_STREAM_ACTIVE',
  },
  {
    number: '03',
    category: 'Momentum',
    tagline: 'Compounding Velocity',
    title: 'Improve with intent.',
    description: 'Use what you learn to make every deployment compounding, predictable, and exponentially faster release after release.',
    metricNum: 3.5,
    metricSuffix: 'x Execution Speed',
    decimals: 1,
    statLabel: 'Velocity Factor',
    statValue: '3.5x',
    statusTone: 'border-emerald-200/80 bg-emerald-50 text-emerald-800',
    topBarGradient: 'from-[#10b981] via-[#84cc16] to-[#059669]',
    highlights: [
      'Continuous deployment & telemetry feedback loops',
      'Iterative architectural refinement without downtime',
      'Compounding returns on every release cycle',
    ],
    telemetryCode: 'NODE_03 // PIPELINE_VELOCITY_3.5X',
  },
  {
    number: '04',
    category: 'Mastery',
    tagline: 'Talent Incubation',
    title: 'Engineered by experts.',
    description: 'Through XentroX Labs, we bridge academic education with production-grade engineering, training developers who ship real client systems.',
    metricNum: 100,
    metricSuffix: '% Production Ready',
    decimals: 0,
    statLabel: 'Project Immersion',
    statValue: '100%',
    statusTone: 'border-teal-200/80 bg-teal-50 text-teal-800',
    topBarGradient: 'from-[#059669] via-[#10b981] to-[#84cc16]',
    highlights: [
      'Hands-on immersion with production codebases',
      'Modern full-stack, cloud & AI acceleration stacks',
      'Direct mentorship from senior software engineers',
    ],
    telemetryCode: 'NODE_04 // TALENT_SYSTEMS_VERIFIED',
  },
];

const heroWordsLine1 = [
  { text: 'Wisdom', from: { x: -80, y: -20, rotate: -8 }, delay: 120 },
  { text: 'rooted', from: { x: 0, y: -60, rotate: 0 }, delay: 240 },
  { text: 'in', from: { x: 0, y: 50, rotate: 0 }, delay: 340 },
  { text: 'heritage.', from: { x: 80, y: -20, rotate: 8 }, delay: 440 },
];

const heroWordsLine2 = [
  { text: 'Ready', from: { x: -90, y: 30, rotate: -6 }, delay: 580 },
  { text: 'for', from: { x: 0, y: 60, rotate: 0 }, delay: 680 },
  { text: "what's", from: { x: 30, y: -45, rotate: 4 }, delay: 780, isLime: true },
  { text: 'next.', from: { x: 90, y: 30, rotate: 6 }, delay: 880, isLime: true },
];

function MagneticLink({ to, variant, children, onClick }) {
  const handlePointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const offsetY = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    event.currentTarget.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  };

  const resetPosition = (event) => {
    event.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  const variantClasses = variant === 'primary'
    ? 'border border-lime-400/40 bg-gradient-to-r from-[#a3e635] to-[#84cc16] text-[#0d2a1a] shadow-[0_12px_30px_-8px_rgba(163,230,53,0.5)] hover:shadow-[0_16px_36px_-6px_rgba(163,230,53,0.65)] hover:from-[#b5f34b] hover:to-[#93db24]'
    : 'border border-white/25 bg-white/[0.06] text-white backdrop-blur-md hover:border-white/50 hover:bg-white/[0.12] hover:text-[#c7ff5e]';

  const isHash = typeof to === 'string' && to.startsWith('#');
  const commonClasses = `inline-flex min-h-[3rem] cursor-pointer items-center justify-center gap-2.5 rounded-xl px-5 py-2.5 text-[0.9rem] font-bold no-underline transition-[transform,background-color,border-color,box-shadow,color] duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635] sm:min-h-[3.35rem] sm:px-7 sm:py-3 sm:text-[0.95rem] ${variantClasses}`;

  if (isHash) {
    return (
      <a
        href={to}
        onClick={onClick}
        className={commonClasses}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPosition}
        onPointerCancel={resetPosition}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={commonClasses}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
    >
      {children}
    </Link>
  );
}

function Dashboard() {
  const heroRef = useRef(null);
  const heroRibbonsRef = useRef(null);
  const section2Ref = useRef(null);
  const carouselTrackRef = useRef(null);
  const counterNumberRef = useRef(null);
  const animatedMetricRef = useRef(null);
  const bgRingRef = useRef(null);
  const bgHexRef = useRef(null);

  const [wordsAnimated, setWordsAnimated] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideProgress, setSlideProgress] = useState(0);

  // Touch swipe handling for mobile
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Trigger hero words animation on mount
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setWordsAnimated(true);
    }, 150);

    if (heroRibbonsRef.current) {
      heroRibbonsRef.current.style.opacity = '1';
    }

    return () => window.clearTimeout(timer);
  }, []);

  // Animate ambient background shapes using animejs
  useEffect(() => {
    if (bgRingRef.current) {
      animate(bgRingRef.current, {
        rotate: 360,
        duration: 40000,
        loop: true,
        ease: 'linear',
      });
    }

    if (bgHexRef.current) {
      animate(bgHexRef.current, {
        rotate: -360,
        duration: 55000,
        loop: true,
        ease: 'linear',
      });
    }
  }, []);

  // Ribbon interactive hover behavior
  const handleHeroPointerMove = (event) => {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;

    const ribbons = heroRibbonsRef.current;
    if (!ribbons) return;
    ribbons.style.opacity = '1';
  };

  // Carousel navigation handlers
  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? carouselCards.length - 1 : prev - 1));
    setSlideProgress(0);
  }, []);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev === carouselCards.length - 1 ? 0 : prev + 1));
    setSlideProgress(0);
  }, []);

  // Anime.js powered smooth transition on activeSlide change
  useEffect(() => {
    // 1. Smoothly slide the track with Anime.js
    if (carouselTrackRef.current) {
      animate(carouselTrackRef.current, {
        translateX: `-${activeSlide * 100}%`,
        duration: 650,
        ease: 'outCubic',
      });
    }

    // 2. Animate the counter on the left side
    if (counterNumberRef.current) {
      animate(counterNumberRef.current, {
        translateY: [-14, 0],
        opacity: [0.1, 1],
        scale: [0.8, 1],
        duration: 450,
        ease: 'outBack',
      });
    }

    // 3. Stagger-animate active card content (badge, title, checklist items)
    if (carouselTrackRef.current) {
      const activeCardEl = carouselTrackRef.current.querySelector(
        `[data-card-index="${activeSlide}"]`
      );

      if (activeCardEl) {
        // Animate badge
        const badge = activeCardEl.querySelector('.card-badge');
        if (badge) {
          animate(badge, {
            scale: [0.82, 1],
            rotate: [-8, 0],
            opacity: [0, 1],
            duration: 500,
            ease: 'outBack',
          });
        }

        // Animate title
        const title = activeCardEl.querySelector('.card-title');
        if (title) {
          animate(title, {
            translateY: [16, 0],
            opacity: [0, 1],
            duration: 480,
            ease: 'outCubic',
          });
        }

        // Animate checklist items with stagger
        const highlightItems = activeCardEl.querySelectorAll('.card-highlight-item');
        if (highlightItems.length > 0) {
          animate(highlightItems, {
            translateY: [18, 0],
            opacity: [0, 1],
            delay: stagger(70, { start: 90 }),
            duration: 450,
            ease: 'outCubic',
          });
        }

        // 4. Animate Metric Counter dial up with Anime.js!
        const cardData = carouselCards[activeSlide];
        const counterTarget = { val: 0 };
        animate(counterTarget, {
          val: cardData.metricNum,
          duration: 900,
          ease: 'outExpo',
          onUpdate: () => {
            if (animatedMetricRef.current) {
              const formatted = cardData.decimals === 1
                ? counterTarget.val.toFixed(1)
                : Math.round(counterTarget.val);
              animatedMetricRef.current.textContent = `${formatted} ${cardData.metricSuffix}`;
            }
          },
        });
      }
    }
  }, [activeSlide]);

  // Smooth slide progress timer and auto-play
  useEffect(() => {
    if (isPaused) return undefined;

    const intervalTime = 6000;
    const stepTime = 50;
    const increment = (stepTime / intervalTime) * 100;

    const timer = window.setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepTime);

    return () => window.clearInterval(timer);
  }, [isPaused, activeSlide, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Interactive Card 3D Tilt on Mouse Move
  const handleCardMouseMove = (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    animate(card, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 200,
      ease: 'outQuad',
    });
  };

  const handleCardMouseLeave = (e) => {
    const card = e.currentTarget;
    animate(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 500,
      ease: 'outCubic',
    });
  };

  // Smooth scroll handler for anchor buttons
  const handleScrollToWhy = (e) => {
    e.preventDefault();
    const section = section2Ref.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 1: HERO PAGE DESIGN (CENTERED WORDS ANIMATING IN SEPARATELY)      */}
      {/* ========================================================================= */}
      <section
        ref={heroRef}
        className="relative isolate left-1/2 -ml-[50vw] -mt-24 flex min-h-[100svh] w-screen flex-col items-center justify-center overflow-hidden bg-[#062c23] px-4 pt-32 pb-20 text-white sm:px-6 sm:pt-36 sm:pb-24 lg:pt-40"
        onPointerMove={handleHeroPointerMove}
      >
        {/* Ambient lighting mesh */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(16,77,59,0.9)_0%,rgba(6,44,35,0.98)_70%,#041e17_100%)]"
          aria-hidden="true"
        />

        {/* Subtle geometric grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] sm:bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          aria-hidden="true"
        />

        {/* Glow Spheres */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/2 -z-10 size-[clamp(16rem,40vw,36rem)] -translate-x-1/2 rounded-full bg-[#75c943]/[0.14] blur-[120px] sm:blur-[140px]"
          aria-hidden="true"
        />

        {/* Interactive Dynamic Ribbons */}
        <div
          ref={heroRibbonsRef}
          className="pointer-events-none absolute inset-0 z-[1] hidden opacity-100 transition-opacity duration-500 lg:block"
          aria-hidden="true"
        >
          <Ribbons
            className="absolute inset-0"
            colors={['#a3e635', '#72d856', '#c7ff5e']}
            stationaryColors={['#a3e635', '#72d856', '#c7ff5e', '#a3e635', '#72d856', '#c7ff5e', '#a3e635', '#72d856', '#c7ff5e']}
            thickness={22}
            length={1.25}
            spread={14}
            stiffness={0.45}
            bounce={0.4}
            shape="lens"
            wave={0.08}
            softness={0.16}
            opacity={0.85}
            fade
          />
        </div>

        {/* Hero Centerpiece Content */}
        <div className="relative z-10 mx-auto my-auto flex w-full max-w-[1000px] flex-col items-center justify-center text-center">
          {/* Headline */}
          <h1 className="m-0 flex flex-col items-center justify-center gap-1.5 text-[clamp(2.1rem,8vw,5.2rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-white sm:gap-2">
            {/* Line 1 */}
            <span className="flex flex-wrap items-center justify-center gap-x-[0.25em] gap-y-1 sm:gap-x-[0.3em]">
              {heroWordsLine1.map((word, idx) => {
                const style = {
                  transition: `all 850ms cubic-bezier(0.16, 1, 0.3, 1) ${word.delay}ms`,
                  transform: wordsAnimated
                    ? 'translate(0px, 0px) rotate(0deg) scale(1)'
                    : `translate(${word.from.x}px, ${word.from.y}px) rotate(${word.from.rotate}deg) scale(0.85)`,
                  opacity: wordsAnimated ? 1 : 0,
                  filter: wordsAnimated ? 'blur(0px)' : 'blur(10px)',
                };

                return (
                  <span
                    key={idx}
                    style={style}
                    className="inline-block will-change-transform"
                  >
                    {word.text}
                  </span>
                );
              })}
            </span>

            {/* Line 2 with Lime / Shiny highlight */}
            <span className="flex flex-wrap items-center justify-center gap-x-[0.25em] gap-y-1 sm:gap-x-[0.3em]">
              {heroWordsLine2.map((word, idx) => {
                const style = {
                  transition: `all 850ms cubic-bezier(0.16, 1, 0.3, 1) ${word.delay}ms`,
                  transform: wordsAnimated
                    ? 'translate(0px, 0px) rotate(0deg) scale(1)'
                    : `translate(${word.from.x}px, ${word.from.y}px) rotate(${word.from.rotate}deg) scale(0.85)`,
                  opacity: wordsAnimated ? 1 : 0,
                  filter: wordsAnimated ? 'blur(0px)' : 'blur(10px)',
                };

                return (
                  <span
                    key={idx}
                    style={style}
                    className={`inline-block will-change-transform ${
                      word.isLime ? 'text-[#b8ed58] drop-shadow-[0_0_24px_rgba(184,237,88,0.35)]' : ''
                    }`}
                  >
                    {word.isLime ? (
                      <ShinyText
                        color="#b8ed58"
                        shineColor="#f4ffdb"
                        speed={3.5}
                        shineWidth={30}
                        trigger="view"
                      >
                        {word.text}
                      </ShinyText>
                    ) : (
                      word.text
                    )}
                  </span>
                );
              })}
            </span>
          </h1>

          {/* Centered Supporting Paragraph */}
          <p
            className={`mt-5 max-w-[660px] text-sm leading-[1.8] text-[#d4e4dc]/90 transition-all duration-700 delay-700 sm:mt-7 sm:text-base lg:text-lg ${
              wordsAnimated ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            We empower forward-thinking businesses and ambitious builders with production-grade engineering, digital acceleration, and scalable technology.
          </p>

          {/* Centered 2 Action Buttons */}
          <div
            className={`mt-7 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 delay-[850ms] sm:mt-9 sm:gap-4 ${
              wordsAnimated ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <MagneticLink to="/contact" variant="primary">
              <span>Get Started</span>
              <Icon name="arrowRight" size={17} />
            </MagneticLink>

            <MagneticLink to="#why-xentrox" variant="secondary" onClick={handleScrollToWhy}>
              <span>Why XentroX</span>
              <span className="text-xs">↓</span>
            </MagneticLink>
          </div>

          {/* Micro trust indicators */}
          <div
            className={`mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.7rem] font-medium text-white/50 transition-all duration-700 delay-1000 sm:mt-10 sm:gap-x-6 sm:text-xs ${
              wordsAnimated ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#a3e635]" />
              <span>Full-Stack Engineering</span>
            </div>
            <span className="hidden text-white/20 sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#a3e635]" />
              <span>Outcome-First Architecture</span>
            </div>
            <span className="hidden text-white/20 sm:inline">•</span>
            <div className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[#a3e635]" />
              <span>XentroX Labs Academy</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHY XENTROX (WHITE LUXURY CANVAS + ANIME.JS POWERED CAROUSEL)  */}
      {/* ========================================================================= */}
      <section
        ref={section2Ref}
        id="why-xentrox"
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden border-y border-slate-100 bg-white px-4 py-20 text-[#0d2a1a] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Subtle architectural dot grid on pristine white */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] opacity-40"
          aria-hidden="true"
        />

        {/* Anime.js animated rotating ambient geometric rings */}
        <div
          ref={bgRingRef}
          className="pointer-events-none absolute -right-24 -top-24 size-[28rem] rounded-full border border-emerald-500/10 opacity-60"
          aria-hidden="true"
        >
          <div className="absolute inset-4 rounded-full border border-dashed border-lime-500/15" />
          <div className="absolute inset-10 rounded-full border border-emerald-500/10" />
        </div>

        <div
          ref={bgHexRef}
          className="pointer-events-none absolute -left-24 -bottom-24 size-[28rem] rounded-full border border-lime-500/10 opacity-60"
          aria-hidden="true"
        >
          <div className="absolute inset-6 rounded-full border border-dashed border-emerald-500/15" />
        </div>

        {/* Soft atmospheric emerald ambient glow */}
        <div
          className="pointer-events-none absolute -right-32 top-10 size-[32rem] rounded-full bg-[#a3e635]/15 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-32 bottom-10 size-[32rem] rounded-full bg-[#10b981]/10 blur-[130px]"
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1240px]">
          {/* Main 2-Column Responsive Layout: Left Text | Right Carousel */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            
            {/* ------------------------------------------------------------- */}
            {/* LEFT SIDE: Strategic Narrative & Anime.js Controls            */}
            {/* ------------------------------------------------------------- */}
            <div className="flex flex-col items-start lg:col-span-5">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-[#84cc16]/40 bg-[#f4faee] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-[#2f5e13] shadow-xs">
                <span className="size-2 rounded-full bg-[#84cc16] shadow-[0_0_8px_#84cc16]" />
                <span>02 // WHY XENTROX</span>
              </div>

              {/* Headline */}
              <h2 className="mt-5 text-[clamp(2.1rem,4.2vw,3.6rem)] font-extrabold leading-[1.12] tracking-tight text-[#07241a]">
                Built for{' '}
                <span className="bg-gradient-to-r from-[#2e7d32] via-[#4d8b18] to-[#84cc16] bg-clip-text text-transparent">
                  measurable growth
                </span>
                , not vanity metrics.
              </h2>

              {/* Subtext */}
              <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                Every decision has a quantifiable reason. We eliminate guesswork, subjective scope creep, and bloated timelines by anchoring all architecture to verifiable, compounding commercial value.
              </p>

              {/* Value Bullet Highlights */}
              <div className="mt-6 flex flex-col gap-2.5 sm:mt-7">
                {[
                  'Outcome-first architecture tied directly to commercial ROI',
                  'High-fidelity telemetry across every layer of the product',
                  'Compounding velocity with zero technical debt accumulation',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-800">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#eaf8d8] font-bold text-[#366318] shadow-xs">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Interactive Quick-Jump Tabs */}
              <div className="mt-7 flex flex-wrap gap-2">
                {carouselCards.map((card, idx) => {
                  const isActive = activeSlide === idx;
                  return (
                    <button
                      key={card.number}
                      type="button"
                      onClick={() => {
                        setActiveSlide(idx);
                        setSlideProgress(0);
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'border border-[#84cc16] bg-[#84cc16] text-[#07241a] shadow-sm scale-105'
                          : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span>{card.number}</span>
                      <span className="font-sans font-semibold">{card.category}</span>
                    </button>
                  );
                })}
              </div>

              {/* Carousel Controls (Timer Line, Nav Arrows & Anime.js Counter) */}
              <div className="mt-8 flex w-full flex-col gap-4 border-t border-slate-100 pt-6 sm:mt-9">
                {/* Visual Auto-Play Progress Bar */}
                <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full bg-gradient-to-r from-[#84cc16] to-[#2e7d32] transition-all duration-75 ease-linear"
                    style={{ width: `${slideProgress}%` }}
                  />
                </div>

                <div className="flex w-full items-center justify-between gap-4">
                  {/* Anime.js Animated Slide Counter */}
                  <div className="flex items-center gap-3">
                    <span
                      ref={counterNumberRef}
                      className="font-mono text-sm font-extrabold text-slate-900 inline-block"
                    >
                      <span className="text-[#366318]">0{activeSlide + 1}</span>
                      <span className="text-slate-400"> / 0{carouselCards.length}</span>
                    </span>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-1.5">
                      {carouselCards.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          aria-label={`Go to slide ${idx + 1}`}
                          onClick={() => {
                            setActiveSlide(idx);
                            setSlideProgress(0);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                            activeSlide === idx
                              ? 'w-7 bg-[#84cc16]'
                              : 'w-2 bg-slate-200 hover:bg-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Arrow Navigation Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs transition-all duration-200 hover:border-[#84cc16] hover:bg-[#f7fcf2] hover:text-[#2f5e13] active:scale-95"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-[#84cc16] bg-[#84cc16] text-[#07241a] shadow-sm shadow-[#84cc16]/30 transition-all duration-200 hover:bg-[#94dc22] hover:shadow-md hover:shadow-[#84cc16]/40 active:scale-95"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* RIGHT SIDE: Anime.js Powered Carousel Track & 3D Cards        */}
            {/* ------------------------------------------------------------- */}
            <div
              className="relative overflow-hidden lg:col-span-7"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Sliding Carousel Track driven by Anime.js */}
              <div
                ref={carouselTrackRef}
                className="flex will-change-transform"
                style={{
                  transform: `translateX(-${activeSlide * 100}%)`,
                }}
              >
                {carouselCards.map((card, idx) => {
                  const isActive = activeSlide === idx;

                  return (
                    <div
                      key={card.number}
                      data-card-index={idx}
                      className="w-full shrink-0 px-1 sm:px-2"
                      style={{ perspective: '1000px' }}
                    >
                      <article
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border bg-gradient-to-br from-white via-[#fafdf9] to-[#f4faf4] p-6 sm:p-8 transition-all duration-500 will-change-transform ${
                          isActive
                            ? 'border-[#84cc16]/70 shadow-[0_25px_60px_-15px_rgba(7,36,26,0.14),0_0_0_1px_rgba(132,204,22,0.35)] ring-1 ring-[#84cc16]/20'
                            : 'border-slate-200/80 shadow-md opacity-60 scale-[0.98]'
                        }`}
                      >
                        {/* Top Accent Gradient Line */}
                        <div
                          className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${card.topBarGradient}`}
                        />

                        {/* Top Card Header */}
                        <div className="relative z-10 flex items-center justify-between border-b border-slate-100 pb-5 pt-1">
                          <div className="flex items-center gap-3.5">
                            <span className="card-badge flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#84cc16] to-[#4d7f0f] font-mono text-base font-black text-white shadow-md shadow-[#84cc16]/25">
                              {card.number}
                            </span>
                            <div>
                              <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#366318]">
                                {card.tagline}
                              </span>
                              <span className="block text-xs font-bold text-slate-500">
                                Pillar // {card.category}
                              </span>
                            </div>
                          </div>

                          {/* Anime.js live dialing metric chip */}
                          <div
                            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 font-mono text-xs font-bold shadow-2xs ${card.statusTone}`}
                          >
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span ref={isActive ? animatedMetricRef : null}>
                              {card.metricNum}{card.metricSuffix}
                            </span>
                          </div>
                        </div>

                        {/* Center Card Content */}
                        <div className="relative z-10 my-6">
                          <h3 className="card-title text-xl font-extrabold tracking-tight text-[#07241a] sm:text-2xl lg:text-3xl">
                            {card.title}
                          </h3>

                          <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
                            {card.description}
                          </p>

                          {/* Highlights Checklist with Anime.js Stagger Support */}
                          <div className="mt-6 space-y-2.5">
                            {card.highlights.map((highlight, hIdx) => (
                              <div
                                key={hIdx}
                                className="card-highlight-item flex items-start gap-3 rounded-xl border border-slate-100 bg-white p-3.5 text-xs text-slate-800 shadow-2xs transition-colors hover:border-[#84cc16]/40 hover:bg-[#fbfef9] sm:text-sm"
                              >
                                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-md bg-[#eaf8d8] font-mono text-[10px] font-bold text-[#366318]">
                                  {hIdx + 1}
                                </span>
                                <span className="font-medium">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Metric & Telemetry Band */}
                        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs">
                          <div className="flex items-center gap-2 font-mono text-slate-500">
                            <span className="text-[11px] uppercase tracking-wider text-slate-400">TELEMETRY:</span>
                            <span className="font-bold text-slate-700">{card.telemetryCode}</span>
                          </div>

                          <div className="inline-flex items-center gap-2 rounded-lg bg-[#f4faee] border border-[#84cc16]/30 px-3 py-1 font-mono text-xs font-bold text-[#2f5e13]">
                            <span>{card.statLabel}:</span>
                            <span className="text-[#15803d]">{card.statValue}</span>
                          </div>
                        </div>
                      </article>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: NEXT SECTION (WHAT'S NEXT / CTA)                              */}
      {/* ========================================================================= */}
      <section
        id="next-section"
        className="relative left-1/2 -ml-[50vw] w-screen bg-[#072d24] px-[max(1.25rem,calc((100vw-1200px)/2))] py-20 text-white sm:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#a3e635]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#a3e635] ring-1 ring-[#a3e635]/20">
              What’s Next
            </span>
            <h2 className="mt-4 text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-tight text-white">
              Ready to transform your vision into reality?
            </h2>
            <p className="mt-4 text-base text-[#d4e4db]/85 sm:text-lg">
              Partner with XentroX for high-velocity software engineering, scalable cloud systems, and industry-grade talent training.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#a3e635]/20 font-mono text-lg font-bold text-[#a3e635]">
                01
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Web & Mobile Engineering</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#d3e2d9]/80">
                Architecting responsive, lightning-fast web applications and mobile experiences tailored to your business goals.
              </p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a3e635] group-hover:underline">
                Explore Services →
              </Link>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#a3e635]/20 font-mono text-lg font-bold text-[#a3e635]">
                02
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">Cloud & AI Acceleration</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#d3e2d9]/80">
                Deploying robust microservices, cloud infrastructure, and generative AI integrations built for high concurrency.
              </p>
              <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a3e635] group-hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#a3e635]/20 font-mono text-lg font-bold text-[#a3e635]">
                03
              </div>
              <h3 className="mt-6 text-xl font-bold text-white">XentroX Labs Academy</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#d3e2d9]/80">
                Bridging university education with production-grade engineering, preparing aspiring developers for real-world impact.
              </p>
              <Link to="/courses" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a3e635] group-hover:underline">
                View Tracks →
              </Link>
            </div>
          </div>

          {/* Action Callout */}
          <div className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#a3e635]/20 bg-gradient-to-r from-[#0a382c] via-[#0e4839] to-[#0a382c] p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <div>
              <h4 className="text-xl font-bold text-white">Have a project in mind or want to join our academy?</h4>
              <p className="mt-1 text-sm text-[#d3e2d9]/80">Let’s discuss your objectives and build something remarkable together.</p>
            </div>
            <div className="flex shrink-0 gap-3">
              <MagneticLink to="/contact" variant="primary">
                Get in Touch
              </MagneticLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
