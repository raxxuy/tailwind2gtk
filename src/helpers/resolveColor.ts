import type { ResolvedConfig } from "../types";

const statics: Record<string, string> = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
};

export const resolveColor = (
  value: string,
  config: ResolvedConfig,
): string | null => {
  if (value in statics) return statics[value];

  const withOpacity = value.match(/^(.+)\/(\d+(?:\.\d+)?)$/);
  if (withOpacity && withOpacity[1] in config.colors)
    return `oklch(from var(--color-${withOpacity[1]}) l c h / ${withOpacity[2]}%)`;

  if (withOpacity?.[1].startsWith("(") && withOpacity[1].endsWith(")"))
    return `oklch(from var(${withOpacity[1].slice(1, -1)}) l c h / ${withOpacity[2]}%)`;

  if (withOpacity?.[1].startsWith("[") && withOpacity[1].endsWith("]"))
    return `oklch(from ${withOpacity[1].slice(1, -1)} l c h / ${withOpacity[2]}%)`;

  if (value in config.colors) return `var(--color-${value})`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return null;
};
