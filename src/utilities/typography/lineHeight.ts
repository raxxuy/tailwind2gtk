import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveLineHeight = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "leading-none")
    return [{ selector: "", properties: { "line-height": "1" } }];

  const number = utility.match(/^leading-(\d+(?:\.\d+)?)$/);
  if (number)
    return [
      {
        selector: "",
        properties: { "line-height": `calc(var(--spacing) * ${number[1]})` },
      },
    ];

  const customVar = utility.match(/^leading-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "line-height": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^leading-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "line-height": arbitrary[1] } }];

  return null;
};
