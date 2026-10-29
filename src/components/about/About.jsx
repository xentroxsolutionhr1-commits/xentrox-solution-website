function About() {
  return (
    <section className="grid gap-4 py-[clamp(2rem,8vw,6rem)]">
      <p
        className="m-0 text-xs font-bold uppercase tracking-[0.15em] text-[#4d7f0f]"
        data-scroll-reveal
      >
        About us
      </p>
      <h1
        className="m-0 text-[clamp(2rem,6vw,3.5rem)] font-semibold tracking-tight text-[#093226] max-w-3xl"
        data-scroll-reveal
        style={{ '--reveal-delay': '90ms' }}
      >
        Growth built on strategy, design and technology.
      </h1>
      <p
        className="m-0 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base lg:text-lg"
        data-scroll-reveal
        style={{ '--reveal-delay': '180ms' }}
      >
        XentroX Solutions brings digital marketing and product development together to help
        businesses build a stronger, more useful presence online.
      </p>
    </section>
  );
}

export default About;
