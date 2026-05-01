import type { CSSRule, ResolvedConfig } from "../../types";

const lines: Record<string, string> = {
  underline: "underline",
  overline: "overline",
  "line-through": "line-through",
  "no-underline": "none",
};

export const resolveTextDecorationLine = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility in lines)
    return [
      {
        selector: "",
        properties: { "text-decoration-line": lines[utility] },
      },
    ];

  return null;
};
