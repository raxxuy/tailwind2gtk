import type { ApplyRule, CSSVariable, KeyframeStep } from "../types/css";

const THEME_BLOCK_RE = /@theme\s*\{([^}]*)\}/g;
const VAR_DECL_RE = /(--[\w-]+)\s*:\s*([^;]+);/g;
const KEYFRAMES_RE =
  /@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*[^{}]*)\}/g;
const KEYFRAME_STEP_RE = /([^{}]+)\{([^{}]*)\}/g;
const APPLY_RULE_RE = /([^{}]+)\{\s*@apply\s+([^;]+);\s*\}/g;

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

const segmentSelector = (selector: string): string[] => {
  const tokens = selector.trim().split(/\s+/);
  const path: string[] = [];
  let pendingCombinator: string | null = null;

  tokens.forEach((token, idx) => {
    if (token === ">" || token === "+" || token === "~") {
      pendingCombinator = token;
      return;
    }

    const pseudoSplit = token.match(/^([^:]*)((?::[^:]+)+)?$/);
    const [, base, pseudo] = pseudoSplit ?? [null, token, undefined];

    if (idx === 0) {
      path.push(base.replace(/^\./, ""));
    } else if (pendingCombinator) {
      path.push(`& ${pendingCombinator} ${base}`);
      pendingCombinator = null;
    } else {
      path.push(base);
    }

    if (pseudo) path.push(`&${pseudo}`);
  });

  return path;
};

const insertApplyRule = (
  root: Record<string, ApplyRule>,
  path: string[],
  classes: string[],
): void => {
  let node: Record<string, ApplyRule> = root;
  let current: ApplyRule | undefined;

  for (const key of path) {
    current = node[key] ?? { classes: [], children: {} };
    node[key] = current;
    node = current.children;
  }

  if (current) current.classes.push(...classes);
};

const stripComments = (css: string): string =>
  css.replace(/\/\*[\s\S]*?\*\//g, "");

export const extractApplyRules = (
  rawCss: string,
): Record<string, ApplyRule> => {
  const css = stripComments(rawCss);
  const root: Record<string, ApplyRule> = {};

  for (const [, rawSelector, applyList] of css.matchAll(APPLY_RULE_RE)) {
    const selector = rawSelector.trim();
    const classes = applyList.trim().split(/\s+/);

    for (const singleSelector of selector.split(",")) {
      const path = segmentSelector(singleSelector.trim());
      insertApplyRule(root, path, classes);
    }
  }

  return root;
};
