# Demo Shop

A small React + TypeScript storefront used as a **test fixture**. It is not a real product and is not maintained.

## Purpose

This repository exists to exercise static analysis and code quality tooling. The code intentionally contains
a spread of maintainability, reliability, and security findings so that scans return a realistic mix of
results rather than a clean report.

Do not copy anything here into production code.

## Stack

- React 18 + TypeScript
- Vite
- Vitest

## Getting started

```bash
npm install
npm run dev
```

The app runs on http://localhost:5173.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run unit tests |

## Layout

```
src/
  api/         HTTP client
  components/  UI components
  utils/       pricing, inventory, session helpers
  types.ts     shared types
```

## Note on credentials

Any tokens, keys, or passwords in this repository are fabricated placeholders. They do not authenticate
against anything.
