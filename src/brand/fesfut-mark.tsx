/**
 * Sello FESFUT: balón estilizado de paneles pentagonales.
 * Homenaje geométrico a la marca oficial; usa `currentColor`, así que hereda
 * el color del contenedor (blanco sobre navy, navy sobre blanco).
 */
export function FesfutBall({ className }: { className?: string }) {
  // Pentágono exterior (vértice superior) y pentágono central, radios 18 / 7.
  const outer = [
    [24, 6],
    [41.1, 18.4],
    [34.6, 38.6],
    [13.4, 38.6],
    [6.9, 18.4],
  ];
  const inner = [
    [24, 17],
    [30.7, 21.8],
    [28.1, 29.7],
    [19.9, 29.7],
    [17.3, 21.8],
  ];
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22.5" stroke="currentColor" strokeOpacity="0.25" />
      <polygon
        points={outer.map((p) => p.join(",")).join(" ")}
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <polygon
        points={inner.map((p) => p.join(",")).join(" ")}
        fill="currentColor"
      />
      {inner.map((p, i) => (
        <line
          key={i}
          x1={p[0]}
          y1={p[1]}
          x2={outer[i][0]}
          y2={outer[i][1]}
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/**
 * Lockup completo: sello + wordmark "FESFUT" + bajada.
 *
 * `federationLabel` es la bajada traducida (p. ej. "Federación Salvadoreña de
 * Fútbol"); la pasa cada app desde sus mensajes i18n. Si se omite (o `compact`),
 * se oculta — así el paquete no depende de next-intl ni de una clave concreta.
 */
export function FesfutLockup({
  className,
  compact = false,
  federationLabel,
}: {
  className?: string;
  compact?: boolean;
  federationLabel?: string;
}) {
  const showSub = !compact && Boolean(federationLabel);
  return (
    <span className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <FesfutBall className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight">
          FESFUT
        </span>
        {showSub ? (
          <span className="mt-0.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
            {federationLabel}
          </span>
        ) : null}
      </span>
    </span>
  );
}
