import { DIRECTIONS, SPACING_PROPS } from "../constants";

export const generateSpacing = (cls: string): string[] | null => {
  // Match arbitrary values: w-[64px], p-[2.5rem], m-[10%], p-[5px_10px], m-[5px_10px_15px_20px]
  const arbitraryMatch = cls.match(/^(-?)([pmwh])([xytrbl])?-\[(.+)\]$/);

  if (arbitraryMatch) {
    const [, negative, prop, dir = "", value] = arbitraryMatch;
    const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];
    const sign = negative ? "-" : "";

    if (["w", "h"].includes(prop)) {
      return [`${cssProp}: ${sign}${value}`];
    }

    if (dir) {
      const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
      return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${sign}${value}`);
    }

    const cssValue = value.replace(/_/g, " ");
    return [`${cssProp}: ${sign}${cssValue}`];
  }

  // Match regular values including negative: -mt-10, p-4, m-2.5, w-64
  const match = cls.match(/^(-?)([pmwh])([xytrbl])?-([\d.]+)$/);

  if (!match) return null;

  const [, negative, prop, dir = "", value] = match;
  const numValue = parseFloat(value);

  if (Number.isNaN(numValue)) return null;

  const remValue = (numValue * 0.25).toFixed(3).replace(/\.?0+$/, "");
  const cssProp = SPACING_PROPS[prop as keyof typeof SPACING_PROPS];
  const cssValue = `${negative ? "-" : ""}${remValue}rem`;

  if (["w", "h"].includes(prop)) {
    return [`${cssProp}: ${cssValue}`];
  }

  const parts = DIRECTIONS[dir as keyof typeof DIRECTIONS] || [""];
  return parts.map((p) => `${cssProp}${p ? `-${p}` : ""}: ${cssValue}`);
};
