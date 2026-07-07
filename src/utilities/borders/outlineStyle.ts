import type { StyleRule, ResolvedConfig } from "../../types";

const styles = ["solid", "dashed", "dotted", "double", "none"];

export const resolveOutlineStyle = (
  utility: string,
  _config: ResolvedConfig,
): StyleRule[] | null => {
  const match = utility.match(/^outline-(solid|dashed|dotted|double|none)$/);
  if (match && styles.includes(match[1]))
    return [{ selector: "", properties: { "outline-style": match[1] } }];

  if (utility === "outline-hidden")
    return [
      {
        selector: "",
        properties: {
          outline: "2px solid transparent",
          "outline-offset": "2px",
        },
      },
    ];

  return null;
};
