type ColorMap = Record<string, string>;
type ColorProps = Record<string, string>;
type ColorVariants = Record<string, string>;

interface ColorConfig {
  colors: ColorMap;
  props?: ColorProps;
  variants?: ColorVariants;
}

const DEFAULT_PROPS: ColorProps = {
  bg: "background-color",
  text: "color",
  border: "border-color",
  outline: "outline-color",
};

const DEFAULT_VARIANTS: ColorVariants = {
  "": "",
  dark: "dark",
  darker: "darker",
  light: "light",
  lighter: "lighter",
};

let config: ColorConfig = {
  colors: {},
  props: DEFAULT_PROPS,
  variants: DEFAULT_VARIANTS,
};

export const configureColors = (userConfig: ColorConfig) => {
  config = {
    colors: userConfig.colors,
    props: { ...DEFAULT_PROPS, ...userConfig.props },
    variants: { ...DEFAULT_VARIANTS, ...userConfig.variants },
  };
};

export const generateColor = (cls: string): string[] | null => {
  const { colors, props = DEFAULT_PROPS, variants = DEFAULT_VARIANTS } = config;

  // Arbitrary values: bg-[#fff], text-[rgb(255,0,0)]
  const arbitraryMatch = cls.match(
    /^(bg|text|border|outline)-\[([^\]]+)\](\/(\d+))?$/,
  );

  if (arbitraryMatch) {
    const [, propKey, arbitraryValue, , opacity] = arbitraryMatch;
    const prop = props[propKey];
    if (!prop) return null;

    if (opacity) {
      const opacityVal = parseInt(opacity, 10);
      if (opacityVal < 0 || opacityVal > 100) return null;

      if (arbitraryValue.startsWith("#")) {
        const hex = arbitraryValue.slice(1);
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return [`${prop}: rgba(${r}, ${g}, ${b}, ${opacityVal / 100})`];
      } else if (arbitraryValue.startsWith("rgb")) {
        const rgbMatch = arbitraryValue.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
          return [
            `${prop}: rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${opacityVal / 100})`,
          ];
        }
      }
      return [
        `${prop}: color-mix(in srgb, ${arbitraryValue} ${opacityVal}%, transparent)`,
      ];
    }

    return [`${prop}: ${arbitraryValue}`];
  }

  // Named colors: bg-background, text-primary/80
  const variantKeys = Object.keys(variants).filter(Boolean).join("|");
  const match = cls.match(
    new RegExp(
      `^(bg|text|border|outline)-([a-z0-9-]+?)(-(?:${variantKeys}))?(\\/(\\d+))?$`,
    ),
  );

  if (!match) return null;

  const [, propKey, colorName, variant = "", , opacity] = match;
  const color = colors[colorName];
  const prop = props[propKey];

  if (!color || !prop) return null;

  const variantKey = variant.slice(1);
  const variantSuffix = variants[variantKey] || variants[""];
  const colorVar = `${color}${variantSuffix ? `_${variantSuffix}` : ""}`;

  if (opacity) {
    const opacityVal = parseInt(opacity, 10);
    if (opacityVal < 0 || opacityVal > 100) return null;
    return [
      `${prop}: color-mix(in srgb, ${colorVar} ${opacityVal}%, transparent)`,
    ];
  }

  return [`${prop}: ${colorVar}`];
};
