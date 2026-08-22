import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveHueRotateValue = (utility: string): string | null => {
  const match = utility.match(/^(-?)hue-rotate-(.*)$/);
  if (!match) return null;

  const [, negative, value] = match;

  const resolved = resolveNumber(`${negative}${value}`, {
    fraction: false,
    px: false,
    spacing: false,
    unit: "deg",
  });

  return `hue-rotate(${resolved})`;
};

export const resolveHueRotate = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveHueRotateValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-hue-rotate": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
