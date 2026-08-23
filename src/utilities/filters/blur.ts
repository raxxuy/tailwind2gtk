import { resolveToken } from "../../resolvers/token";
import type {
  ResolvedConfig,
  StyleRule,
  UtilityResolverProps,
} from "../../types";

const resolveBlurValue = (
  utility: string,
  config: ResolvedConfig,
): string | null => {
  if (utility === "blur-none") return "";

  const match = utility.match(/^blur-(.*)$/);
  if (!match) return null;

  return resolveToken({
    value: match[1],
    tokenMap: config.blur,
    formatVar: (v) => `var(--blur-${v})`,
  });
};

export const resolveBlur = ({
  utility,
  config,
}: UtilityResolverProps): StyleRule | null => {
  const value = resolveBlurValue(utility, config);
  if (!value) return null;

  return {
    properties: {
      "--tw-blur": value,
      filter:
        "var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)",
    },
  };
};
