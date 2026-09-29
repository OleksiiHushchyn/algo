# Algo — algorithm cheat sheet

A compact, beginner-friendly algorithm field guide built with React, TypeScript,
and Vite. Topics include binary search (7 patterns, 9 practice problems), two pointers
(8 patterns, 10 practice problems), sliding window (7 patterns, 8 practice problems),
and hash maps (8 patterns, 10 practice problems).
Each has concise theory, pseudocode, diagrams,
common traps, and official LeetCode links.

Binary search’s exact-match pattern includes a step-through visualizer for a match, a missing
target, and an edge value. Two pointers includes an interactive sorted-pair search, plus diagrams for linked-list
cycles and container area. Sliding window includes separate walkthroughs for a fixed-size
sum and a variable-size window without repeated characters. Hash maps includes
step-through tables for unsorted pair lookups and prefix-sum frequencies, including
duplicate values, index zero, negative numbers, and zero-sum targets. Other topics are clearly
marked as coming later.

## Getting started

Use Node.js 24 (recommended, pinned in `.nvmrc`) or a supported Node.js release
at least 22.13 (excluding Node 23). The default Node.js 16 on this machine is too old.

```sh
cd /Users/oleksii.hushchyn/WebstormProjects/algo
nvm install
nvm use
npm ci
npm run dev
```

Open the local URL printed by Vite. `/` lists topics; `/topics/binary-search`
opens the first lesson. `/topics/two-pointers` opens the second, and
`/topics/sliding-window` opens the third. `/topics/hash-maps` opens the fourth.
Link directly to a pattern, for example
`/topics/sliding-window?pattern=unique`.
Dependencies are locked in `package-lock.json`; use `npm ci` for repeatable installs.

## Dependency policy

Direct dependencies use exact stable versions. `.npmrc` limits new resolutions
to releases published before September 22, 2026 (UTC), at least seven days before
this project's setup. This includes transitive dependencies.

Run `npm run deps:verify` to check every locked version against npm publication
timestamps and deprecation metadata. It rejects direct prereleases, deprecated releases,
unverified sources, and versions newer than the configured cutoff or seven days.
The evidence is recorded in `dependency-verification.json`. This requires network
access. Run `npm audit` separately to check known security advisories.

For future upgrades, advance `.npmrc`'s `before` date to at least seven days ago,
install explicit stable versions, and run `npm run deps:verify`, `npm audit`, and
`npm run check`. Do not bypass peer dependency checks.

## Commands

| Command                | Purpose                                           |
| ---------------------- | ------------------------------------------------- |
| `npm run dev`          | Start Vite with hot reload                        |
| `npm run build`        | Type-check and build into `dist/`                 |
| `npm run preview`      | Serve the production build locally                |
| `npm run typecheck`    | Check app and tooling TypeScript                  |
| `npm run lint`         | Run type-aware ESLint                             |
| `npm run lint:fix`     | Apply available lint fixes                        |
| `npm run format`       | Format source and configuration                   |
| `npm run format:check` | Check formatting without writing                  |
| `npm test`             | Run tests in watch mode                           |
| `npm run test:run`     | Run tests once                                    |
| `npm run check`        | Run formatting, lint, tests, and production build |

## Structure

```text
src/
  app/           App shell, routes, and integration tests
  pages/         Route-level components
  topics/
    shared/                     Shared lesson presentation and content types
    two-pointers/               Eight patterns, pair walkthrough, and diagrams
    sliding-window/             Seven patterns and two window walkthroughs
    hash-maps/                  Eight patterns and two map walkthroughs
    binary-search/
      patterns.ts               Lesson content and official practice links
      binary-search-page.tsx    Pattern navigation and lesson presentation
      search-visualizer.tsx     Step-through array visualization
      trace.ts                 Binary-search trace generator
  test/          Shared test setup
  main.tsx       React entry point and browser router
  styles.css     Tailwind import and global styles
```

The `@/` alias points to `src/` in TypeScript, Vite, and Vitest. Add each new topic
under `src/topics/`, then register its route and topic-list entry. Keep explanations
brief and organize each example around recognition, intuition, steps, a diagram,
pseudocode, pitfalls, complexity, and practice.

The app includes keyboard focus styles, a skip link, live walkthrough announcements,
responsive layouts, and reduced-motion support. Tests exercise topic navigation,
pattern deep links, walkthrough controls, missing targets, and algorithm edge cases.
GitHub Actions installs from the lockfile, verifies dependency ages, and runs
`npm run check` on pushes and pull requests.

## Environment variables

Add public configuration to `.env.local` and access it with
`import.meta.env.VITE_YOUR_VARIABLE`. Restart Vite after changing environment
files. Every `VITE_` variable is included in client code: keep secrets on a server.

## Deployment

Run `npm run build` and deploy `dist/` to a static host. Configure the host to
rewrite unknown paths to `/index.html` so direct topic URLs work.
`npm run preview` is for local verification, not a production server.
For hosting under a subpath, configure Vite's `base` and BrowserRouter's `basename`
to the same prefix.

## References

- [Vite guide](https://vite.dev/guide/)
- [React Router setup](https://reactrouter.com/start/declarative/installation)
- [Tailwind CSS Vite integration](https://tailwindcss.com/docs/installation/using-vite)
