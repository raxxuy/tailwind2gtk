import type { StyleRule, UtilityResolverProps } from "../../types";

const STYLE_SET = new Set(["solid", "dashed", "dotted", "double", "none"]);

export const resolveOutlineStyle = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  if (utility === "outline-hidden") {
    return {
      properties: {
        "--tw-outline-style": "none",
        "outline-style": "none",
        "outline-width": "2px solid transparent",
        "outline-offset": "2px",
      },
    };
  }

  const match = utility.match(/^outline-(.+)$/);
  if (!match) return null;

  if (STYLE_SET.has(match[1])) {
    return {
      properties: {
        "--tw-outline-style": "none",
        "outline-style": match[1],
      },
    };
  }

  return null;
};
