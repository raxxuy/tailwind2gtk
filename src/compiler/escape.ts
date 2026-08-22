export const escapeClass = (cls: string): string => {
  return cls.replace(/[:+*#[\]()/&.,%!>]/g, "\\$&");
};
