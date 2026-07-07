export interface TailwindConfig {
  theme?: {
    animation?: Record<string, string>;
    apply?: Record<string, string | string[]>;
    blur?: Record<string, string>;
    borderRadius?: Record<string, string>;
    boxShadow?: Record<string, string>;
    colors?: Record<string, string>;
    container?: {
      screens?: Record<string, string>;
    };
    dropShadow?: Record<string, string>;
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
  blurSizes: Record<string, string>;
  borderRadii: Record<string, string>;
  boxShadows: Record<string, string>;
  colors: Record<string, string>;
  containerSizes: Record<string, string>;
  dropShadows: Record<string, string>;
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
