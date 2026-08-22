import type { ResolvedConfig } from "../types/config";
import { generateVariables } from "./variables";

export const generateRoot = (config: ResolvedConfig): string => {
  const vars = generateVariables(config)
    .map((v) => `  ${v}`)
    .join("\n");

  return `:root {\n${vars}\n}`;
};
