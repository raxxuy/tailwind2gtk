import { resolveNumber } from "../../resolvers/number";
import { resolveSidedProperty } from "../../resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "../../types";

const SCALE_PROPERTY_MAP = {
  scale: ["--tw-scale-x", "--tw-scale-y"],
  "scale-x": ["--tw-scale-x"],
  "scale-y": ["--tw-scale-y"],
} as const satisfies Record<string, string[]>;

export const resolveScale = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility === "scale-none") {
    return {
      properties: {
        "--tw-scale-x": "",
        "--tw-scale-y": "",
        transform:
          "var(--tw-translate-x,) var(--tw-translate-y,) var(--tw-scale-x,) var(--tw-scale-y,) var(--tw-rotate,) var(--tw-skew-x,) var(--tw-skew-y,)",
      },
    };
  }

  const properties = resolveSidedProperty({
    utility,
    sideMap: SCALE_PROPERTY_MAP,
    resolveValue: (v) =>
      resolveNumber(v, {
        fraction: false,
        px: false,
        spacing: false,
        unit: " / 100",
      }),
    allowNegative: true,
    formatProperty: (prop, value) =>
      prop === "--tw-scale-x"
        ? `scaleX(calc(${value}))`
        : `scaleY(calc(${value}))`,
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
