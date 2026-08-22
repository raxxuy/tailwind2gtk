import type { ResolvedConfig } from "../types";
import { parseArbitrary } from "./arbitrary";
import { unwrapVarRef } from "./token";

const COLOR_FUNC_PATTERN =
  /^(rgb|rgba|hsl|hsla|hwb|lab|lch|oklab|oklch|color|color-mix)\(/i;
const HEX_PATTERN = /^#[0-9a-f]{3,8}$/i;
const COLOR_FN_RE = /rgba?\([^)]+\)/g;

const statics = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
};

export const parseAlphaSuffix = (
  utility: string,
): { base: string; alpha: string | null } => {
  const match = utility.match(/^(.+)\/(\d+(?:\.\d+)?)$/);
  return match
    ? { base: match[1], alpha: match[2] }
    : { base: utility, alpha: null };
};

export const injectColorVar = (
  value: string,
  varName: string,
  alpha?: string,
): string =>
  value.replace(COLOR_FN_RE, (match) => {
    const color = alpha ? `oklab(from ${match} l a b / ${alpha}%)` : match;
    return `var(${varName}, ${color})`;
  });

export const looksLikeColor = (value: string): boolean =>
  HEX_PATTERN.test(value) || COLOR_FUNC_PATTERN.test(value);

const parseOpacitySuffix = (
  value: string,
): { base: string; opacity: string } | null => {
  const match = value.match(/^(.+)\/(\d+(?:\.\d+)?)$/);
  return match ? { base: match[1], opacity: match[2] } : null;
};

const oklch = (source: string, opacity: string): string =>
  `oklch(from ${source} l c h / ${opacity}%)`;

export const resolveColor = (
  value: string,
  config: ResolvedConfig,
  extra?: string,
): string | null => {
  if (value in statics) return statics[value];

  const withOpacity = parseOpacitySuffix(value);
  if (withOpacity) {
    const { base, opacity } = withOpacity;

    if (base in config.color) return oklch(`var(--color-${base})`, opacity);

    const varRef = unwrapVarRef(base, extra);
    if (varRef) return oklch(`var(${varRef})`, opacity);

    const arbitrary = parseArbitrary(base);
    if (arbitrary && looksLikeColor(arbitrary)) {
      return oklch(arbitrary, opacity);
    }

    return null;
  }

  if (value in config.color) return `var(--color-${value})`;

  const varRef = unwrapVarRef(value, extra);
  if (varRef) return `var(${varRef})`;

  const arbitrary = parseArbitrary(value);
  return arbitrary && looksLikeColor(arbitrary) ? arbitrary : null;
};
