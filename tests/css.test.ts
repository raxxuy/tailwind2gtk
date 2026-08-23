import { describe, expect, it } from "vitest";

import { extractApplyRules, extractThemeVariables } from "../src/css/extract";

describe("css", () => {
  it("should extract theme variables from css", () => {
    const css = `
      @theme {
        --ease-in-out: initial;
      }`;

    const variables = extractThemeVariables(css);
    expect(variables).toEqual([{ name: "--ease-in-out", value: "initial" }]);
  });

  it("should extract apply rules from css", () => {
    const css = `
      .btn {
        @apply border border-white text-white capitalize bg-zinc-800 py-2 px-4;
      }`;
    const rules = extractApplyRules(css);
    expect(rules).toEqual([
      {
        selector: "btn",
        classes: [
          "border",
          "border-white",
          "text-white",
          "capitalize",
          "bg-zinc-800",
          "py-2",
          "px-4",
        ],
      },
    ]);
  });
});
