import { CONTAINER_SIZES, SIZING_KEYWORDS } from "../constants";
import { resolveValue } from "./utils";

export const generateMinWidth = (cls: string): string[] | null => {
  const match = cls.match(
    /^min-w-(\[.+\]|\(.+\)|px|[\d.]+\/[\d.]+|[\d.]+|[a-z0-9-]+)$/,
  );
  if (!match) return null;

  const [, raw] = match;

  if (raw in SIZING_KEYWORDS) return [`min-width: ${SIZING_KEYWORDS[raw]}`];
  if (CONTAINER_SIZES.has(raw)) return [`min-width: var(--container-${raw})`];

  const value = resolveValue(raw);
  if (!value) return null;

  return [`min-width: ${value}`];
};
