import { resolveNumber } from "@/resolvers/number";
import type { StyleRule, UtilityResolverProps } from "@/types";

export const resolveOutlineOffset = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^(-?)outline-offset-(.*)$/);
  if (!match) return null;

  const [, negative, value] = match;

  const resolved = resolveNumber(`${negative}${value}`, {
    fraction: false,
    spacing: false,
    px: false,
  });
  if (!resolved) return null;

  return {
    properties: {
      "outline-offset": resolved,
    },
  };
};
