export const escapeClassName = (cls: string): string => {
  return cls.replace(/[:[\]()/&.!>]/g, "\\$&");
};
