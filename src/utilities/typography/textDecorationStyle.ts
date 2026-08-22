import type { StyleRule, UtilityResolverProps } from "@/types";

const DECORATION_STYLE_SET = new Set([
  "solid",
  "double",
  "dotted",
  "dashed",
  "wavy",
]);

export const resolveTextDecorationStyle = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^decoration-(.*)$/);
  if (!match) return null;

  const [, value] = match;

  if (DECORATION_STYLE_SET.has(value)) {
    return {
      properties: {
        "text-decoration-style": value,
      },
    };
  }

  return null;
};
