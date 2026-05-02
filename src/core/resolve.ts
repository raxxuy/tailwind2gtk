import type { CSSRule, ResolvedConfig } from "../types";
import * as backgrounds from "../utilities/backgrounds";
import * as borders from "../utilities/borders";
import * as effects from "../utilities/effects";
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
    ...Object.values(effects),
    ...Object.values(typography),
    ...Object.values(backgrounds),
    ...Object.values(borders),
  ];

  for (const resolver of resolvers) {
    const result = resolver(utility, config);
    if (result) return result;
  }

  return null;
};
