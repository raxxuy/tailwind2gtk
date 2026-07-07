import type { StyleRule, ResolvedConfig } from "../../types";

const origins: Record<string, string> = {
  "origin-center": "center",
  "origin-top": "top",
  "origin-top-right": "top right",
  "origin-right": "right",
  "origin-bottom-right": "bottom right",
  "origin-bottom": "bottom",
  "origin-bottom-left": "bottom left",
  "origin-left": "left",
  "origin-top-left": "top left",
};

export const resolveTransformOrigin = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility in origins)
    return [
      { selector: "", properties: { "transform-origin": origins[utility] } },
    ];

  const customVar = utility.match(/^origin-\((--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "transform-origin": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^origin-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "transform-origin": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  return null;
};
