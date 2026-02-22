import { generateAnimation } from "./animation";
import { generateBorder } from "./border";
import { generateColor } from "./color";
import { generateFilter } from "./filter";
import { generateOpacity } from "./opacity";
import { generateOutline } from "./outline";
import { generateRounded } from "./rounded";
import { generateShadow } from "./shadow";
import { generateSpacing } from "./spacing";
import { generateTransition } from "./transition";
import { generateTypography } from "./typography";

type UtilityMap = Record<string, string[]>;

const cache: UtilityMap = {};

const generators = [
  generateSpacing,
  generateRounded,
  generateBorder,
  generateTypography,
  generateColor,
  generateOutline,
  generateOpacity,
  generateFilter,
  generateShadow,
  generateAnimation,
  generateTransition,
];

const parseStates = (className: string): [string[], string] => {
  const parts = className.split(":");
  return [parts.slice(0, -1), parts[parts.length - 1]];
};

const wrapWithStates = (properties: string[], states: string[]): string[] => {
  if (states.length === 0) return properties;

  const mediaStates = states.filter((s) => s === "dark" || s === "light");
  const pseudoStates = states.filter((s) => s !== "dark" && s !== "light");

  let result = properties;

  if (pseudoStates.length > 0) {
    const selector = `&:${pseudoStates.join(":")}`;
    result = [`${selector} {`, ...result.map((p) => `  ${p}`), `}`];
  }

  for (const media of mediaStates) {
    result = [
      `@media (prefers-color-scheme: ${media}) {`,
      ...result.map((p) => `  ${p}`),
      `}`,
    ];
  }

  return result;
};

const generate = (className: string): string[] | null => {
  const [states, cls] = parseStates(className);

  const important = cls.endsWith("!");
  const baseCls = important ? cls.slice(0, -1) : cls;

  for (const generator of generators) {
    const result = generator(baseCls);
    if (result) {
      const declarations = important
        ? result.map((p) => p.replace(/;?\s*$/, " !important"))
        : result;
      return wrapWithStates(declarations, states);
    }
  }

  return null;
};

export const getUtility = (className: string): string[] | null => {
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
