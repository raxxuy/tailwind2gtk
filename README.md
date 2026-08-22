# tailwind2gtk
A Tailwind-inspired utility class generator for GTK/AGS applications. Made for leta-shell.


```
src/
├── compiler/
│   ├── apply.ts
│   ├── compile.ts
│   ├── parser.ts
│   ├── rule.ts
│   ├── escape.ts
│   └── serialize.ts
├── cache/
│   └── cache.ts
├── config/
│   ├── defaults.ts
│   ├── resolve.ts
│   └── merge.ts          # new: mergeThemeVariables + classifyVariable
├── css/
│   ├── extract.ts        # extractThemeVariables, extractApplyRules
│   └── classify.ts       # classifyVariable, namespace matching
├── resolvers/            # renamed from helpers/ — these ARE resolvers
│   ├── arbitrary.ts
│   ├── color.ts           # renamed resolveColor.ts
│   ├── gradient.ts         # renamed gradientVars.ts
│   ├── match.ts
│   ├── vars.ts             # renamed parseVars.ts
│   └── value.ts             # renamed resolveValue.ts
├── plugins/
│   ├── ags.ts
│   ├── base.ts
│   └── node.ts
├── theme/
│   ├── root.ts
│   └── variables.ts        # merge theme.ts into variables.ts if overlapping, or clarify split
├── types/
│   ├── config.ts
│   ├── core.ts
│   ├── css.ts
│   ├── index.ts
│   └── plugin.ts
└── utilities/
    └── ...unchanged, already well organized
```