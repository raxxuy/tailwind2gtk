import type { UtilityResult } from "../../core";
import { CHILD_SELECTOR, DIRECTIONS } from "../constants";
import { prop, propWithSelector, resolveColorValue } from "../utils";

export const generateBorderColor = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^border(-[xytbrl])?-((?:\[.+\]|\(.+\)|[a-z0-9-]+)(?:\/[\d.[\]]+)?)$/,
  );
  if (!match) return null;

  const [, dirRaw = "", raw] = match;
  const value = resolveColorValue(raw);
  if (!value) return null;

  const dir = dirRaw.slice(1);
  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] ?? [""];
  return prop(parts.map((p) => `border${p ? `-${p}` : ""}-color: ${value}`));
};

export const generateDivideColor = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("divide-")) return null;
  const rest = cls.slice(7);

  const varMatch = rest.match(/^\((.+)\)$/);
  if (varMatch) {
    return propWithSelector(CHILD_SELECTOR, [
      `border-color: var(${varMatch[1]})`,
    ]);
  }

  const value = resolveColorValue(rest);
  if (!value) return null;

  return propWithSelector(CHILD_SELECTOR, [`border-color: ${value}`]);
};
