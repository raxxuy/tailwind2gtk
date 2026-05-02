import { escapeClassName } from "../escape";
import { gradientVars } from "../helpers/gradientVars";
import { parseClass } from "../parser";
import type { ResolvedConfig } from "../types";
import { applyVariants } from "../variants";
import { resolveUtility } from "./resolve";
import { serializeRules } from "./serialize";

const pseudoPriority: Record<string, number> = {
  "first-child": 0,
  "last-child": 1,
  hover: 2,
  active: 3,
  focus: 4,
  "focus-within": 5,
  "focus-visible": 6,
  checked: 7,
  selected: 8,
  disabled: 9,
};

const getClassPriority = (cls: string): number => {
  const parsed = parseClass(cls);
  const pseudo = parsed.variants.find((v) => v.kind === "pseudo");
  if (!pseudo) return -1;
  return pseudoPriority[pseudo.value] ?? 0;
};

export const generateCSS = (
  classes: string[],
  config: ResolvedConfig,
): Record<string, string> =>
  Object.fromEntries(
    [...classes]
      .sort((a, b) => getClassPriority(a) - getClassPriority(b))
      .flatMap((cls) => {
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
    ...Object.entries(config.colors).map(
      ([key, value]) => `  --color-${key}: ${value};`,
    ),
    ...Object.entries(config.fontFamilies).map(
      ([key, value]) => `  --font-${key}: ${value.join(", ")};`,
    ),
    ...Object.entries(config.containerSizes).map(
      ([key, value]) => `  --container-${key}: ${value};`,
    ),
    ...Object.entries(config.borderRadii).map(
      ([key, value]) => `  --radius-${key}: ${value};`,
    ),
    ...Object.entries(config.fontSizes).flatMap(([key, [size, lineHeight]]) => [
      `  --text-${key}: ${size};`,
      `  --text-${key}--line-height: ${lineHeight};`,
    ]),
    ...Object.entries(config.letterSpacings).map(
      ([key, value]) => `  --tracking-${key}: ${value};`,
    ),
    ...Object.entries(config.boxShadows).map(
      ([key, value]) => `  --shadow-${key}: ${value};`,
    ),
    ...Object.entries(config.insetBoxShadows).map(
      ([key, value]) => `  --inset-shadow-${key}: ${value};`,
    ),
    ...Object.entries(config.textShadows).map(
      ([key, value]) => `  --text-shadow-${key}: ${value};`,
    ),
    ...Object.entries(config.transitionTimingFunctions).map(
      ([key, value]) => `  --ease-${key}: ${value};`,
    ),
    ...Object.entries(config.animations).map(
      ([key, value]) => `  --animate-${key}: ${value};`,
    ),
    `  --spacing: ${config.spacing};`,
    `  ${gradientVars.from}: initial;`,
    `  ${gradientVars.fromPosition}: 0%;`,
    `  ${gradientVars.via}: initial;`,
    `  ${gradientVars.viaPosition}: 50%;`,
    `  ${gradientVars.to}: initial;`,
    `  ${gradientVars.toPosition}: 100%;`,
    `  ${gradientVars.stops}: initial;`,
    `  --default-transition-duration: 150ms;`,
    `  --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);`,
  ].join("\n");

  const keyframes = Object.entries(config.keyframes)
    .map(([name, frames]) => {
      const frameBlocks = Object.entries(frames)
        .map(([selector, properties]) => {
          const props = Object.entries(properties)
            .map(([prop, value]) => `    ${prop}: ${value};`)
            .join("\n");
          return `  ${selector} {\n${props}\n  }`;
        })
        .join("\n");
      return `@keyframes ${name} {\n${frameBlocks}\n}`;
    })
    .join("\n");

  return `:root {\n${vars}\n}\n${keyframes}`;
};
