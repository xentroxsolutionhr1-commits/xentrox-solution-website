import { useState } from 'react';
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
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const handleCorePointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: (event.clientX - bounds.left) / bounds.width * 2 - 1,
      y: (event.clientY - bounds.top) / bounds.height * 2 - 1,
    });
  };

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

      <div className="mx-auto my-auto grid w-full max-w-[1200px] grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-[clamp(2rem,5vw,5rem)] max-[900px]:grid-cols-1 max-[900px]:gap-4">
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
          className="relative mx-auto grid min-h-[440px] w-full max-w-[550px] place-items-center [perspective:1000px] transition-[rotate] duration-300 max-[900px]:min-h-[350px] max-[640px]:hidden"
          role="img"
          aria-label="Interactive XentroX neural hub connecting strategy, content, design, and web development"
          data-scroll-reveal
          data-reveal-from="right"
          onPointerMove={handleCorePointerMove}
          onPointerLeave={() => setPointer({ x: 0, y: 0 })}
          style={{
            rotate: `${pointer.y} ${-pointer.x} 0 ${Math.hypot(pointer.x, pointer.y) * 2}deg`,
          }}
        >
          <div className="absolute inset-[10%] rounded-full bg-[#8bc34a]/15 blur-[85px]" aria-hidden="true" />
          <div className="absolute left-1/2 top-1/2 size-[78%] -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/15 motion-reduce:animate-none" aria-hidden="true" />

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 600 500"
            fill="none"
            aria-hidden="true"
          >
            <path d="M300 75 497 190 300 305 103 190 300 75Z" fill="#11513A" stroke="#A3E635" strokeOpacity=".45" />
            <path d="M103 190 300 305V390L103 275V190Z" fill="#082F25" stroke="white" strokeOpacity=".15" />
            <path d="M497 190 300 305V390L497 275V190Z" fill="#0B3C2D" stroke="white" strokeOpacity=".2" />
            <path d="M132 190 300 92 468 190 300 288 132 190Z" fill="#0C3D2D" stroke="white" strokeOpacity=".16" />
            <path d="m300 305 197-115v85L300 390v-85Z" stroke="#A3E635" strokeOpacity=".22" />
            <path d="M167 190h266M202 170h196M239 148h122" stroke="white" strokeOpacity=".14" />
            <path d="M300 112v172M159 190l141 82 141-82" stroke="white" strokeOpacity=".12" />
            <path d="m210 210 37-22 28 16-37 22-28-16Z" fill="#A3E635" fillOpacity=".85" />
            <path d="m246 231 63-37 55 32-63 37-55-32Z" fill="#E8F7D6" fillOpacity=".88" />
            <path d="m304 265 48-28 37 21-48 28-37-21Z" fill="#72B737" />
            <path d="m188 307 56 33m112-1 56-33" stroke="#A3E635" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 8" className="animate-signal motion-reduce:animate-none" />
          </svg>

          <div className="absolute left-[8%] top-[8%] flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 px-4 py-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none" style={{ animationDelay: '-1s', translate: `${pointer.x * -5}px ${pointer.y * -5}px` }}>
            <span className="grid size-9 place-items-center rounded-xl bg-[#a4e85b]/15 text-[#b8f477]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4 4M8 11h5M10.5 8.5v5" />
              </svg>
            </span>
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/45">Be discovered</span>
              <span className="mt-1 block text-xs font-semibold text-white">SEO & content</span>
            </span>
          </div>

          <div className="absolute right-[5%] top-[11%] flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 px-4 py-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none" style={{ animationDelay: '-2.5s', translate: `${pointer.x * 6}px ${pointer.y * -4}px` }}>
            <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 17.5 9.5 12l3.5 3.5L20 8.5M15.5 8.5H20V13" />
              </svg>
            </span>
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/45">Build community</span>
              <span className="mt-1 block text-xs font-semibold text-white">Social media</span>
            </span>
          </div>

          <div className="absolute bottom-[12%] left-[5%] flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 px-4 py-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none" style={{ animationDelay: '-3.5s', translate: `${pointer.x * -5}px ${pointer.y * 5}px` }}>
            <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 5h16v14H4zM8 9h8M8 13h5" />
                <path d="m15 17 2 2 4-4" />
              </svg>
            </span>
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/45">Make it memorable</span>
              <span className="mt-1 block text-xs font-semibold text-white">Brand & design</span>
            </span>
          </div>

          <div className="absolute bottom-[13%] right-[4%] flex animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 px-4 py-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none" style={{ animationDelay: '-5s', translate: `${pointer.x * 6}px ${pointer.y * 5}px` }}>
            <span className="grid size-9 place-items-center rounded-xl bg-[#a4e85b]/15 text-[#b8f477]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 5h16v14H4zM8 9h8M8 13h3M15 13h1" />
                <path d="m8 16 2 1 4-3" />
              </svg>
            </span>
            <span>
              <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-white/45">Turn ideas into tools</span>
              <span className="mt-1 block text-xs font-semibold text-white">Web & apps</span>
            </span>
          </div>

          <div className="absolute left-1/2 top-[42%] z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 animate-float place-items-center rounded-[1.6rem] border border-[#d9f99d]/60 bg-[#f3f8e9] p-3 shadow-[0_15px_45px_rgb(0_0_0_/_30%),0_0_50px_rgb(163_230_53_/_20%)] motion-reduce:animate-none sm:size-24">
            <img className="size-full object-contain" src="/favicon.png" alt="" aria-hidden="true" />
            <span className="absolute inset-[-0.8rem] animate-radar rounded-[2rem] border border-[#a4e635]/45 motion-reduce:animate-none" />
            <span className="absolute inset-[-0.8rem] animate-radar rounded-[2rem] border border-[#a4e635]/35 [animation-delay:1.2s] motion-reduce:animate-none" />
          </div>

          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/40">
            A connected digital studio
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-[clamp(0.7rem,2vw,1.5rem)] gap-y-2 border-t border-white/10 pt-5 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-white/55 max-[640px]:mt-4 max-[640px]:gap-x-[0.6rem] max-[640px]:text-[0.55rem] max-[640px]:tracking-[0.1em]" data-scroll-reveal>
        <span>SEO & Content</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Social Media</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Brand & Design</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Web & Apps</span>
        {/* <span>Strategy</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Design</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Engineering</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Growth</span> */}
      </div>
    </section>
  );
}

export default Dashboard;
