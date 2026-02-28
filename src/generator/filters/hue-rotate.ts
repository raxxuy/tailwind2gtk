import { resolveDynamic } from "../utils";

export const generateHueRotate = (cls: string): string[] | null => {
  const match = cls.match(/^(-?)hue-rotate-(\[.+\]|\(.+\)|[\d.]+)$/);
  if (!match) return null;

  const [, negative, raw] = match;

  if (raw.match(/^[\d.]+$/)) {
    return [
      `filter: hue-rotate(${negative ? `calc(${raw}deg * -1)` : `${raw}deg`})`,
    ];
  }

  const value = resolveDynamic(raw);
  if (!value) return null;

  return [`filter: hue-rotate(${negative ? `calc(${value} * -1)` : value})`];
};
