import type { UtilityResult } from "../../core";
import { TEXT_SIZES } from "../constants";
import { prop, resolveDynamic, toRem } from "../utils";

const resolveLineHeight = (raw: string): string | null => {
  if (raw === "none") return "1";
  if (raw.match(/^[\d.]+$/)) return toRem(raw);
  return resolveDynamic(raw);
};

export const generateLineHeight = (cls: string): UtilityResult | null => {
  const match = cls.match(
    /^text-(\[.+\]|\(length:.+\)|[a-z0-9-]+)\/(\[.+\]|\(.+\)|[\d.]+|[a-z-]+)$/,
  );
  if (!match) return null;

  const [, sizeRaw, lineRaw] = match;
  const fontSize = TEXT_SIZES.has(`text-${sizeRaw}`)
    ? `var(--text-${sizeRaw})`
    : resolveDynamic(sizeRaw);
  if (!fontSize) return null;

  const lineHeight = resolveLineHeight(lineRaw);
  if (!lineHeight) return null;

  return prop([`font-size: ${fontSize}`, `line-height: ${lineHeight}`]);
};

export const generateLeading = (cls: string): UtilityResult | null => {
  const match = cls.match(/^leading-(\[.+\]|\(.+\)|[\d.]+|[a-z-]+)$/);
  if (!match) return null;

  const value = resolveLineHeight(match[1]);
  if (!value) return null;

  return prop([`line-height: ${value}`]);
};
