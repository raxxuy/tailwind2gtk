import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveInvert = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "invert")
    return [{ selector: "", properties: { filter: "invert(100%)" } }];

  const number = utility.match(/^invert-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `invert(${number}%)` } }];

  const customVar = utility.match(/^invert-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `invert(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^invert-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `invert(${arbitrary[1]})` } },
    ];

  return null;
};
