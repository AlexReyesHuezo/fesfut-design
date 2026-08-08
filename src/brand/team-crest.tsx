import { crestPalette, monogram } from "./identicon";

/**
 * Escudo de un club/selección. Si hay un `src` (crestUrl real subido) lo usa;
 * si no, pinta un escudo SVG determinista (heráldico) a partir del nombre.
 * Sin assets ni red: misma entrada → mismo escudo.
 *
 * Componente puro (sin hooks): vale en Server y Client Components.
 */
export function TeamCrest({
  name,
  seed,
  src,
  className = "h-6 w-6",
}: {
  name: string;
  /** Semilla estable para el color (p. ej. slug). Por defecto, el nombre. */
  seed?: string;
  src?: string | null;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`${className} shrink-0 object-contain`}
        loading="lazy"
      />
    );
  }

  const { base, deep, accent, ink } = crestPalette(seed ?? name);
  const text = monogram(name);
  const uid = `crest-${Math.abs(
    [...(seed ?? name)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7),
  ).toString(36)}`;
  // Tamaño de fuente del monograma según su longitud.
  const fontSize = text.length >= 3 ? 15 : text.length === 2 ? 19 : 24;

  return (
    <svg
      viewBox="0 0 48 56"
      className={`${className} shrink-0`}
      role="img"
      aria-label={name}
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={base} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
        <clipPath id={`${uid}-clip`}>
          <path d="M24 2 L44 8 V27 C44 41 36 49.5 24 54 C12 49.5 4 41 4 27 V8 Z" />
        </clipPath>
      </defs>

      {/* Cuerpo del escudo */}
      <path
        d="M24 2 L44 8 V27 C44 41 36 49.5 24 54 C12 49.5 4 41 4 27 V8 Z"
        fill={`url(#${uid})`}
        stroke={accent}
        strokeOpacity="0.85"
        strokeWidth="1.5"
      />
      {/* Banda diagonal de acento (recortada al escudo) */}
      <g clipPath={`url(#${uid}-clip)`}>
        <polygon points="4,16 44,30 44,38 4,24" fill={accent} fillOpacity="0.22" />
        <polygon points="4,8 16,8 44,46 44,54 32,54" fill="#ffffff" fillOpacity="0.06" />
      </g>
      {/* Monograma */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        dominantBaseline="central"
        fill={ink}
        fontSize={fontSize}
        fontWeight="800"
        fontFamily="var(--font-display, ui-sans-serif), system-ui, sans-serif"
        fontStyle="italic"
        letterSpacing="-0.5"
      >
        {text}
      </text>
    </svg>
  );
}
