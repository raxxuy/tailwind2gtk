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

  const withOpacity = value.match(/^([\w-]+)\/(\d+(?:\.\d+)?)$/);
  if (withOpacity && withOpacity[1] in config.colors) {
    const inner = config.colors[withOpacity[1]].replace(
      /^oklch\((.+)\)$/,
      "$1",
    );
    return `oklch(${inner} / ${withOpacity[2]}%)`;
  }

  if (value in config.colors) return `var(--color-${value})`;

  if (value.startsWith("(") && value.endsWith(")"))
    return `var(${value.slice(1, -1)})`;

  if (value.startsWith("[") && value.endsWith("]"))
    return value.slice(1, -1).replace(/_/g, " ");

  return null;
};
