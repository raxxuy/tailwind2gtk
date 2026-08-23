import type { StyleRule, UtilityResolverProps } from "../../types";

const BLEND_MODE_SET = new Set([
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
]);

export const resolveBackgroundBlendMode = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^bg-blend-(.*)$/);
  if (!match) return null;

  const [, value] = match;

  if (BLEND_MODE_SET.has(value)) {
    return {
      properties: {
        "background-blend-mode": value,
      },
    };
  }

  return null;
};
