import { resolveNumber } from "../../resolvers/number";
import { resolveSidedProperty } from "../../resolvers/sided";
import type { StyleRule, UtilityResolverProps } from "../../types";

const PADDING_PROPERTY_MAP: Record<string, string[]> = {
  p: ["padding"],
  px: ["padding-left", "padding-right"],
  py: ["padding-top", "padding-bottom"],
  pt: ["padding-top"],
  pr: ["padding-right"],
  pb: ["padding-bottom"],
  pl: ["padding-left"],
} as const;

export const resolvePadding = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const properties = resolveSidedProperty({
    utility,
    sideMap: PADDING_PROPERTY_MAP,
    resolveValue: (v) => resolveNumber(v, { fraction: false }),
  });
  return properties ? { properties } : null;
};
