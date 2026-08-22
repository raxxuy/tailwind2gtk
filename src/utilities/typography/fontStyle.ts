import type { StyleRule, UtilityResolverProps } from "@/types";

export const resolveFontStyle = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility === "italic") {
    return {
      properties: { "font-style": "italic" },
    };
  }

  if (utility === "not-italic") {
    return {
      properties: { "font-style": "normal" },
    };
  }

  return null;
};
