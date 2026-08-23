import type { StyleRule, UtilityResolverProps } from "../../types";

const TRANSFORM_MAP: Record<string, string> = {
  "normal-case": "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
} as const;

export const resolveTextTransform = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility in TRANSFORM_MAP) {
    return {
      properties: {
        "text-transform": TRANSFORM_MAP[utility],
      },
    };
  }

  return null;
};
