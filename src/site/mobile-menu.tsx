"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Menú móvil del header: un `<details>` (funciona sin JS) que, con JS, se
 * cierra al cambiar de ruta —la navegación cliente de `<Link>` no recarga la
 * página y el panel quedaba abierto encima del contenido nuevo— y con Escape,
 * devolviendo el foco al botón.
 */
export function MobileMenu({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || !el.open) return;
      el.open = false;
      el.querySelector("summary")?.focus();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  return (
    <details ref={ref} className="relative">
      <summary className="flex cursor-pointer list-none items-center rounded-md border border-line p-2 text-paper transition-colors hover:border-[var(--line-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ice)] [&::-webkit-details-marker]:hidden">
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
        <span className="sr-only">{label}</span>
      </summary>
      <div className="absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-5rem)] w-56 overflow-y-auto overscroll-contain rounded-xl border border-line bg-[var(--navy-900)] p-2 shadow-xl">
        {children}
      </div>
    </details>
  );
}
