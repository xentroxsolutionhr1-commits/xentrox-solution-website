import { Link } from 'react-router-dom';

function Error() {
  return (
    <section className="grid max-w-xl justify-items-start gap-4 px-4 text-center sm:px-6 sm:text-left lg:px-8">
      <p className="m-0 text-sm font-bold uppercase tracking-[0.15em] text-[#4d7f0f]">404 error</p>
      <h1 className="m-0 text-4xl font-semibold tracking-tight text-[#093226] sm:text-5xl">
        Page not found
      </h1>
      <p className="m-0 text-base leading-7 text-slate-600">
        The page you are looking for may have moved or is no longer available.
      </p>
      <Link
        className="mt-2 inline-flex min-h-11 items-center rounded-lg bg-[#093226] px-5 py-3 font-semibold text-white no-underline transition hover:bg-[#0c5037] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4d7f0f]"
        to="/"
      >
        Return home
      </Link>
    </section>
  );
}

export default Error;
