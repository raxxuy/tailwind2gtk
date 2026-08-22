export const TW_VARIABLES: Record<string, string> = {
  // SPACE
  "space-x": "space-x-reverse",
  "space-y": "space-y-reverse",
  // BACKGROUND
  from: "gradient-from",
  "from-position": "gradient-from-position",
  via: "gradient-via",
  "via-position": "gradient-via-position",
  to: "gradient-to",
  "to-position": "gradient-to-position",
  // BORDER
  "border-style": "border-style",
  "outline-style": "outline-style",
  "divide-x": "divide-x-reverse",
  "divide-y": "divide-y-reverse",
  // TYPOGRAPHY
  leading: "leading",
  "font-weight": "font-weight",
  ordinal: "ordinal",
  "slashed-zero": "slashed-zero",
  "lining-nums": "numeric-figure",
  "oldstyle-nums": "numeric-figure",
  "proportional-nums": "numeric-spacing",
  "tabular-nums": "numeric-spacing",
  "diagonal-fractions": "numeric-fraction",
  "stacked-fractions": "numeric-fraction",
} as const;

export const getTailwindVariable = (key: string): string | null =>
  key in TW_VARIABLES ? `--tw-${TW_VARIABLES[key]}` : null;
