import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveSaturate = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const number = utility.match(/^saturate-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `saturate(${number}%)` } }];

  const customVar = utility.match(/^saturate-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `saturate(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^saturate-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `saturate(${arbitrary[1]})` } },
    ];

  return null;
};
