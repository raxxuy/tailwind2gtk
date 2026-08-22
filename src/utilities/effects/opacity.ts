import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveOpacityValue = (utility: string): string | null => {
  const match = utility.match(/^opacity-(.*)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "%",
  });
};

export const resolveOpacity = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveOpacityValue(utility);
  if (!value) return null;

  return {
    properties: {
      opacity: value,
    },
  };
};
