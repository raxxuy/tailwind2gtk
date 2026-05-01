import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveFontFamily = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^font-(.+)$/);
  if (named && named[1] in config.fontFamilies)
    return [
      {
        selector: "",
        properties: { "font-family": `var(--font-${named[1]})` },
      },
    ];

  const customVar = utility.match(/^font-\(family-name:(--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "font-family": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^font-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "font-family": arbitrary[1] } }];

  return null;
};
