import { resolveDynamic } from "../utils";

export const generateOutlineOffset = (cls: string): string[] | null => {
  const match = cls.match(/^(-?)outline-offset-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, negative, raw] = match;

  if (raw.match(/^[\d.]+$/))
    return [`outline-offset: ${negative ? `calc(${raw}px * -1)` : `${raw}px`}`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`outline-offset: ${negative ? `calc(${value} * -1)` : value}`];
};
