/**
 * Identidad visual generada (sin assets): a partir del nombre de un club o
 * selección derivamos de forma DETERMINISTA una paleta y un monograma para
 * pintar un escudo SVG, y de un nombre de persona un color de avatar.
 *
 * No se guarda nada: misma entrada → misma salida. Cuando exista un `crestUrl`
 * real subido, los componentes lo prefieren y esto queda como respaldo.
 *
 * Lógica pura (sin React/DOM) para poder testearla con Vitest.
 */

/** Paleta de un escudo: relleno, fondo profundo, acento y tinta del monograma. */
export interface CrestPalette {
  base: string;
  deep: string;
  accent: string;
  /** Color del monograma; se elige por contraste con `base`. */
  ink: string;
}

/* ── Normalización ────────────────────────────────────────────────── */

/** minúsculas, sin diacríticos, solo alfanumérico y espacios colapsados. */
export function normalizeKey(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Hash FNV-1a de 32 bits, estable entre ejecuciones y plataformas. */
export function hashSeed(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/* ── Monograma ────────────────────────────────────────────────────── */

// Prefijos/sufijos de club que no aportan al monograma.
const NOISE = new Set([
  "cd",
  "ad",
  "fc",
  "club",
  "deportivo",
  "asociacion",
  "atletico",
  "seleccion",
  "de",
  "del",
  "la",
  "el",
  "los",
  "las",
]);

/**
 * Monograma de 1–3 letras para el escudo. Para clubes/selecciones intenta usar
 * iniciales de las palabras "fuertes"; si solo queda una palabra, sus 2–3
 * primeras letras. Para nombres de persona, iniciales de nombre y apellido.
 */
export function monogram(name: string): string {
  const words = normalizeKey(name)
    .split(" ")
    .filter((w) => w.length > 0);
  const strong = words.filter((w) => !NOISE.has(w));
  const pool = strong.length > 0 ? strong : words;

  if (pool.length === 0) return "?";
  if (pool.length === 1) return pool[0].slice(0, 3).toUpperCase();
  return pool
    .slice(0, 3)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/** Iniciales (1–2 letras) para avatares de persona. */
export function personInitials(name: string): string {
  const words = normalizeKey(name)
    .split(" ")
    .filter((w) => w.length > 1);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/* ── Paletas ──────────────────────────────────────────────────────── */

const PAPER = "#f8fafc";
const NAVY_INK = "#0a2240";

/**
 * Paletas genéricas (base, profundo, acento). Pensadas para verse bien sobre
 * el tema "cancha nocturna". El monograma (`ink`) se calcula por luminancia.
 */
const PALETTES: { base: string; deep: string; accent: string }[] = [
  { base: "#d12027", deep: "#5b0f14", accent: "#ffd36b" }, // rojo
  { base: "#1d4ed8", deep: "#0a2240", accent: "#9cc4ff" }, // azul
  { base: "#1f9d55", deep: "#0c5132", accent: "#f5c518" }, // verde
  { base: "#f2762e", deep: "#7a2f0c", accent: "#ffd36b" }, // naranja
  { base: "#7c3aed", deep: "#341063", accent: "#c7a6ff" }, // morado
  { base: "#0891b2", deep: "#0a3b48", accent: "#a7e8f5" }, // cian
  { base: "#e11d74", deep: "#5e0a31", accent: "#ffc6e1" }, // magenta
  { base: "#f5c518", deep: "#6b5306", accent: "#0a2240" }, // amarillo
  { base: "#475569", deep: "#1e293b", accent: "#cbd5e1" }, // pizarra
  { base: "#15803d", deep: "#06351a", accent: "#bbf7d0" }, // bosque
  { base: "#b91c1c", deep: "#450a0a", accent: "#fca5a5" }, // granate
  { base: "#0369a1", deep: "#082f49", accent: "#bae6fd" }, // marino
];

/**
 * Colores "reales" de clubes/selecciones conocidos: si el nombre normalizado
 * incluye alguno de los tokens, usamos su paleta en vez del hash. Mejora el
 * realismo de los escudos genéricos sin guardar ningún asset.
 */
const KNOWN: { tokens: string[]; palette: Omit<CrestPalette, "ink"> }[] = [
  { tokens: ["alianza"], palette: { base: "#1d4ed8", deep: "#0a2240", accent: "#ffffff" } },
  { tokens: ["aguila"], palette: { base: "#f2762e", deep: "#161616", accent: "#ffd36b" } },
  { tokens: ["fas"], palette: { base: "#d12027", deep: "#15225e", accent: "#ffd36b" } },
  { tokens: ["firpo"], palette: { base: "#f5c518", deep: "#15357a", accent: "#15357a" } },
  { tokens: ["metapan"], palette: { base: "#1f9d55", deep: "#0c5132", accent: "#f5c518" } },
  { tokens: ["limeno", "limeño"], palette: { base: "#1f9d55", deep: "#06351a", accent: "#ffffff" } },
  { tokens: ["platense"], palette: { base: "#1d4ed8", deep: "#0a2240", accent: "#9cc4ff" } },
  { tokens: ["hercules"], palette: { base: "#0a2240", deep: "#050f23", accent: "#9cc4ff" } },
  { tokens: ["fuerte", "francisco"], palette: { base: "#7c3aed", deep: "#341063", accent: "#c7a6ff" } },
  { tokens: ["zacatecoluca"], palette: { base: "#0891b2", deep: "#0a3b48", accent: "#a7e8f5" } },
  { tokens: ["inter"], palette: { base: "#0369a1", deep: "#082f49", accent: "#bae6fd" } },
  { tokens: ["cacahuatique"], palette: { base: "#15803d", deep: "#06351a", accent: "#bbf7d0" } },
  // Selecciones nacionales — azul/blanco "La Selecta".
  { tokens: ["seleccion", "selecta", "nacional", "salvadorena"], palette: { base: "#1d4ed8", deep: "#0a2240", accent: "#ffffff" } },
];

/** Luminancia relativa aproximada de un color #rrggbb (0–1). */
function luminance(hex: string): number {
  const m = hex.replace("#", "");
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Tinta del monograma por contraste con el relleno. */
function inkFor(base: string): string {
  return luminance(base) > 0.6 ? NAVY_INK : PAPER;
}

/** Paleta determinista para un escudo, dada una semilla (nombre o slug). */
export function crestPalette(seed: string): CrestPalette {
  const key = normalizeKey(seed);
  const known = KNOWN.find((k) => k.tokens.some((tok) => key.includes(tok)));
  const p = known
    ? known.palette
    : PALETTES[hashSeed(key) % PALETTES.length];
  return { ...p, ink: inkFor(p.base) };
}

/** Color de fondo determinista para un avatar de persona. */
export function avatarColors(seed: string): { base: string; deep: string } {
  const p = PALETTES[hashSeed(normalizeKey(seed)) % PALETTES.length];
  return { base: p.base, deep: p.deep };
}
