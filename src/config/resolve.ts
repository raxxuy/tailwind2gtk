import {
  extractApplyRules,
  extractKeyframes,
  extractThemeVariables,
} from "../css/extract";
import type { ResolvedConfig } from "../types/config";
import { defaults } from "./defaults";
import { mergeThemeVariables } from "./merge";

export const resolveConfig = (css: string): ResolvedConfig => {
  const vars = extractThemeVariables(css);
  const applyRules = extractApplyRules(css);
  const keyframes = extractKeyframes(css);
  const merged = mergeThemeVariables(vars, defaults);

  merged.extra.apply = { ...merged.extra.apply, ...applyRules };
  merged.extra.keyframes = { ...merged.extra.keyframes, ...keyframes };

  return merged;
};
