import { ANIMATE_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateAnimation = (cls: string): string[] | null => {
  const match = cls.match(/^animate-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return [`animation: none`];
  if (ANIMATE_SIZES.has(`animate-${raw}`)) {
    return [`animation: var(--animate-${raw})`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`animation: ${value}`];
};
