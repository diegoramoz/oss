---
id: "002"
title: Add all remaining primitives to the gallery
prd: "0001"
status: closed
type: afk
blocked_by: ["001"]
created: 2026-04-01
---

## Parent PRD

prds/0001-primitives-route/PRD.md

## What to build

Extend the nav config and add demo components for all remaining 13 form primitives. Each gets a card on the `/primitives` grid and a working detail page at `/primitives/[slug]`. Handle unknown slugs with a not-found state.

Primitives to add:
- `text-area-input`
- `card-number-input`
- `cvv-input`
- `currency-input`
- `decimal-input`
- `date-input`
- `date-range-input`
- `select-input`
- `choice-input`
- `username-input`
- `phone-number-input`
- `country-code-input`
- `text-input-raw`

## Acceptance criteria

- [x] All 14 primitives appear as cards on the `/primitives` grid
- [x] Each card has a distinct Lucide icon semantically matching the input type
- [x] Every primitive has a working detail page at `/primitives/[slug]`
- [x] Each detail demo renders the actual component inside a minimal self-contained form
- [x] Unknown slugs (e.g. `/primitives/does-not-exist`) show a not-found state
- [x] The sidebar lists all 14 primitives
- [x] No TypeScript errors (`tsc --noEmit` passes)

## Blocked by

- ISSUE-001

## User stories addressed

- User story 1
- User story 2
- User story 3
- User story 4
- User story 5
- User story 6

## Completion

Extended `PRIMITIVES_NAV` from 1 to 14 entries, each with a semantically chosen Lucide icon. Added 13 new self-contained demo components:

- `card-number-input-demo.tsx`
- `choice-input-demo.tsx`
- `country-code-input-demo.tsx`
- `currency-input-demo.tsx`
- `cvv-input-demo.tsx`
- `date-input-demo.tsx`
- `date-range-input-demo.tsx`
- `decimal-input-demo.tsx`
- `phone-number-input-demo.tsx`
- `select-input-demo.tsx`
- `text-area-input-demo.tsx`
- `text-input-raw-demo.tsx` (passes `useFieldContext` explicitly as required by the component API)
- `username-input-demo.tsx`

Updated `[slug]/page.tsx` `DEMO_MAP` to cover all 14 slugs. Updated the nav test to assert 14 entries and enumerate all expected slugs. 25/25 tests passing, `tsc --noEmit` clean.
