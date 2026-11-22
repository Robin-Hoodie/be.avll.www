# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Website for the AVLL athletics club (avll.be). A Vue 3 + Vuetify 3 SPA (Vite, TypeScript) hosted on Netlify, with a few Netlify Functions for registrations, emails and payments. All page content lives in a separately hosted **Strapi** CMS; this repo contains no content. UI text, route paths and emails are in Dutch (nl-BE).

## Commands

Package manager is **yarn** (classic, `yarn.lock`).

- `yarn` — install dependencies
- `yarn dev` — runs `netlify dev`, which starts `vite dev` on :3000 and the Netlify Functions server on :8080 (requires the Netlify CLI)
- `yarn typecheck` — `vue-tsc --noEmit` for `src/`, plus `tsc --noEmit` in `netlify/functions` (separate tsconfig extending `@tsconfig/node18`)
- `yarn build` — typecheck, then `vite build` to `dist/`
- `yarn lint` — ESLint with `--fix`
- There is no test suite.

A husky pre-commit hook runs `yarn typecheck`.

## Architecture

### Frontend (`src/`)

- **Data flow:** Views call functions from `@/api-client` (`content.ts` for Strapi, `netlify-functions.ts` for `/api/*`). Most views use top-level `await` in `<script setup>`; `AppLayout.vue` wraps `<RouterView>` in `<Suspense>` with a loader fallback, so this works without per-view loading state.
- **Strapi response transform** (`api-client/axios.ts`): the content axios instance unwraps Strapi's `{ data }` envelope, so calls return `StrapiEntry` objects (`{ id, attributes }`) directly. It also prefixes media URLs with `VITE_BASE_URL_CONTENT` and rewrites newlines in multi-line string attributes so markdown line breaks render. Response types are generic, as in `get<T, T>(...)`, because the interceptor returns `response.data`.
- **Rich content** from Strapi is markdown, rendered with `vue-markdown-render` (see `components/title-with-content/TitleWithContent.vue`). Many simple pages are just a Strapi single type rendered through `TitleWithContent`.
- **Routing** (`router/index.ts`): Dutch paths, lazy-loaded views. `Results.vue` and `Contests.vue` are intentionally imported statically. They use `TabsPerYear`, which has a `generic` `<script>` attribute, and when that is lazy-loaded Netlify serves the chunk as `text/html`.
- Types for Strapi entities are in `src/types/*.d.ts`; `@` aliases `src/`.
- Vuetify components are auto-imported via `vite-plugin-vuetify`; SASS variables live in `src/styles/settings.scss`.

### Netlify Functions (`netlify/functions/`)

Exposed at `/api/<function-name>`. `netlify.toml` redirects `/api/*` to `/.netlify/functions/:splat`, and the Vite dev server proxies `/api` to `localhost:8080`.

- `send-registration-emails` sends a contest registration confirmation via SendGrid.
- `handle-nature-run-registration` creates a nature-run registration in Strapi, then creates a Mollie payment and returns its checkout URL. If the price is 0, it emails the participant right away and redirects to `/natuurlopen/succes`. It always sets `isPaid`, `mollieId` and `couponCode` itself, never from the request body.
- **Coupon codes** make a nature-run registration free. They live in the Strapi collection `nature-run-coupon-codes` (`code`, `isUsed`, optional `natureRun` relation), which only the `NATURE_RUN_API_KEY` token may read. A code is valid when it matches case-insensitively, is unused, and is linked to this nature run or to none. The function checks the code before creating the registration, stores it on the registration, then marks it used. `getPrice` returns 0 for any registration with a `couponCode`. An invalid code returns a 422 with a Dutch message that the form shows on the coupon field.
- `handle-nature-run-payment` is the Mollie webhook. When a payment is `paid`, it marks the registration `isPaid` in Strapi and sends the confirmation email. It skips both if the registration is already paid.
- Nature-run email subject and body are markdown templates from Strapi, converted with showdown plus a custom `replaceVars` extension that fills in `{{natureRun.date}}`-style placeholders (`utils/nature-run-email-template-parser.ts`).
- `types/index.ts` duplicates the client-side types; keep both in sync when changing Strapi models.
- Env vars are read with `defineEnvVariable` (`utils/env.ts`), which throws if one is missing. Some are comma-separated `name,email,name,email` lists, parsed with `parseArray: true`.

### Environment variables

- Frontend: `VITE_BASE_URL_CONTENT` (Strapi base URL; the functions read it too)
- Functions: `SENDGRID_API_KEY`, `MOLLIE_API_KEY`, `NATURE_RUN_API_KEY` (Strapi API token), `REGISTRATION_MAIL_REPLY_TO_LIST`, `REGISTRATION_MAIL_BCC_LIST`, `REGISTRATION_MAIL_NATURE_RUN_REPLY_TO`, `URL` (set by Netlify)
- `NGROK_URL` (local only): when set, it replaces `URL` for Mollie redirect and webhook URLs, so that Mollie can reach the local functions server through an ngrok tunnel to port 3000.
