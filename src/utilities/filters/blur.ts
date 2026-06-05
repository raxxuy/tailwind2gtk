import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveBlur = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "blur-none")
    return [{ selector: "", properties: { filter: "" } }];

  const named = utility.match(/^blur-(.+)$/);
  if (named && named[1] in config.blurSizes)
    return [
      {
        selector: "",
        properties: {
          filter: `blur(var(--blur-${named[1]}))`,
        },
      },
    ];

  const customVar = utility.match(/^blur-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { filter: `blur(var(${customVar[1]}))` } },
    ];

  const arbitrary = utility.match(/^blur-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { filter: `blur(${arbitrary[1]})` } }];

  return null;
};
