import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveBrightness = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const number = utility.match(/^brightness-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `brightness(${number}%)` } }];

  const customVar = utility.match(/^brightness-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `brightness(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^brightness-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `brightness(${arbitrary[1]})` } },
    ];

  return null;
};
