import { LINEAR_DIRECTIONS } from "../constants";
import { resolveDynamic } from "../utils";

export const generateBackgroundImage = (cls: string): string[] | null => {
  // bg-none
  if (cls === "bg-none") return [`background-image: none`];

  // bg-[<value>]
  const sliced = cls.slice(3);
  const arbitrary = resolveDynamic(sliced);
  if (arbitrary) return [`background-image: ${arbitrary}`];

  // bg-(image:<custom-property>)
  const imageVarMatch = cls.match(/^bg-\(image:(.+)\)$/);
  if (imageVarMatch) return [`background-image: var(${imageVarMatch[1]})`];

  // bg-linear-to-* directions
  if (cls.startsWith("bg-linear-")) {
    const linearDir = cls.slice(10);

    if (linearDir in LINEAR_DIRECTIONS) {
      return [
        `background-image: linear-gradient(${LINEAR_DIRECTIONS[linearDir as keyof typeof LINEAR_DIRECTIONS]}, var(--tw-gradient-stops))`,
      ];
    }

    // bg-linear-<angle> and -bg-linear-<angle>
    const angleMatch = cls.match(/^(-?)bg-linear-([\d.]+)$/);
    if (angleMatch) {
      return [
        `background-image: linear-gradient(${angleMatch[1] ? "-" : ""}${angleMatch[2]}deg in oklab, var(--tw-gradient-stops))`,
      ];
    }

    // bg-linear-(<custom-property>) and bg-linear-[<value>]
    const dynamicMatch = cls.match(/^bg-linear-(\[.+\]|\(.+\))$/);
    if (dynamicMatch) {
      const value = resolveDynamic(dynamicMatch[1]);
      if (!value) return null;
      return [
        `background-image: linear-gradient(var(--tw-gradient-stops, ${value}))`,
      ];
    }
  }

  // bg-radial
  if (cls === "bg-radial") {
    return [
      `background-image: radial-gradient(in oklab, var(--tw-gradient-stops))`,
    ];
  }

  // bg-radial-(<custom-property>) and bg-radial-[<value>]
  const radialMatch = cls.match(/^bg-radial-(\[.+\]|\(.+\))$/);
  if (radialMatch) {
    const value = resolveDynamic(radialMatch[1]);
    if (!value) return null;
    return [
      `background-image: radial-gradient(var(--tw-gradient-stops, ${value}))`,
    ];
  }

  // bg-conic-<angle> and -bg-conic-<angle>
  const conicAngleMatch = cls.match(/^(-?)bg-conic-([\d.]+)$/);
  if (conicAngleMatch) {
    return [
      `background-image: conic-gradient(from ${conicAngleMatch[1] ? "-" : ""}${conicAngleMatch[2]}deg in oklab, var(--tw-gradient-stops))`,
    ];
  }

  // bg-conic-(<custom-property>) and bg-conic-[<value>]
  const conicDynamicMatch = cls.match(/^bg-conic-(\[.+\]|\(.+\))$/);
  if (conicDynamicMatch) {
    const value = resolveDynamic(conicDynamicMatch[1]);
    if (!value) return null;
    return [`background-image: ${value}`];
  }

  return null;
};
