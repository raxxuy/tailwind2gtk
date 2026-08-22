import { resolveNumber } from "@/resolvers/number";
import { resolveSidedProperty } from "@/resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "@/types";

const SKEW_PROPERTY_MAP = {
  skew: ["--tw-skew-x", "--tw-skew-y"],
  "skew-x": ["--tw-skew-x"],
  "skew-y": ["--tw-skew-y"],
} as const satisfies Record<string, string[]>;

export const resolveSkew = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const properties = resolveSidedProperty({
    utility,
    sideMap: SKEW_PROPERTY_MAP,
    resolveValue: (v) =>
      resolveNumber(v, {
        fraction: false,
        px: false,
        spacing: false,
        unit: "deg",
      }),
    allowNegative: true,
    formatProperty: (prop, value) =>
      prop === "--tw-skew-x" ? `skewX(${value})` : `skewY(${value})`,
  });

  return properties
    ? {
        properties: {
          ...properties,
          transform:
            "var(--tw-translate-x,) var(--tw-translate-y,) var(--tw-scale-x,) var(--tw-scale-y,) var(--tw-rotate,) var(--tw-skew-x,) var(--tw-skew-y,)",
        },
      }
    : null;
};
