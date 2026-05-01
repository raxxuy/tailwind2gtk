import type { CSSRule } from "../types";

const serializeProperties = (properties: Record<string, string>): string =>
  Object.entries(properties)
    .map(([prop, value]) => `  ${prop}: ${value};`)
    .join("\n");

const serializeRule = (rule: CSSRule): string => {
  const blocks: string[] = [];

  if (Object.keys(rule.properties).length > 0)
    blocks.push(
      `${rule.selector} {\n${serializeProperties(rule.properties)}\n}`,
    );

  if (rule.children)
    blocks.push(
      ...rule.children.map((child) =>
        serializeRule({
          ...child,
          selector: child.selector.replace("&", rule.selector),
        }),
      ),
    );

  return blocks.join("\n");
};

export const serializeRules = (
  rules: CSSRule[],
  mediaQuery?: string,
): string => {
  const css = rules.map(serializeRule).join("\n");

  if (!mediaQuery) return css;

  return `${mediaQuery} {\n${css
    .split("\n")
    .map((l) => `  ${l}`)
    .join("\n")}\n}`;
};
