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

export const extractApplyRules = (css: string): ApplyRule[] =>
  [...css.matchAll(APPLY_RULE_RE)].map(([, selector, applyList]) => ({
    selector: selector.trim().slice(1),
    classes: applyList.trim().split(/\s+/),
  }));
