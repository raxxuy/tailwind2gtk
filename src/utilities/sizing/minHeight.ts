import { resolveNumber } from "../../resolvers/number";
import type { StyleRule, UtilityResolverProps } from "../../types/core";

export const resolveMinHeight = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^min-h-(.+)$/);
  if (!match) return null;

  const resolved = resolveNumber(match[1], { fraction: false });
  if (!resolved) return null;

  return {
    properties: { "min-height": resolved },
  };
};
