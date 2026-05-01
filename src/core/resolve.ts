import type { CSSRule } from "../types";
import * as sizing from "../utilities/sizing";
import * as spacing from "../utilities/spacing";

export const resolveUtility = (utility: string): CSSRule[] | null => {
  const resolvers = [...Object.values(spacing), ...Object.values(sizing)];

  for (const resolver of resolvers) {
    const result = resolver(utility);
    if (result) return result;
  }

  return null;
};
