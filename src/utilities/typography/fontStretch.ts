import type { CSSRule, ResolvedConfig } from "../../types";

const stretches: Record<string, string> = {
  "ultra-condensed": "ultra-condensed",
  "extra-condensed": "extra-condensed",
  condensed: "condensed",
  "semi-condensed": "semi-condensed",
  normal: "normal",
  "semi-expanded": "semi-expanded",
  expanded: "expanded",
  "extra-expanded": "extra-expanded",
  "ultra-expanded": "ultra-expanded",
};

export const resolveFontStretch = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^font-stretch-([\w-]+)$/);
  if (named && named[1] in stretches)
    return [
      { selector: "", properties: { "font-stretch": stretches[named[1]] } },
    ];

  const percentage = utility.match(/^font-stretch-(\d+)%$/);
  if (percentage)
    return [
      { selector: "", properties: { "font-stretch": `${percentage[1]}%` } },
    ];

  const customVar = utility.match(/^font-stretch-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "font-stretch": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^font-stretch-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "font-stretch": arbitrary[1] } }];

  return null;
};
