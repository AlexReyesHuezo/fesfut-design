import { describe, it, expect } from "vitest";
import {
  normalizeKey,
  hashSeed,
  monogram,
  personInitials,
  crestPalette,
  avatarColors,
} from "./identicon";

describe("normalizeKey", () => {
  it("quita diacríticos, baja a minúsculas y colapsa espacios", () => {
    expect(normalizeKey("Club Deportivo Águila")).toBe("club deportivo aguila");
    expect(normalizeKey("  CD  FAS  ")).toBe("cd fas");
  });
});

describe("hashSeed", () => {
  it("es determinista y entero sin signo de 32 bits", () => {
    expect(hashSeed("alianza")).toBe(hashSeed("alianza"));
    expect(hashSeed("alianza")).toBeGreaterThanOrEqual(0);
    expect(hashSeed("alianza")).toBeLessThanOrEqual(0xffffffff);
    expect(hashSeed("alianza")).not.toBe(hashSeed("aguila"));
  });
});

describe("monogram", () => {
  it("usa iniciales de las palabras fuertes, ignorando prefijos de club", () => {
    expect(monogram("CD Luis Ángel Firpo")).toBe("LAF");
    expect(monogram("Club Deportivo Águila")).toBe("AGU");
    expect(monogram("Inter FA")).toBe("IF");
    expect(monogram("Club Deportivo FAS")).toBe("FAS");
  });

  it("para una sola palabra usa sus primeras letras", () => {
    expect(monogram("Platense")).toBe("PLA");
  });

  it("nunca devuelve vacío", () => {
    expect(monogram("")).toBe("?");
    expect(monogram("   ")).toBe("?");
  });
});

describe("personInitials", () => {
  it("toma nombre y apellido", () => {
    expect(personInitials("Hugo Pérez")).toBe("HP");
    expect(personInitials("Alex Roldán Ceren")).toBe("AC");
  });
  it("con un solo nombre usa dos letras", () => {
    expect(personInitials("Mágico")).toBe("MA");
  });
});

describe("crestPalette", () => {
  it("es determinista", () => {
    expect(crestPalette("Alianza FC")).toEqual(crestPalette("Alianza FC"));
  });

  it("usa colores conocidos cuando el nombre coincide", () => {
    // Águila = naranja/negro.
    expect(crestPalette("Club Deportivo Águila").base).toBe("#f2762e");
    // Todas las selecciones comparten el azul "Selecta".
    expect(crestPalette("Selección Mayor Masculina").base).toBe("#1d4ed8");
    expect(crestPalette("Selección Sub-20 Femenina").base).toBe("#1d4ed8");
  });

  it("elige tinta clara sobre base oscura y oscura sobre base clara", () => {
    // Base amarilla (clara) → tinta navy.
    expect(crestPalette("Firpo").ink).toBe("#0a2240");
    // Base azul (oscura) → tinta clara.
    expect(crestPalette("Alianza").ink).toBe("#f8fafc");
  });

  it("devuelve una paleta válida para nombres desconocidos", () => {
    const p = crestPalette("Equipo Inventado XYZ");
    expect(p.base).toMatch(/^#[0-9a-f]{6}$/i);
    expect(p.accent).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe("avatarColors", () => {
  it("es determinista por nombre", () => {
    expect(avatarColors("Hugo Pérez")).toEqual(avatarColors("Hugo Pérez"));
  });
});
