import { LINE_STYLES } from "../constants";

export const generateOutlineStyle = (cls: string): string[] | null => {
  if (cls === "outline-hidden") {
    return ["outline: 2px solid transparent", "outline-offset: 2px"];
  }

  const match = cls.match(/^outline-(solid|dashed|dotted|double|none)$/);
  if (!match) return null;

  return [
    `outline-style: ${LINE_STYLES[match[1] as keyof typeof LINE_STYLES]}`,
  ];
};
