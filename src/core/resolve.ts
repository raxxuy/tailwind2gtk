import type { CSSRule, ResolvedConfig } from "../types";
import * as sizing from "../utilities/sizing";
import * as spacing from "../utilities/spacing";
import * as typography from "../utilities/typography";

export const resolveUtility = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const resolvers = [
    ...Object.values(spacing),
    ...Object.values(sizing),
    ...Object.values(typography),
  ];

  for (const resolver of resolvers) {
    const result = resolver(utility, config);
    if (result) return result;
  }

  return null;
};
