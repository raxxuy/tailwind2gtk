import type { ResolvedConfig, StyleRule } from "../types";
import * as backgrounds from "../utilities/backgrounds";
import * as borders from "../utilities/borders";
import * as effects from "../utilities/effects";
import * as filters from "../utilities/filters";
import * as interactivity from "../utilities/interactivity";
import * as sizing from "../utilities/sizing";
import * as spacing from "../utilities/spacing";
import * as transforms from "../utilities/transforms";
import * as transitionsAnimations from "../utilities/transitions-animations";
import * as typography from "../utilities/typography";

export const resolveUtility = (
  utility: string,
  config: ResolvedConfig,
): StyleRule | StyleRule[] | null => {
  const resolvers = [
    ...Object.values(spacing),
    ...Object.values(sizing),
    ...Object.values(backgrounds),
    ...Object.values(typography),
    ...Object.values(interactivity),
    ...Object.values(borders),
    ...Object.values(effects),
    ...Object.values(filters),
    ...Object.values(transforms),
    ...Object.values(transitionsAnimations),
  ];

  for (const resolver of resolvers) {
    const result = resolver({ utility, config });
    if (result) return result;
  }

  return null;
};
