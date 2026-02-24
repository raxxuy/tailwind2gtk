import { debounce, kebabCase } from "es-toolkit";
import { getUtility } from "./generator";
import { generateScss, type ScssOptions } from "./scss";

export interface CoreOptions {
  utilitiesFile: string;
  utilitiesJsonFile: string;
  scssOptions?: ScssOptions;
  onNewClasses?: (scss: string, classes: string[]) => void;
  writeFile: (path: string, content: string) => void;
  readFile: (path: string) => string;
  fileExists: (path: string) => boolean;
}

export const createCore = (options: CoreOptions) => {
  const {
    utilitiesFile,
    utilitiesJsonFile,
    scssOptions,
    onNewClasses,
    writeFile,
    readFile,
    fileExists,
  } = options;

  const state = {
    mappedWidgets: new Set<string>(),
    usedClasses: new Set<string>(),
    paused: false,
  };

  const freeze = () => (state.paused = true);
  const thaw = () => (state.paused = false);

  const withFreeze = (fn: () => void) => {
    freeze();
    try {
      fn();
    } finally {
      thaw();
    }
  };

  const addUtilityClass = (cls: string): boolean => {
    if (state.usedClasses.has(cls) || !getUtility(cls)) return false;
    state.usedClasses.add(cls);
    return true;
  };

  const writeUtilities = () => {
    if (state.paused) return;

    const scss = generateScss(state.usedClasses, scssOptions);
    writeFile(utilitiesFile, scss);
    writeFile(utilitiesJsonFile, JSON.stringify([...state.usedClasses].sort()));
    onNewClasses?.(scss, [...state.usedClasses]);
  };

  const debouncedWriteUtilities = debounce(writeUtilities, 0);

  const loadCache = () => {
    if (!fileExists(utilitiesJsonFile)) return;

    try {
      const cached: string[] = JSON.parse(readFile(utilitiesJsonFile));
      cached.forEach(addUtilityClass);
      writeUtilities();
    } catch (error) {
      console.error("[tailwind2gtk] Failed to load cache:", error);
    }
  };

  const setClasses = (classes: string[]): boolean => {
    let hasNew = false;

    for (const cls of classes) {
      if (addUtilityClass(cls)) hasNew = true;
    }

    if (hasNew) debouncedWriteUtilities();
    return hasNew;
  };

  const isNewComponent = (name: string): boolean => {
    const kebabName = kebabCase(name);
    if (state.mappedWidgets.has(kebabName)) return false;
    state.mappedWidgets.add(kebabName);
    return true;
  };

  // Always load cache on creation so classes are never lost across restarts.
  loadCache();

  return {
    freeze,
    thaw,
    withFreeze,
    loadCache,
    setClasses,
    isNewComponent,
    getUsedClasses: () => [...state.usedClasses],
    flushWrite: () => debouncedWriteUtilities.flush(),
  };
};
