import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig, StyleRule, UtilityResolverProps } from "@/types";

const resolveTransitionTimingFunctionValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "ease-linear") return "linear";
  if (utility === "ease-initial") return "initial";

  const match = utility.match(/^ease-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.ease,
    formatVar: (v) => `var(--ease-${v})`,
  });
};

export const resolveTransitionTimingFunction = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveTransitionTimingFunctionValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-ease": value,
      "transition-timing-function": value,
    },
  };
};
