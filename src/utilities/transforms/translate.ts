import { resolveNumber } from "@/resolvers/number";
import { resolveSidedProperty } from "@/resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "@/types";

const TRANSLATE_PROPERTY_MAP = {
  translate: ["--tw-translate-x", "--tw-translate-y"],
  "translate-x": ["--tw-translate-x"],
  "translate-y": ["--tw-translate-y"],
} as const satisfies Record<string, string[]>;

export const resolveTranslate = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility === "translate-none") {
    return {
      properties: {
        "--tw-translate-x": "",
        "--tw-translate-y": "",
        transform:
          "var(--tw-translate-x,) var(--tw-translate-y,) var(--tw-scale-x,) var(--tw-scale-y,) var(--tw-rotate,) var(--tw-skew-x,) var(--tw-skew-y,)",
      },
    };
  }

  const properties = resolveSidedProperty({
    utility,
    sideMap: TRANSLATE_PROPERTY_MAP,
    resolveValue: (v) =>
      resolveNumber(v, {
        fraction: false,
      }),
    allowNegative: true,
    formatProperty: (prop, value) =>
      prop === "--tw-translate-x"
        ? `translateX(${value})`
        : `translateY(${value})`,
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
