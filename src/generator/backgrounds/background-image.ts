import type { UtilityResult } from "../../core";
import { LINEAR_DIRECTIONS } from "../constants";
import { prop, resolveColorValue, resolveDynamic } from "../utils";

const linearGradient = (angle: string) =>
  prop([
    `background-image: linear-gradient(${angle}, var(--tw-gradient-stops))`,
  ]);

const radialGradient = (value: string) =>
  prop([
    `background-image: radial-gradient(var(--tw-gradient-stops, ${value}))`,
  ]);

const conicGradient = (angle: string) =>
  prop([
    `background-image: conic-gradient(from ${angle} in oklab, var(--tw-gradient-stops))`,
  ]);

export const generateBackgroundImage = (cls: string): UtilityResult | null => {
  if (cls === "bg-none") return prop([`background-image: none`]);
  if (cls === "bg-radial") {
    return prop([
      `background-image: radial-gradient(in oklab, var(--tw-gradient-stops))`,
    ]);
  }

  const imageVarMatch = cls.match(/^bg-\(image:(.+)\)$/);
  if (imageVarMatch) {
    return prop([`background-image: var(${imageVarMatch[1]})`]);
  }

  const arbitrary = resolveDynamic(cls.slice(3));
  if (arbitrary) return prop([`background-image: ${arbitrary}`]);

  if (cls.startsWith("bg-linear-")) {
    const rest = cls.slice(10);

    if (rest in LINEAR_DIRECTIONS) {
      return linearGradient(
        LINEAR_DIRECTIONS[rest as keyof typeof LINEAR_DIRECTIONS],
      );
    }

    const angleMatch = rest.match(/^(-?)([\d.]+)$/);
    if (angleMatch) {
      return linearGradient(`${angleMatch[1]}${angleMatch[2]}deg in oklab`);
    }

    const dynamic = resolveDynamic(rest);
    if (dynamic) {
      return prop([
        `background-image: linear-gradient(var(--tw-gradient-stops, ${dynamic}))`,
      ]);
    }
  }

  if (cls.startsWith("bg-radial-")) {
    const rest = cls.slice(10);
    const dynamic = resolveDynamic(rest);
    if (dynamic) return radialGradient(dynamic);
  }

  if (cls.startsWith("bg-conic-")) {
    const rest = cls.slice(9);

    const angleMatch = rest.match(/^(-?)([\d.]+)$/);
    if (angleMatch) return conicGradient(`${angleMatch[1]}${angleMatch[2]}deg`);

    const varMatch = rest.match(/^\((.+)\)$/);
    if (varMatch) return prop([`background-image: var(${varMatch[1]})`]);

    const arbitrary = resolveDynamic(rest);
    if (arbitrary) return prop([`background-image: ${arbitrary}`]);
  }

  return null;
};

export const generateGradientFrom = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("from-")) return null;
  const rest = cls.slice(5);

  const percentMatch = rest.match(/^([\d.]+)%$/);
  if (percentMatch) {
    return prop([`--tw-gradient-from-position: ${percentMatch[1]}%`]);
  }

  const varMatch = rest.match(/^\((.+)\)$/);
  if (varMatch) return prop([`--tw-gradient-from: var(${varMatch[1]})`]);

  const arbitrary = resolveDynamic(rest);
  if (arbitrary) return prop([`--tw-gradient-from: ${arbitrary}`]);

  const color = resolveColorValue(rest);
  if (color) return prop([`--tw-gradient-from: ${color}`]);

  return null;
};

export const generateGradientVia = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("via-")) return null;
  const rest = cls.slice(4);

  const percentMatch = rest.match(/^([\d.]+)%$/);
  if (percentMatch) {
    return prop([`--tw-gradient-via-position: ${percentMatch[1]}%`]);
  }

  const varMatch = rest.match(/^\((.+)\)$/);
  if (varMatch) return prop([`--tw-gradient-via: var(${varMatch[1]})`]);

  const arbitrary = resolveDynamic(rest);
  if (arbitrary) return prop([`--tw-gradient-via: ${arbitrary}`]);

  const color = resolveColorValue(rest);
  if (color) return prop([`--tw-gradient-via: ${color}`]);

  return null;
};

export const generateGradientTo = (cls: string): UtilityResult | null => {
  if (!cls.startsWith("to-")) return null;
  const rest = cls.slice(3);
  const percentMatch = rest.match(/^([\d.]+)%$/);
  if (percentMatch) {
    return prop([`--tw-gradient-to-position: ${percentMatch[1]}%`]);
  }

  const varMatch = rest.match(/^\((.+)\)$/);
  if (varMatch) return prop([`--tw-gradient-to: var(${varMatch[1]})`]);

  const arbitrary = resolveDynamic(rest);
  if (arbitrary) return prop([`--tw-gradient-to: ${arbitrary}`]);

  const color = resolveColorValue(rest);
  if (color) return prop([`--tw-gradient-to: ${color}`]);

  return null;
};
