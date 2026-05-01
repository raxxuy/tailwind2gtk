import { escapeClassName } from "../escape";
import { gradientVars } from "../helpers/gradientVars";
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
  const vars = [
    `  --spacing: ${config.spacing};`,
    ...Object.entries(config.colors).map(
      ([key, value]) => `  --color-${key}: ${value};`,
    ),
    ...Object.entries(config.containerSizes).map(
      ([key, value]) => `  --container-${key}: ${value};`,
    ),
    ...Object.entries(config.fontFamilies).map(
      ([key, value]) => `  --font-${key}: ${value.join(", ")};`,
    ),
    ...Object.entries(config.fontSizes).flatMap(([key, [size, lineHeight]]) => [
      `  --text-${key}: ${size};`,
      `  --text-${key}--line-height: ${lineHeight};`,
    ]),
    ...Object.entries(config.letterSpacings).map(
      ([key, value]) => `  --tracking-${key}: ${value};`,
    ),
    `  ${gradientVars.from}: initial;`,
    `  ${gradientVars.fromPosition}: 0%;`,
    `  ${gradientVars.via}: initial;`,
    `  ${gradientVars.viaPosition}: 50%;`,
    `  ${gradientVars.to}: initial;`,
    `  ${gradientVars.toPosition}: 100%;`,
    `  ${gradientVars.stops}: initial;`,
  ].join("\n");

  return `:root {\n${vars}\n}`;
};
