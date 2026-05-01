import type { ResolvedConfig, TailwindConfig } from "../types";
import { defaults } from "./defaults";

export const resolveConfig = (config?: TailwindConfig): ResolvedConfig => ({
  spacing: config?.theme?.spacing ?? defaults.spacing,
  containerSizes: {
    ...defaults.containerSizes,
    ...config?.theme?.container?.screens,
  },
});
