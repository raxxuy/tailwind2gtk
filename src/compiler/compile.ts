import type { StyleRule } from "../types";
import type { ResolvedConfig } from "../types/config";
import { compileApply } from "./apply";
import { parseClass } from "./parser";
import { generateRule } from "./rule";
import { serializeRule } from "./serialize";

export const compileClass = (
  cls: string,
  config: ResolvedConfig,
): StyleRule | null => {
  try {
    const parsed = parseClass(cls);
    return generateRule(parsed, config);
  } catch {
    return null;
  }
};

export const compileCSS = (cls: string, config: ResolvedConfig): string => {
  const rule = compileClass(cls, config);
  if (!rule) return "";

  return serializeRule(rule);
};

export const compile = (
  classes: string[],
  config: ResolvedConfig,
): Record<string, string> =>
  Object.fromEntries(
    classes
      .map((cls) => [
        cls,
        cls in config.extra.apply
          ? compileApply(cls, config)
          : compileCSS(cls, config),
      ])
      .filter(([, css]) => css),
  );
