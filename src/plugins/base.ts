import { updateCache } from "../core/cache";
import type { Plugin } from "../types";

export const createPlugin = (plugin: Omit<Plugin, "run">): Plugin => ({
  ...plugin,
  run: (classes: string[]) =>
    updateCache(classes, {
      jsonPath: plugin.options?.jsonPath,
      cssPath: plugin.options?.cssPath,
      tailwindConfig: plugin.options?.tailwindConfig,
      readFile: plugin.readFile,
      writeFile: plugin.writeFile,
    }),
});
