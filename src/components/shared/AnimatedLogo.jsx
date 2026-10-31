const outlinePaths = [
  {
    color: '#003831',
    d: 'M 202 15 L 234 16 L 267 24 L 298 39 L 316 52 L 331 66 L 354 96 L 366 120 L 376 153 L 379 173 L 379 193 L 292 193 L 268 169 L 268 167 L 208 107 Z',
  },
  {
    color: '#84CC16',
    d: 'M 79 32 L 96 33 L 111 40 L 186 117 L 186 119 L 220 152 L 220 154 L 352 287 L 360 299 L 364 322 L 362 333 L 356 346 L 345 358 L 337 363 L 324 367 L 303 366 L 291 360 L 176 243 L 176 241 L 173 240 L 171 236 L 114 180 L 114 178 L 56 121 L 56 119 L 46 111 L 40 102 L 36 89 L 36 74 L 39 63 L 46 51 L 56 41 L 70 34 Z',
  },
  {
    color: '#003831',
    d: 'M 15 217 L 112 217 L 115 219 L 115 221 L 187 294 L 192 385 L 191 396 L 151 393 L 113 381 L 96 372 L 79 360 L 56 338 L 41 318 L 25 285 L 16 250 L 14 231 Z',
  },
];

/**
 * Draws the original XentroX mark from its transparent silhouette, then fades
 * in the untouched brand artwork. Keep the traced paths aligned to Logo.svg's
 * embedded 395 × 410 source image transform.
 */
export default function AnimatedLogo({ size = 38, className = '', alt = '' }) {
  const sizeValue = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={`animated-logo-mark ${className}`.trim()}
      style={{ '--animated-logo-size': sizeValue }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : 'true'}
    >
      <img
        className="animated-logo-mark__artwork"
        src="/Logo.svg"
        width="400"
        height="400"
        alt=""
        draggable="false"
        loading="eager"
        decoding="async"
      />
      <svg
        className="animated-logo-mark__outline"
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <g transform="translate(0 -7.5949) scale(1.012658)" strokeLinecap="round" strokeLinejoin="round">
          {outlinePaths.map(({ color, d }, index) => (
            <path
              key={index}
              d={d}
              pathLength="1"
              stroke={color}
              strokeWidth="9"
              className="animated-logo-mark__stroke"
            />
          ))}
        </g>
      </svg>
    </span>
  );
}
