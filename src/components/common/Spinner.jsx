
function Spinner() {
  return (
    <div
      className="flex min-h-svh items-center justify-center bg-[#093226] text-white"
      role="status"
      aria-label="Loading"
    >
      <span
        className="inline-flex items-center text-[clamp(2.5rem,10vw,5rem)] font-bold tracking-[0.04em]"
        aria-hidden="true"
      >
        <img src="/favicon.png" alt="" className="mr-[0.2em] size-[1em] object-contain" />
        {'XentroX'.split('').map((letter, index) => (
          <span
            className="animate-spinner-letter motion-reduce:animate-none"
            key={`${letter}-${index}`}
            style={{ animationDelay: `${-index * 100}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}

export default Spinner;