import { updateCache } from "../cache/update";
import type { Plugin } from "../types/plugin";

export const createPlugin = (plugin: Omit<Plugin, "run">): Plugin => ({
  ...plugin,
  run: async (classes: string[]) => {
    await updateCache(classes, {
      jsonPath: plugin.options.jsonPath,
      cssPath: plugin.options.cssPath,
      onCacheUpdate: plugin.options.onCacheUpdate ?? (() => {}),
      readFile: plugin.readFile,
      extendPath: plugin.options.extendPath,
      themePath: plugin.options.themePath,
      writeFile: plugin.writeFile,
    });
  },
});
