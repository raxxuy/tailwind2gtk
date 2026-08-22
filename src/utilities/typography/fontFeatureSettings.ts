import { resolveToken } from "@/resolvers/token";
import type { StyleRule, UtilityResolverProps } from "@/types";

const resolveFontFeatureSettingsValue = (utility: string): string | null => {
  const match = utility.match(/^font-features-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
  });
};

export const resolveFontFeatureSettings = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveFontFeatureSettingsValue(utility);
  if (!value) return null;

  return {
    properties: {
      "font-feature-settings": value,
    },
  };
};
