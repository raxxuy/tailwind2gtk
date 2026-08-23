import type { StyleRule, UtilityResolverProps } from "../../types";

const DECORATION_LINE_MAP: Record<string, string> = {
  "no-underline": "none",
  underline: "underline",
  "line-through": "line-through",
  overline: "overline",
} as const;

export const resolveTextDecorationLine = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility in DECORATION_LINE_MAP) {
    return {
      properties: {
        "text-decoration-line": DECORATION_LINE_MAP[utility],
      },
    };
  }

  return null;
};
