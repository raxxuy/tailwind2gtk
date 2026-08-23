import {
  injectColorVar,
  parseAlphaSuffix,
  resolveColor,
} from "../../resolvers/color";
import { resolveNumber } from "../../resolvers/number";
import { resolveToken } from "../../resolvers/token";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const BOX_SHADOW_VALUE =
  "var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)";

const resolveBoxShadowValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "shadow-none") return "0 0 #0000";

  const { base, alpha } = parseAlphaSuffix(utility);

  const match = base.match(/^shadow-(.+)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.shadow,
    formatVar: (v) =>
      injectColorVar(config.shadow[v], "--tw-shadow-color", alpha ?? undefined),
  });
};

export const resolveBoxShadow = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBoxShadowValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-shadow": value,
      "box-shadow": BOX_SHADOW_VALUE,
    },
  };
};

export const resolveBoxShadowColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^shadow-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-shadow-color": resolved,
    },
  };
};

const resolveInsetShadowValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "inset-shadow-none") return "inset 0 0 #0000";

  const { base, alpha } = parseAlphaSuffix(utility);

  const match = base.match(/^inset-shadow-(.+)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config["inset-shadow"],
    formatVar: (v) =>
      injectColorVar(
        config["inset-shadow"][v],
        "--tw-inset-shadow-color",
        alpha ?? undefined,
      ),
  });
};

export const resolveInsetShadow = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveInsetShadowValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-inset-shadow": value,
      "box-shadow": BOX_SHADOW_VALUE,
    },
  };
};

export const resolveInsetShadowColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^inset-shadow-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-inset-shadow-color": resolved,
    },
  };
};

const resolveRingValue = (utility: string): string | null => {
  if (utility === "ring") return "1px";

  const match = utility.match(/^ring-(.+)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "px",
  });
};

export const resolveRing = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveRingValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-ring-shadow": `var(--tw-ring-inset,) 0 0 0 calc(${value} + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor)`,
      "box-shadow": BOX_SHADOW_VALUE,
    },
  };
};

export const resolveRingColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^ring-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-ring-color": resolved,
    },
  };
};

const resolveInsetRingValue = (utility: string): string | null => {
  if (utility === "inset-ring") return "1px";

  const match = utility.match(/^inset-ring-(.+)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "px",
  });
};

export const resolveInsetRing = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveInsetRingValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-inset-ring-shadow": `inset 0 0 0 ${value} var(--tw-inset-ring-color, currentcolor)`,
      "box-shadow": BOX_SHADOW_VALUE,
    },
  };
};

export const resolveInsetRingColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^inset-ring-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-inset-ring-color": resolved,
    },
  };
};

const resolveRingOffsetWidthValue = (utility: string): string | null => {
  const match = utility.match(/^ring-offset-(.+)$/);
  if (!match) return null;

  return resolveNumber(match[1], {
    fraction: false,
    px: false,
    spacing: false,
    unit: "px",
  });
};

export const resolveRingOffsetWidth = ({
  utility,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveRingOffsetWidthValue(utility);
  if (!value) return null;

  return {
    properties: {
      "--tw-ring-offset-width": value,
      "--tw-ring-offset-shadow":
        "var(--tw-ring-inset,) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)",
    },
  };
};

export const resolveRingOffsetColor = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const match = utility.match(/^ring-offset-(.*)$/);
  if (!match) return null;

  const resolved = resolveColor(match[1], config, "color");
  if (!resolved) return null;

  return {
    properties: {
      "--tw-ring-offset-color": resolved,
    },
  };
};
