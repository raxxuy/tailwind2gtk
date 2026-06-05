import type { CSSRule, ResolvedConfig } from "../../types";

const stretches = [
  "ultra-condensed",
  "extra-condensed",
  "condensed",
  "semi-condensed",
  "normal",
  "semi-expanded",
  "expanded",
  "extra-expanded",
  "ultra-expanded",
];

export const resolveFontStretch = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const stretch = utility.match(/^font-stretch-([\w-]+)$/);
  if (stretch && stretches.includes(stretch[1]))
    return [{ selector: "", properties: { "font-stretch": stretch[1] } }];

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
