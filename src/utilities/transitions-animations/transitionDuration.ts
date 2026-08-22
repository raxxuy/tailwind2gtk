import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveTransitionDurationValue = (utility: string): string | null => {
  if (utility === "duration-initial") return "initial";

  const match = utility.match(/^duration-(.*)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    spacing: false,
    px: false,
    unit: "ms",
  });
};

export const resolveTransitionDuration = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransitionDurationValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-duration": value,
      ...(value === "initial" ? { "transition-duration": value } : {}),
    },
  };
};
