import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types";

const resolveTransitionDelayValue = (utility: string): string | null => {
  const match = utility.match(/^delay-(.*)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    spacing: false,
    px: false,
    unit: "ms",
  });
};

export const resolveTransitionDelay = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransitionDelayValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-delay": value,
      ...(value === "initial" ? { "transition-delay": value } : {}),
    },
  };
};
