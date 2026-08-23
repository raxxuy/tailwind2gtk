import type { ApplyRule, CSSVariable, KeyframeStep } from "../types/css";

const THEME_BLOCK_RE = /@theme\s*\{([^}]*)\}/g;
const VAR_DECL_RE = /(--[\w-]+)\s*:\s*([^;]+);/g;
const KEYFRAMES_RE =
  /@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*[^{}]*)\}/g;
const KEYFRAME_STEP_RE = /([^{}]+)\{([^{}]*)\}/g;

const getThemeBlocks = (css: string): string[] =>
  [...css.matchAll(THEME_BLOCK_RE)].map((m) => m[1]);

export const extractThemeVariables = (css: string): CSSVariable[] =>
  getThemeBlocks(css).flatMap((body) =>
    [...body.matchAll(VAR_DECL_RE)].map(([, name, value]) => ({
      name,
      value: value.trim(),
    })),
  );

export const extractKeyframes = (css: string): Record<string, KeyframeStep[]> =>
  Object.fromEntries(
    getThemeBlocks(css).flatMap((body) =>
      [...body.matchAll(KEYFRAMES_RE)].map(([, name, stepsBody]) => [
        name,
        [...stepsBody.matchAll(KEYFRAME_STEP_RE)].map(
          ([, selector, decls]) => ({
            selector: selector.trim(),
            declarations: decls
              .trim()
              .split(";")
              .filter(Boolean)
              .map((d) => {
                const [prop, ...rest] = d.split(":");
                return { property: prop.trim(), value: rest.join(":").trim() };
              }),
          }),
        ),
      ]),
    ),
  );

const stripComments = (css: string): string =>
  css.replace(/\/\*[\s\S]*?\*\//g, "");

const normalizeChildKey = (raw: string): string => {
  const trimmed = raw.trim();
  if (trimmed.startsWith("&")) return trimmed;
  if (
    trimmed.startsWith(">") ||
    trimmed.startsWith("+") ||
    trimmed.startsWith("~")
  ) {
    return `& ${trimmed}`;
  }
  if (trimmed.startsWith(":")) return `&${trimmed}`;
  return trimmed;
};

export const extractApplyRules = (
  rawCss: string,
): Record<string, ApplyRule> => {
  const css = stripComments(rawCss);
  let i = 0;

  const parseBlock = (node: ApplyRule, isRoot: boolean) => {
    while (i < css.length) {
      while (i < css.length && /\s/.test(css[i])) i++;
      if (css[i] === "}") {
        i++;
        return;
      }
      if (i >= css.length) return;

      const rest = css.slice(i);

      const applyMatch = rest.match(/^@apply\s+([^;]+);/);
      if (applyMatch) {
        node.classes.push(...applyMatch[1].trim().split(/\s+/));
        i += applyMatch[0].length;
        continue;
      }

      const atRuleMatch = rest.match(/^@[\w-]+[^{;]*[{;]/);
      if (atRuleMatch && !applyMatch) {
        if (atRuleMatch[0].endsWith("{")) {
          i += atRuleMatch[0].length;
          let depth = 1;
          while (i < css.length && depth > 0) {
            if (css[i] === "{") depth++;
            if (css[i] === "}") depth--;
            i++;
          }
        } else {
          i += atRuleMatch[0].length;
        }
        continue;
      }

      const selectorMatch = rest.match(/^([^{}]+)\{/);
      if (selectorMatch) {
        const rawSelector = selectorMatch[1].trim();
        i += selectorMatch[0].length;
        const key = isRoot
          ? rawSelector.replace(/^\./, "")
          : normalizeChildKey(rawSelector);
        const child = node.children[key] ?? { classes: [], children: {} };
        node.children[key] = child;
        parseBlock(child, false);
        continue;
      }

      i++;
    }
  };

  const root: ApplyRule = { classes: [], children: {} };
  parseBlock(root, true);
  return root.children;
};
