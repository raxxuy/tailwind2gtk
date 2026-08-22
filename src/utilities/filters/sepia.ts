import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveSepiaValue = (utility: string): string | null => {
  if (utility === "sepia") return "sepia(100%)";

  const match = utility.match(/^sepia-(.*)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });

  return `sepia(${resolved})`;
};

export const resolveSepia = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveSepiaValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-sepia": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
