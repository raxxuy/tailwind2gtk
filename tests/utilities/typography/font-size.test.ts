import { describe, expect, it } from "vitest";

import { defaults } from "@/config/defaults";
import { resolveFontSize } from "@/utilities/typography";

describe("generate font size utilities", () => {
  it("generates a variable font size utility", () => {
    expect(
      resolveFontSize({
        utility: "text-(length:--test-font)",
        config: defaults,
      }),
    ).toMatchInlineSnapshot(`
      {
        "properties": {
          "font-size": "var(--test-font)",
        },
      }
    `);
  });

  it("generates a variable font size utility with length", () => {
    expect(
      resolveFontSize({ utility: "text-(--test-font)", config: defaults }),
    ).toMatchInlineSnapshot(`null`);
  });
});
``;
