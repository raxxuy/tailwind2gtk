import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig, StyleRule, UtilityResolverProps } from "@/types";

const resolveFontFamilyValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  const match = utility.match(/^font-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.font,
    formatVar: (v) => `var(--font-${v})`,
    extra: "family-name",
  });
};

export const resolveFontFamily = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontFamilyValue(utility, config);
  if (!value) return null;

  return { properties: { "font-family": value } };
};
