import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveFilterValue = (utility: string): string | null => {
  if (utility === "filter-none") return "none";

  const match = utility.match(/^filter-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
  });
};

export const resolveFilter = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFilterValue(utility);
  if (!value) return null;

  return {
    properties: {
      filter: value,
    },
  };
};
