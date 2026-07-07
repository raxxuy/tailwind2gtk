import { resolveValue } from "../../helpers/resolveValue";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolvePadding = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^(p|px|py|pt|pr|pb|pl)-(.+)$/);
  if (!match) return null;

  const [, prefix, value] = match;
  const resolved = resolveValue(value);
  if (!resolved) return null;

  const properties = (() => {
    switch (prefix) {
      case "p":
        return { padding: resolved };
      case "px":
        return { "padding-left": resolved, "padding-right": resolved };
      case "py":
        return { "padding-top": resolved, "padding-bottom": resolved };
      case "pt":
        return { "padding-top": resolved };
      case "pr":
        return { "padding-right": resolved };
      case "pb":
        return { "padding-bottom": resolved };
      case "pl":
        return { "padding-left": resolved };
      default:
        return {};
    }
  })() as Record<string, string>;

  return [{ selector: "", properties }];
};
