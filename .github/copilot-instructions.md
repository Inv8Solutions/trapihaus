# Trapihaus AI Coding Guide
Concise, project-specific instructions to help AI agents produce high-quality, consistent contributions.

## 1. Project Snapshot
- Framework: Next.js 15 (App Router, Turbopack) + React 19 + TypeScript.
- Styling: Tailwind CSS v4 (utility-first, no custom CSS frameworks) in `globals.css` + component classes.
- Fonts loaded via `next/font` (`Geist`, `Lexend`) in `src/app/layout.tsx` using CSS variables.
- Image handling standardized with `next/image`; remote domains configured in `next.config.ts` (`images.unsplash.com`, `github.com`). Use `<Image />` or the lightweight wrapper `AppImage` in `src/app/components/ui/AppImage.tsx`.
- Landing‑page style MVP; no backend or data fetching logic yet—content is static arrays inside components.

## 2. Directory & Component Conventions
```
src/app/
  page.tsx                // Landing page
  about/page.tsx          // About page composition
  browse/                 // Browse feature (static placeholder lists)
  components/
    layout/               // Global layout atoms (Navbar, Footerr)
    sections/             // Home/marketing sections (Hero, Cats, TopPicks, etc.)
    ui/                   // Reusable UI blocks (AboutHero, MissionVision, AppImage, etc.)
```
Guidelines:
- Co-locate presentational logic inside section files. If logic becomes stateful/shared, extract to `ui/`.
- Keep components client or server appropriately. Add "use client" only when using hooks or browser APIs.
- Use PascalCase filenames for React components.

## 3. Styling Patterns
- Tailwind utility classes only; stay consistent with existing naming (e.g., `font-lexend`, custom brand colors as hex directly when needed: `#1078CF`, `#83C12C`, `#F68109`).
- Prefer semantic grouping: structure (layout, spacing), typography, color, effects.
  Example order: `"flex items-center gap-4 px-6 py-4 rounded-2xl bg-blue-600 text-white shadow"`.
- Avoid inline `<style>` or custom CSS unless absolutely required (then consider a wrapper utility instead).

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
Provide diffs only via file edits (no pasted blobs) and keep changes minimal & purposeful.
If something is ambiguous, leave a short `// TODO:` comment with context.

Let me know if any area (data modeling, testing approach, deployment assumptions) needs clarification to expand this guide.
