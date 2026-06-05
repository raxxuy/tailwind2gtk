import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveFontStyle = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "italic")
    return [{ selector: "", properties: { "font-style": "italic" } }];
  if (utility === "not-italic")
    return [{ selector: "", properties: { "font-style": "normal" } }];

  return null;
};
