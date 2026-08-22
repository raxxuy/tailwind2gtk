import type { ResolvedConfig } from "./config";

export type VariantKind = "pseudo" | "selector" | "arbitrary" | "media";

export interface Variant {
  kind: VariantKind;
  query?: string;
  value?: string;
}

export interface ParsedClass {
  raw: string;
  utility: string;
  variants: Variant[];
}

export interface StyleRule {
  children?: StyleRule[];
  properties: Record<string, string>;
  selector?: string;
}

export interface UtilityResolverProps {
  config: ResolvedConfig;
  utility: string;
}

export const isMediaVariant = (
  v: Variant,
): v is Variant & { kind: "media"; query: string } =>
  v.kind === "media" && typeof v.query === "string";

export const isPseudoVariant = (
  v: Variant,
): v is Variant & { kind: "pseudo"; value: string } =>
  v.kind === "pseudo" && typeof v.value === "string";

export const isSelectorVariant = (
  v: Variant,
): v is Variant & { kind: "selector"; value: string } =>
  v.kind === "selector" && typeof v.value === "string";

export const isArbitraryVariant = (
  v: Variant,
): v is Variant & { kind: "arbitrary"; value: string } =>
  v.kind === "arbitrary" && typeof v.value === "string";
