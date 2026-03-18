---
name: vibe_coding_bootcamp_project
description: Core project context for the Vibe Coding Bootcamp Next.js app
type: project
---

A Next.js 15 tutorial app teaching non-technical users to build and ship web apps using AI coding agents. The app is itself built with vibe coding — a self-referential demo.

**Why:** User wants a forkable tutorial that non-technical users can deploy and modify, progressing from "ship fast" prototypers to deeper technical understanding.

**How to apply:** When adding features or content, keep the non-technical audience in mind. Avoid jargon without explanation. Content lives in page.tsx files. Interactive components are in components/interactive/.

Key design choices already made:
- Vercel for hosting (not Cloudflare) — simpler first-deploy experience for beginners
- No MDX (user understood it, decided content in TSX is fine for V1)
- No backend/accounts — SetupChecklist uses localStorage
- Primary colors: violet-600 accent, slate-900 sidebar
- VendorCards and SetupChecklist are the main reusable interactive components
