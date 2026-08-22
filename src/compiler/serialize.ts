import type { StyleRule } from "../types/core";

const serializeProperties = (
  properties: Record<string, string>,
  padding: number,
): string => {
  const indent = "  ".repeat(padding);

  return Object.entries(properties)
    .map(([prop, value]) => `${indent}${prop}: ${value};`)
    .join("\n");
};

export const serializeRule = (rule: StyleRule, padding = 0): string => {
  const indent = "  ".repeat(padding);
  const blocks: string[] = [];
  const hasSelector = !!rule.selector;

  if (hasSelector) blocks.push(`${indent}${rule.selector} {`);

  if (Object.keys(rule.properties).length) {
    blocks.push(
      serializeProperties(rule.properties, hasSelector ? padding + 1 : padding),
    );
  }

  if (rule.children) {
    for (const child of rule.children) {
      blocks.push(serializeRule(child, hasSelector ? padding + 1 : padding));
    }
  }

  if (hasSelector) blocks.push(`${indent}}`);

  return blocks.join("\n");
};
