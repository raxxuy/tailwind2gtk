import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveInvertValue = (utility: string): string | null => {
  if (utility === "invert") return "invert(100%)";

  const match = utility.match(/^invert-(.*)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });

  return `invert(${resolved})`;
};

export const resolveInvert = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveInvertValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-invert": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
