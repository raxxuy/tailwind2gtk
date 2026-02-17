import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { kebabCase } from "es-toolkit";
import { type CoreOptions, createCore } from "./core";

export interface AgsOptions extends CoreOptions {
  getUsedClasses: (widget?: Gtk.Widget) => string[];
}

export const createAgsPlugin = (options: AgsOptions) => {
  const { getUsedClasses, ...coreOptions } = options;
  const core = createCore(coreOptions);

  const loadClasses = (component: { name: string }, name?: string) => {
    const kebabName = name || kebabCase(component.name);
    let isFirstRun = true;

    return (self: Gtk.Widget) => {
      if (isFirstRun) {
        core.isNewComponent(kebabName);
        isFirstRun = false;
      }

      core.setClasses(getUsedClasses(self));

      const handler = self.connect("notify::css-classes", () =>
        core.setClasses(getUsedClasses(self)),
      );

      onCleanup(() => self.disconnect(handler));
    };
  };

  return {
    ...core,
    loadClasses,
  };
};
