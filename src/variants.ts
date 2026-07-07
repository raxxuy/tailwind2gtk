import type { StyleRule, Variant } from "./types";

const parseArbitraryVariant = (value: string, selector: string): string => {
  const inner = value.slice(1, -1).replace(/_/g, " ");
  return inner.replace("&", selector);
};

const applyVariantToSelector = (variant: Variant, selector: string): string => {
  if (variant.kind === "pseudo") return `${selector}:${variant.value}`;
  if (variant.kind === "arbitrary")
    return parseArbitraryVariant(variant.value, selector);
  return selector;
};

const applyVariantsToRule = (variants: Variant[], rule: StyleRule): StyleRule => ({
  ...rule,
  selector: variants.reduce(
    (sel, variant) => applyVariantToSelector(variant, sel),
    rule.selector,
  ),
  children: rule.children?.map((child) => applyVariantsToRule(variants, child)),
});

export const applyVariants = (
  variants: Variant[],
  rules: StyleRule[],
): { rules: StyleRule[]; mediaQuery?: string } => {
  const mediaVariant = variants.find((v) => v.kind === "media");
  const mediaQuery =
    mediaVariant?.kind === "media" ? mediaVariant.query : undefined;
  const nonMediaVariants = variants.filter((v) => v.kind !== "media");

  return {
    rules: rules.map((rule) => applyVariantsToRule(nonMediaVariants, rule)),
    mediaQuery,
  };
};
