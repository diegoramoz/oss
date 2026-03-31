---
id: "002"
title: localStorage persistence
prd: "0001"
status: closed
type: afk
blocked_by: ["001"]
created: 2026-03-31
---

## Parent PRD

prds/0001-amortization-calculator/PRD.md

## What to build

Add localStorage persistence to the amortization calculator. On page mount, read the `"amortization-inputs"` key and populate the form with the previously saved values. After each successful Calculate, write the current inputs back. Handle first-visit and malformed JSON gracefully with try/catch.

No new files needed — extend `src/app/tools/amortization/page.tsx` with a `useEffect` for reading on mount and a write in the Calculate handler.

## Acceptance criteria

- [ ] On first visit (empty localStorage), the form renders with default values and no errors
- [ ] After a user calculates and returns to the page, their last inputs (loan amount, term years, term months, interest rate) are pre-populated
- [ ] Inputs are written to `localStorage` key `"amortization-inputs"` as JSON after each successful Calculate
- [ ] A malformed value in `"amortization-inputs"` (e.g. corrupted JSON) does not crash the page or produce a console error — graceful fallback to defaults
- [ ] Clicking Clear does NOT erase localStorage (saved inputs survive a Clear + page reload)

## Blocked by

- ISSUE-001

## User stories addressed

- User story 16 (restore last-entered inputs on return visit)

## Completion

Extended `src/app/tools/amortization/page.tsx` with localStorage persistence.

**Key decisions:**
- `loadInputs()` helper wraps localStorage + JSON.parse in try/catch; falls back to `DEFAULT_INPUTS` on first visit or malformed JSON.
- `useEffect(loadInputs, [])` populates state on mount without SSR issues.
- `handleCalculate` calls `localStorage.setItem` after computing results — only persists valid inputs.
- `handleClear` intentionally does NOT touch localStorage per spec.
- `STORAGE_KEY = "amortization-inputs"` matches the spec exactly.

**Files changed:**
- `src/app/tools/amortization/page.tsx`
