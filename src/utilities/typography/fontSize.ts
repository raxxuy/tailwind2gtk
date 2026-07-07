import { resolveValue } from "../../helpers/resolveValue";
import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveFontSize = (
  utility: string,
  config: ResolvedConfig,
): StyleRule[] | null => {
  const namedWithLineHeight = utility.match(/^text-([\w-]+)\/(.+)$/);
  if (namedWithLineHeight && namedWithLineHeight[1] in config.fontSizes) {
    const size = `var(--text-${namedWithLineHeight[1]})`;
    const lh = resolveValue(namedWithLineHeight[2]);
    if (lh)
      return [
        { selector: "", properties: { "font-size": size, "line-height": lh } },
      ];
  }

  const named = utility.match(/^text-(.+)$/);
  if (named && named[1] in config.fontSizes)
    return [
      {
        selector: "",
        properties: {
          "font-size": `var(--text-${named[1]})`,
          "line-height": `var(--text-${named[1]}--line-height)`,
        },
      },
    ];

  const customVar = utility.match(/^text-\(length:(--[^)]+)\)$/);
  if (customVar)
    return [
      { selector: "", properties: { "font-size": `var(${customVar[1]})` } },
    ];

  const arbitrary = utility.match(/^text-\[(.+)\]$/);
  if (arbitrary)
    return [{ selector: "", properties: { "font-size": arbitrary[1] } }];

  return null;
};
