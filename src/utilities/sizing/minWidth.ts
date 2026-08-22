import { resolveNumber } from "@/resolvers/number";
import type { ResolvedConfig } from "@/types";
import type { StyleRule, UtilityResolverProps } from "@/types/core";

const resolveMinWidthValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  const match = utility.match(/^min-w-(.+)$/);
  if (!match) return null;

  const [, value] = match;

  if (value in config.container) return `var(--container-${value})`;

  return resolveNumber(value, { fraction: false });
};

export const resolveMinWidth = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveMinWidthValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "min-width": value,
    },
  };
};
