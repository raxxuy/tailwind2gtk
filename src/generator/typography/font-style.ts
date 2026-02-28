export const generateFontStyle = (cls: string): string[] | null => {
  if (cls === "italic") return [`font-style: italic`];
  if (cls === "not-italic") return [`font-style: normal`];
  return null;
};
