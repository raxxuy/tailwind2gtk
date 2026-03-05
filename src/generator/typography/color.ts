import type { UtilityResult } from "../../core";
import { prop, resolveColorValue } from "../utils";

export const generateColor = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^text-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/,
  );
  if (!match) return null;

  const value = resolveColorValue(match[1]);
  if (!value) return null;

  return prop([`color: ${value}`]);
};
