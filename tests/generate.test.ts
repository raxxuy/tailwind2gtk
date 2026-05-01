import { describe, expect, it } from "vitest";
import { generateCSS } from "../src/core/generate";

describe("generateCSS", () => {
  it("handles p-4", () => {
    expect(generateCSS(["p-4"])).toEqual({
      "p-4": `.p-4 {\n  padding: calc(var(--spacing) * 4);\n}`,
    });
  });

  it("handles px-2", () => {
    expect(generateCSS(["px-2"])).toEqual({
      "px-2": `.px-2 {\n  padding-left: calc(var(--spacing) * 2);\n  padding-right: calc(var(--spacing) * 2);\n}`,
    });
  });

  it("handles p-[12px]", () => {
    expect(generateCSS(["p-[12px]"])).toEqual({
      "p-[12px]": `.p-\\[12px\\] {\n  padding: 12px;\n}`,
    });
  });

  it("handles p-(--my-var)", () => {
    expect(generateCSS(["p-(--my-var)"])).toEqual({
      "p-(--my-var)": `.p-\\(--my-var\\) {\n  padding: var(--my-var);\n}`,
    });
  });

  it("handles m-4", () => {
    expect(generateCSS(["m-4"])).toEqual({
      "m-4": `.m-4 {\n  margin: calc(var(--spacing) * 4);\n}`,
    });
  });

  it("handles -mt-2", () => {
    expect(generateCSS(["-mt-2"])).toEqual({
      "-mt-2": `.-mt-2 {\n  margin-top: calc(var(--spacing) * -2);\n}`,
    });
  });

  it("handles hover:p-4", () => {
    expect(generateCSS(["hover:p-4"])).toEqual({
      "hover:p-4": `.hover\\:p-4:hover {\n  padding: calc(var(--spacing) * 4);\n}`,
    });
  });

  it("handles dark:p-4", () => {
    expect(generateCSS(["dark:p-4"])).toEqual({
      "dark:p-4": `@media (prefers-color-scheme: dark) {\n  .dark\\:p-4 {\n    padding: calc(var(--spacing) * 4);\n  }\n}`,
    });
  });
});
