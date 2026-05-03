export const parseVars = (raw: string): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const match of raw.matchAll(/--(\w+):\s*([^;]+);/g)) {
    result[`--${match[1]}`] = match[2].trim();
  }
  return result;
};
