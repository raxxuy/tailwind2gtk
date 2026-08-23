import type { ParsedClass, Variant } from "../types/core";

const PSEUDO_CLASSES = new Set([
  "link",
  "visited",
  "active",
  "hover",
  "focus",
  "focus-within",
  "focus-visible",
  "disabled",
  "checked",
  "indeterminate",
  "backdrop",
  "selected",
  "not",
  "dir",
  "drop",
  "root",
]);

const PSEUDO_SHORTHANDS: Record<string, string> = {
  first: "first-child",
  last: "last-child",
  only: "only-child",
  odd: "nth-child(odd)",
  even: "nth-child(even)",
};

const MEDIA_QUERIES: Record<string, string> = {
  dark: "@media (prefers-color-scheme: dark)",
  light: "@media (prefers-color-scheme: light)",
  "contrast-more": "@media (prefers-contrast: more)",
  "contrast-less": "@media (prefers-contrast: less)",
  "motion-reduce": "@media (prefers-reduced-motion: reduce)",
  "motion-safe": "@media (prefers-reduced-motion: no-preference)",
};

const NTH_BRACKET_RE = /^(nth|nth-last)-\[(.+)\]$/;
const NOT_RE = /^not-(.+)$/;

const resolvePseudoArg = (arg: string): string => {
  const nthMatch = arg.match(NTH_BRACKET_RE);
  if (nthMatch) {
    const [, prefix, nthArg] = nthMatch;
    const propName = prefix === "nth" ? "nth-child" : "nth-last-child";
    return `${propName}(${nthArg})`;
  }

  const notMatch = arg.match(NOT_RE);
  if (notMatch) return `not(:${resolvePseudoArg(notMatch[1])})`;

  if (arg in PSEUDO_SHORTHANDS) return PSEUDO_SHORTHANDS[arg];

  if (PSEUDO_CLASSES.has(arg)) return arg;

  throw new Error(`Unknown pseudo-class in not(): ${arg}`);
};

/**
 * Splits a class string into segments
 * @example "[&:nth-child(2n)]:hover:bg-blue-500" -> ["[&:nth-child(2n)]", "hover", "bg-blue-500"]
 */
const tokenizeClass = (cls: string): string[] => {
  const segments: string[] = [];
  let current = "";
  let depth = 0;

  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];

    if (char === "[" || char === "(") depth++;
    if (char === "]" || char === ")") {
      if (--depth < 0) {
        throw new Error(`Unbalanced brackets in class string: ${cls}`);
      }
    }

    if (char === ":" && depth === 0) {
      segments.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  if (depth !== 0) {
    throw new Error(`Unbalanced brackets in class string: ${cls}`);
  }

  if (current) segments.push(current);
  return segments;
};

/**
 * Transforms a raw token segment into a strongly-typed {@link Variant}.
 */
const classifyVariantSegment = (segment: string): Variant | null => {
  // Arbitrary Variants
  if (segment.startsWith("[") && segment.endsWith("]")) {
    return { kind: "arbitrary", value: segment };
  }

  // Media Queries
  if (segment in MEDIA_QUERIES) {
    return { kind: "media", query: MEDIA_QUERIES[segment] };
  }

  if (segment === "*") {
    return { kind: "selector", value: "*" };
  }

  if (segment === "**") {
    return { kind: "selector", value: "**" };
  }

  // nth-[...] / nth-last-[...]
  if (NTH_BRACKET_RE.test(segment)) {
    return { kind: "pseudo", value: resolvePseudoArg(segment) };
  }

  // not-...
  if (NOT_RE.test(segment)) {
    return {
      kind: "pseudo",
      value: `not(:${resolvePseudoArg(segment.slice(4))})`,
    };
  }

  if (segment in PSEUDO_SHORTHANDS) {
    return { kind: "pseudo", value: resolvePseudoArg(segment) };
  }

  const openParenIndex = segment.indexOf("(");
  const basePseudoName =
    openParenIndex !== -1 ? segment.slice(0, openParenIndex) : segment;

  // Pseudo-classes
  if (PSEUDO_CLASSES.has(basePseudoName)) {
    return { kind: "pseudo", value: segment };
  }

  throw new Error(`Unknown variant segment: ${segment}`);
};

/**
 * Converts a raw utility string into a {@link ParsedClass} object.
 */
export const parseClass = (rawClass: string): ParsedClass => {
  const tokens = tokenizeClass(rawClass);
  const utility = tokens.at(-1) ?? "";

  const variantSegments = tokens.slice(0, -1);
  const variants = variantSegments
    .map(classifyVariantSegment)
    .filter((variant) => !!variant);

  return {
    raw: rawClass,
    utility,
    variants,
  };
};
