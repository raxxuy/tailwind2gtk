import type { ResolvedConfig } from "../types/config";

export const generateKeyframes = (config: ResolvedConfig): string => {
  const keyframes = [];

  for (const [name, steps] of Object.entries(config.extra.keyframes)) {
    const body = steps
      .map(({ selector, declarations }) => {
        const decls = declarations
          .map(({ property, value }) => `    ${property}: ${value};`)
          .join("\n");
        return `  ${selector} {\n${decls}\n  }`;
      })
      .join("\n");

    keyframes.push(`@keyframes ${name} {\n${body}\n}`);
  }

  return keyframes.join("\n");
};
