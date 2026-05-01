import { resolveValue } from "../../helpers/resolveValue";
import type { CSSRule, ResolvedConfig } from "../../types";

export const resolveMinWidth = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const match = utility.match(/^min-w-(.+)$/);
  if (!match) return null;

  const [, value] = match;

  if (value in config.containerSizes)
    return [
      {
        selector: "",
        properties: { "min-width": `var(--container-${value})` },
      },
    ];

  const resolved = resolveValue(value);
  if (!resolved) return null;

  return [{ selector: "", properties: { "min-width": resolved } }];
};
