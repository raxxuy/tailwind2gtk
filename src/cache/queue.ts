const queue = new Set<string>();
let writing = false;

export const enqueue = (classes: string[]): void => {
  for (const cls of classes) queue.add(cls);
};

export const drainQueue = (): string[] => {
  const drained = [...queue];
  queue.clear();
  return drained;
};

export const isWriting = (): boolean => writing;
export const setWriting = (value: boolean): void => {
  writing = value;
};
