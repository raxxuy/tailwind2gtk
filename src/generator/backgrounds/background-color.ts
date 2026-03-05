import type { UtilityResult } from "../../core";
import { prop, resolveColorValue } from "../utils";

export const generateBackgroundColor = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^bg-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/,
  );
  if (!match) return null;

  const value = resolveColorValue(match[1]);
  if (!value) return null;

  return prop([`background-color: ${value}`]);
};
