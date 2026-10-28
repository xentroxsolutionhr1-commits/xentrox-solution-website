import { Link } from 'react-router-dom';
import Icon from '../shared/Icon.jsx';

function Dashboard() {
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
        <div className="relative z-10 max-w-[660px] max-[900px]:max-w-[740px]">
         <h1 className="m-0 text-[clamp(2.5rem,4.4vw,4rem)] font-bold leading-[1.05] tracking-[-0.05em] max-[640px]:text-[clamp(2.2rem,10vw,3.5rem)] max-[640px]:leading-[1.08]">
  Digital growth engineered with
  <br />
  <span className="text-[#a4e85b]">strategy, design</span>
  <br className="hidden max-[640px]:block" /> &amp; code.
</h1>

          <p className="mt-[1.7rem] max-w-[570px] text-[clamp(1rem,1.55vw,1.18rem)] leading-[1.75] text-[#c4d7ce] max-[640px]:mt-[1.1rem] max-[640px]:text-[0.98rem] max-[640px]:leading-[1.65]">
            We bring marketing and technology together to help ambitious brands grow —
            from stronger search visibility to digital products built for what comes next.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-[0.85rem] max-[640px]:mt-[1.4rem] max-[640px]:gap-[0.65rem]">
            <Link className="inline-flex min-h-[3.25rem] items-center justify-center gap-[0.7rem] rounded-xl border border-transparent bg-[#9ce34a] px-5 py-[0.85rem] text-[0.94rem] font-bold text-[#103420] no-underline transition duration-[180ms] hover:-translate-y-0.5 hover:bg-[#b0f36b] max-[640px]:min-h-12 max-[640px]:px-[0.95rem] max-[640px]:text-[0.84rem]" to="/contact">
              Let&apos;s talk
              <Icon name="arrowRight" size={17} />
            </Link>
            <Link className="inline-flex min-h-[3.25rem] items-center justify-center gap-[0.7rem] rounded-xl border border-white/25 px-5 py-[0.85rem] text-[0.94rem] font-bold text-white no-underline transition duration-[180ms] hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/5 max-[640px]:min-h-12 max-[640px]:px-[0.95rem] max-[640px]:text-[0.84rem]" to="/services">
              Explore our services
            </Link>
          </div>

          <div className="mt-[2.4rem] flex items-center gap-[0.8rem] text-[#c4d7ce] max-[640px]:mt-[1.3rem]">
            <span className="grid size-8 shrink-0 place-items-center rounded-[0.6rem] border border-[#a4e85b]/55 text-[0.9rem] font-black text-[#a4e85b]" aria-hidden="true">X</span>
            <p className="m-0 text-[0.84rem] leading-6 max-[640px]:text-[0.75rem]">
              One connected team for your brand, marketing and product.
            </p>
          </div>
        </div>

        <div
          className="relative mx-auto grid min-h-[440px] w-full max-w-[550px] place-items-center max-[900px]:min-h-[350px] max-[640px]:hidden"
          role="img"
          aria-label="Animated XentroX service map connecting strategy, content, design, and web development"
        >
          <div className="absolute inset-[8%] rounded-full bg-[#8bc34a]/10 blur-[70px]" aria-hidden="true" />
          <div className="absolute inset-[8%] animate-spin-slow rounded-full border border-dashed border-white/15 motion-reduce:animate-none" aria-hidden="true" />
          <div className="absolute inset-[17%] rounded-full border border-[#a4e85b]/20" aria-hidden="true" />

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 550 440"
            fill="none"
            aria-hidden="true"
          >
            <path d="M275 220 102 105M275 220 448 105M275 220 102 335M275 220 448 335" stroke="white" strokeOpacity=".2" strokeWidth="1.5" />
            <path d="M275 220 102 105M275 220 448 105M275 220 102 335M275 220 448 335" stroke="#A4E85B" strokeOpacity=".8" strokeWidth="2" strokeDasharray="5 13" className="animate-signal motion-reduce:animate-none" />
          </svg>

          <div className="absolute left-[3%] top-[12%] flex w-[37%] animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 p-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none sm:p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#a4e85b]/15 text-[#b8f477]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4 4M8 11h5M10.5 8.5v5" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/45"> Discover</span>
              <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">SEO & content</span>
            </span>
          </div>

          <div className="absolute right-[3%] top-[12%] flex w-[37%] animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 p-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none sm:p-4" style={{ animationDelay: '-1.5s' }}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 17.5 9.5 12l3.5 3.5L20 8.5M15.5 8.5H20V13" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/45"> Connect</span>
              <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">Social media</span>
            </span>
          </div>

          <div className="absolute bottom-[12%] left-[3%] flex w-[37%] animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 p-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none sm:p-4" style={{ animationDelay: '-3s' }}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 5h16v14H4zM8 9h8M8 13h5" />
                <path d="m15 17 2 2 4-4" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/45"> Create</span>
              <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">Brand & design</span>
            </span>
          </div>

          <div className="absolute right-[3%] bottom-[12%] flex w-[37%] animate-float items-center gap-3 rounded-2xl border border-white/15 bg-[#062c23]/90 p-3 shadow-[0_18px_45px_rgb(0_0_0_/_22%)] backdrop-blur-xl motion-reduce:animate-none sm:p-4" style={{ animationDelay: '-4.5s' }}>
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#a4e85b]/15 text-[#b8f477]">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <path d="M4 5h16v14H4zM8 9h8M8 13h3M15 13h1" />
                <path d="m8 16 2 1 4-3" />
              </svg>
            </span>
            <span className="min-w-0">
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.14em] text-white/45"> Build</span>
              <span className="mt-1 block truncate text-xs font-semibold text-white sm:text-sm">Web & apps</span>
            </span>
          </div>

          <div className="relative z-10 grid size-32 animate-float place-items-center rounded-[2rem] border border-[#a4e85b]/35 bg-[#083c2d]/95 shadow-[0_0_70px_rgb(164_232_91_/_20%)] motion-reduce:animate-none sm:size-40">
            <div className="absolute inset-2 rounded-[1.6rem] border border-white/10" />
            <img className="relative size-[68%] object-contain drop-shadow-[0_0_24px_rgb(164_232_91_/_25%)]" src="/favicon.png" alt="" aria-hidden="true" />
            <span className="absolute -right-2 -top-2 size-4 animate-ping rounded-full bg-[#a4e85b]/70 motion-reduce:animate-none" />
            <span className="absolute -right-2 -top-2 size-4 rounded-full border-2 border-[#062c23] bg-[#a4e85b]" />
          </div>

          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white/40">
            One team · from idea to impact
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-x-[clamp(0.7rem,2vw,1.5rem)] gap-y-2 border-t border-white/10 pt-5 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-white/55 max-[640px]:mt-4 max-[640px]:gap-x-[0.6rem] max-[640px]:text-[0.55rem] max-[640px]:tracking-[0.1em]">
        <span>Strategy</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Design</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Engineering</span>
        <span className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" />
        <span>Growth</span>
        {/* <span>Strategy</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Design</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Engineering</span><i className="size-1 rounded-full bg-[#9ce34a] max-[640px]:size-[0.2rem]" /><span>Growth</span> */}
      </div>
    </section>
  );
}

export default Dashboard;
