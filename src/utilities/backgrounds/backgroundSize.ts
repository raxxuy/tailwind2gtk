import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveBackgroundSizeValue = (utility: string): string | null => {
  if (utility === "bg-auto") return "auto";
  if (utility === "bg-cover") return "cover";
  if (utility === "bg-contain") return "contain";

  const match = utility.match(/^bg-size-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
  });
};

export const resolveBackgroundSize = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBackgroundSizeValue(utility);
  if (!value) return null;

  return {
    properties: {
      "background-size": value,
    },
  };
};
