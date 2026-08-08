import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Pie público compartido: wordmark gigante de fondo, marca, nav secundaria y
 * la línea de derechos. Marca, ítems (ya traducidos) y texto de derechos los
 * pasa cada sitio; el wordmark de fondo es configurable (por defecto "FESFUT").
 */
export function SiteFooter({
  brand,
  nav,
  rights,
  wordmark = "FESFUT",
}: {
  brand: ReactNode;
  nav: { href: string; label: string }[];
  /** Texto de derechos ya formateado (p. ej. "© 2026 FESFUT · El Salvador"). */
  rights: string;
  wordmark?: string;
}) {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-line">
      {/* Wordmark gigante de fondo */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] font-black uppercase italic leading-none tracking-tighter text-paper opacity-[0.03]"
      >
        {wordmark}
      </p>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-paper">{brand}</div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:text-[var(--ice)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="chalk-rule" />
      <div className="relative py-5">
        <p className="mx-auto max-w-6xl px-6 text-[0.7rem] uppercase tracking-[0.2em] text-muted">
          {rights}
        </p>
      </div>
    </footer>
  );
}
