import { compileClass } from "../compiler/compile";
import { serializeRule } from "../compiler/serialize";
import type { ApplyRule, ResolvedConfig, StyleRule } from "../types";

const compileApplyNode = (
  selector: string,
  node: ApplyRule,
  config: ResolvedConfig,
): StyleRule => {
  const rules = node.classes
    .map((c) => compileClass(c, config))
    .filter((r): r is StyleRule => r !== null);

  const ownProperties = Object.assign({}, ...rules.map((r) => r.properties));
  const inheritedChildren = rules.flatMap((r) => r.children ?? []);

  const nestedChildren = Object.entries(node.children).map(
    ([childSelector, childNode]) =>
      compileApplyNode(childSelector, childNode, config),
  );

  return {
    selector,
    properties: ownProperties,
    children: [...inheritedChildren, ...nestedChildren],
  };
};

export const generateApply = (config: ResolvedConfig): string =>
  Object.entries(config.extra.apply)
    .map(([selector, node]) =>
      serializeRule(compileApplyNode(`.${selector}`, node, config)),
    )
    .join("\n");
