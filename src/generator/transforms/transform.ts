import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateTransform = (cls: string): UtilityResult | null => {
  const match = cls.match(/^transform-(\[.+\]|\(.+\)|[a-z-]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "none") return prop([`transform: none`]);
  if (raw === "gpu") {
    return prop([
      `transform: translateZ(0) var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)`,
    ]);
  }
  if (raw === "cpu") {
    return prop([
      `transform: var(--tw-rotate-x) var(--tw-rotate-y) var(--tw-rotate-z) var(--tw-skew-x) var(--tw-skew-y)`,
    ]);
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transform: ${value}`]);
};
