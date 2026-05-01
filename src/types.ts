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
    spacing?: number;
    container?: {
      screens?: Record<string, string>;
    };
  };
}

export interface ResolvedConfig {
  containerSizes: Record<string, string>;
  spacing: number;
}

export interface CacheOptions {
  cssPath?: string;
  jsonPath?: string;
  readFile: (path: string) => string | null;
  tailwindConfig?: TailwindConfig;
  writeFile: (path: string, content: string) => void;
}

export interface Plugin {
  name: string;
  options?: Omit<CacheOptions, "readFile" | "writeFile">;
  readFile: (path: string) => string | null;
  run: (classes: string[]) => void;
  scan?: (root: Gtk.Widget) => void;
  setup?: (self: Gtk.Widget) => () => void;
  writeFile: (path: string, content: string) => void;
}
