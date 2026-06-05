import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveOpacity = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const number = utility.match(/^opacity-(\d+)$/);
  if (number)
    return [{ selector: "", properties: { opacity: `${number[1]}%` } }];

  const customVar = utility.match(/^opacity-\((--[^)]+)\)$/);
  if (customVar)
    return [{ selector: "", properties: { opacity: `var(${customVar[1]})` } }];

  const arbitrary = utility.match(/^opacity-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { opacity: arbitrary[1] } }];

  return null;
};
