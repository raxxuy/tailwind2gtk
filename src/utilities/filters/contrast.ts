import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveContrast = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const number = utility.match(/^contrast-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `contrast(${number}%)` } }];

  const customVar = utility.match(/^contrast-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `contrast(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^contrast-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `contrast(${arbitrary[1]})` } },
    ];

  return null;
};
