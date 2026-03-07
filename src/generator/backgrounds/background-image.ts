import type { UtilityResult } from "../../core";
import { LINEAR_DIRECTIONS } from "../constants";
import { prop, resolveColorValue, resolveDynamic } from "../utils";
import { splitMode, withInterpolation } from "./utils";

const bgImage = (value: string): UtilityResult =>
  prop([`background-image: ${value}`]);

const linearGradient = (angle: string) =>
  bgImage(`linear-gradient(${angle}, var(--tw-gradient-stops))`);

const radialGradient = (value: string) =>
  bgImage(`radial-gradient(var(--tw-gradient-stops, ${value}))`);

const conicGradient = (angle: string) =>
  bgImage(`conic-gradient(from ${angle}, var(--tw-gradient-stops))`);

const resolveGradientColor = (rest: string): string | null => {
  const varMatch = rest.match(/^\((.+?)\)(?:\/(\d+))?$/);
  if (varMatch) {
    const [, varName, opacity] = varMatch;
    return opacity
      ? `color-mix(in oklch, var(${varName}) ${opacity}%, transparent)`
      : `var(${varName})`;
  }
  return resolveDynamic(rest) ?? resolveColorValue(rest);
};

const resolveAngle = (rest: string): string | null => {
  const match = rest.match(/^(-?)([\d.]+)$/);
  return match ? `${match[1]}${match[2]}deg` : null;
};

const resolveDirection = (rest: string) =>
  LINEAR_DIRECTIONS[rest as keyof typeof LINEAR_DIRECTIONS] ?? null;

export const generateBackgroundImage = (cls: string): UtilityResult | null => {
  if (cls === "bg-none") return bgImage("none");
  if (cls === "bg-radial")
    return bgImage("radial-gradient(in oklab, var(--tw-gradient-stops))");

  const imageVarMatch = cls.match(/^bg-\(image:(.+)\)$/);
  if (imageVarMatch) return bgImage(`var(${imageVarMatch[1]})`);

  if (cls.startsWith("bg-")) {
    const arbitrary = resolveDynamic(cls.slice(3));
    if (arbitrary) return bgImage(arbitrary);
  }

  // bg-linear-* / bg-gradient-* (alias)
  if (cls.startsWith("bg-linear-") || cls.startsWith("bg-gradient-")) {
    const raw = cls.startsWith("bg-gradient-") ? cls.slice(12) : cls.slice(10);
    const [rest, mode] = splitMode(raw);

    const direction = resolveDirection(rest);
    if (direction) return linearGradient(withInterpolation(direction, mode));

    const angle = resolveAngle(rest);
    if (angle)
      return linearGradient(withInterpolation(`${angle} in oklab`, mode));

    const dynamic = resolveDynamic(rest);
    if (dynamic)
      return bgImage(`linear-gradient(var(--tw-gradient-stops, ${dynamic}))`);
  }

  // bg-radial-*
  if (cls.startsWith("bg-radial-")) {
    const [rest, mode] = splitMode(cls.slice(10));
    const dynamic = resolveDynamic(rest);
    if (dynamic)
      return radialGradient(mode ? `in ${mode}, ${dynamic}` : dynamic);
  }

  // bg-conic-*
  if (cls.startsWith("bg-conic-")) {
    const [rest, mode] = splitMode(cls.slice(9));

    const angle = resolveAngle(rest);
    if (angle)
      return conicGradient(mode ? `${angle} in ${mode}` : `${angle} in oklab`);

    const varMatch = rest.match(/^\((.+)\)$/);
    if (varMatch) return bgImage(`var(${varMatch[1]})`);

    const arbitrary = resolveDynamic(rest);
    if (arbitrary) return bgImage(arbitrary);
  }

  return null;
};

export const generateGradientFrom = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("from-")) return null;
  const rest = cls.slice(5);

  const percent = rest.match(/^([\d.]+)%$/);
  if (percent) return prop([`--tw-gradient-from-position: ${percent[1]}%`]);

  const color = resolveGradientColor(rest);
  if (color)
    return prop([
      `--tw-gradient-from: ${color} var(--tw-gradient-from-position, 0%)`,
      `--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, transparent)`,
    ]);

  return null;
};

export const generateGradientVia = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("via-")) return null;
  const rest = cls.slice(4);

  const percent = rest.match(/^([\d.]+)%$/);
  if (percent) return prop([`--tw-gradient-via-position: ${percent[1]}%`]);

  const color = resolveGradientColor(rest);
  if (color)
    return prop([
      `--tw-gradient-via: ${color} var(--tw-gradient-via-position, 50%)`,
      `--tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to, transparent)`,
    ]);

  return null;
};

export const generateGradientTo = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("to-")) return null;
  const rest = cls.slice(3);

  const percent = rest.match(/^([\d.]+)%$/);
  if (percent) return prop([`--tw-gradient-to-position: ${percent[1]}%`]);

  const color = resolveGradientColor(rest);
  if (color)
    return prop([
      `--tw-gradient-to: ${color} var(--tw-gradient-to-position, 100%)`,
    ]);

  return null;
};
