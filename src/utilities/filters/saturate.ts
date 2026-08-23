import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveSaturateValue = (utility: string): string | null => {
  const match = utility.match(/^saturate-(.*)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });

  return `saturate(${resolved})`;
};

export const resolveSaturate = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveSaturateValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-saturate": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
