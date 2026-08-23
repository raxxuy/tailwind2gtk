import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveGrayscaleValue = (utility: string): string | null => {
  if (utility === "grayscale") return "grayscale(100%)";

  const match = utility.match(/^grayscale-(.*)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });

  return `grayscale(${resolved})`;
};

export const resolveGrayscale = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveGrayscaleValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-grayscale": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
