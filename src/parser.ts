import { mediaQueries } from "./data/mediaQueries";
import type { ParsedClass, Variant } from "./types";

const splitVariants = (cls: string): string[] => {
  const parts: string[] = [];
  let depth = 0;
  let current = "";

  for (const char of cls) {
    if (char === "[" || char === "(") depth++;
    else if (char === "]" || char === ")") depth--;
    else if (char === ":" && depth === 0) {
      parts.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  return [...parts, current];
};

const classifyVariant = (value: string): Variant => {
  if (value.startsWith("[") && value.endsWith("]"))
    return { kind: "arbitrary", value };

  if (value in mediaQueries)
    return { kind: "media", query: mediaQueries[value] };

  return { kind: "pseudo", value };
};

export const parseClass = (cls: string): ParsedClass => {
  const parts = splitVariants(cls);
  const utility = parts.at(-1) ?? "";
  const variantParts = parts.slice(0, -1);

  const variants: Variant[] = variantParts.map(classifyVariant);

  return { raw: cls, variants, utility };
};
