import { getTailwindVariable } from "../../compiler/runtime/variables";
import type { StyleRule, UtilityResolverProps } from "../../types";

const VARIANT_NUMERIC_MAP: Record<string, string> = {
  "normal-nums": "normal",
  ordinal: "ordinal",
  "slashed-zero": "slashed-zero",
  "lining-nums": "lining-nums",
  "oldstyle-nums": "oldstyle-nums",
  "proportional-nums": "proportional-nums",
  "tabular-nums": "tabular-nums",
  "diagonal-fractions": "diagonal-fractions",
  "stacked-fractions": "stacked-fractions",
} as const;

const resolveFontVariantNumericValue = (
  utility: string,
): [string, string | null] | null => {
  const value = VARIANT_NUMERIC_MAP[utility];
  if (!value) return null;

  const variable = getTailwindVariable(utility);
  if (variable) {
    return [
      "var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,)",
      variable,
    ];
  }

  return [value, null];
};

export const resolveFontVariantNumeric = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontVariantNumericValue(utility);
  if (!value) return null;

  return {
    properties: {
      "font-variant-numeric": value[0],
      ...(value[1] ? { [`${value[1]}`]: utility } : {}),
    },
  };
};
