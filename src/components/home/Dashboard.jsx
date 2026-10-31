import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';
import FlexCarousel from '../../bits/FlexCarousel.jsx';
import GhostFibers from '../../bits/GhostFibers.jsx';
import VariableProximity from '../../bits/VariableProximity.jsx';

const heroStatistics = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'Client satisfaction' },
  { value: 10, suffix: '+', label: 'Industries served' },
];

const approachGallery = [
  {
    src: '/heroimage.png',
    alt: 'People learning and collaborating around digital technology',
    title: 'Technology for people',
    subtitle: 'Practical skills. Meaningful outcomes.',
  },
  {
    src: '/hero section.png',
    alt: 'A team of learners working together on software',
    title: 'Build the next generation',
    subtitle: 'Learning through real engineering work.',
  },
  {
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80&auto=format&fit=crop',
    alt: 'Laptop displaying a software development workspace',
    title: 'Engineering with clarity',
    subtitle: 'Purposeful products, designed to scale.',
  },
  {
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop',
    alt: 'A team collaborating around a table',
    title: 'Better work, together',
    subtitle: 'Strategy and delivery in sync.',
  },
  {
    src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&auto=format&fit=crop',
    alt: 'A digital view of global networks and technology',
    title: 'Ready for what’s next',
    subtitle: 'Connected systems. Lasting progress.',
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
        className="relative left-1/2 -ml-[50vw] w-screen overflow-hidden bg-[#f7faf8] px-4 py-20 text-[#0d2a1a] sm:px-6 sm:py-24 lg:px-8 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-32 top-0 size-[34rem] rounded-full bg-[#a3e635]/15 blur-[130px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-32 bottom-0 size-[30rem] rounded-full bg-[#10b981]/10 blur-[130px]" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1240px]">
          <div className="mx-auto max-w-3xl text-center" data-scroll-reveal>
            <h2 className="text-[clamp(2.1rem,4.2vw,3.6rem)] font-extrabold leading-[1.08] tracking-tight text-[#07241a]">
              Built for <span className="bg-gradient-to-r from-[#2e7d32] via-[#4d8b18] to-[#84cc16] bg-clip-text text-transparent">measurable growth</span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Explore how strategy, engineering, and people come together to turn ambitious ideas into useful digital products.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#dce8dc] bg-[#062c23] p-3 shadow-[0_30px_90px_-45px_rgba(7,36,26,.5)] sm:mt-14 sm:p-5" data-scroll-reveal>
            <FlexCarousel
              items={approachGallery}
              preset="ribbon"
              intro="rise"
              cardHeight={0.62}
              gap={16}
              radius={18}
              fit="landscape"
              captions
              autoplay={false}
              focusOnClick
              className="h-[280px] w-full sm:h-[390px] lg:h-[480px]"
            />
          </div>

          <div className="mt-8 grid gap-4 text-center sm:grid-cols-3 sm:gap-6" data-scroll-reveal>
            {[
              ['01', 'Start with outcomes'],
              ['02', 'Build with clarity'],
              ['03', 'Improve continuously'],
            ].map(([number, label]) => (
              <div key={number} className="border-t border-[#dce8dc] px-3 py-4">
                <span className="text-xs font-bold tracking-[.16em] text-[#6b9b36]">{number}</span>
                <p className="mb-0 mt-1 text-sm font-semibold text-[#173c2e]">{label}</p>
              </div>
            ))}
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
