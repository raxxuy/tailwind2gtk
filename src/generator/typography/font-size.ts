import { TEXT_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateFontSize = (cls: string): string[] | null => {
  const match = cls.match(/^text-(\[.+\]|\(length:.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (TEXT_SIZES.has(`text-${raw}`)) return [`font-size: var(--text-${raw})`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`font-size: ${value}`];
};
