import type { Gtk } from "ags/gtk4";

export type Variant =
  | { kind: "pseudo"; value: string }
  | { kind: "arbitrary"; value: string }
  | { kind: "media"; query: string };

export interface ParsedClass {
  raw: string;
  utility: string;
  variants: Variant[];
}

export interface CSSRule {
  children?: CSSRule[];
  mediaQuery?: string;
  properties: Record<string, string>;
  selector: string;
}

export interface TailwindConfig {
  theme?: {
    animation?: Record<string, string>;
    apply?: Record<string, string | string[]>;
    borderRadius?: Record<string, string>;
    boxShadow?: Record<string, string>;
    colors?: Record<string, string>;
    container?: {
      screens?: Record<string, string>;
    };
    fontFamily?: Record<string, string[]>;
    fontSize?: Record<string, [string, string]>;
    fontWeight?: Record<string, string>;
    insetBoxShadow?: Record<string, string>;
    keyframes?: Record<string, Record<string, Record<string, string>>>;
    letterSpacing?: Record<string, string>;
    spacing?: string;
    textShadow?: Record<string, string>;
    transitionTimingFunction?: Record<string, string>;
  };
}

export interface ResolvedConfig {
  animations: Record<string, string>;
  apply?: Record<string, string | string[]>;
  borderRadii: Record<string, string>;
  boxShadows: Record<string, string>;
  colors: Record<string, string>;
  containerSizes: Record<string, string>;
  fontFamilies: Record<string, string[]>;
  fontSizes: Record<string, [string, string]>;
  fontWeights: Record<string, string>;
  insetBoxShadows: Record<string, string>;
  keyframes: Record<string, Record<string, Record<string, string>>>;
  letterSpacings: Record<string, string>;
  spacing: string;
  textShadows: Record<string, string>;
  transitionTimingFunctions: Record<string, string>;
}

export interface CacheOptions {
  cssPath?: string;
  jsonPath?: string;
  onCacheUpdate?: (
    cache: Record<string, string>,
    config: ResolvedConfig,
  ) => void;
  readFile: (path: string) => string | null;
  resolveVarsFrom?: string;
  tailwindConfig?: TailwindConfig;
  themePath?: string;
  writeFile: (path: string, content: string) => Promise<void>;
}

export interface Plugin {
  cleanupWidget?: (widget: GObject.Object) => void;
  name: string;
  options?: Omit<CacheOptions, "readFile" | "writeFile">;
  readFile: (path: string) => string | null;
  run: (classes: string[]) => Promise<void>;
  scan?: (root: Gtk.Widget) => void;
  unscan?: (root: Gtk.Widget) => void;
  writeFile: (path: string, content: string) => Promise<void>;
}
