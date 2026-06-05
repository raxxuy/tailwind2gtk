import type { CSSRule, ResolvedConfig } from "../../types";

const modes = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export const resolveBackgroundBlendMode = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const mode = utility.match(/^bg-blend-([\w-]+)$/);
  if (mode && modes.includes(mode[1]))
    return [
      {
        selector: "",
        properties: { "background-blend-mode": mode[1] },
      },
    ];

  return null;
};
