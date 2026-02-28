import { TEXT_DECORATION_STYLES } from "../constants";

export const generateTextDecorationStyle = (cls: string): string[] | null => {
  const match = cls.match(/^decoration-(solid|double|dotted|dashed|wavy)$/);
  if (!match) return null;

  return [
    `text-decoration-style: ${TEXT_DECORATION_STYLES[match[1] as keyof typeof TEXT_DECORATION_STYLES]}`,
  ];
};
