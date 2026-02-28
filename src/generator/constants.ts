export const NUMERIC_VARIABLES = {
  spacing: 0.25,
  "text-xs": 0.75,
  "text-sm": 0.875,
  "text-base": 1,
  "text-lg": 1.125,
  "text-xl": 1.25,
  "text-2xl": 1.5,
  "text-3xl": 1.875,
  "text-4xl": 2.25,
  "text-5xl": 3,
  "text-6xl": 3.75,
  "text-7xl": 4.5,
  "text-8xl": 6,
  "text-9xl": 8,
  "tracking-tighter": -0.05,
  "tracking-tight": -0.025,
  "tracking-normal": 0,
  "tracking-wide": 0.025,
  "tracking-wider": 0.05,
  "tracking-widest": 0.1,
  "radius-xs": 0.125,
  "radius-sm": 0.25,
  "radius-md": 0.375,
  "radius-lg": 0.5,
  "radius-xl": 0.75,
  "radius-2xl": 1,
  "radius-3xl": 1.5,
  "radius-4xl": 2,
  "container-3xs": 16,
  "container-2xs": 18,
  "container-xs": 20,
  "container-sm": 24,
  "container-md": 28,
  "container-lg": 32,
  "container-xl": 36,
  "container-2xl": 42,
  "container-3xl": 48,
  "container-4xl": 56,
  "container-5xl": 64,
  "container-6xl": 72,
  "container-7xl": 80,
} as const;

export const CSS_VARIABLES = {
  "tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
  "tw-gradient-from": "",
  "tw-gradient-via": "",
  "tw-gradient-to": "",
  "tw-gradient-from-position": "",
  "tw-gradient-via-position": "",
  "tw-gradient-to-position": "",
  "shadow-2xs": "0 1px rgb(0 0 0 / 0.05)",
  "shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  "shadow-sm": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  "shadow-md":
    "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  "shadow-lg":
    "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  "shadow-xl":
    "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "text-shadow-2xs": "0px 1px 0px rgb(0 0 0 / 0.15)",
  "text-shadow-xs": "0px 1px 1px rgb(0 0 0 / 0.2)",
  "text-shadow-sm":
    "0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075)",
  "text-shadow-md":
    "0px 1px 1px rgb(0 0 0 / 0.1), 0px 1px 2px rgb(0 0 0 / 0.1), 0px 2px 4px rgb(0 0 0 / 0.1)",
  "text-shadow-lg":
    "0px 1px 2px rgb(0 0 0 / 0.1), 0px 3px 2px rgb(0 0 0 / 0.1), 0px 4px 8px rgb(0 0 0 / 0.1)",
  "drop-shadow-xs": "0 1px 1px rgb(0 0 0 / 0.05)",
  "drop-shadow-sm": "0 1px 2px rgb(0 0 0 / 0.15)",
  "drop-shadow-md": "0 3px 3px rgb(0 0 0 / 0.12)",
  "drop-shadow-lg": "0 4px 4px rgb(0 0 0 / 0.15)",
  "drop-shadow-xl": "0 9px 7px rgb(0 0 0 / 0.1)",
  "drop-shadow-2xl": "0 25px 25px rgb(0 0 0 / 0.15)",
  "blur-xs": "4px",
  "blur-sm": "8px",
  "blur-md": "12px",
  "blur-lg": "16px",
  "blur-xl": "24px",
  "blur-2xl": "40px",
  "blur-3xl": "64px",
  "default-transition-timing-function": "cubic-bezier(0.4, 0, 0.2, 1)",
  "default-transition-duration": "150ms",
  "ease-in": "cubic-bezier(0.4, 0, 1, 1)",
  "ease-out": "cubic-bezier(0, 0, 0.2, 1)",
  "ease-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
  "animate-spin": "spin 1s linear infinite",
  "animate-ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
  "animate-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  "animate-bounce": "bounce 1s infinite",
} as const;


export const CONTAINER_SIZES = new Set(
  Object.keys(NUMERIC_VARIABLES).filter((k) => k.startsWith("container-")),
);

export const RADIUS_SIZES = new Set(
  Object.keys(NUMERIC_VARIABLES).filter((k) => k.startsWith("radius-")),
);

export const TEXT_SIZES = new Set(
  Object.keys(NUMERIC_VARIABLES).filter((k) => k.startsWith("text-")),
);

export const TRACKING_SIZES = new Set(
  Object.keys(NUMERIC_VARIABLES).filter((k) => k.startsWith("tracking-")),
);

export const SHADOW_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("shadow-")),
);

export const DROP_SHADOW_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("drop-shadow-")),
);

export const TEXT_SHADOW_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("text-shadow-")),
);

export const BLUR_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("blur-")),
);

export const EASE_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("ease-")),
);

export const ANIMATE_SIZES = new Set(
  Object.keys(CSS_VARIABLES).filter((k) => k.startsWith("animate-")),
);

export const COLOR_KEYWORDS = {
  inherit: "inherit",
  current: "currentColor",
  transparent: "transparent",
} as const;

export const LINEAR_DIRECTIONS = {
  "to-t": "to top",
  "to-tr": "to top right",
  "to-r": "to right",
  "to-br": "to bottom right",
  "to-b": "to bottom",
  "to-bl": "to bottom left",
  "to-l": "to left",
  "to-tl": "to top left",
} as const;

/* BACKGROUNDS */
export const BACKGROUND_BOX_KEYWORDS = {
  border: "border-box",
  padding: "padding-box",
  content: "content-box",
} as const;

export const BACKGROUND_POSITION_KEYWORDS = {
  "top-left": "top left",
  top: "top",
  "top-right": "top right",
  left: "left",
  center: "center",
  right: "right",
  "bottom-left": "bottom left",
  bottom: "bottom",
  "bottom-right": "bottom right",
} as const;

export const BACKGROUND_REPEAT_KEYWORDS = {
  "bg-repeat": "repeat",
  "bg-repeat-x": "repeat-x",
  "bg-repeat-y": "repeat-y",
  "bg-repeat-space": "space",
  "bg-repeat-round": "round",
  "bg-no-repeat": "no-repeat",
} as const;

export const BACKGROUND_SIZE_KEYWORDS = {
  "bg-auto": "auto",
  "bg-cover": "cover",
  "bg-contain": "contain",
} as const;

/* SIZING */
export const SIZING_KEYWORDS = {
  auto: "auto",
  full: "100%",
} as const;

/* SPACING */
export const DIRECTIONS = {
  "": [""],
  x: ["left", "right"],
  y: ["top", "bottom"],
  t: ["top"],
  b: ["bottom"],
  l: ["left"],
  r: ["right"],
} as const;

/* BORDERS */
export const LINE_STYLES = {
  solid: "solid",
  dashed: "dashed",
  dotted: "dotted",
  double: "double",
  hidden: "hidden",
  none: "none",
} as const;

export const RADIUS_KEYWORDS = {
  none: "0",
  full: "9999px",
} as const;

export const ROUNDED_DIRECTIONS = {
  "": [""],
  t: ["top-left", "top-right"],
  r: ["top-right", "bottom-right"],
  b: ["bottom-left", "bottom-right"],
  l: ["top-left", "bottom-left"],
  tl: ["top-left"],
  tr: ["top-right"],
  bl: ["bottom-left"],
  br: ["bottom-right"],
} as const;

/* TYPOGRAPHY */
export const FONT_WEIGHTS = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const FONT_STRETCH_KEYWORDS = {
  "ultra-condensed": "ultra-condensed",
  "extra-condensed": "extra-condensed",
  condensed: "condensed",
  "semi-condensed": "semi-condensed",
  normal: "normal",
  "semi-expanded": "semi-expanded",
  expanded: "expanded",
  "extra-expanded": "extra-expanded",
  "ultra-expanded": "ultra-expanded",
} as const;

export const FONT_VARIANT_NUMERIC = {
  "normal-nums": "normal",
  ordinal: "ordinal",
  "slashed-zero": "slashed-zero",
  "lining-nums": "lining-nums",
  "oldstyle-nums": "oldstyle-nums",
  "proportional-nums": "proportional-nums",
  "tabular-nums": "tabular-nums",
  "diagonal-fractions": "diagonal-fractions",
  "stacked-fractions": "stacked-fractions",
} as const;

export const TEXT_DECORATIONS = {
  "no-underline": "none",
  underline: "underline",
  overline: "overline",
  "line-through": "line-through",
} as const;

export const TEXT_DECORATION_STYLES = {
  solid: "solid",
  double: "double",
  dotted: "dotted",
  dashed: "dashed",
  wavy: "wavy",
} as const;

export const TEXT_TRANSFORMS = {
  "normal-case": "none",
  uppercase: "uppercase",
  lowercase: "lowercase",
  capitalize: "capitalize",
} as const;

/* EFFECTS */
export const BACKGROUND_BLEND_MODE_KEYWORDS = {
  "bg-blend-normal": "normal",
  "bg-blend-multiply": "multiply",
  "bg-blend-screen": "screen",
  "bg-blend-overlay": "overlay",
  "bg-blend-darken": "darken",
  "bg-blend-lighten": "lighten",
  "bg-blend-color-dodge": "color-dodge",
  "bg-blend-color-burn": "color-burn",
  "bg-blend-hard-light": "hard-light",
  "bg-blend-soft-light": "soft-light",
  "bg-blend-difference": "difference",
  "bg-blend-exclusion": "exclusion",
  "bg-blend-hue": "hue",
  "bg-blend-saturation": "saturation",
  "bg-blend-color": "color",
  "bg-blend-luminosity": "luminosity",
} as const;

/* TRANSITIONS */
export const TRANSITION_PROPERTIES = {
  "": "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events",
  all: "all",
  colors:
    "color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to",
  opacity: "opacity",
  shadow: "box-shadow",
  transform: "transform, translate, scale, rotate",
  none: "none",
} as const;
