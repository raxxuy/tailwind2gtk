import type { StyleRule, ResolvedConfig } from "../../types";

const variants: Record<string, string> = {
  "normal-nums": "normal",
  ordinal: "ordinal",
  "slashed-zero": "slashed-zero",
  "lining-nums": "lining-nums",
  "oldstyle-nums": "oldstyle-nums",
  "proportional-nums": "proportional-nums",
  "tabular-nums": "tabular-nums",
  "diagonal-fractions": "diagonal-fractions",
  "stacked-fractions": "stacked-fractions",
};

export const resolveFontVariantNumeric = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility in variants)
    return [
      {
        selector: "",
        properties: { "font-variant-numeric": variants[utility] },
      },
    ];

  return null;
};
