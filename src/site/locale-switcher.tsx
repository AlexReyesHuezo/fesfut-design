const DEFAULT_SHORT: Record<string, string> = { "es-SV": "ES", en: "EN" };

/**
 * Conmutador de idioma (presentacional). La lógica de i18n vive en cada app:
 * se le pasan los `locales`, el `current` y la Server Action `action` que
 * persiste la cookie. Así el paquete no depende de next-intl.
 */
export function LocaleSwitcher({
  locales,
  current,
  action,
  short = DEFAULT_SHORT,
}: {
  locales: readonly string[];
  current: string;
  action: (formData: FormData) => void | Promise<void>;
  short?: Record<string, string>;
}) {
  return (
    <form action={action} className="flex items-center rounded-md border border-line">
      {locales.map((l) => {
        const active = l === current;
        return (
          <button
            key={l}
            name="locale"
            value={l}
            disabled={active}
            aria-pressed={active}
            className={`px-2.5 py-1.5 font-display text-xs font-bold uppercase tracking-wide transition-colors ${
              active ? "text-[var(--ice)]" : "text-muted hover:text-paper"
            }`}
          >
            {short[l] ?? l}
          </button>
        );
      })}
    </form>
  );
}
