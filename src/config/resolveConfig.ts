import type { ResolvedConfig, TailwindConfig } from "../types";
import { defaults } from "./defaults";

export const resolveConfig = (config?: TailwindConfig): ResolvedConfig => ({
  animations: {
    ...defaults.animations,
    ...config?.theme?.animation,
  },
  apply: config?.theme?.apply,
  borderRadii: {
    ...defaults.borderRadii,
    ...config?.theme?.borderRadius,
  },
  boxShadows: {
    ...defaults.boxShadows,
    ...config?.theme?.boxShadow,
  },
  colors: {
    ...defaults.colors,
    ...config?.theme?.colors,
  },
  containerSizes: {
    ...defaults.containerSizes,
    ...config?.theme?.container?.screens,
  },
  fontFamilies: {
    ...defaults.fontFamilies,
    ...config?.theme?.fontFamily,
  },
  fontSizes: {
    ...defaults.fontSizes,
    ...config?.theme?.fontSize,
  },
  fontWeights: {
    ...defaults.fontWeights,
    ...config?.theme?.fontWeight,
  },
  insetBoxShadows: {
    ...defaults.insetBoxShadows,
    ...config?.theme?.insetBoxShadow,
  },
  keyframes: {
    ...defaults.keyframes,
    ...config?.theme?.keyframes,
  },
  letterSpacings: {
    ...defaults.letterSpacings,
    ...config?.theme?.letterSpacing,
  },
  spacing: config?.theme?.spacing ?? defaults.spacing,
  textShadows: {
    ...defaults.textShadows,
    ...config?.theme?.textShadow,
  },
  transitionTimingFunctions: {
    ...defaults.transitionTimingFunctions,
    ...config?.theme?.transitionTimingFunction,
  },
});
