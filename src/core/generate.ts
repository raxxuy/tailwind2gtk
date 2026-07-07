import { escapeClassName } from "../escape";
import { gradientVars } from "../helpers/gradientVars";
import { parseClass } from "../parser";
import type { StyleRule, ResolvedConfig } from "../types";
import { applyVariants } from "../variants";
import { resolveUtility } from "./resolve";
import { serializeRules } from "./serialize";

const pseudoPriority: Record<string, number> = {
  "first-child": 0,
  "last-child": 1,
  hover: 2,
  focus: 3,
  active: 4,
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

const resolveClassToCSS = (
  cls: string,
  escapedSelector: string,
  config: ResolvedConfig,
): {
  selector: string;
  properties: Record<string, string>;
  children: StyleRule[];
  mediaQuery?: string;
} | null => {
  const parsed = parseClass(cls);
  const rules = resolveUtility(parsed.utility, config);
  if (!rules) return null;

  const withSelector = rules.map((rule) => ({
    ...rule,
    selector: escapedSelector,
  }));
  const { rules: finalRules, mediaQuery } = applyVariants(
    parsed.variants,
    withSelector,
  );

  const properties: Record<string, string> = {};
  const children: StyleRule[] = [];
  finalRules.forEach((rule) => {
    Object.assign(properties, rule.properties);
    if (rule.children) children.push(...rule.children);
  });

  return {
    selector: finalRules[0]?.selector ?? escapedSelector,
    properties,
    children,
    mediaQuery,
  };
};

const getPseudoPriority = (selector: string): number => {
  const match = selector.match(/:([a-z-]+)$/);
  return match ? (pseudoPriority[match[1]] ?? 0) : -1;
};

export const generateCSS = (
  classes: string[],
  config: ResolvedConfig,
): Record<string, string> => {
  const result = new Map<string, string>();

  [...classes]
    .sort((a, b) => getClassPriority(a) - getClassPriority(b))
    .forEach((cls) => {
      const escapedSelector = `.${escapeClassName(cls)}`;
      const expanded = config.apply?.[cls]
        ? (Array.isArray(config.apply[cls]) ? config.apply[cls] : [config.apply[cls] as string])
            .flatMap((c) => c.split(/\s+/))
        : [cls];

      const byMedia = new Map<
        string,
        {
          selector: string;
          properties: Record<string, string>;
          children: StyleRule[];
          mediaQuery?: string;
        }
      >();

      expanded.forEach((expandedCls) => {
        const resolved = resolveClassToCSS(
          expandedCls,
          escapedSelector,
          config,
        );
        if (!resolved) return;
        const key = `${resolved.mediaQuery ?? ""}||${resolved.selector}`;
        if (!byMedia.has(key))
          byMedia.set(key, { ...resolved, properties: {}, children: [] });
        const bucket = byMedia.get(key) as StyleRule;
        Object.assign(bucket.properties, resolved.properties);
        bucket.children.push(...resolved.children);
      });

      const parts = [...byMedia.values()]
        .sort(
          (a, b) =>
            getPseudoPriority(a.selector) - getPseudoPriority(b.selector),
        )
        .map(({ selector, properties, children, mediaQuery }) =>
          serializeRules(
            [
              {
                selector,
                properties,
                ...(children.length ? { children } : {}),
              },
            ],
            mediaQuery,
          ),
        );

      if (parts.length) result.set(cls, parts.join("\n"));
    });

  return Object.fromEntries(result);
};

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
    ...Object.entries(config.dropShadows).map(
      ([key, value]) => `  --drop-shadow-${key}: ${value};`,
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
    ...Object.entries(config.blurSizes).map(
      ([key, value]) => `  --blur-${key}: ${value};`,
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
    `  --rotate: rotate(0deg);`,
    `  --rotate-x: rotateX(0deg);`,
    `  --rotate-y: rotateY(0deg);`,
    `  --rotate-z: rotateZ(0deg);`,
    `  --scale-x: scaleX(1);`,
    `  --scale-y: scaleY(1);`,
    `  --scale-z: scaleZ(1);`,
    `  --skew-x: skewX(0deg);`,
    `  --skew-y: skewY(0deg);`,
    `  --translate-x: translateX(0);`,
    `  --translate-y: translateY(0);`,
    `  --translate-z: translateZ(0);`,
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

export const generateTheme = (
  config: ResolvedConfig,
  resolveVars?: Record<string, string>,
): string => {
  const resolve = (value: string): string => {
    if (!resolveVars) return value;
    const match = value.match(/^var\(--([\w_-]+)\)$/);
    if (!match) return value;
    return resolveVars[`--${match[1]}`] ?? value;
  };

  const vars = [
    ...Object.entries(config.colors).map(
      ([key, value]) => `  --color-${key}: ${resolve(value)};`,
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
    ...Object.entries(config.dropShadows).map(
      ([key, value]) => `  --drop-shadow-${key}: ${value};`,
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
    ...Object.entries(config.blurSizes).map(
      ([key, value]) => `  --blur-${key}: ${value};`,
    ),
    `  --spacing: ${config.spacing};`,
  ].join("\n");

  return `@import "tailwindcss";\n\n@theme {\n${vars}\n}\n`;
};
