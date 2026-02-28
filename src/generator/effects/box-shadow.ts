import { SHADOW_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateBoxShadow = (cls: string): string[] | null => {
  const match = cls.match(/^shadow-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return [`box-shadow: 0 0 #0000`];
  if (SHADOW_SIZES.has(`shadow-${raw}`)) {
    return [`box-shadow: var(--shadow-${raw})`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`box-shadow: ${value}`];
};
