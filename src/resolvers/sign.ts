export const splitSign = (
  value: string,
): { negative: boolean; raw: string; sign: "" | "-" } => {
  const negative = value.startsWith("-");
  return {
    negative,
    raw: negative ? value.slice(1) : value,
    sign: negative ? "-" : "",
  };
};
