import { classifyVariable } from "../css/classify";
import type { CompoundValue, ResolvedConfig } from "../types/config";
import type {
  ClassifiedVariable,
  CSSVariable,
  ModifierKey,
} from "../types/css";

const ensureCompoundEntry = (
  config: ResolvedConfig,
  key: ModifierKey,
  token: string,
): CompoundValue => {
  const bucket = config[key];
  const existing = bucket[token];

  if (typeof existing === "object") return existing;

  const entry: CompoundValue = {
    value: typeof existing === "string" ? existing : "",
  };

  bucket[token] = entry;
  return entry;
};

const applyClassified = (
  config: ResolvedConfig,
  classified: ClassifiedVariable,
  value: string,
): void => {
  switch (classified.kind) {
    case "scalar": {
      config[classified.key] = value;
      return;
    }
    case "record": {
      config[classified.key][classified.token] = value;
      return;
    }
    case "modifier": {
      const entry = ensureCompoundEntry(
        config,
        classified.key,
        classified.token,
      );
      entry[classified.modifier] = value;
      return;
    }
  }
};

export const mergeThemeVariables = (
  vars: CSSVariable[],
  base: ResolvedConfig,
): ResolvedConfig => {
  const merged = JSON.parse(JSON.stringify(base));

  for (const { name, value } of vars) {
    const classified = classifyVariable(name);
    if (!classified) continue;

    applyClassified(merged, classified, value);
  }

  return merged;
};
