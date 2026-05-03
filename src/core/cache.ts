import { resolveConfig } from "../config/resolveConfig";
import { parseVars } from "../helpers/parseVars";
import type { CacheOptions } from "../types";
import { generateCSS, generateRoot, generateTheme } from "./generate";

type Cache = Record<string, string>;

const readCache = (options: CacheOptions): Cache => {
  const raw = options.readFile(options.jsonPath ?? "utilities.json");
  return raw ? JSON.parse(raw) : {};
};

let writing = false;
const queue = new Set<string>();

export const updateCache = async (
  classes: string[],
  options: CacheOptions,
): Promise<void> => {
  for (const cls of classes) queue.add(cls);

  if (writing) return;
  writing = true;

  try {
    while (queue.size > 0) {
      const jsonPath = options.jsonPath ?? "utilities.json";
      const cssPath = options.cssPath ?? "utilities.css";

      const config = resolveConfig(options.tailwindConfig);
      const cache = readCache(options);

      const newClasses = [...queue].filter((cls) => !(cls in cache));
      queue.clear();

      if (newClasses.length === 0) continue;

      Object.assign(cache, generateCSS(newClasses, config));

      const css = [generateRoot(config), ...Object.values(cache)].join("\n");

      await options.writeFile(jsonPath, JSON.stringify(cache, null, 2));
      await options.writeFile(cssPath, css);

      if (options.themePath) {
        const raw = options.resolveVarsFrom
          ? options.readFile(options.resolveVarsFrom)
          : null;
        const vars = raw ? parseVars(raw) : undefined;
        await options.writeFile(options.themePath, generateTheme(config, vars));
      }

      options.onCacheUpdate?.(cache, config);
    }
  } finally {
    writing = false;
  }
};
