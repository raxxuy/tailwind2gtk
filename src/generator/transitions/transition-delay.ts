import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateTransitionDelay = (cls: string): UtilityResult | null => {
  const match = cls.match(/^delay-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`transition-delay: ${raw}ms`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transition-delay: ${value}`]);
};
