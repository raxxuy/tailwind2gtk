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
  const selector = `&:${states.join(":")}`;
  return [`${selector} {`, ...properties.map((p) => `  ${p}`), `}`];
};

const generate = (className: string): string[] | null => {
  const [states, cls] = parseStates(className);

  for (const generator of generators) {
    const result = generator(cls);
    if (result) return wrapWithStates(result, states);
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
