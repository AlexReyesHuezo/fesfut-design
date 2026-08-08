# @fesfut/ui

Sistema de diseño compartido **"cancha nocturna"** del fútbol salvadoreño:
tokens de color/tipografía, marca (balón + escudos generados) y primitivas de
chrome (header, footer, backdrop, conmutador de idioma). Lo consumen **dos apps
independientes** — `fesfut-site` y `ligas-site` — para verse idénticas sin
compartir datos ni dominio.

Se distribuye como **fuente** (sin build): las apps lo transpilan con
`transpilePackages`. Se versiona por tag de git.

## Instalación (por tag de git, sin registry)

```jsonc
// package.json de cada app
"dependencies": {
  "@fesfut/ui": "github:AlexReyesHuezo/fesfut-design#v0.1.0"
}
```

## Integración

**1. Transpilar el paquete** (Next.js):

```ts
// next.config.ts
const nextConfig = {
  transpilePackages: ["@fesfut/ui"],
};
```

**2. Tema + fuentes** en `app/globals.css`:

```css
@import "tailwindcss";
@import "@fesfut/ui/theme.css";
/* que Tailwind genere las utilidades usadas dentro del paquete */
@source "../node_modules/@fesfut/ui/src";
```

Las fuentes las provee cada app con `next/font`, exponiendo estas variables CSS
(mismos nombres que espera el tema):

```ts
// app/layout.tsx
import { Archivo, Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
const archivo = Archivo({ variable: "--font-archivo", /* … */ });
const hanken  = Hanken_Grotesk({ variable: "--font-hanken", subsets: ["latin"] });
const plex    = IBM_Plex_Mono({ variable: "--font-plex", /* … */ });
```

**3. Uso**:

```tsx
import { SiteHeader, LocaleSwitcher, FesfutLockup } from "@fesfut/ui";

<SiteHeader
  brand={<FesfutLockup federationLabel={t("brand.federation")} />}
  nav={[{ href: "/ligas", label: t("nav.ligas") }]}
  action={{ href: "/admin", label: t("nav.panel") }}
  localeSwitcher={<LocaleSwitcher locales={locales} current={locale} action={setLocale} />}
/>
```

## Contenido

- `theme.css` — tokens (`@theme`), superficie `field-night`, y clases:
  `panel`/`panel-link`, `eyebrow`, `chalk-rule`, `text-grad(-hot)`, `btn-grad`,
  `chip`, `live-dot`, `marquee`, `tnum`, `stat-num`, `kickoff`, `float-spin`,
  `reveal`, `prose-fesfut`.
- Marca: `FesfutBall`, `FesfutLockup`, `TeamCrest`, `PlayerAvatar` + utilidades
  de identicon (paletas/monogramas deterministas, sin assets).
- Chrome: `PitchBackdrop`, `SiteHeader`, `SiteFooter`, `LocaleSwitcher`,
  `SponsorsStrip`. Todo presentacional — sin dependencia de next-intl ni de DB;
  las etiquetas ya traducidas y la Server Action de idioma se pasan por props.

## Notas

- `bracket-*` (árbol de eliminatoria) **no** vive aquí: es específico de
  competición y se queda en `ligas-site`.
- `cn()` (clsx + tailwind-merge) se queda en cada app; el paquete no lo necesita.
