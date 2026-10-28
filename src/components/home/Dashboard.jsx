import { useEffect, useRef } from 'react';
import { animate, svg } from 'animejs';
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

const gradientTextClass =
  'bg-[linear-gradient(100deg,#fff_0%,#d9f99d_36%,#a3e635_70%,#fff_100%)] bg-clip-text text-transparent [background-size:220%_auto] animate-gradient-flow motion-reduce:animate-none';

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

function Dashboard() {
  const heroDrawingRef = useRef(null);

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

    return () => drawing.pause();
  }, []);

  return (
    <section className="relative isolate left-1/2 -ml-[50vw] -mt-24 -mb-8 flex min-h-svh w-screen flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_82%_18%,rgb(91_183_97_/_18%),transparent_36%),linear-gradient(122deg,#062c23_0%,#083c2d_52%,#0c5037_100%)] px-[max(1.25rem,calc((100vw-1200px)/2))] pt-32 pb-8 text-white max-[900px]:pt-32 max-[640px]:-mt-[5.5rem] max-[640px]:-mb-6 max-[640px]:px-[1.1rem] max-[640px]:pt-28 max-[640px]:pb-6">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgb(255_255_255_/_3%)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255_/_3%)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:linear-gradient(90deg,transparent,#000_55%,#000)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[10%] top-[8%] -z-10 aspect-square w-[clamp(16rem,34vw,32rem)] rounded-full bg-[#75c943] opacity-[0.12] blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[30%] left-[18%] -z-10 aspect-square w-[clamp(16rem,34vw,32rem)] rounded-full bg-[#75c943] opacity-[0.08] blur-[130px]"
        aria-hidden="true"
      />

      <div ref={heroDrawingRef} className="relative mx-auto my-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-4">
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
        <div className="relative z-10 max-w-[660px] max-[900px]:max-w-[740px]" data-scroll-reveal data-reveal-from="left">
          <h1 className="m-0 text-[clamp(2.5rem,4.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.05em] max-[640px]:text-[clamp(2.2rem,10vw,3.5rem)] max-[640px]:leading-[1.08]">
            <span className="inline-block animate-reveal-up motion-reduce:animate-none">Digital growth</span>
            <br />
            <span className="inline-block animate-reveal-up [animation-delay:120ms] motion-reduce:animate-none">
              <span className={gradientTextClass}>engineered with</span>
            </span>
            <br />
            <span className="inline-block animate-reveal-up [animation-delay:240ms] motion-reduce:animate-none">
              <span className={gradientTextClass}>strategy, design</span>
            </span>
            <br className="hidden max-[640px]:block" />{' '}
            <span className="inline-block animate-reveal-up [animation-delay:360ms] motion-reduce:animate-none">
              <span className={gradientTextClass}>&amp; code.</span>
            </span>
          </h1>

          <p className="mt-[1.7rem] max-w-[570px] animate-reveal-up [animation-delay:460ms] text-[clamp(1rem,1.55vw,1.18rem)] leading-[1.75] text-[#c4d7ce] motion-reduce:animate-none max-[640px]:mt-[1.1rem] max-[640px]:text-[0.98rem] max-[640px]:leading-[1.65]">
            We bring marketing and technology together to help ambitious brands grow —
            from stronger search visibility to digital products built for what comes next.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-[0.85rem] max-[640px]:mt-[1.4rem] max-[640px]:gap-[0.65rem]">
            <MagneticLink to="/contact" variant="primary">
              Let&apos;s talk
              <Icon name="arrowRight" size={17} />
            </MagneticLink>
            <MagneticLink to="/services" variant="secondary">
              Explore our services
            </MagneticLink>
          </div>

          <div className="mt-[2.4rem] flex items-center gap-[0.8rem] text-[#c4d7ce] max-[640px]:mt-[1.3rem]">
            <span className="grid size-8 shrink-0 place-items-center rounded-[0.6rem] border border-[#a4e85b]/55 text-[0.9rem] font-black text-[#a4e85b]" aria-hidden="true">X</span>
            <p className="m-0 text-[0.84rem] leading-6 max-[640px]:text-[0.75rem]">
              One connected team for your brand, marketing and product.
            </p>
          </div>
        </div>

        <div
          className="relative mx-auto grid min-h-[440px] w-full max-w-[550px] -translate-y-[10%] place-items-center max-[900px]:min-h-[350px] max-[640px]:hidden"
          data-scroll-reveal
          data-reveal-from="right"
        >
          <div className="absolute inset-[12%] rounded-full bg-[#8bc34a]/15 blur-[85px]" aria-hidden="true" />
          <svg
            className="relative z-10 block h-auto w-full max-w-[550px] overflow-visible drop-shadow-[0_24px_45px_rgb(0_0_0_/_24%)]"
            viewBox="0 0 400 350"
            role="img"
            aria-labelledby="hero-illustration-title"
          >
            <title id="hero-illustration-title">XentroX Solutions homepage illustration</title>
            <defs>
              <filter id="hero-line-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="soft-glow" />
                <feMerge>
                  <feMergeNode in="soft-glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <image href="/hero.svg" width="400" height="350" />
            <path
              d="M28 263C35 142 122 42 233 31c87-9 152 39 166 119 11 67-20 126-75 159"
              pathLength="1"
              fill="none"
              filter="url(#hero-line-glow)"
              stroke="#C7FF5E"
              strokeOpacity=".82"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              data-draw-path
              aria-hidden="true"
            />
            <path
              d="M8 316C48 278 81 306 119 280S183 264 222 282"
              pathLength="1"
              fill="none"
              filter="url(#hero-line-glow)"
              stroke="#C7FF5E"
              strokeOpacity=".9"
              strokeWidth="1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              data-draw-path
              aria-hidden="true"
            />
            <path
              d="M0 333C43 296 79 324 115 299S177 282 214 301"
              pathLength="1"
              fill="none"
              filter="url(#hero-line-glow)"
              stroke="#69F5B0"
              strokeOpacity=".7"
              strokeWidth="1.2"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              data-draw-path
              aria-hidden="true"
            />
            <path
              d="M20 347C57 315 86 340 123 317S176 304 204 319"
              pathLength="1"
              fill="none"
              filter="url(#hero-line-glow)"
              stroke="#C7FF5E"
              strokeOpacity=".55"
              strokeWidth="1"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              data-draw-path
              aria-hidden="true"
            />
          </svg>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-[clamp(0.7rem,2vw,1.5rem)] gap-y-2 pt-5 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-white/55 max-[640px]:mt-4 max-[640px]:gap-x-[0.6rem] max-[640px]:text-[0.55rem] max-[640px]:tracking-[0.1em]" data-scroll-reveal>
        {/* <span>SEO & Content</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Social Media</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Brand & Design</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Web & Apps</span> */}
        {/* <span>Strategy</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Design</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Engineering</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Growth</span> */}
      </div>
    </section>
  );
}

export default Dashboard;
