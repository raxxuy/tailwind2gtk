import {
  injectColorVar,
  parseAlphaSuffix,
  resolveColor,
} from "../../resolvers/color";
import { resolveToken } from "../../resolvers/token";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const resolveDropShadowValue = (
  utility: string,
  config: ResolvedConfig,
): [string, string | null] | null => {
  if (utility === "drop-shadow-none") return ["", null];

  const { base, alpha } = parseAlphaSuffix(utility);

  if (base === "drop-shadow") {
    const size = alpha
      ? `drop-shadow(0 1px 2px ${injectColorVar("rgb(0 0 0 / 0.1)", "--tw-drop-shadow-color", alpha)}) drop-shadow(0 1px 1px ${injectColorVar("rgb(0 0 0 / 0.06)", "--tw-drop-shadow-color", alpha)})`
      : "drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.1))) drop-shadow(0 1px 1px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.06)))";

    return [
      "drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))",
      size,
    ];
  }

  const match = base.match(/^drop-shadow-(.+)$/);
  if (!match) return null;
  const [, value] = match;

  const resolved = resolveToken({
    value,
    tokenMap: config["drop-shadow"],
    formatVar: (v) =>
      [
        `drop-shadow(var(--drop-shadow-${v}))`,
        `drop-shadow(${injectColorVar(config["drop-shadow"][v], "--tw-drop-shadow-color", alpha ?? undefined)})`,
      ] as [string, string],
  });

  if (!resolved) return null;

  if (typeof resolved === "string") {
    return [
      "var(--tw-drop-shadow-size)",
      `drop-shadow(${injectColorVar(resolved, "--tw-drop-shadow-color", alpha ?? undefined)})`,
    ];
  }

  return resolved;
};

export const resolveDropShadow = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveDropShadowValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-drop-shadow": value[0],
      ...(value[1] ? { "--tw-drop-shadow-size": value[1] } : {}),
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};

export const resolveDropShadowColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^drop-shadow-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-drop-shadow-color": resolved,
      "--tw-drop-shadow": "var(--tw-drop-shadow-size)",
    },
  };
};
