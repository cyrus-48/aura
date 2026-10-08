# VUE FRONTEND — MANDATORY ENGINEERING RULES

### Aura & Oak · Vue 3 · Inertia · TypeScript · Tailwind

These rules govern every `.vue` file, every composable, every utility, and every type declaration in the frontend. They are non-negotiable. A pull request that violates any rule is rejected. There are no exceptions.

---

## RULE 1 — ONE COMPONENT, ONE RESPONSIBILITY

Every `.vue` file represents exactly one concept. A sidebar renders tabs. A form renders fields. A card renders a record. A metric card renders a number. Nothing more.

**Test:** Describe the component in one sentence. If the sentence contains "and," the component is doing too much. Split it.

**Maximum file size:** 250 lines total (template + script + style).

**Forbidden:**

- A component that fetches data and renders it.
- A component that owns tab state and renders tab content.
- A component that formats currency and renders a price.
- A component that submits a form and displays a toast.

---

## RULE 2 — PAGES ORCHESTRATE, THEY DO NOT IMPLEMENT

Files inside `resources/js/pages/` compose layout, wire props, and route between sub-views. Pages contain no business logic, no formatting utilities, no validation, and no inline data transformations.

**Maximum page size:** 80 lines of template.

**Allowed inside a page:**

- `<script setup>` that imports components, composables, and types.
- `defineProps` for incoming props.
- `useForm`, `usePage`, and composables to wire state.
- A `<template>` with a layout wrapper, a header, and child components.

**Forbidden inside a page:**

- Inline TypeScript interfaces.
- Inline helper functions such as `formatPrice` or `formatDate`.
- `v-show` for tab switching (use `v-if`).
- Direct `axios` or `fetch` calls.
- Inline `v-for` loops longer than five lines.
- Inline event handlers longer than one expression.

---

## RULE 3 — TYPES LIVE IN A SHARED FOLDER

Every TypeScript interface, type alias, and enum lives in `resources/js/types/`. Never declare a type inline in a `.vue` file, composable, or utility. Never duplicate a type across files.

**File naming:** One concept per file. `order.ts` exports `OrderData`, `OrderItemData`, `OrderStatus`.

**Type contract:** Every type mirrors a Laravel API Resource or a JSON payload the backend returns. If the backend returns a field the frontend does not consume, still declare it. The type is the single source of truth for the API contract.

**Forbidden:**

- `any` in a type declaration.
- Interfaces with more than fifteen properties (split into sub-interfaces).
- Optional fields marked with `?` unless the backend genuinely returns null or omits the field.

---

## RULE 4 — COMPOSABLES OWN STATE

All reactive state that is not purely local to a presentational component lives in a composable inside `resources/js/composables/`. This includes tab state, form state, filter state, pagination state, and modal state.

**Naming:** `useAccount`, `useCart`, `useCheckout`, `useWishlist`, `useProductFilters`, `useSearch`.

**Rules:**

- A composable accepts its initial data as arguments.
- A composable returns refs, computeds, and functions.
- A composable never returns JSX, template fragments, or markup.
- A composable never imports a `.vue` file.
- A composable never calls `usePage` unless it explicitly needs global auth or shared props, and it must document that dependency.

**Test:** A composable must be unit-testable without mounting a component. If you cannot test it without `mount()`, it is doing something wrong.

---

## RULE 5 — UTILITIES ARE PURE FUNCTIONS

Everything inside `resources/js/utils/` is a pure function. Same input, same output. No side effects. No reactivity. No DOM access. No network calls. No global state.

**Required utilities:**

- `formatPrice(value, currency)`
- `formatDate(value, format)`
- `formatRelativeTime(value)`
- `slugify(value)`
- `truncate(value, length)`
- `getInitials(name)`
- `debounce(fn, delay)`

**Forbidden:** Any utility that imports from `@inertiajs/vue3`, `vue`, or `axios`. Utilities never know about Inertia, Vue, or the network.

---

## RULE 6 — COMPONENTS ARE DUMB UNLESS THEY ARE ROUTE COMPONENTS

Every component inside `resources/js/components/` is presentational. It receives props, emits events, and renders. It does not fetch. It does not call Inertia's router. It does not know about routes. It does not own business logic.

**The only exception:** Route-level components inside `resources/js/pages/` may call `router.visit`, `router.post`, or `useForm`. Even then, the logic is delegated to a composable.

**Rule:** A component inside `components/` must be usable in a Storybook or a test harness without any Inertia provider, router, auth context, or HTTP mock.

---

## RULE 7 — COMPONENTS ARE NAMESPACED BY FEATURE

Do not flatten `components/`. Group components by the domain they belong to.

**Approved structure:**
