import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveTransitionTimingFunction = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "ease-linear")
    return [
      { selector: "", properties: { "transition-timing-function": "linear" } },
    ];

  if (utility === "ease-initial")
    return [
      { selector: "", properties: { "transition-timing-function": "initial" } },
    ];

  const named = utility.match(/^ease-(.+)$/);
  if (named && named[1] in config.transitionTimingFunctions)
    return [
      {
        selector: "",
        properties: { "transition-timing-function": `var(--ease-${named[1]})` },
      },
    ];

  const customVar = utility.match(/^ease-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "transition-timing-function": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^ease-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: {
          "transition-timing-function": arbitrary[1].replace(/_/g, " "),
        },
      },
    ];

  return null;
};
