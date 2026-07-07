import { resolveUtility } from "./core/resolve";
import { escapeClassName } from "./escape";
import type { ResolvedConfig } from "./types/config";
import {
  isMediaVariant,
  isSelectorVariant,
  type ParsedClass,
  type StyleRule,
} from "./types/core";

export const generateRule = (
  parsed: ParsedClass,
  config: ResolvedConfig,
): StyleRule | null => {
  if (parsed.variants.some((v) => v.kind === "arbitrary")) {
    throw new Error("Arbitrary variants not yet supported");
  }

  const resolved = resolveUtility(parsed.utility, config);

  if (!resolved) return null;

  const nested = parsed.variants.reduceRight<StyleRule>((child, v) => {
    if (isMediaVariant(v)) {
      return { selector: v.query, properties: {}, children: [child] };
    }
    if (isSelectorVariant(v)) {
      return { selector: `&:${v.value}`, properties: {}, children: [child] };
    }
    throw new Error(`Unhandled variant kind: ${v.kind}`);
  }, resolved[0]);

  const topSelector = `.${escapeClassName(parsed.raw)}`;
  return { selector: topSelector, properties: {}, children: [nested] };
};
