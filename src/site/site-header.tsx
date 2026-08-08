import Link from "next/link";
import type { ReactNode } from "react";

export interface NavLink {
  href: string;
  label: string;
  /** Submenú en hover (escritorio) / aplanado (móvil). */
  children?: { href: string; label: string }[];
}

const linkClass =
  "relative whitespace-nowrap px-3 py-2 font-display text-sm font-semibold uppercase tracking-wide text-muted transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[image:var(--grad-cool)] after:transition-transform after:duration-300 hover:text-paper hover:after:scale-x-100";

const mobileLinkClass =
  "block rounded-lg px-3 py-2 font-display text-sm font-semibold uppercase tracking-wide text-muted transition-colors hover:bg-white/5 hover:text-paper";

/**
 * Barra pública compartida (chrome "cancha nocturna"). Translúcida sobre el
 * campo, con regla de cal inferior, nav de escritorio con subrayado animado y
 * menú móvil `<details>` sin JS.
 *
 * El contenido (marca, ítems de nav, acción final, conmutador de idioma) lo
 * inyecta cada sitio por props — así fesfut-site y ligas-site comparten la
 * estructura pero definen su propio menú y sus etiquetas ya traducidas.
 */
export function SiteHeader({
  homeHref = "/",
  brand,
  nav,
  action,
  localeSwitcher,
  menuLabel = "Menú",
}: {
  homeHref?: string;
  brand: ReactNode;
  nav: NavLink[];
  /** Enlace de acción destacado a la derecha (p. ej. el panel de admin). */
  action?: { href: string; label: string } | null;
  localeSwitcher: ReactNode;
  menuLabel?: string;
}) {
  return (
    <header className="sticky top-0 z-40 bg-[var(--navy-950)]/65 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-6">
        <Link
          href={homeHref}
          className="shrink-0 text-paper transition-opacity hover:opacity-80"
        >
          {brand}
        </Link>

        {/* ── Nav de escritorio ────────────────────────────────── */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((item) =>
            item.children && item.children.length > 0 ? (
              <div key={item.href} className="group relative">
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
                <div className="absolute left-1/2 top-full hidden min-w-[10rem] -translate-x-1/2 rounded-xl border border-line bg-[var(--navy-900)] p-1.5 shadow-xl group-hover:block">
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className={mobileLinkClass}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ),
          )}

          {action ? (
            <Link
              href={action.href}
              className="ml-2 shrink-0 whitespace-nowrap rounded-full border border-line px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide text-paper transition-colors hover:border-[var(--ice)] hover:text-[var(--ice)]"
            >
              {action.label}
            </Link>
          ) : null}
          <span className="ml-2 shrink-0">{localeSwitcher}</span>
        </nav>

        {/* ── Nav móvil (menú desplegable, sin JS) ──────────────── */}
        <div className="flex items-center gap-2 lg:hidden">
          {localeSwitcher}
          <details className="relative">
            <summary className="flex cursor-pointer list-none items-center rounded-md border border-line p-2 text-paper [&::-webkit-details-marker]:hidden">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="sr-only">{menuLabel}</span>
            </summary>
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-line bg-[var(--navy-900)] p-2 shadow-xl">
              {nav.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className={mobileLinkClass}>
                    {item.label}
                  </Link>
                  {item.children?.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className={`${mobileLinkClass} pl-6 text-xs`}
                    >
                      {item.label} · {c.label}
                    </Link>
                  ))}
                </div>
              ))}
              {action ? (
                <>
                  <div className="my-1 border-t border-line" />
                  <Link href={action.href} className={mobileLinkClass}>
                    {action.label}
                  </Link>
                </>
              ) : null}
            </div>
          </details>
        </div>
      </div>
      {/* Línea inferior degradada */}
      <div className="chalk-rule" />
    </header>
  );
}
