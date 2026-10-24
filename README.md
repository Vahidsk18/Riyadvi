# Riyadvi Website Revamp
Next.js 14 (App Router) + Tailwind + React Three Fiber/Drei + GSAP ScrollTrigger + Lenis | Express + MongoDB (Mongoose, Zod).

## Run
```
cd backend && cp .env.example .env && npm i && npm run dev
cd frontend && cp .env.example .env.local && npm i && npm run dev
```
Put a `software-project-planning-guide.pdf` in `frontend/public/`.

## API
POST /api/contact | /consultation | /health-checkup | /lead-magnet | /applications
GET /api/admin/stats | /api/admin/submissions?type= | PATCH /api/admin/submissions/:id (header `x-admin-token`)

## Dynamic architecture
`frontend/lib/data.js` feeds one service template, one case-study template, one job template. Add an item = add an object. Swap for a CMS by replacing the getters with fetch().

## AI Tools Used  (FILL IN honestly: tool, purpose, prompt, generated, manually changed, why)
## 3D / Animation libraries: three, R3F, drei, GSAP+ScrollTrigger, Lenis
## Mobile strategy: Visual3D picks full / reduced (fewer nodes, DPR 1) / static gradient fallback.
## Known limitations / Future: admin UI page, JWT auth, email + resume upload, blog, CMS, tests.
