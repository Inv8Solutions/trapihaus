# Trapihaus AI Coding Guide
Concise, project-specific instructions to help AI agents produce high-quality, consistent contributions.

## 1. Project Snapshot
- Framework: Next.js 15 (App Router, Turbopack) + React 19 + TypeScript.
- Styling: Tailwind CSS v4 (utility-first, no custom CSS frameworks) in `globals.css` + component classes.
- Fonts loaded via `next/font` (`Geist`, `Lexend`) in `src/app/layout.tsx` using CSS variables.
- Image handling standardized with `next/image`; remote domains configured in `next.config.ts` (`images.unsplash.com`, `github.com`). Use `<Image />` or the lightweight wrapper `AppImage` in `src/app/components/ui/AppImage.tsx`.
- Landing-page style MVP; no backend or data fetching logic yet—content is static arrays inside components.

## 2. Directory & Component Conventions

```
src/app/
page.tsx // Landing page
about/page.tsx // About page composition
browse/ // Browse feature (static placeholder lists)
components/
layout/ // Global layout atoms (Navbar, Footerr)
sections/ // Home/marketing sections (Hero, Cats, TopPicks, etc.)
ui/ // Reusable UI blocks (AboutHero, MissionVision, AppImage, etc.)
```
Guidelines:
- Co-locate presentational logic inside section files. If logic becomes stateful/shared, extract to `ui/`.
- Keep components client or server appropriately. Add `"use client"` only when using hooks or browser APIs.
- Use PascalCase filenames for React components.

## 3. Styling Patterns
- Tailwind utility classes only; stay consistent with existing naming (e.g., `font-lexend`, custom brand colors as hex directly when needed: `#1078CF`, `#83C12C`, `#F68109`).
- Prefer semantic grouping: structure (layout, spacing), typography, color, effects.  
  Example order: `"flex items-center gap-4 px-6 py-4 rounded-2xl bg-blue-600 text-white shadow"`.
- Avoid inline `<style>` or custom CSS unless absolutely required (then consider a wrapper utility instead).
- take note of the responsiveness to mobile view

## 4. Images & Media
- Never add raw `<img>`; always use `next/image` (or `AppImage`). Provide either explicit `width`/`height` or `fill` with a sized/relative parent.
- Add new external image domains to `next.config.ts > images.remotePatterns`.
- For decorative background images inside cards/sections, using a `div` with Tailwind background utilities is acceptable.

## 5. Data & Props
- Temporary/mock data lives inline inside the component (arrays of objects). If reused in >2 places, extract to `src/app/lib/` (create folder if missing) as a typed constant.
- Use explicit TypeScript interfaces for props (see `TopPicks.tsx`, `Iridescence.tsx`). Keep them local unless reused.
- Remove unused variables immediately; lint is strict (`@typescript-eslint/no-unused-vars`).

## 6. Performance & Accessibility
- Provide descriptive `alt` text for all images; if decorative, use empty string `""`.
- Avoid excessively large remote images; request width/height via query params (Unsplash examples already do this).
- Keep interactive elements as `<button>` or `<a>` appropriately; ensure focus styles not removed.

## 7. Adding New Sections
Checklist:
1. Create file under `src/app/components/sections/Name.tsx`.
2. Add `"use client";` only if using hooks, state, refs, or browser APIs.
3. Define a small `interface` for props (even if empty for now) to future-proof.
4. Use Tailwind utilities; match spacing scale used elsewhere (`py-16`, `mb-8`, etc.).
5. Use `<Image />` for media assets.
6. Export default component; import & compose it in the relevant page (`page.tsx` or `about/page.tsx`).

## 8. Lint & Build Workflow
Commands:
- Dev: `npm run dev` (Turbopack)
- Build: `npm run build`
- Lint: `npm run lint`
CI Expectations:
- Zero ESLint errors (warnings acceptable for deliberate TODOs, but prefer fixing image and unused-var warnings immediately).
- Use `const` whenever variables are not reassigned (rule enforced—see fix in `Iridescence.tsx`).

## 9. Common Patterns & Examples
Reusable animated canvas effect: see `Iridescence.tsx` (three.js alternative using `ogl`). When adding similar WebGL utilities:
- Guard on `ref.current`.
- Clean up event listeners + animation frame + WebGL context (`WEBGL_lose_context`).

Property listing cards: pattern defined in `TopPicks.tsx` & `browse/Accomodation.tsx`:
- Structure: container > image wrapper > badge(s) > content (title, location, price, action button).
- Ratings use inline SVG star; keep consistent sizing (`w-4 h-4`).

Responsive grid pattern: use `grid grid-cols-1 md:grid-cols-2` or `md:grid-cols-3` with `gap-4/6` and explicit height utilities when creating masonry-like layouts (see `Discover.tsx`).

## 10. When Refactoring
- If more than ~150 lines and multiple logical subsections, split into smaller components in `ui/` or internal subcomponents.
- Extract duplicated brand color sets into a TS mapping only after ≥3 repetitions.
- Do not introduce state management libraries yet; simple `useState` + props drilling is fine for MVP stage.

## 11. Introducing New Dependencies
Ask before adding. Acceptable categories: lightweight animation, accessibility helpers, date utilities. Avoid large UI kits or state libraries; Tailwind + custom components are the strategy.

## 12. Future-Proof Hooks (Optional Guidance)
If adding async data later, co-locate fetch logic in `src/app/lib/` with a thin server function and call in a Server Component when possible; hydrate client pieces only where interaction required.

---

## 13. Linting & Quality Enforcement
- ESLint + TypeScript rules are strict; maintain a **zero-error** policy before pushing.  
- To automatically fix common issues, use:
  ```bash
  npm run lint -- --fix
  ```

## 14. Security & Data Protection Guidelines

Follow these practices for all code touching user data, authentication, or payment logic:

🔐 General

Never commit API keys, Firebase configs, or tokens directly.
Store secrets in .env.local and access via process.env.

Avoid exposing environment variables on the client unless they start with NEXT_PUBLIC_.

Don’t log sensitive user data in console.log() or error traces.

🧾 Payment Handling

All payment or transaction logic must occur via trusted third-party SDKs (e.g., Stripe Checkout, PayPal SDK).

Never store card numbers or payment tokens in local state or Firestore.

Sanitize all user-submitted form data before sending to APIs.

👤 Authentication

Use Firebase Auth or NextAuth.js (recommended when backend introduced).

Verify onAuthStateChanged responses server-side before showing protected UI.

Don’t rely solely on client-side conditions for route access; always add guards on both ends.

🧱 Database & API Safety

Validate and sanitize all Firestore writes; use Firestore Security Rules or server validation.

For form submissions, escape HTML entities and strip scripts (DOMPurify if needed).

When fetching or displaying user-generated content, prefer dangerouslySetInnerHTML={undefined}.

🔒 Privacy

Follow minimum data retention: store only what’s needed.

When building analytics or telemetry, anonymize user identifiers.

If adding cookies or sessions, configure them as:

{ secure: true, httpOnly: true, sameSite: "strict" }


Provide visible privacy disclaimers for all user-facing data inputs.

### HTTP Security Headers (Recommended)
We ship with strict-but-practical defaults using `headers()` in `next.config.ts`. CSP may require tuning as features are added.

Set the following headers for all routes:
- Strict-Transport-Security: `max-age=31536000; includeSubDomains; preload`
- X-Content-Type-Options: `nosniff`
- X-Frame-Options: `DENY`
- Referrer-Policy: `no-referrer`
- Permissions-Policy: `geolocation=(), camera=(), microphone=()`
- Content-Security-Policy (baseline):
  - `default-src 'self'`
  - `script-src 'self' 'unsafe-eval' 'wasm-unsafe-eval'` (dev only; remove `unsafe-eval` in prod)
  - `style-src 'self' 'unsafe-inline'`
  - `img-src 'self' https://images.unsplash.com https://github.com data:`
  - `font-src 'self' data:`
  - `connect-src 'self'` (relax for Firebase/analytics if needed)
  - `frame-ancestors 'none'`

Note: If Firebase, analytics, or third-party APIs are added, extend `connect-src` (and potentially `script-src`/`img-src`) to include their domains explicitly.

### Client vs Server Secrets
- Put all server-only secrets (DB URLs, JWT secrets, admin tokens) in `.env.local` without `NEXT_PUBLIC_` and access them only in:
  - Route Handlers (`app/api/**/route.ts`),
  - Server Components, or
  - Middleware/Edge functions.
- Only expose values with the `NEXT_PUBLIC_` prefix if they are truly safe for the client.
- Never log secrets; rotate compromised keys immediately.

### Input Handling for APIs
- Validate every request server-side. Use a schema validator (e.g., `zod`) with:
  - Required fields, max lengths, allowed enums,
  - Numeric ranges, and
  - Whitelists for content types on uploads.
- Sanitize/escape all user strings you render. Prefer not to use `dangerouslySetInnerHTML`. If necessary, sanitize with DOMPurify server-side.
- Enforce request size limits for JSON and uploads; reject oversized payloads.
- For file uploads: check MIME type and extension, limit count/size, store outside web root, and generate new filenames.

### Authentication Hardening
- If using Firebase or NextAuth:
  - Enforce server-side session verification on API routes and protected pages.
  - Prefer HTTP-only, `SameSite=strict`, `Secure` cookies for sessions.
  - On logout, invalidate/clear sessions server-side.
- For JWTs (if used): set short expirations, rotate/refresh, and verify audience/issuer.

### CORS & CSRF
- Default to same-origin. If you must allow cross-origin, use a strict allowlist of origins and methods.
- For cookie-based auth, implement CSRF protection (framework-provided where possible) and verify CSRF tokens on state-changing requests.

### Logging & PII
- Do not log passwords, tokens, or personal data. Redact sensitive keys if logging structured payloads.
- Use conditional logging in dev only: `if (process.env.NODE_ENV !== 'production') console.log(...)`.
- Return generic error messages to clients; avoid leaking stack traces in production.

### Rate Limiting & Bot Protection
- Add IP-based rate limiting on write endpoints (auth, contact forms, listing creation). For Edge deployments, consider a KV-backed or token-bucket limiter.
- Add CAPTCHA or similar bot checks on public forms as needed.

### Dependency Hygiene
- Keep dependencies up to date. Enable Dependabot/GitHub alerts.
- Run `npm audit` and address critical/high findings promptly.

### Data Retention & Privacy
- Store only what you need and for as short as possible.
- Clearly disclose what’s collected and why. Obtain consent for analytics/cookies where required.

15. Copilot & AI Integration Notes

Copilot and AI agents should follow this file’s conventions for:

Strict linting and formatting (ESLint + Prettier + TypeScript).

Safe and minimal data handling.

Avoidance of unused imports, hardcoded secrets, or inline styles.

AI-generated code should be reviewed and tested before committing.

When adding new sections or utilities, prefer small, modular, and type-safe implementations aligned with this guide.