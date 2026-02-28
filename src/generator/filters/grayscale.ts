import { resolveDynamic } from "../utils";

export const generateGrayscale = (cls: string): string[] | null => {
  if (cls === "grayscale") return [`filter: grayscale(100%)`];

  const match = cls.match(/^grayscale-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, raw] = match;

  if (raw.match(/^[\d.]+$/)) return [`filter: grayscale(${raw}%)`];

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: grayscale(${value})`];
};
