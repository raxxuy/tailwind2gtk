import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveTransitionDelay = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const number = utility.match(/^delay-(\d+)$/);
  if (number)
    return [
      { selector: "", properties: { "transition-delay": `${number[1]}ms` } },
    ];

  const customVar = utility.match(/^delay-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "transition-delay": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^delay-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "transition-delay": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
