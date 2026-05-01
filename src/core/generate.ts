import { escapeClassName } from "../escape";
import { parseClass } from "../parser";
import type { ResolvedConfig } from "../types";
import { applyVariants } from "../variants";
import { resolveUtility } from "./resolve";
import { serializeRules } from "./serialize";

export const generateCSS = (
  classes: string[],
  config: ResolvedConfig,
): Record<string, string> =>
  Object.fromEntries(
    classes.flatMap((cls) => {
      const parsed = parseClass(cls);
      const rules = resolveUtility(parsed.utility, config);
      if (!rules) return [];

      const escapedSelector = `.${escapeClassName(cls)}`;
      const withSelector = rules.map((rule) => ({
        ...rule,
        selector: escapedSelector,
      }));
      const { rules: finalRules, mediaQuery } = applyVariants(
        parsed.variants,
        withSelector,
      );

      return [[cls, serializeRules(finalRules, mediaQuery)]];
    }),
  );

export const generateRoot = (config: ResolvedConfig): string => {
  const colorVars = Object.entries(config.colors)
    .map(([key, value]) => `  --color-${key}: ${value};`)
    .join("\n");

  const containerVars = Object.entries(config.containerSizes)
    .map(([key, value]) => `  --container-${key}: ${value};`)
    .join("\n");

  const fontFamilyVars = Object.entries(config.fontFamilies)
    .map(([key, value]) => `  --font-${key}: ${value.join(", ")};`)
    .join("\n");

  const fontSizeVars = Object.entries(config.fontSizes)
    .map(
      ([key, [size, lineHeight]]) =>
        `  --text-${key}: ${size};\n  --text-${key}--line-height: ${lineHeight};`,
    )
    .join("\n");

  const letterSpacingVars = Object.entries(config.letterSpacings)
    .map(([key, value]) => `  --tracking-${key}: ${value};`)
    .join("\n");

  return `:root {\n  --spacing: ${config.spacing};\n${colorVars}\n${containerVars}\n${fontFamilyVars}\n${fontSizeVars}\n${letterSpacingVars}\n}`;
};
