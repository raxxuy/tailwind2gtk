import { generateKeyframes } from "@/theme/keyframes";
import { compile } from "../compiler/compile";
import { defaults } from "../config/defaults";
import { resolveConfig } from "../config/resolve";
import { generateRoot } from "../theme/root";
import type { CacheOptions } from "../types/config";
import { drainQueue, enqueue, isWriting, setWriting } from "./queue";
import { readCache } from "./read";

export const updateCache = async (
  classes: string[],
  options: CacheOptions,
): Promise<void> => {
  enqueue(classes);

  if (isWriting()) return;
  setWriting(true);

  const jsonPath = options.jsonPath ?? "utilities.json";
  const cssPath = options.cssPath ?? "utilities.css";

  const extendCss = options.extendPath
    ? options.readFile(options.extendPath)
    : null;

  const config = extendCss ? resolveConfig(extendCss) : defaults;

  try {
    let pending = drainQueue();

    while (pending.length > 0) {
      const cache = readCache(jsonPath, options);

      const newClasses = pending.filter((cls) => !(cls in cache));

      if (newClasses.length > 0) {
        const generated = compile(newClasses, config);
        for (const cls of newClasses) {
          if (!(cls in generated)) generated[cls] = "";
        }
        Object.assign(cache, generated);

        const css = [
          generateRoot(config),
          generateKeyframes(config),
          ...Object.values(cache),
        ].join("\n");

        await options.writeFile(jsonPath, JSON.stringify(cache, null, 2));
        await options.writeFile(cssPath, css);

        options.onCacheUpdate(cache, config);
      }

      pending = drainQueue();
    }
  } finally {
    setWriting(false);
  }
};
