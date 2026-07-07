import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveHueRotate = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^(-?)hue-rotate-(.+)$/);
  if (!match) return null;

  const [, negative, value] = match;
  const num = Number(value);

  if (!Number.isNaN(num))
    return [
      {
        selector: "",
        properties: {
          filter: negative
            ? `hue-rotate(calc(${num}deg * -1))`
            : `hue-rotate(${num}deg)`,
        },
      },
    ];

  const customVar = utility.match(/^hue-rotate-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `hue-rotate(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^hue-rotate-\[(.+)\]$/);
  if (arbitrary)
    return [
      { selector: "", properties: { filter: `hue-rotate(${arbitrary[1]})` } },
    ];

  return null;
};
