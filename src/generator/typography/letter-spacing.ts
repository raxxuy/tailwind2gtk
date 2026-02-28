import { TRACKING_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateLetterSpacing = (cls: string): string[] | null => {
  const match = cls.match(/^tracking-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (TRACKING_SIZES.has(`tracking-${raw}`)) {
    return [`letter-spacing: var(--tracking-${raw})`];
  }
  
  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`letter-spacing: ${value}`];
};
