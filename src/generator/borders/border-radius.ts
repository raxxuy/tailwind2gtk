import {
  RADIUS_KEYWORDS,
  RADIUS_SIZES,
  ROUNDED_DIRECTIONS,
} from "../constants";
import { resolveDynamic } from "../utils";

const resolveRadius = (raw: string): string | null => {
  if (raw in RADIUS_KEYWORDS)
    return RADIUS_KEYWORDS[raw as keyof typeof RADIUS_KEYWORDS];
  if (RADIUS_SIZES.has(`radius-${raw}`)) return `var(--radius-${raw})`;
  return resolveDynamic(raw);
};

export const generateBorderRadius = (cls: string): string[] | null => {
  const match = cls.match(
    /^rounded(-[trbl]{1,2})?(?:-(\[.+\]|\(.+\)|[a-z0-9-]+))?$/,
  );
  if (!match) return null;

  const [, dirRaw = "", sizeRaw = "md"] = match;
  const value = resolveRadius(sizeRaw);
  if (!value) return null;

  const dir = dirRaw.slice(1);
  const parts = ROUNDED_DIRECTIONS[dir as keyof typeof ROUNDED_DIRECTIONS];
  return parts.map((p) => `border${p ? `-${p}` : ""}-radius: ${value}`);
};
