import { gradientVars } from "../../helpers/gradientVars";
import { resolveColor } from "../../helpers/resolveColor";
import type { CSSRule, ResolvedConfig } from "../../types";

const directions: Record<string, string> = {
  t: "to top",
  tr: "to top right",
  r: "to right",
  br: "to bottom right",
  b: "to bottom",
  bl: "to bottom left",
  l: "to left",
  tl: "to top left",
};

const colorSpaces = [
  "srgb",
  "hsl",
  "oklab",
  "oklch",
  "longer",
  "shorter",
  "increasing",
  "decreasing",
];

export const resolveBackgroundImage = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  if (utility === "bg-none")
    return [{ selector: "", properties: { "background-image": "none" } }];

  const customVar = utility.match(/^bg-\(image:(--[^)]+)\)$/);
  if (customVar)
    return [
      {
        selector: "",
        properties: { "background-image": `var(${customVar[1]})` },
      },
    ];

  const arbitrary = utility.match(/^bg-\[(.+)\]$/);
  if (arbitrary)
    return [
      {
        selector: "",
        properties: { "background-image": arbitrary[1].replace(/_/g, " ") },
      },
    ];

  const linearDirection = utility.match(
    /^bg-linear-to-([a-z]+)(?:\/([\w]+))?$/,
  );
  if (linearDirection) {
    const dir = directions[linearDirection[1]];
    if (!dir) return null;
    const space =
      linearDirection[2] && colorSpaces.includes(linearDirection[2])
        ? ` in ${linearDirection[2]}`
        : "";
    return [
      {
        selector: "",
        properties: {
          "background-image": `linear-gradient(${dir}${space}, var(--gradient-stops))`,
        },
      },
    ];
  }

  const linearAngle = utility.match(/^(-?)bg-linear-(\d+)(?:\/([\w]+))?$/);
  if (linearAngle) {
    const sign = linearAngle[1] ? "-" : "";
    const angle = `${sign}${linearAngle[2]}deg`;
    const space =
      linearAngle[3] && colorSpaces.includes(linearAngle[3])
        ? linearAngle[3]
        : "oklab";
    return [
      {
        selector: "",
        properties: {
          "background-image": `linear-gradient(${angle} in ${space}, var(--gradient-stops))`,
        },
      },
    ];
  }

  const linearVar = utility.match(/^bg-linear-\((--[^)]+)\)$/);
  if (linearVar)
    return [
      {
        selector: "",
        properties: {
          "background-image": `linear-gradient(var(${linearVar[1]}), var(--gradient-stops))`,
        },
      },
    ];

  const linearArbitrary = utility.match(/^bg-linear-\[(.+)\]$/);
  if (linearArbitrary)
    return [
      {
        selector: "",
        properties: {
          "background-image": `linear-gradient(${linearArbitrary[1].replace(/_/g, " ")}, var(--gradient-stops))`,
        },
      },
    ];

  const radial = utility.match(/^bg-radial(?:\/([\w]+))?$/);
  if (radial) {
    const space =
      radial[1] && colorSpaces.includes(radial[1]) ? radial[1] : "oklab";
    return [
      {
        selector: "",
        properties: {
          "background-image": `radial-gradient(in ${space}, var(--gradient-stops))`,
        },
      },
    ];
  }

  const radialVar = utility.match(/^bg-radial-\((--[^)]+)\)$/);
  if (radialVar)
    return [
      {
        selector: "",
        properties: {
          "background-image": `radial-gradient(var(--gradient-stops, var(${radialVar[1]})))`,
        },
      },
    ];

  const radialArbitrary = utility.match(/^bg-radial-\[(.+)\]$/);
  if (radialArbitrary)
    return [
      {
        selector: "",
        properties: {
          "background-image": `radial-gradient(var(--gradient-stops, ${radialArbitrary[1].replace(/_/g, " ")}))`,
        },
      },
    ];

  const conic = utility.match(/^bg-conic(?:\/([\w]+))?$/);
  if (conic) {
    const space =
      conic[1] && colorSpaces.includes(conic[1]) ? conic[1] : "oklab";
    return [
      {
        selector: "",
        properties: {
          "background-image": `conic-gradient(from 0deg in ${space}, var(--gradient-stops))`,
        },
      },
    ];
  }

  const conicAngle = utility.match(/^(-?)bg-conic-(\d+)(?:\/([\w]+))?$/);
  if (conicAngle) {
    const sign = conicAngle[1] ? "-" : "";
    const angle = `${sign}${conicAngle[2]}deg`;
    const space =
      conicAngle[3] && colorSpaces.includes(conicAngle[3])
        ? conicAngle[3]
        : "oklab";
    return [
      {
        selector: "",
        properties: {
          "background-image": `conic-gradient(from ${angle} in ${space}, var(--gradient-stops))`,
        },
      },
    ];
  }

  const conicVar = utility.match(/^bg-conic-\((--[^)]+)\)$/);
  if (conicVar)
    return [
      {
        selector: "",
        properties: {
          "background-image": `var(${conicVar[1]})`,
        },
      },
    ];

  const conicArbitrary = utility.match(/^bg-conic-\[(.+)\]$/);
  if (conicArbitrary)
    return [
      {
        selector: "",
        properties: {
          "background-image": conicArbitrary[1].replace(/_/g, " "),
        },
      },
    ];

  return null;
};

export const resolveGradientStops = (
  utility: string,
  config: ResolvedConfig,
): CSSRule[] | null => {
  const fromColor = utility.match(/^from-(.+)$/);
  if (fromColor) {
    const resolved = resolveColor(fromColor[1], config);
    if (resolved)
      return [{ selector: "", properties: { [gradientVars.from]: resolved } }];

    const percentage = fromColor[1].match(/^(\d+(?:\.\d+)?)%$/);
    if (percentage)
      return [
        {
          selector: "",
          properties: { [gradientVars.fromPosition]: `${percentage[1]}%` },
        },
      ];
  }

  const viaColor = utility.match(/^via-(.+)$/);
  if (viaColor) {
    const resolved = resolveColor(viaColor[1], config);
    if (resolved)
      return [{ selector: "", properties: { [gradientVars.via]: resolved } }];

    const percentage = viaColor[1].match(/^(\d+(?:\.\d+)?)%$/);
    if (percentage)
      return [
        {
          selector: "",
          properties: { [gradientVars.viaPosition]: `${percentage[1]}%` },
        },
      ];
  }

  const toColor = utility.match(/^to-(.+)$/);
  if (toColor) {
    const resolved = resolveColor(toColor[1], config);
    if (resolved)
      return [{ selector: "", properties: { [gradientVars.to]: resolved } }];

    const percentage = toColor[1].match(/^(\d+(?:\.\d+)?)%$/);
    if (percentage)
      return [
        {
          selector: "",
          properties: { [gradientVars.toPosition]: `${percentage[1]}%` },
        },
      ];
  }

  return null;
};
