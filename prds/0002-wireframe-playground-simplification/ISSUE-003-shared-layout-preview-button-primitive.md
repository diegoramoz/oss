---
id: "003"
title: Shared LayoutPreviewButton primitive
prd: "0002"
status: closed
type: afk
blocked_by: []
created: 2026-04-13
---

## Parent PRD

prds/0002-wireframe-playground-simplification/PRD.md

## What to build

Create a `LayoutPreviewButton` component in the wireframe component directory. It wraps a `<button>` with the selection ring styling — `border-primary ring-2 ring-primary ring-offset-2` when selected, `border-border hover:border-primary/50` when not. It accepts `selected`, `onClick`, and `children` props.

Update both `corner-control.tsx` and `responsive-corner-control.tsx` to use `LayoutPreviewButton` for their two option buttons, removing the duplicated border/ring class strings from both files.

## Acceptance criteria

- [ ] `LayoutPreviewButton` exists as a new file in the wireframe component directory, accepting `selected`, `onClick`, and `children`
- [ ] Both `corner-control.tsx` and `responsive-corner-control.tsx` use `LayoutPreviewButton` for their buttons
- [ ] No duplicated button border/ring class strings remain across those two files
- [ ] All corner and responsive-corner toggles render and behave identically to before

## Blocked by

None — can start immediately.

## User stories addressed

- User story 4
- User story 5

## Completion

Created `layout-preview-button.tsx` with a `LayoutPreviewButton` component wrapping a `<button>` with the shared selection ring styling. It accepts `selected`, `onClick`, and `children`. Updated both `corner-control.tsx` and `responsive-corner-control.tsx` to import and use `LayoutPreviewButton` for their two option buttons — the duplicated `border-primary ring-2 ring-primary ring-offset-2` / `border-border hover:border-primary/50` class strings are gone from both files. Removed the unused `cn` import from both updated files. Biome attribute sort order (`onClick` before `selected`) applied throughout.

## Suggested Commit

DIEGO: 003 PRD-0002 — shared LayoutPreviewButton primitive

- packages/ui/src/components/wireframe/layout-preview-button.tsx: new file with LayoutPreviewButton component
- packages/ui/src/components/wireframe/corner-control.tsx: use LayoutPreviewButton, remove duplicated button classes
- packages/ui/src/components/wireframe/responsive-corner-control.tsx: use LayoutPreviewButton, remove duplicated button classes
