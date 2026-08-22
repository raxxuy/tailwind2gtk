export const parseArbitrary = (value: string): string | null => {
  if (!value.startsWith("[") || !value.endsWith("]")) return null;
  return value.slice(1, -1).replace(/_/g, " ");
};
