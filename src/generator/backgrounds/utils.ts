import { INTERPOLATION_MODES } from "../constants";

export type InterpolationMode = (typeof INTERPOLATION_MODES)[number];

export const resolveInterpolationMode = (
  value: string,
): InterpolationMode | null =>
  INTERPOLATION_MODES.includes(value as InterpolationMode)
    ? (value as InterpolationMode)
    : null;

export const withInterpolation = (
  angle: string,
  mode: InterpolationMode | null,
) => (mode ? `${angle} in ${mode}` : angle);

export const splitMode = (rest: string): [string, InterpolationMode | null] => {
  const slash = rest.lastIndexOf("/");
  if (slash === -1) return [rest, null];
  const mode = resolveInterpolationMode(rest.slice(slash + 1));
  return mode ? [rest.slice(0, slash), mode] : [rest, null];
};
