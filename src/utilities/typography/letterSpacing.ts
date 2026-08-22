import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig, StyleRule, UtilityResolverProps } from "@/types";

const resolveLetterSpacingValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  const match = utility.match(/^tracking-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.tracking,
    formatVar: (v) => `var(--tracking-${v})`,
  });
};

export const resolveLetterSpacing = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveLetterSpacingValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "letter-spacing": value,
    },
  };
};
