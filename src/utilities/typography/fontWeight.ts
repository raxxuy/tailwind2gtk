import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveFontWeight = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^font-([\w]+)$/);
  if (named && named[1] in config.fontWeights)
    return [
      {
        selector: "",
        properties: { "font-weight": config.fontWeights[named[1]] },
      },
    ];

  const customVar = utility.match(/^font-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "font-weight": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^font-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "font-weight": arbitrary[1] } }];

  return null;
};
