import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveAnimation = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "animate-none")
    return [{ selector: "", properties: { animation: "none" } }];

  const named = utility.match(/^animate-(.+)$/);
  if (named && named[1] in config.animations)
    return [
      { selector: "", properties: { animation: `var(--animate-${named[1]})` } },
    ];

  const customVar = utility.match(/^animate-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { animation: `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^animate-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { animation: arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
