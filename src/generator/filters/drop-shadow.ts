import { DROP_SHADOW_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateDropShadow = (cls: string): string[] | null => {
  const match = cls.match(/^drop-shadow-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return [`filter: drop-shadow(0 0 #0000)`];
  if (DROP_SHADOW_SIZES.has(`drop-shadow-${raw}`)) {
    return [`filter: drop-shadow(var(--drop-shadow-${raw}))`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: drop-shadow(${value})`];
};
