import { resolveColor } from "../../helpers/resolveColor";
import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveBoxShadow = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "shadow-none")
    return [{ selector: "", properties: { "box-shadow": "0 0 #0000" } }];

  const named = utility.match(/^shadow-(2xs|xs|sm|md|lg|xl|2xl)$/);
  if (named && named[1] in config.boxShadows)
    return [
      {
        selector: "",
        properties: { "box-shadow": `var(--shadow-${named[1]})` },
      },
    ];

  const customVar = utility.match(/^shadow-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "box-shadow": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^shadow-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "box-shadow": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};

export const resolveBoxShadowColor = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const colorVar = utility.match(/^shadow-\(color:(--[^)]+)\)$/);
  if (colorVar)
    return [
      { selector: "", properties: { "--shadow-color": `var(${colorVar[1]})` } },
    ];

  const named = utility.match(/^shadow-(.+)$/);
  if (!named) return null;

  const resolved = resolveColor(named[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "--shadow-color": resolved } }];
};

export const resolveInsetBoxShadow = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "inset-shadow-none")
    return [{ selector: "", properties: { "box-shadow": "inset 0 0 #0000" } }];

  const named = utility.match(/^inset-shadow-(2xs|xs|sm)$/);
  if (named && named[1] in config.insetBoxShadows)
    return [
      {
        selector: "",
        properties: { "box-shadow": `var(--inset-shadow-${named[1]})` },
      },
    ];

  const customVar = utility.match(/^inset-shadow-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "box-shadow": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^inset-shadow-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "box-shadow": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};

export const resolveInsetBoxShadowColor = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const colorVar = utility.match(/^inset-shadow-\(color:(--[^)]+)\)$/);
  if (colorVar)
    return [
      {
        selector: "",
        properties: { "--inset-shadow-color": `var(${colorVar[1]})` },
      },
    ];

  const named = utility.match(/^inset-shadow-(.+)$/);
  if (!named) return null;

  const resolved = resolveColor(named[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "--inset-shadow-color": resolved } }];
};
