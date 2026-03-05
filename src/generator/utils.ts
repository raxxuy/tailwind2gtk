import type { UtilityResult } from "../core";
import { getCustomColors } from ".";
import { COLORS } from "./colors";
import { COLOR_KEYWORDS, NUMERIC_VARIABLES } from "./constants";

export const isArbitrary = (raw: string): boolean => raw.startsWith("[");

export const resolveArbitrary = (raw: string): string => {
  return raw.slice(1, -1).replace(/_/g, " ");
};

export const resolveColorValue = (raw: string): string | null => {
  const [colorRaw, opacityRaw] = raw.split("/");

  if (/\d+(px|rem|em|%|vw|vh)/.test(colorRaw)) return null;

  const opacity = opacityRaw?.startsWith("[")
    ? String(parseFloat(opacityRaw.slice(1, -1)) * 100)
    : opacityRaw;

  if (colorRaw in COLOR_KEYWORDS) {
    return COLOR_KEYWORDS[colorRaw as keyof typeof COLOR_KEYWORDS];
  }

  const isKnownColor = colorRaw in COLORS || colorRaw in getCustomColors();
  if (isKnownColor)
    return opacity
      ? `color-mix(in oklch, var(--color-${colorRaw}) ${opacity}%, transparent)`
      : `var(--color-${colorRaw})`;

  const value = resolveDynamic(colorRaw);
  if (!value) return null;

  return opacity
    ? `color-mix(in oklch, ${value} ${opacity}%, transparent)`
    : value;
};

export const resolveDynamic = (raw: string): string | null => {
  if (raw.startsWith("(")) return `var(${raw.slice(1, -1)})`;
  if (isArbitrary(raw)) return resolveArbitrary(raw);
  return null;
};

export const toRem = (raw: string): string | null => {
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return null;
  return `${(num * NUMERIC_VARIABLES.spacing).toFixed(3).replace(/\.?0+$/, "")}rem`;
};

export const prop = (properties: string[]): UtilityResult => ({ properties });

export const propWithSelector = (
  selector: string,
  properties: string[],
): UtilityResult => ({ selector, properties });
