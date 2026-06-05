import type { CSSRule, ResolvedConfig } from "../../types";

const styles = ["solid", "dashed", "dotted", "double", "hidden", "none"];

export const resolveBorderStyle = (
  utility: string,
  _config: ResolvedConfig,
): CSSRule[] | null => {
  const border = utility.match(
    /^border-(solid|dashed|dotted|double|hidden|none)$/,
  );
  if (border && styles.includes(border[1]))
    return [{ selector: "", properties: { "border-style": border[1] } }];

  const divide = utility.match(
    /^divide-(solid|dashed|dotted|double|hidden|none)$/,
  );
  if (divide && styles.includes(divide[1]))
    return [
      {
        selector: "",
        properties: {},
        children: [
          {
            selector: "& > :not(:last-child)",
            properties: { "border-style": divide[1] },
          },
        ],
      },
    ];

  return null;
};
