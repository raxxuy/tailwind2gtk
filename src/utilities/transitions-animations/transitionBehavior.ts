import type { StyleRule, ResolvedConfig } from "../../types";

export const resolveTransitionBehavior = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  if (utility === "transition-normal")
    return [{ selector: "", properties: { "transition-behavior": "normal" } }];

  if (utility === "transition-discrete")
    return [
      { selector: "", properties: { "transition-behavior": "allow-discrete" } },
    ];

  return null;
};
