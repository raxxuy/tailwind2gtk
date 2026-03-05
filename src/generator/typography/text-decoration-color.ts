import type { UtilityResult } from "../../core";
import { prop, resolveColorValue } from "../utils";

export const generateTextDecorationColor = (
  cls: string,
): UtilityResult | null => {
  const match = cls.match(
    /^decoration-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/,
  );
  if (!match) return null;

  const value = resolveColorValue(match[1]);
  if (!value) return null;

  return prop([`text-decoration-color: ${value}`]);
};
