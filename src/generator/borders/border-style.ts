import { LINE_STYLES } from "../constants";

export const generateBorderStyle = (cls: string): string[] | null => {
  const match = cls.match(/^border-(solid|dashed|dotted|double|hidden|none)$/);
  if (!match) return null;

  return [`border-style: ${LINE_STYLES[match[1] as keyof typeof LINE_STYLES]}`];
};
