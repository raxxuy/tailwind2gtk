import type { StyleRule, UtilityResolverProps } from "@/types";

const TRANSFORM_MAP = {
  "normal-case": "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
};

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
