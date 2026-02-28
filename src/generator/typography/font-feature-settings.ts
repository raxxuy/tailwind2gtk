import { resolveDynamic } from "../utils";

export const generateFontFeatureSettings = (cls: string): string[] | null => {
  const match = cls.match(/^font-features-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const [, raw] = match;

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`font-feature-settings: ${value}`];
};
