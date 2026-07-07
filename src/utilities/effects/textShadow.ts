import { resolveColor } from "../../helpers/resolveColor";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveTextShadow = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "text-shadow-none")
    return [{ selector: "", properties: { "text-shadow": "none" } }];

  const named = utility.match(/^text-shadow-(2xs|xs|sm|md|lg)$/);
  if (named && named[1] in config.textShadows)
    return [
      {
        selector: "",
        properties: { "text-shadow": config.textShadows[named[1]] },
      },
    ];

  const customVar = utility.match(/^text-shadow-\((--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "text-shadow": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^text-shadow-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "text-shadow": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};

export const resolveTextShadowColor = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const colorVar = utility.match(/^text-shadow-\(color:(--[^)]+)\)$/);
  if (colorVar)
    return [
      {
        selector: "",
        properties: { "--shadow-color": `var(${colorVar[1]})` },
      },
    ];

  const named = utility.match(/^text-shadow-(.+)$/);
  if (!named) return null;

  const resolved = resolveColor(named[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { "--shadow-color": resolved } }];
};
