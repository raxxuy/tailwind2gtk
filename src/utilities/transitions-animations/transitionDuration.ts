import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveTransitionDuration = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "duration-initial")
    return [{ selector: "", properties: { "transition-duration": "initial" } }];

  const number = utility.match(/^duration-(\d+)$/);
  if (number)
    return [
      { selector: "", properties: { "transition-duration": `${number[1]}ms` } },
    ];

  const customVar = utility.match(/^duration-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "transition-duration": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^duration-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "transition-duration": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
