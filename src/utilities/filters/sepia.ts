import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveSepia = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "sepia")
    return [{ selector: "", properties: { filter: "sepia(100%)" } }];

  const number = utility.match(/^sepia-(\d+(?:\.\d+)?)$/);
  if (number)
    return [{ selector: "", properties: { filter: `sepia(${number}%)` } }];

  const customVar = utility.match(/^sepia-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `sepia(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^sepia-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { filter: `sepia(${arbitrary[1]})` } }];

  return null;
};
