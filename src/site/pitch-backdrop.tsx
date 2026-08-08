/**
 * Marcas de cancha bajo reflectores: líneas de cal a baja opacidad (medio
 * campo, círculo central, arco de área). Decorativo y de pantalla completa;
 * se monta detrás del contenido en las superficies "field-night".
 */
export function PitchBackdrop() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 -z-0 h-full w-full"
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g
        stroke="var(--chalk)"
        strokeWidth="1.25"
        fill="none"
        strokeOpacity="0.06"
      >
        {/* Línea de medio campo */}
        <line x1="400" y1="-50" x2="400" y2="650" />
        {/* Círculo central + punto */}
        <circle cx="400" cy="300" r="118" />
        <circle cx="400" cy="300" r="3" fill="var(--chalk)" fillOpacity="0.06" />
        {/* Áreas y arcos a izquierda y derecha */}
        <rect x="-120" y="170" width="240" height="260" />
        <rect x="-120" y="240" width="120" height="120" />
        <path d="M120 235 A 70 70 0 0 1 120 365" />
        <rect x="680" y="170" width="240" height="260" />
        <rect x="800" y="240" width="120" height="120" />
        <path d="M680 235 A 70 70 0 0 0 680 365" />
      </g>
    </svg>
  );
}
