import { avatarColors } from "./identicon";

/**
 * Avatar genérico de jugador. Si hay `src` (foto real subida) la usa; si no,
 * pinta una silueta SVG sobre un fondo de color determinista por nombre, con
 * las iniciales — una "foto" placeholder sin assets ni red.
 *
 * Componente puro (sin hooks): vale en Server y Client Components.
 */
export function PlayerAvatar({
  name,
  src,
  className = "h-8 w-8",
}: {
  name: string;
  src?: string | null;
  className?: string;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={`${className} shrink-0 rounded-full object-cover`}
        loading="lazy"
      />
    );
  }

  const { base, deep } = avatarColors(name);
  const uid = `av-${Math.abs(
    [...name].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 11),
  ).toString(36)}`;

  return (
    <svg
      viewBox="0 0 40 40"
      className={`${className} shrink-0 rounded-full`}
      role="img"
      aria-label={name}
    >
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={base} />
          <stop offset="1" stopColor={deep} />
        </linearGradient>
      </defs>
      <rect width="40" height="40" fill={`url(#${uid})`} />
      {/* Silueta cabeza + hombros */}
      <g fill="#ffffff" fillOpacity="0.9">
        <circle cx="20" cy="15" r="7" />
        <path d="M6 38 C7 28.5 13 25 20 25 C27 25 33 28.5 34 38 Z" />
      </g>
    </svg>
  );
}
