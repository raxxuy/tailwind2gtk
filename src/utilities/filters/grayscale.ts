import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveGrayscale = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "grayscale")
    return [{ selector: "", properties: { filter: "grayscale(100%)" } }];

  const number = utility.match(/^grayscale-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `grayscale(${number}%)` } }];

  const customVar = utility.match(/^grayscale-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `grayscale(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^grayscale-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `grayscale(${arbitrary[1]})` } },
    ];

  return null;
};
