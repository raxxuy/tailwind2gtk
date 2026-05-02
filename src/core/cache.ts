import { resolveConfig } from "../config/resolveConfig";
import type { CacheOptions } from "../types";
import { generateCSS, generateRoot } from "./generate";

type Cache = Record<string, string>;

const readCache = (options: CacheOptions): Cache => {
  const raw = options.readFile(options.jsonPath ?? "utilities.json");
  return raw ? JSON.parse(raw) : {};
};

export const updateCache = async (
  classes: string[],
  options: CacheOptions,
): Promise<void> => {
  const jsonPath = options.jsonPath ?? "utilities.json";
  const cssPath = options.cssPath ?? "utilities.css";

  const config = resolveConfig(options.tailwindConfig);
  const cache = readCache(options);
  const newClasses = [...new Set(classes)].filter((cls) => !(cls in cache));

  if (newClasses.length === 0) return;

  const generated = generateCSS(newClasses, config);
  Object.assign(cache, generated);

  const root = generateRoot(config);
  const css = [root, ...Object.values(cache)].join("\n");

  await options.writeFile(jsonPath, JSON.stringify(cache, null, 2));
  await options.writeFile(cssPath, css);
  options.onCacheUpdate?.(cache, config);
};
