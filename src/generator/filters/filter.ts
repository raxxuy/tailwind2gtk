import type { UtilityResult } from "../../core";
import { prop, resolveDynamic } from "../utils";

export const generateFilter = (cls: string): UtilityResult | null => {
  if (cls === "filter-none") return prop([`filter: none`]);

  const match = cls.match(/^filter-(\[.+\]|\(.+\))$/);
  if (!match) return null;

  const value = resolveDynamic(match[1]);
  if (!value) return null;

  return prop([`filter: ${value}`]);
};
