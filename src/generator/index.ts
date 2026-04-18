import type { TailwindConfig, UtilityResult } from "../core";
import * as backgrounds from "./backgrounds";
import * as borders from "./borders";
import { COLORS } from "./colors";
import { CSS_VARIABLES, NUMERIC_VARIABLES } from "./constants";
import * as effects from "./effects";
import * as filters from "./filters";
import { KEYFRAMES } from "./keyframes";
import * as sizing from "./sizing";
import * as spacing from "./spacing";
import * as transforms from "./transforms";
import * as transitions from "./transitions";
import * as typography from "./typography";

const cache: Record<string, UtilityResult> = {};
let customColors: Record<string, string> = {};
let customVariables: Record<string, string> = {};

const generators = [
  ...Object.values(spacing),
  ...Object.values(sizing),
  ...Object.values(typography),
  ...Object.values(backgrounds),
  ...Object.values(borders),
  ...Object.values(effects),
  ...Object.values(filters),
  ...Object.values(transforms),
  ...Object.values(transitions),
];

export const initConfig = (config: TailwindConfig) => {
  customColors = config.theme?.colors ?? {};
  customVariables = config.theme?.variables ?? {};
};

const splitPrefix = (className: string): string => {
  let depth = 0;
  let lastColon = -1;

  for (let i = 0; i < className.length; i++) {
    const char = className[i];
    if (char === "[" || char === "(") depth++;
    else if (char === "]" || char === ")") depth--;
    else if (char === ":" && depth === 0) lastColon = i;
  }

  return lastColon === -1 ? className : className.slice(lastColon + 1);
};

const generate = (className: string): UtilityResult | null => {
  const cls = splitPrefix(className);
  const important = cls.endsWith("!");
  const baseCls = important ? cls.slice(0, -1) : cls;

  for (const generator of generators) {
    const result = generator(baseCls);
    if (result) return result;
  }

  return null;
};

export const generateRoot = (): string => {
  const lines: string[] = [
    ":root {",
    `  --spacing: ${NUMERIC_VARIABLES.spacing}rem;`,
  ];

  for (const [k, v] of Object.entries(NUMERIC_VARIABLES)) {
    if (k === "spacing") continue;
    const unit = k.startsWith("tracking-") ? "em" : "rem";
    lines.push(`  --${k}: ${v}${unit};`);
  }

  for (const [k, v] of Object.entries(CSS_VARIABLES)) {
    lines.push(`  --${k}: ${v};`);
  }

  for (const [k, v] of Object.entries(COLORS)) {
    lines.push(`  --color-${k}: ${v};`);
  }

  for (const [k, v] of Object.entries(customColors)) {
    lines.push(`  --color-${k}: ${v};`);
  }

  for (const [k, v] of Object.entries(customVariables)) {
    lines.push(`  --${k}: ${v};`);
  }

  lines.push("}");

  for (const keyframe of Object.values(KEYFRAMES)) {
    lines.push(keyframe);
  }

  return lines.join("\n");
};

export const getCustomColors = (): Record<string, string> => customColors;

export const getUtility = (className: string): UtilityResult | null => {
  if (cache[className]) return cache[className];
  const generated = generate(className);
  if (generated) cache[className] = generated;
  return generated;
};

export const clearCache = () => {
  Object.keys(cache).forEach((key) => {
    delete cache[key];
  });
};
