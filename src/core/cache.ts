import { resolveConfig } from "../config/resolveConfig";
import type { CacheOptions } from "../types";
import { generateCSS, generateRoot } from "./generate";

type Cache = Record<string, string>;

const readCache = (options: CacheOptions): Cache => {
  const raw = options.readFile(options.jsonPath ?? "utilities.json");
  return raw ? JSON.parse(raw) : {};
};

export const updateCache = (classes: string[], options: CacheOptions): void => {
  const jsonPath = options.jsonPath ?? "utilities.json";
  const cssPath = options.cssPath ?? "utilities.css";

  const config = resolveConfig(options.tailwindConfig);
  const cache = readCache(options);
  const newClasses = classes.filter((cls) => !(cls in cache));

  if (newClasses.length === 0) return;

  const generated = generateCSS(newClasses, config);
  Object.assign(cache, generated);

  const root = generateRoot(config);
  const css = [root, ...Object.values(cache)].join("\n");

  options.writeFile(jsonPath, JSON.stringify(cache, null, 2));
  options.writeFile(cssPath, css);
};
