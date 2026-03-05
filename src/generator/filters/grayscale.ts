import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateGrayscale = (cls: string): UtilityResult | null => {
  if (cls === "grayscale") return prop([`filter: grayscale(100%)`]);

  const match = cls.match(/^grayscale-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return prop([`filter: grayscale(${raw}%)`]);

  const value = resolveDynamic(raw);
  if (!value) return null;

  return prop([`filter: grayscale(${value})`]);
};
