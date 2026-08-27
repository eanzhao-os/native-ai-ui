# Design Tokens — Beautiful UI

Source of truth: `app/globals.css` in this repo. Components reference color only
through these tokens, so a re-skin = editing the two token blocks.

## Color — Light (`:root`)

| Token | Value | Use |
| --- | --- | --- |
| `--page` | `#fafafb` | app background |
| `--canvas` | `#f1f2f3` | secondary background |
| `--surface` | `#ffffff` | cards, raised surfaces |
| `--inset` | `#f7f8f9` | recessed areas |
| `--hover` | `#f4f5f6` | hover fill |
| `--hover-2` | `#e7e9eb` | stronger hover / pressed |
| `--ink` | `#1f2124` | primary text |
| `--ink-2` | `#62656b` | secondary text |
| `--ink-3` | `#9a9da3` | tertiary / placeholder text |
| `--line` | `#ecedef` | hairline borders |
| `--line-strong` | `#e0e2e5` | emphasized borders |
| `--field` | `#f2f2f3` | input fields |
| `--stripe` | `#49494913` | striped overlays |
| `--stripe-bg` | `#f5f5f5` | stripe background |
| `--accent` | `#0285ff` | primary action / links |
| `--accent-ink` | `#0170dd` | accent text |
| `--accent-tint` | `#e9f3ff` | accent background tint |
| `--green` / `--green-tint` | `#189a4d` / `#e8f5ed` | success, additions |
| `--orange` / `--orange-tint` | `#ef720c` / `#fdf1e5` | warnings, pending |
| `--red` / `--red-tint` | `#e3474c` / `#fcecec` | errors, deletions |
| `--tooltip-bg` / `--tooltip-fg` | `#25272b` / `#f6f7f8` | tooltips |
| `--tooltip-muted` / `--tooltip-border` | `#a5a8ad` / `#3a3c40` | tooltip secondary |

## Color — Dark (`.dark`)

| Token | Value |
| --- | --- |
| `--page` | `#17181a` |
| `--canvas` | `#1c1d1f` |
| `--surface` | `#232427` |
| `--inset` | `#1f2022` |
| `--hover` | `#2a2b2e` |
| `--hover-2` | `#313236` |
| `--ink` | `#f2f3f4` |
| `--ink-2` | `#a5a8ad` |
| `--ink-3` | `#6c6f75` |
| `--line` | `#2e3033` |
| `--line-strong` | `#3a3c40` |
| `--field` | `#2b2c2f` |
| `--stripe` | `#ffffff0e` |
| `--stripe-bg` | `#1b1c1e` |
| `--accent` | `#3d9aff` |
| `--accent-ink` | `#7ec0ff` |
| `--accent-tint` | `#3d9aff29` |
| `--green` / `--green-tint` | `#3dbb72` / `#3dbb7224` |
| `--orange` / `--orange-tint` | `#f68f3c` / `#f68f3c24` |
| `--red` / `--red-tint` | `#ee5c61` / `#ee5c6124` |
| `--tooltip-bg` / `--tooltip-fg` | `#111214` / `#f2f3f4` |
| `--tooltip-muted` / `--tooltip-border` | `#a5a8ad` / `#2e3033` |

## Elevation (hairline-first)

```
--shadow-hairline:    0 0 0 1px var(--line);
--shadow-btn:         0 0 0 1px var(--line-strong), 0 1px 2px #1018280d;
--shadow-card:        0 0 0 1px var(--line), 0 1px 2px #1018280a, 0 2px 6px #10182808;
--shadow-raised:      0 0 0 1px var(--line), 0 2px 10px #0000000b;
--shadow-overlay:     0 0 0 1px var(--line), 0 8px 28px #0001;
--shadow-inset-field: inset 0 1px 2px #0000001f;
```

Dark mode reuses the same structure with darker blurs (see `.dark` in globals.css).

## Radius

`--radius-chip: 6px` · `--radius-control: 8px` · `--radius-card: 10px`

## Motion

- `--ease-out-strong: cubic-bezier(0.23, 1, 0.32, 1)` — entrances, state changes.
- `--ease-link: cubic-bezier(0.16, 1, 0.3, 1)` — link/hover transitions.
- Durations in the components: 100 / 150 / 200 / 250 / 300 / 400 / 500ms.
  100–150 for hover, 200–300 for state changes, 400–500 for panel entrances.

## Type

- Sans: Inter (`--font-inter`), fallback `ui-sans-serif, system-ui`.
- Mono: `ui-monospace, "SF Mono"` — code, paths, commands, queries, timers.
- UI text scale actually used by the components (most frequent first):
  13px, 12px, 12.5px, 11.5px, 11px, 10.5px; 17px for section titles; 20px page title.

## Tailwind Mapping

The `@theme inline` block in `globals.css` exposes every token as a utility
(`bg-surface`, `text-ink-2`, `shadow-card`, `rounded-card`, `ease-out-strong`…).
When adding tokens, add them in all three places: `:root`, `.dark`, `@theme inline`.
