import { parseArbitrary } from "../resolvers/arbitrary";
import type { ResolvedConfig } from "../types/config";
import type { ParsedClass, StyleRule } from "../types/core";
import {
  isArbitraryVariant,
  isMediaVariant,
  isPseudoVariant,
  isSelectorVariant,
} from "../types/core";
import { escapeClass } from "./escape";
import { resolveUtility } from "./utility";

export const wrapChild = (
  selector: string,
  properties: Record<string, string>,
): StyleRule => ({
  properties: {},
  children: [{ selector, properties }],
});

/**
 * Generates a {@link StyleRule} from a parsed class.
 */
export const generateRule = (
  parsed: ParsedClass,
  config: ResolvedConfig,
): StyleRule | null => {
  const resolved = resolveUtility(parsed.utility, config);
  if (!resolved) return null;

  const base = Array.isArray(resolved) ? resolved[0] : resolved;
  const children = base.children ?? [];
  const topSelector = `.${escapeClass(parsed.raw)}`;

  if (parsed.variants.length === 0) {
    return { ...base, selector: topSelector, children };
  }

  // Nest the resolved utility under the parsed variants
  const nested = parsed.variants.reduceRight<StyleRule>((child, v) => {
    if (isMediaVariant(v)) {
      return {
        selector: v.query ?? undefined,
        properties: {},
        children: [child],
      };
    }

    if (isPseudoVariant(v)) {
      return {
        selector: `&:${v.value}`,
        properties: {},
        children: [child],
      };
    }

    if (isArbitraryVariant(v)) {
      return {
        selector: parseArbitrary(v.value) ?? undefined,
        properties: {},
        children: [child],
      };
    }

    if (isSelectorVariant(v)) {
      return {
        selector: v.value === "*" ? "& > *" : "& *",
        properties: {},
        children: [child],
      };
    }

    throw new Error(`Unhandled variant kind: ${v.kind}`);
  }, base);

  return { selector: topSelector, properties: {}, children: [nested] };
};
