import type { UtilityResult } from "../../core";
import { CONTAINER_SIZES, SIZING_KEYWORDS } from "../constants";
import { prop } from "../utils";
import { resolveValue } from "./utils";

export const generateMinWidth = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^min-w-(\[.+\]|\(.+\)|px|[\d.]+\/[\d.]+|[\d.]+|[a-z0-9-]+)$/,
  );
  if (!match) return null;

  const [, raw] = match;

  if (raw in SIZING_KEYWORDS)
    return prop([`min-width: ${SIZING_KEYWORDS[raw]}`]);
  if (CONTAINER_SIZES.has(`container-${raw}`))
    return prop([`min-width: var(--container-${raw})`]);

  const value = resolveValue(raw);
  if (!value) return null;

  return prop([`min-width: ${value}`]);
};
