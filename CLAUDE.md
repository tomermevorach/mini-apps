# Vibe Coding Bootcamp

A Next.js tutorial app teaching non-technical users how to build and ship web apps using AI coding agents. The app itself is built with vibe coding — it's a live demonstration of the concept it teaches.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Components**: Custom UI components (see `components/ui/`)
- **Interactive**: CodeMirror (live code editor), custom interactive diagrams
- **Deployment**: Vercel

## Project Structure

```
app/                          # Next.js App Router pages
  page.tsx                    # Landing page
  layout.tsx                  # Root layout (wraps all pages in MainLayout)
  what-is-vibe-coding/        # Getting started section
    page.tsx
    what-is-code/page.tsx     # Includes LiveCodeEditor interactive component
    the-full-stack/page.tsx   # Includes StackDiagram interactive component
  toolbox/                    # Tools overview section
    ai-agents/page.tsx        # VendorCards with filter
    source-control/page.tsx
    cloud-hosting/page.tsx
  setup/                      # Step-by-step setup guides
    github/page.tsx
    vercel/page.tsx
    api-key/page.tsx
    coding-agent/page.tsx     # Both Cursor and Claude Code setup
  fork-this-app/page.tsx      # The meta section
  go-deeper/page.tsx          # Career path content

components/
  layout/
    Sidebar.tsx               # Navigation sidebar (uses usePathname for active state)
    MainLayout.tsx            # Client component: sidebar + mobile toggle
  ui/
    button.tsx                # Button with variants (default, outline, ghost, secondary)
    card.tsx                  # Card, CardHeader, CardContent, CardFooter, CardTitle
    badge.tsx                 # Badge with variants (default, secondary, success, warning, outline)
  interactive/
    LiveCodeEditor.tsx        # CodeMirror HTML editor + iframe preview (client component)
    StackDiagram.tsx          # Clickable 4-step flow diagram (client component)
    VendorCards.tsx           # Filterable vendor comparison cards (client component)
    SetupChecklist.tsx        # Progress checklist with localStorage persistence (client component)

lib/
  utils.ts                    # cn() helper (clsx + tailwind-merge)
```

## Key Design Decisions

- **Target audience**: Non-technical users who want to prototype fast or build personal apps
- **Content philosophy**: No jargon without plain-English explanation; opinionated (pick one tool) with alternatives shown
- **Interactive components**: Used only where they genuinely help learning (not decoration)
- **SetupChecklist**: Progress saved to localStorage — no backend, no accounts required
- **The meta angle**: This app was built with vibe coding and is forkable — users learn by doing the same thing

## Adding New Content

### Adding a new page

1. Create a new directory under `app/` matching the sidebar nav href
2. Add a `page.tsx` file
3. Add the nav item to `components/layout/Sidebar.tsx` in the `nav` array

### Adding a new interactive component

1. Create the component in `components/interactive/`
2. Mark it `"use client"` if it uses state or browser APIs
3. Import it directly in the relevant page

### Sidebar navigation

The nav structure lives entirely in `components/layout/Sidebar.tsx` in the `nav` array. Each section has a `title` and `items` array. Items have `title`, `href`, and `icon` (from lucide-react).

## Running Locally

```bash
npm run dev
```

Open http://localhost:3000.

## Deployment

This app is designed to deploy to Vercel. Connect the GitHub repo to Vercel and every push to main auto-deploys. No build configuration needed — Vercel detects Next.js automatically.

## The Live Demo Use Case

This app is designed to be modified live during presentations. The easiest things to change visibly:

- Text content in any `page.tsx` file
- Colours (search for `violet` to find accent colour instances)
- Vendor data arrays in `toolbox/ai-agents/page.tsx` and `toolbox/cloud-hosting/page.tsx`
- The `steps` arrays in any setup page

Push the change and Vercel will have it live within ~30 seconds.
