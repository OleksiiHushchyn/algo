# Algo — algorithm cheat sheet

A compact, beginner-friendly algorithm field guide built with React, TypeScript,
and Vite. Topics include binary search (7 patterns, 9 practice problems), two pointers
(8 patterns, 10 practice problems), sliding window (7 patterns, 8 practice problems),
and hash maps (8 patterns, 10 practice problems).
Each has concise theory, pseudocode, diagrams,
common traps, and official LeetCode links.

Each example has two explanation modes. **Compact** keeps the original quick notes.
**Detailed** adds an everyday analogy, a worked example, why the algorithm works,
and a plain-language guide to its code variables. All 30 detailed lessons are
available in English, Ukrainian, and Russian. The shared preference is saved under
`algo.explanationMode`, independently of the interface and code languages.
Switching modes preserves the current pattern and walkthrough step.

All 30 examples include Pseudocode, JavaScript, and Java in the code selector.
The choice is shared across topics and saved as `algo.codeLanguage` in local storage,
independently of the interface language. If storage is unavailable, the choice still
works for the current session. Java examples include a `Solution` class and imports;
call the shown static method from your own `main` or tests. The examples implement
the lesson's pattern; related practice problems may need the adaptations noted in
the lesson. String examples use UTF-16 indexing and basic letters, not grapheme clusters.

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

Open the local URL printed by Vite. `/#/` lists topics; `/#/topics/binary-search`
opens the first lesson. `/#/topics/two-pointers` opens the second, and
`/#/topics/sliding-window` opens the third. `/#/topics/hash-maps` opens the fourth.
Link directly to a pattern, for example
`/#/topics/sliding-window?pattern=unique`.
Dependencies are locked in `package-lock.json`; use `npm ci` for repeatable installs.

## Languages

Use the language selector in the top bar to switch between English, Russian,
and Ukrainian. The choice is saved under `algo.language` in local storage.
On the first visit, the app uses the first supported browser language, falling
back to English. Ukrainian uses the standard `uk` code; saved `ua` values are
also accepted. Switching languages preserves the route, selected pattern, and
walkthrough position. The app still works if browser storage is unavailable.

The UI, lessons, diagrams, walkthrough messages, accessibility labels, page title,
and description are localized. Pseudocode, example inputs, mathematical notation,
and official LeetCode problem names stay unchanged.

Translations live in `src/i18n/ru.json` and `src/i18n/uk.json`, using English source
text as keys. Components use `useLanguage().t(message, values)`; walkthrough
functions accept the same translator and default to English. Keep interpolation
placeholders identical in every language. Add new lesson text to both catalogs;
the localization tests check lesson coverage and placeholder parity.

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

`npm run examples:check` executes all displayed JavaScript examples and compiles and
runs all displayed Java examples against normal and edge cases. It uses the project's
Node version and requires `javac` and `java` (JDK 17 or newer) on PATH. It adds no npm dependencies.

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
  main.tsx       React entry point and hash router
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

The app runs entirely in the browser and can be hosted on GitHub Pages without
a backend or hosting subscription. GitHub Free supports Pages for public repositories;
private repositories require a plan that includes Pages.

### One-time GitHub setup

1. Open [repository Settings → Pages](https://github.com/OleksiiHushchyn/algo/settings/pages).
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Commit and push these changes to `main`. Alternatively, after the workflow is
   on GitHub, open **Actions → CI and GitHub Pages → Run workflow** and choose `main`.
4. Wait for the `check` and `deploy` jobs to succeed. The deployment summary links
   to the published site: <https://oleksiihushchyn.github.io/algo/>.

`.github/workflows/ci.yml` installs locked dependencies, verifies dependency ages,
checks formatting, lints, runs tests, and builds the site on pushes and pull requests.
Only successful pushes or manual runs on `main` upload `dist/` and deploy it.
Deployment uses GitHub's built-in token; no personal access token or repository
secret is needed. Later pushes to `main` update the site automatically.

The workflow sets `BASE_PATH` from the repository name (`/algo/`) so asset URLs
work under the project's Pages path. Routing uses the URL hash so direct links
and refreshes work without server rewrites, including pattern links such as
<https://oleksiihushchyn.github.io/algo/#/topics/sliding-window?pattern=unique>.

To verify the Pages build locally:

```sh
BASE_PATH=/algo/ npm run build
BASE_PATH=/algo/ npm run preview
```

Open <http://localhost:4173/algo/>. For a root-hosted site or custom domain, omit
`BASE_PATH` (defaults to `/`) or change the workflow value to `/`.
`npm run preview` is for local verification, not a production server.

See [GitHub's Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
and [Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages).

## References

- [Vite guide](https://vite.dev/guide/)
- [React Router setup](https://reactrouter.com/start/declarative/installation)
- [Tailwind CSS Vite integration](https://tailwindcss.com/docs/installation/using-vite)
