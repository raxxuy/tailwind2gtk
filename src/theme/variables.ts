import type { CompoundValue, ResolvedConfig } from "../types/config";
import { defaultVariables } from "./defaults";

export const generateVariables = (config: ResolvedConfig): string[] => {
  const variables = [];

  for (const key in config) {
    if (key === "extra") continue;

    if (key === "spacing") {
      variables.push(`--spacing: ${config[key]};`);
      continue;
    }

    const values = config[key as keyof typeof config] as Record<
      string,
      string | CompoundValue
    >;

    for (const [name, value] of Object.entries(values)) {
      if (typeof value === "object") {
        const { value: baseValue, ...modifiers } = value;
        variables.push(`--${key}-${name}: ${baseValue};`);
        for (const [modifier, val] of Object.entries(modifiers)) {
          variables.push(`--${key}-${name}--${modifier}: ${val};`);
        }
      } else {
        variables.push(`--${key}-${name}: ${value};`);
      }
    }
  }

  for (const [name, value] of Object.entries(defaultVariables)) {
    variables.push(`--default-${name}: ${value};`);
  }

  return variables;
};
