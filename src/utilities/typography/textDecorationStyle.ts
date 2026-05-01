import type { CSSRule, ResolvedConfig } from "../../types";

const styles: Record<string, string> = {
  solid: "solid",
  double: "double",
  dotted: "dotted",
  dashed: "dashed",
  wavy: "wavy",
};

export const resolveTextDecorationStyle = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const named = utility.match(/^decoration-([\w-]+)$/);
  if (named && named[1] in styles)
    return [
      {
        selector: "",
        properties: { "text-decoration-style": styles[named[1]] },
      },
    ];

  return null;
};
