import { TEXT_SIZES } from "../constants";
import { resolveDynamic, toRem } from "../utils";

const resolveLineHeight = (raw: string): string | null => {
  if (raw === "none") return "1";
  if (raw.match(/^[\d.]+$/)) return toRem(raw);
  return resolveDynamic(raw);
};

export const generateLineHeight = (cls: string): string[] | null => {
  // leading-*
  const leadingMatch = cls.match(/^leading-(\[.+\]|\(.+\)|[\d.]+|[a-z-]+)$/);
  if (leadingMatch) {
    const value = resolveLineHeight(leadingMatch[1]);
    if (!value) return null;
    return [`line-height: ${value}`];
  }

  // text-<size>/<line-height>
  const textMatch = cls.match(
    /^text-(\[.+\]|\(length:.+\)|[a-z0-9-]+)\/(\[.+\]|\(.+\)|[\d.]+|[a-z-]+)$/,
  );
  if (textMatch) {
    const [, sizeRaw, lineRaw] = textMatch;
    const fontSize = TEXT_SIZES.has(`text-${sizeRaw}`)
      ? `var(--text-${sizeRaw})`
      : resolveDynamic(sizeRaw);
    if (!fontSize) return null;

    const lineHeight = resolveLineHeight(lineRaw);
    if (!lineHeight) return null;

    return [`font-size: ${fontSize}`, `line-height: ${lineHeight}`];
  }

  return null;
};
