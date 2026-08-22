import type { CacheOptions } from "../types";

export const readCache = (
  path: string,
  options: CacheOptions,
): Record<string, string> => {
  const raw = options.readFile(path);
  return raw ? JSON.parse(raw) : {};
};
