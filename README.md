# Bilal’s Developer Room

A warm, interactive developer portfolio built from **M. Bilal Khan’s supplied résumé**. The room contains original lightweight GLB models, with full HTML content available through object interactions or a classic portfolio view.

## Run locally

```sh
npm install
npm run dev
```

Open **http://localhost:3000**. On Windows PowerShell with script execution disabled, use `npm.cmd` instead of `npm`.

```sh
npm run build        # Production build, including Next.js type checking
npm run start        # Serve the production build
npm run typecheck    # Latest native TypeScript compiler
npm run lint
npm run format:check
npm run test:e2e     # Desktop and mobile Chromium tests
npm run test:timer   # Timer compatibility regression test
```

Install a browser once for tests if needed: `npx playwright install chromium`. The test configuration starts the dev server automatically or uses an existing server on port 3000.

## Stack and versions

Next.js App Router, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP, and Zustand were installed using their `latest` registry tags. `package-lock.json` records the resolved versions for repeatable installs. Tailwind supplies the CSS foundation and utilities; component styles and responsive rules live in `app/globals.css`.

The latest TypeScript 7 compiler runs through the `@typescript/native` npm alias. Next.js tooling and typescript-eslint still require the TypeScript 6 programmatic API, provided through Microsoft’s compatibility package aliased as `typescript`. This follows [Microsoft’s side-by-side guidance](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6.0). ESLint uses the latest 9.x release compatible with Next.js’s React, import, and accessibility plugins.

Fonts are bundled locally; building does not require Google Fonts or a remote asset service.

Stable React Three Fiber 9.8.1 still constructs the deprecated `THREE.Clock`. The checked-in `patches/@react-three+fiber+9.8.1.patch` replaces that internal clock with a `THREE.Timer` adapter, preserving frame deltas, pause/resume, and manual frame advancement. `npm install` applies it automatically through `patch-package`; installation fails if the patch cannot apply. Review and remove the patch when upgrading to a stable Fiber release with native Timer support. Shadows explicitly use the supported `PCFShadowMap` setting.

## Architecture

```text
app/                         Server page, metadata, OG image, robots, global styles
components/
  portfolio-shell.tsx        Page layout, view switch, navigation, shortcuts
  classic-portfolio.tsx      Server-rendered accessible portfolio
  room/
    room-canvas.tsx          WebGL boundary, lighting, loading, lifecycle
    room-geometry.tsx        Layout and placeholder geometry
    room-asset.tsx           Replaceable GLB loader with per-asset fallbacks
    interactive-object.tsx   Object hover/click behavior
    room-hotspots.tsx        HTML markers projected from 3D anchors
    camera-rig.tsx           GSAP transitions and constrained orbit controls
  ui/                        Reusable content, project cards, icons, dialog
content/portfolio.ts         Résumé, project, skill, experience, and contact data
lib/room-config.ts           Model URLs, sections, camera targets
lib/types.ts                 Shared content and scene types
store/room-store.ts          Navigation, theme, motion, and view state
public/models/              Original optimized room models
public/projects/            Supplied project banners
public/resume/              The original supplied résumé PDF
patches/                    Stable React Three Fiber Timer compatibility
scripts/                    Asset generation, preview capture, accessibility audit
tests/                      Playwright interaction and fallback tests
```

## Edit the portfolio

Update **`content/portfolio.ts`**. The 3D scene does not contain résumé copy or project details.

- Add project screenshots to `public/projects/`, then set the project’s optional `image` field to `/projects/filename.webp`.
- Set `liveUrl` when a live project URL is available; links only render when supplied.
- Update `sourceUrl`, GitHub, LinkedIn, email, and phone in the content file.
- Replace `public/resume/M-Bilal-Khan-Resume.pdf` when the résumé changes.
- Work and education dates reflect the supplied résumé and should be updated as the career progresses.

EcoStudent, SecureShare, and NexaPlan use the supplied banners in `public/projects/` in both the room panel and classic view. Next.js optimizes the images for each viewport; their complete aspect ratio is preserved. The concept illustration is only a fallback for future projects without an `image`. Repository links come from the résumé; no live project URLs have been invented.

The contact form composes a `mailto:` draft in the visitor’s email application. It does not send or store messages on a backend. Email, telephone, and social links also work directly.

## Room interactions

| Object | Section | Shortcut |
| --- | --- | --- |
| Monitor | About | 1 |
| Laptop | Projects | 2 |
| Bookshelf | Skills | 3 |
| Wall frames | Experience, education, achievements | 4 |
| Résumé clipboard | View and download original PDF | 5 |
| Phone | Contact | 6 |
| Social objects | GitHub and LinkedIn profiles | — |

Drag to orbit within the room’s viewing bounds. Select an object, its HTML marker, or a navigation button to focus it. **Escape** or **Back to the room** closes the panel; **0** resets the camera. The sun button changes lighting. The help button explains the controls.

Information panels are nonmodal: the room stays interactive, clicking its background keeps the information visible, and selecting another object switches the panel directly. The camera gently adjusts while keeping the room in view; dragging takes control immediately. On phones, the room and information share the screen vertically.

## Replace or regenerate the models

The functional geometry fallbacks and final GLB models use the same `RoomAsset` component and interaction wrappers. A failed asset therefore preserves navigation and content.

1. Put a model in `public/models/`.
2. Change its URL in **`lib/room-config.ts`**.
3. Match the existing local origin and meter-based scale, or adjust only the placement group in `room-geometry.tsx`.

No changes to the store, panels, camera system, or content are needed. `useGLTF` supports compressed GLB replacements. For a Draco-compressed replacement, configure a self-hosted decoder if avoiding all third-party asset requests is required.

The included assets are generated with Three.js and exported to GLB. Geometry is merged by material to reduce draw calls; materials and surfaces are texture-free. The initial eleven models total approximately 1.0 MiB uncompressed and about 160 KiB transferred with HTTP compression in local testing. To regenerate:

```sh
npm run assets:build
```

For future photographic textures, prefer WebP/AVIF or KTX2, small texture dimensions, compressed geometry, and a similar transfer budget. The existing scene intentionally avoids an HDR environment download and postprocessing.

## Accessibility and performance

- Full HTML content is rendered on the server; the classic view works without WebGL or JavaScript.
- Nonmodal section dialogs preserve room interaction, Escape handling, and focus restoration. The separate room guide uses a modal dialog with focus containment.
- Every section has keyboard-accessible HTML navigation and labeled controls.
- Reduced-motion preferences disable cinematic movement and CSS animations.
- The scene loads in a separate client chunk and renders on demand; GSAP and orbit controls request frames during movement.
- Device pixel ratio is capped at 1.5; directional shadows use a 1024px map and contact shadows are baked once.
- Model failures retain geometry fallbacks; context loss switches to classic content.
- External profile and project links use `noopener noreferrer`.

## Deployment

Deploy as a standard Next.js application. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to your real public origin. Vercel’s production domain is detected automatically when available. Metadata includes an Open Graph image, Twitter card, Person structured data, and robots rules. No production domain is assumed in the source.

The generated GLB files and public résumé must be included in deployment. The original `assets/` folder remains ignored as it was in the starter repository.
