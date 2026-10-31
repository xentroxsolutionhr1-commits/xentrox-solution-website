import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import Carousel from '../../bits/Carousel.jsx';
import GhostFibers from '../../bits/GhostFibers.jsx';
import VariableProximity from '../../bits/VariableProximity.jsx';

const heroStatistics = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 10, suffix: '+', label: 'Industries served' },
];

function ApproachIcon({ kind }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {kind === 'people' && <><path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" /><circle cx="10" cy="7.5" r="3.5" /><path d="M16 4.5a3.5 3.5 0 0 1 0 6.8M17 15h.5a3.5 3.5 0 0 1 3.5 3.5V20" /></>}
      {kind === 'build' && <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>}
      {kind === 'learn' && <><path d="m3 5.5 7-2 7 2v15l-7-2-7 2zM17 5.5l4-1v15l-4 1M10 3.5v15" /></>}
    </svg>
  );
}

const approachGallery = [
  {
    id: 'people',
    image: '/whyxentroxcarosel1.png',
    alt: 'XentroX team collaborating on technology',
    title: 'Technology for people',
    description: 'We listen first, then shape digital tools around the way your team and customers actually work.',
    icon: <ApproachIcon kind="people" />,
  },
  {
    id: 'engineering',
    image: '/whyxentroxcarosel2.png',
    alt: 'A software engineering team working together',
    title: 'Engineering with care',
    description: 'Thoughtful web and mobile products, built to feel clear today and stay useful as your business grows.',
    icon: <ApproachIcon kind="build" />,
  },
  {
    id: 'learning',
    image: '/whyxentroxcarosel3.png',
    alt: 'Learners building practical software skills',
    title: 'Learning by doing',
    description: 'Learners work alongside practicing engineers, building the confidence to contribute to real projects.',
    icon: <ApproachIcon kind="learn" />,
  },
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
  const heroStatsRef = useRef(null);
  const section2Ref = useRef(null);

  useEffect(() => {
    let hasStarted = false;
    let animations = [];

    const startCounters = () => {
      if (hasStarted) return;
      const nodes = heroStatsRef.current?.querySelectorAll('[data-stat-count]');
      if (!nodes?.length) return;
      hasStarted = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        nodes.forEach((node) => {
          node.textContent = node.dataset.statCount;
        });
        return;
      }

      animations = Array.from(nodes, (node, index) => {
        const counter = { value: 0 };
        const target = Number(node.dataset.statCount);
        return animate(counter, {
          value: target,
          delay: index * 110,
          duration: 1200,
          ease: 'outExpo',
          onUpdate: () => { node.textContent = String(Math.floor(counter.value)); },
          onComplete: () => { node.textContent = String(target); },
        });
      });
    };

    const introAlreadyFinished = document.querySelector('[data-logo-intro-complete="true"]');
    const introIsRunning = document.querySelector('[data-logo-intro-active="true"]');
    if (introAlreadyFinished || !introIsRunning) startCounters();
    else window.addEventListener('xentrox:logo-intro-complete', startCounters);

    return () => {
      window.removeEventListener('xentrox:logo-intro-complete', startCounters);
      animations.forEach((animation) => animation.pause());
    };
  }, []);

  const handleScrollToWhy = (event) => {
    event.preventDefault();
    const section = section2Ref.current;
    if (!section) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
    section.scrollIntoView({ behavior });
  };
  return (
    <>
      {/* ========================================================================= */}
      {/* SECTION 1: EDITORIAL HERO */}
      {/* ========================================================================= */}
      <section
        className="relative isolate left-1/2 -ml-[50vw] -mt-24 flex min-h-[100svh] w-screen flex-col overflow-hidden bg-[#062c23] px-4 pt-28 pb-7 text-white max-sm:-mt-20 sm:px-6 sm:pt-32 sm:pb-8 lg:pt-36"
      >
        {/* Previous photo background, retained for reference.
        <div
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://static.vecteezy.com/system/resources/previews/021/368/937/large_2x/green-background-designs-and-premium-high-res-pictures-download-free-photo.jpg")',
          }}
          aria-hidden="true"
        />
        */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: 'radial-gradient(ellipse 64% 70% at 55% 50%, rgba(132, 204, 22, 0.2), transparent 72%), radial-gradient(ellipse 36% 42% at 18% 72%, rgba(34, 197, 94, 0.16), transparent 70%)',
          }}
          aria-hidden="true"
        >
          <GhostFibers
            className="h-full w-full"
            glowColor="#c7ff5e"
            lineColor="#a3e635"
            secondaryColor="#22c55e"
            gradient="along"
            speed={0.2}
            scale={1.15}
            rotation={-18}
            layers={3}
            waves={1.1}
            twist={1.2}
            threads={72}
            volume={0.65}
            spread={1.2}
            density={0.9}
            thickness={1.05}
            flow={0.35}
            fiberStyle="lines"
            tips={0.35}
            foldGlow={0.7}
            depthOfField={0.55}
            particles={0.6}
            sparkle={0.8}
            glow={1.4}
            brightness={1.2}
            vignette={0.2}
            grain={0.025}
            mouseInteraction
            mouseStrength={0.6}
            hoverEffect="focus"
            pulseOnClick={false}
            intro
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            backgroundImage: 'radial-gradient(ellipse 45% 42% at 76% 38%, rgba(163, 230, 53, 0.22), transparent 72%), radial-gradient(ellipse 36% 30% at 20% 82%, rgba(34, 197, 94, 0.16), transparent 74%)',
          }}
          aria-hidden="true"
        />

        <div className="home-nav-type relative z-10 mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-[1240px] flex-col justify-center sm:min-h-[calc(100svh-10rem)]">
          <div className="mx-auto max-w-[900px] py-8 text-center sm:py-10">
            <h1
              id="home-hero-title"
              aria-label="Digital marketing & Custom Software Solutions"
              className="m-0 max-w-full font-semibold leading-[1.02] tracking-[-.055em] text-white"
            >
              <VariableProximity
                label="Digital marketing &"
                className="whitespace-nowrap"
                style={{ display: 'block', fontSize: 'clamp(1.1rem, 4vw, 3.75rem)', lineHeight: 1.02 }}
                fromFontVariationSettings="'wght' 600, 'opsz' 32"
                toFontVariationSettings="'wght' 900, 'opsz' 72"
                fromColor="#ffffff"
                toColor="#a3e635"
                radius={130}
                smoothing={0.15}
                scale={1.035}
                lift={0.035}
              />
              <VariableProximity
                label="Custom Software Solutions"
                className="mt-3 whitespace-nowrap"
                style={{ display: 'block', fontSize: 'clamp(1.1rem, 4vw, 3.75rem)', lineHeight: 1.02 }}
                fromFontVariationSettings="'wght' 600, 'opsz' 32"
                toFontVariationSettings="'wght' 900, 'opsz' 72"
                fromColor="#ffffff"
                toColor="#a3e635"
                radius={130}
                smoothing={0.15}
                scale={1.035}
                lift={0.035}
              />
            </h1>
            {/* <p className="mx-auto mb-0 mt-5 max-w-[610px] text-[20px] leading-relaxed text-white/80">
              Digital Growth. Intelligent Technology. Real Results.
            </p> */}
           <div
            ref={heroStatsRef}
            className="mx-auto mt-4 grid w-full max-w-[560px] grid-cols-3 "
            role="group"
            aria-label="XentroX in numbers"
          >
            {heroStatistics.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="rounded-2xl   text-center  sm:py-4"
              >
                <p className="m-0 text-[1.65rem] font-medium leading-none tracking-[-.05em] text-[#a3e635] sm:text-2xl lg:text-3xl">
                  <span data-stat-count={value}>0</span>{suffix}
                </p>
                <p className="mb-0 mt-2 text-[8px] font-medium uppercase tracking-[.12em] text-white/65 sm:text-[10px]">
                  {label}
                </p>
              </div>
            ))}
          </div>
          </div>
 <div className="mt-1 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <MagneticLink to="/contact" variant="primary">
                Get Started
                <Icon name="arrowRight" size={16} />
              </MagneticLink>
              <MagneticLink to="#why-xentrox" variant="secondary" onClick={handleScrollToWhy}>
                Our Services
                <Icon name="arrowRight" size={16} />
              </MagneticLink>
            </div>
          
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: FLEXIBLE CAPABILITY SHOWCASE */}
      <section
        ref={section2Ref}
        id="why-xentrox"
        className="relative left-1/2 -ml-[50vw] flex min-h-[100svh] w-screen items-center overflow-hidden bg-[#F5FBF7] px-4 py-20 text-[#164B35] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-32 top-0 size-[34rem] rounded-full bg-[#16A36A]/10 blur-[140px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-32 bottom-0 size-[30rem] rounded-full bg-[#B7E4CC]/35 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1080px]">
          <div className="grid grid-cols-1 items-center gap-10 lg:translate-y-6 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <h2 data-scroll-reveal data-reveal-from="left" className="text-[clamp(2rem,3.4vw,3.15rem)] font-bold leading-[1.08] tracking-[-.045em] text-[#062c23]">
                Built for <span className="bg-gradient-to-r from-[#2e7d32] via-[#4d8b18] to-[#84cc16] bg-clip-text text-transparent">measurable growth</span>
              </h2>
              <p data-scroll-reveal data-reveal-from="left" style={{ '--reveal-delay': '90ms' }} className="mt-5 max-w-[34rem] text-[15px] leading-[1.75] text-[#476557] sm:text-base">
                We bring strategy, engineering, and practical learning together to turn ambitious ideas into useful digital products.
              </p>
              <div data-scroll-reveal data-reveal-from="left" style={{ '--reveal-delay': '160ms' }} className="mt-8 space-y-4">
                {[
                  'Start with outcomes that matter to your business',
                  'Build clear, dependable digital experiences',
                  'Keep improving through real feedback and measurement',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3.5 text-sm font-medium leading-[1.6] text-[#164B35] sm:text-[15px]">
                    <span className="mt-0.5 flex size-[22px] shrink-0 items-center justify-center rounded-full bg-[#DDF5E8] text-[#16A36A] ring-1 ring-[#16A36A]/15">
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true"><path d="m3.5 8.2 2.8 2.7 6.2-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </span>
                    <span className="pt-px">{point}</span>
                  </div>
                ))}
              </div>
              <Link data-scroll-reveal data-reveal-from="left" style={{ '--reveal-delay': '230ms' }} to="/services" className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-gradient-to-r from-[#a3e635] to-[#84cc16] py-2 pl-5 pr-2 text-sm font-bold text-[#062c23] shadow-[0_12px_28px_-16px_rgba(163,230,53,.65)] transition duration-300 hover:-translate-y-0.5 hover:from-[#b5f34b] hover:to-[#93db24] hover:shadow-[0_16px_32px_-15px_rgba(163,230,53,.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a3e635]">
                Discover our approach
                <span className="grid size-8 place-items-center rounded-full bg-[#062c23]/10 transition-transform duration-300 group-hover:translate-x-0.5"><Icon name="arrowRight" size={16} /></span>
              </Link>
            </div>

            <div className="min-w-0 lg:col-span-7" data-scroll-reveal data-reveal-from="right" style={{ '--reveal-delay': '140ms' }}>
              <Carousel
                items={approachGallery}
                baseWidth={640}
                aspectRatio={1.34}
                peek={0}
                gap={0}
                radius={28}
                frame={false}
                effect="fade"
                indicator="none"
                autoplay
                autoplayDelay={3800}
                pauseOnHover
                loop
                draggable
                theme="light"
                className="mx-auto w-full"
                style={{
                  '--carousel-frame': 'rgba(221, 245, 232, 0.76)',
                  '--carousel-frame-edge': 'rgba(22, 75, 53, 0.13)',
                  '--carousel-frame-highlight': 'rgba(255, 255, 255, 0.9)',
                  '--carousel-frame-shadow': '0 32px 72px -38px rgba(22, 75, 53, 0.42)',
                  '--carousel-tile': '#F5FBF7',
                  '--carousel-tile-edge': 'rgba(22, 75, 53, 0.15)',
                  '--carousel-tile-highlight': 'rgba(255, 255, 255, 0.92)',
                  '--carousel-tile-shadow': '0 24px 60px -32px rgba(22, 75, 53, 0.58)',
                  '--carousel-ink': '#164B35',
                  '--carousel-muted': 'rgba(255, 255, 255, 0.82)',
                  '--carousel-faint': 'rgba(22, 163, 106, 0.22)',
                  '--carousel-soft': 'rgba(22, 163, 106, 0.42)',
                  '--carousel-badge': 'rgba(183, 228, 204, 0.2)',
                  '--carousel-accent': '#16A36A',
                  '--carousel-hover': 'brightness(1.06)',
                  '--carousel-press': 'brightness(0.95)',
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* SECTION 3: NEXT SECTION (WHAT'S NEXT / CTA - BIDIRECTIONAL SCROLL REVEAL) */}
      {/* ========================================================================= */}
      <section
        id="next-section"
        className="relative left-1/2 -ml-[50vw] w-screen bg-[#072d24] px-[max(1.25rem,calc((100vw-1200px)/2))] py-20 text-white sm:py-24"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span
              data-scroll-reveal
              className="inline-flex items-center gap-2 rounded-full bg-[#a3e635]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#a3e635] ring-1 ring-[#a3e635]/20"
            >
              What’s Next
            </span>
            <h2
              data-scroll-reveal
              style={{ '--reveal-delay': '90ms' }}
              className="mt-4 text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold tracking-tight text-white"
            >
              Ready to transform your vision into reality?
            </h2>
            <p
              data-scroll-reveal
              style={{ '--reveal-delay': '160ms' }}
              className="mt-4 text-base text-[#d4e4db]/85 sm:text-lg"
            >
              Partner with XentroX for high-velocity software engineering, scalable cloud systems, and industry-grade talent training.
            </p>
          </div>

          {/* Feature Grid with Staggered Scroll Reveal */}
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '100ms' }}
              className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8"
            >
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

            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '200ms' }}
              className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8"
            >
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

            <div
              data-scroll-reveal
              style={{ '--reveal-delay': '300ms' }}
              className="group rounded-2xl border border-white/10 bg-[#093529] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#a3e635]/40 hover:bg-[#0c4032] sm:p-8"
            >
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

          {/* Action Callout with Scroll Reveal */}
          <div
            data-scroll-reveal
            style={{ '--reveal-delay': '180ms' }}
            className="mt-14 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#a3e635]/20 bg-gradient-to-r from-[#0a382c] via-[#0e4839] to-[#0a382c] p-6 text-center sm:flex-row sm:p-8 sm:text-left"
          >
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
