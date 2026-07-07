import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveFilter = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "filter-none")
    return [{ selector: "", properties: { filter: "none" } }];

  const customVar = utility.match(/^filter-\((--[^)]+)\)$/);
  if (customVar)
    return [{ selector: "", properties: { filter: `var(${customVar[1]})` } }];

  const arbitrary = utility.match(/^filter-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { filter: arbitrary[1] } }];

  return null;
};
