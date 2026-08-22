import { resolveSidedProperty } from "@/resolvers/sided";
import { resolveToken } from "@/resolvers/token";
import type { ResolvedConfig } from "@/types";
import type { StyleRule, UtilityResolverProps } from "@/types/core";

const SIDES_PROPERTY_MAP: Record<string, string[]> = {
  rounded: ["border-radius"],
  "rounded-t": ["border-top-left-radius", "border-top-right-radius"],
  "rounded-r": ["border-top-right-radius", "border-bottom-right-radius"],
  "rounded-b": ["border-bottom-right-radius", "border-bottom-left-radius"],
  "rounded-l": ["border-top-left-radius", "border-bottom-left-radius"],
  "rounded-tl": ["border-top-left-radius"],
  "rounded-tr": ["border-top-right-radius"],
  "rounded-br": ["border-bottom-right-radius"],
  "rounded-bl": ["border-bottom-left-radius"],
} as const;

const resolveRadiusValue = (
  value: string,
  config: ResolvedConfig,
): string | null => {
  if (!value) return "0.25rem";
  if (value === "none") return "0";
  if (value === "full") return "9999px";
  return resolveToken({
    value,
    tokenMap: config.radius,
    formatVar: (v) => `var(--radius-${v})`,
  });
};

export const resolveBorderRadius = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const properties = resolveSidedProperty({
    utility,
    sideMap: SIDES_PROPERTY_MAP,
    resolveValue: (v) => resolveRadiusValue(v, config),
    allowBare: true,
  });
  return properties ? { properties } : null;
};
