import { TEXT_SHADOW_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateTextShadow = (cls: string): string[] | null => {
  const match = cls.match(/^text-shadow-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return [`text-shadow: none`];
  if (TEXT_SHADOW_SIZES.has(`text-shadow-${raw}`)) {
    return [`text-shadow: var(--text-shadow-${raw})`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`text-shadow: ${value}`];
};
