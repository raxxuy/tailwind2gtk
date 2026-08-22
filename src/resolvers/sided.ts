interface SidedPropertyResolverProps<T, P extends string = string> {
  allowBare?: boolean;
  allowNegative?: boolean;
  formatProperty?: (property: P, resolved: T) => T;
  resolveValue: (value: string) => T | null;
  sideMap: Record<string, P[]>;
  utility: string;
}

export const resolveSidedProperty = <T, P extends string = string>({
  utility,
  sideMap,
  resolveValue,
  allowNegative = false,
  allowBare = false,
  formatProperty,
}: SidedPropertyResolverProps<T, P>): Record<string, T> | null => {
  const negative = allowNegative && utility.startsWith("-");
  const rest = negative ? utility.slice(1) : utility;
  if (!allowNegative && utility.startsWith("-")) return null;

  const prefixes = Object.keys(sideMap).sort((a, b) => b.length - a.length);
  const dashPrefix = prefixes.find((p) => rest.startsWith(`${p}-`));

  if (dashPrefix) {
    const rawValue = rest.slice(dashPrefix.length + 1);
    const resolved = resolveValue(`${negative ? "-" : ""}${rawValue}`);
    if (!resolved) return null;

    return Object.fromEntries(
      sideMap[dashPrefix].map((p) => [
        p,
        formatProperty ? formatProperty(p, resolved) : resolved,
      ]),
    );
  }

  if (allowBare && prefixes.includes(rest)) {
    const resolved = resolveValue("");
    if (!resolved) return null;

    return Object.fromEntries(
      sideMap[rest].map((p) => [
        p,
        formatProperty ? formatProperty(p, resolved) : resolved,
      ]),
    );
  }

  return null;
};
