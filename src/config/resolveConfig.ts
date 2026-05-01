import type { ResolvedConfig, TailwindConfig } from "../types";
import { defaults } from "./defaults";

export const resolveConfig = (config?: TailwindConfig): ResolvedConfig => ({
  borderRadii: {
    ...defaults.borderRadii,
    ...config?.theme?.borderRadius,
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
  letterSpacings: {
    ...defaults.letterSpacings,
    ...config?.theme?.letterSpacing,
  },
  spacing: config?.theme?.spacing ?? defaults.spacing,
});
