export const resolveValue = (value: string): string | null => {
  const negative = value.startsWith("-");
  const raw = negative ? value.slice(1) : value;
  const sign = negative ? "-" : "";

  const fraction = raw.match(/^(\d+)\/(\d+)$/);
  if (fraction) return `calc(${sign}${fraction[1]} / ${fraction[2]} * 100%)`;

  if (raw === "px") return `${sign}1px`;
  
  if (raw.startsWith("[") && raw.endsWith("]"))
    return `${sign}${raw.slice(1, -1).replace(/_/g, " ")}`;
    
  if (raw.startsWith("(") && raw.endsWith(")"))
    return negative
      ? `calc(-1 * var(${raw.slice(1, -1)}))`
      : `var(${raw.slice(1, -1)})`;

  const num = Number(raw);
  
  if (!Number.isNaN(num))
    return `calc(var(--spacing) * ${negative ? -num : num})`;

  return null;
};
