import { EASE_SIZES } from "../constants";
import { resolveDynamic } from "../utils";

export const generateTransitionTimingFunction = (
  cls: string,
): string[] | null => {
  const match = cls.match(/^ease-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "linear") return [`transition-timing-function: linear`];
  if (raw === "initial") return [`transition-timing-function: initial`];
  if (EASE_SIZES.has(`ease-${raw}`)) {
    return [`transition-timing-function: var(--ease-${raw})`];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`transition-timing-function: ${value}`];
};
