import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveFontFeatureSettings = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const customVar = utility.match(/^font-features-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "font-feature-settings": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^font-features-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { "font-feature-settings": arbitrary[1] } },
    ];

  return null;
};
