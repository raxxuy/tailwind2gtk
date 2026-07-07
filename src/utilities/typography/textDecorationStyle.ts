import type { StyleRule, ResolvedConfig } from "../../types";

const styles = ["solid", "double", "dotted", "dashed", "wavy"];

export const resolveTextDecorationStyle = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const style = utility.match(/^decoration-([\w-]+)$/);
  if (style && styles.includes(style[1]))
    return [
      {
        selector: "",
        properties: { "text-decoration-style": style[1] },
      },
    ];

  return null;
};
