import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveLetterSpacing = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^tracking-([\w-]+)$/);
  if (named && named[1] in config.letterSpacings)
    return [
      {
        selector: "",
        properties: { "letter-spacing": `var(--tracking-${named[1]})` },
      },
    ];

  const customVar = utility.match(/^tracking-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "letter-spacing": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^tracking-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "letter-spacing": arbitrary[1] } }];

  return null;
};
