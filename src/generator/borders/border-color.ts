import { DIRECTIONS } from "../constants";
import { resolveColorValue } from "../utils";

export const generateBorderColor = (cls: string): string[] | null => {
  const match = cls.match(/^border(-[xytbrl])?-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/);
  if (!match) return null;

  const [, dirRaw = "", raw] = match;
  const value = resolveColorValue(raw);
  if (!value) return null;

  const dir = dirRaw.slice(1);
  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] ?? [""];
  return parts.map((p) => `border${p ? `-${p}` : ""}-color: ${value}`);
};
