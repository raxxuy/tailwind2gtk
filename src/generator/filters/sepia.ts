import { resolveDynamic } from "../utils";

export const generateSepia = (cls: string): string[] | null => {
  if (cls === "sepia") return [`filter: sepia(100%)`];

  const match = cls.match(/^sepia-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: sepia(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: sepia(${value})`];
};
