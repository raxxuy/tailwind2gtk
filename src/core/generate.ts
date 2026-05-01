import { escapeClassName } from "../escape";
import { parseClass } from "../parser";
import type { ResolvedConfig } from "../types";
import { applyVariants } from "../variants";
import { resolveUtility } from "./resolve";
import { serializeRules } from "./serialize";

export const generateCSS = (classes: string[]): Record<string, string> =>
  Object.fromEntries(
    classes.flatMap((cls) => {
      const parsed = parseClass(cls);
      const rules = resolveUtility(parsed.utility);
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
  const containerVars = Object.entries(config.containerSizes)
    .map(([key, value]) => `  --container-${key}: ${value};`)
    .join("\n");

  return `:root {\n  --spacing: ${config.spacing}rem;\n${containerVars}\n}`;
};
