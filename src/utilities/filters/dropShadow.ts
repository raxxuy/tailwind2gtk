import { resolveColor } from "../../helpers/resolveColor";
import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveDropShadow = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "drop-shadow-none")
    return [{ selector: "", properties: { filter: "drop-shadow(0 0 #0000)" } }];

  const named = utility.match(/^drop-shadow-(xs|sm|md|lg|xl|2xl)$/);
  if (named && named[1] in config.dropShadows)
    return [
      {
        selector: "",
        properties: { filter: `drop-shadow(${config.dropShadows[named[1]]})` },
      },
    ];

  const customVar = utility.match(/^drop-shadow-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { filter: `drop-shadow(var(${customVar[1]}))` },
      },
    ];

  const arbitrary = utility.match(/^drop-shadow-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: {
          filter: `drop-shadow(${arbitrary[1].replace(/_/g, " ")})`,
        },
      },
    ];

  return null;
};

export const resolveDropShadowColor = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const colorVar = utility.match(/^drop-shadow-\(color:(--[^)]+)\)$/);
  if (colorVar)
    return [
      {
        selector: "",
        properties: { "--drop-shadow-color": `var(${colorVar[1]})` },
      },
    ];

  const named = utility.match(/^drop-shadow-(.+)$/);
  if (!named) return null;

  const resolved = resolveColor(named[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "--drop-shadow-color": resolved } }];
};
