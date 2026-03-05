import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateTransitionDuration = (
  cls: string,
): UtilityResult | null => {
  const match = cls.match(/^duration-(\[.+\]|\(.+\)|[\d.]+|[a-z]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw === "initial") return prop(["transition-duration: initial"]);
  if (raw.match(/^[\d.]+$/)) return prop([`transition-duration: ${raw}ms`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`transition-duration: ${value}`]);
};
