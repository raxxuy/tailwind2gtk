import { CONTAINER_SIZES, SIZING_KEYWORDS } from "../constants";
import { resolveValue } from "./utils";

export const generateMinHeight = (cls: string): string[] | null => {
  const match = cls.match(
    /^min-h-(\[.+\]|\(.+\)|px|[\d.]+\/[\d.]+|[\d.]+|[a-z0-9-]+)$/,
  );
  if (!match) return null;

  const [, raw] = match;

  if (raw in SIZING_KEYWORDS) return [`min-height: ${SIZING_KEYWORDS[raw]}`];
  if (CONTAINER_SIZES.has(raw)) return [`min-height: var(--container-${raw})`];

  const value = resolveValue(raw);
  if (!value) return null;

  return [`min-height: ${value}`];
};
