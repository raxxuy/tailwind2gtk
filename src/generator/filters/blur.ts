import { BLUR_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateBlur = (cls: string): string[] | null => {
  const match = cls.match(/^blur-(\[.+\]|\(.+\)|[a-z0-9-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return [`filter: `];
  if (BLUR_SIZES.has(`blur-${raw}`)) {
    return [`filter: blur(var(--blur-${raw}))`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: blur(${value})`];
};
