import type { ApplyRule, KeyframeStep } from "./css";

export interface CompoundValue {
  value: string;
  [modifier: string]: string;
}

export interface ResolvedConfig {
  animate: Record<string, string>;
  blur: Record<string, string>;
  color: Record<string, string>;
  container: Record<string, string>;
  "drop-shadow": Record<string, string>;
  ease: Record<string, string>;
  extra: {
    apply: Record<string, ApplyRule>;
    keyframes: Record<string, KeyframeStep[]>;
  };
  font: Record<string, string | CompoundValue>;
  "font-weight": Record<string, string>;
  "inset-shadow": Record<string, string>;
  leading: Record<string, string>;
  radius: Record<string, string>;
  shadow: Record<string, string>;
  spacing: string;
  text: Record<string, string | CompoundValue>;
  "text-shadow": Record<string, string>;
  tracking: Record<string, string>;
}

export interface CacheOptions {
  cssPath?: string;
  extendPath?: string;
  jsonPath?: string;
  onCacheUpdate?: (
    cache: Record<string, string>,
    config: ResolvedConfig,
  ) => void;
  readFile: (path: string) => string | null;
  themePath?: string;
  writeFile: (path: string, content: string) => Promise<void>;
}

export const isCompoundValue = (
  value: string | CompoundValue,
): value is CompoundValue => {
  return typeof value === "object" && value !== null;
};
