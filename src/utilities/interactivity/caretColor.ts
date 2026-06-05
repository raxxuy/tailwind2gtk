import { resolveColor } from "../../helpers/resolveColor";
import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveCaretColor = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const match = utility.match(/^caret-(.+)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config);
  if (!resolved) return null;

  return [{ selector: "", properties: { color: resolved } }];
};
