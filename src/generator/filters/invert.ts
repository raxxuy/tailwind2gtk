import { resolveDynamic } from "../utils";

export const generateInvert = (cls: string): string[] | null => {
  if (cls === "invert") return [`filter: invert(100%)`];

  const match = cls.match(/^invert-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: invert(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: invert(${value})`];
};
