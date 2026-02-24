import { onCleanup } from "ags";
import type { Gtk } from "ags/gtk4";
import { kebabCase, range } from "es-toolkit";
import { type CoreOptions, createCore } from "../core";

export interface AgsOptions extends CoreOptions {
  getUsedClasses?: (widget: Gtk.Widget | Gtk.Widget[]) => string[];
}

const defaultGetUsedClasses = (widget: Gtk.Widget | Gtk.Widget[]): string[] => {
  const classes = new Set<string>();

  const traverse = (w: Gtk.Widget) => {
    w.get_css_classes().forEach((cls: string) => {
      classes.add(cls);
    });

    const children = w.observe_children();
    
    range(children.get_n_items()).forEach((i) => {
      traverse(children.get_item(i) as Gtk.Widget);
    });
  };

  Array.isArray(widget) ? widget.forEach(traverse) : traverse(widget);
  return Array.from(classes);
};

export const createAgsPlugin = (options: AgsOptions) => {
  const { getUsedClasses = defaultGetUsedClasses, ...coreOptions } = options;
  const core = createCore(coreOptions);

  const seenWidgets = new WeakSet<Gtk.Widget>();

  const loadClasses = (component: { name: string }, name?: string) => {
    const kebabName = name || kebabCase(component.name);

    return (self: Gtk.Widget) => {
      if (!seenWidgets.has(self)) {
        core.isNewComponent(kebabName);
        seenWidgets.add(self);
      }

      core.setClasses(getUsedClasses(self));

      const handler = self.connect("notify::css-classes", () =>
        core.setClasses(getUsedClasses(self)),
      );

      onCleanup(() => {
        self.disconnect(handler);
        core.flushWrite();
      });
    };
  };

  return {
    ...core,
    loadClasses,
  };
};
