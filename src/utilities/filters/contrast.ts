import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveContrastValue = (utility: string): string | null => {
  const match = utility.match(/^contrast-(.*)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });

  return `contrast(${resolved})`;
};

export const resolveContrast = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveContrastValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-contrast": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
