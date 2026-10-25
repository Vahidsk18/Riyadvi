# Riyadvi Software Technologies – Website Revamp

A dynamic, multi-page corporate website with an interactive 3D experience, a full-stack backend, and an admin dashboard. Built as the Full Stack Developer interview assignment.

- **Frontend (live):** https://riyadvi-ten.vercel.app
- **Backend API (live):** https://riyadvi-0v27.onrender.com
- **Admin dashboard:** https://riyadvi-ten.vercel.app/admin

---

## Project Overview

Riyadvi is positioned as a **Technology & Digital Solutions Partner**, not just a software vendor. The site is not a landing page. It is a data-driven website where services, portfolio case studies and job openings are rendered from reusable templates, and every form submits to a real backend and is stored in MongoDB.

**Design direction:** premium, futuristic, black and gold (`#D4AF37`), glass surfaces, 3D visuals, scroll-based storytelling. Font: Inter.

## Features

- Interactive 3D hero (connected-node network that reacts to cursor movement)
- Scroll-based "Digital Transformation" journey (GSAP ScrollTrigger + Lenis smooth scroll)
- Six service pages from **one reusable template**, each with its own 3D visual
- Portfolio listing plus dynamic case-study pages from **one reusable template** (one case study includes an interactive 3D presentation)
- Careers listing with department, designation and experience filters, plus dynamic job pages with an application form
- Contact form (with WhatsApp and Calendly links)
- Multi-step **Business Health Checkup** form (5 steps)
- **Lead magnet** page (Software Project Planning Guide) with validated form and download on success
- Admin dashboard: lead counts, per-type tables, status updates
- Backend validation, error handling, rate limiting, security headers
- Mobile strategy for 3D (see Performance Optimization)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18, Tailwind CSS |
| 3D | Three.js, React Three Fiber, Drei |
| Animation | GSAP + ScrollTrigger, Lenis |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Validation | Zod |
| Security | Helmet, CORS, express-rate-limit |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Project Structure

```
/frontend
  /app            -> routes (home, services/[slug], portfolio/[slug], careers/[slug],
                     contact, business-health-checkup, software-project-planning-guide, admin)
  /components     -> Scene3D, Visual3D, Journey, SmoothScroll, Nav, FormKit
  /lib/data.js    -> services, projects, jobs data (single source of truth)
/backend
  /src            -> server.js, routes.js, models.js, schemas.js
README.md
```

## Installation

**Prerequisites:** Node.js 18+, a MongoDB database (Atlas free tier works).

```bash
# 1. Clone
git clone <YOUR_REPO_URL>
cd <repo-folder>

# 2. Backend
cd backend
cp .env.example .env      # then fill in the values
npm install
npm run dev               # runs on http://localhost:5000

# 3. Frontend (new terminal)
cd frontend
cp .env.example .env.local
npm install
npm run dev               # runs on http://localhost:3000
```

Place the lead-magnet PDF at `frontend/public/software-project-planning-guide.pdf`.

## Environment Variables

**backend/.env**

| Variable | Description |
|---|---|
| `PORT` | API port (default 5000) |
| `MONGODB_URI` | MongoDB connection string |
| `CLIENT_ORIGIN` | Allowed frontend origin(s) for CORS, comma-separated |
| `ADMIN_TOKEN` | Secret token used to access admin endpoints |

**frontend/.env.local**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL, e.g. `http://localhost:5000/api` |

Never commit real `.env` files.

## Database Setup

1. Create a free cluster on MongoDB Atlas.
2. Create a database user and allow your IP (or `0.0.0.0/0` for Render).
3. Copy the connection string into `MONGODB_URI`.
4. No manual setup is needed. The `submissions` collection is created automatically on the first submission.

**Data model (`submissions` collection)**

| Field | Notes |
|---|---|
| `type` | `contact`, `consultation`, `health-checkup`, `lead-magnet`, `application` |
| `name`, `email`, `phone`, `company` | Common fields |
| `data` | Type-specific fields (requirement, message, challenges, position, resumeUrl, etc.) |
| `status` | `new`, `contacted`, `closed` |
| `createdAt`, `updatedAt` | Automatic timestamps |

## API Endpoints

All responses follow `{ success, message, ... }`. Validation failures return `400` with `errors: [{ field, message }]`.

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/contact` | Contact enquiry |
| POST | `/api/consultation` | Consultation request |
| POST | `/api/health-checkup` | Business Health Checkup lead |
| POST | `/api/lead-magnet` | Lead magnet download lead |
| POST | `/api/applications` | Job application |
| GET | `/api/admin/stats` | Count per lead type (admin) |
| GET | `/api/admin/submissions?type=` | List submissions (admin) |
| PATCH | `/api/admin/submissions/:id` | Update status (admin) |
| GET | `/health` | Health check |

Admin endpoints require the header `x-admin-token: <ADMIN_TOKEN>`.

## Admin Dashboard

Open `/admin` and enter the `ADMIN_TOKEN`. The dashboard shows counts for each lead type, a table of submissions (name, email, phone, company, requirement, date, status), and lets you update the status. Job applications are listed with position and resume link.

## Dynamic Content Architecture

Content lives in `frontend/lib/data.js` and is rendered by reusable templates:

```
Service data   -> /services/[slug]   (one template, six services)
Project data   -> /portfolio/[slug]  (one template, all case studies)
Job data       -> /careers/[slug]    (one template, all jobs)
```

**To add a new service, project or job:** add one object to the relevant array in `data.js`. The page, route, listing card and related-links are generated automatically, with no new components. The data getters (`getService`, `getProject`, `getJob`) can be replaced with `fetch()` calls to a CMS or the database without changing the templates.

## Deployment

**Backend (Render)**
1. New Web Service, connect the repo, root directory `backend`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add environment variables: `MONGODB_URI`, `CLIENT_ORIGIN` (your Vercel URL), `ADMIN_TOKEN`.

**Frontend (Vercel)**
1. Import the repo, set root directory to `frontend`.
2. Add `NEXT_PUBLIC_API_URL` = `https://<your-render-app>.onrender.com/api`.
3. Deploy.

Note: Render's free tier sleeps after inactivity, so the first request can take around 30–60 seconds.

## AI Tools Used

> Replace or extend the entries below with your own real usage. Keep only tools you actually used.

### Claude
- **Purpose:** Planning the architecture and scaffolding the initial full-stack codebase (Express API, Zod validation, Next.js templates, R3F scene, admin dashboard).
- **Example prompt:** "Create a Next.js + Express + MongoDB structure for a corporate website with reusable service, case-study and job templates, and form endpoints with validation."
- **What was generated:** Initial backend routes and schemas, the data-driven page templates, the reusable form component, the 3D network scene, and the admin page.
- **What I changed manually:** `<WRITE YOUR OWN CHANGES: e.g. design tweaks, custom 3D shapes, copy from the Riyadvi site, bug fixes, mobile adjustments>`
- **Why selected:** Strong at multi-file code generation and explaining the code, which helped me understand and debug each part.

### `<Other tool, e.g. ChatGPT / Cursor / Copilot / Midjourney>`
- **Purpose:**
- **Example prompt:**
- **What was generated:**
- **What I changed manually:**
- **Why selected:**

## 3D Libraries Used

- **Three.js:** core 3D engine
- **React Three Fiber:** Three.js in React (`Canvas`, `useFrame`)
- **Drei:** helpers (`Float`, `Line`, `MeshDistortMaterial`)

## Animation Libraries Used

- **GSAP + ScrollTrigger:** scroll-driven storytelling in the Digital Transformation section
- **Lenis:** smooth scrolling, synced with GSAP's ticker

## Third-Party Assets

- Font: Inter (via `next/font/google`)
- No external 3D models or images are used. All 3D shapes are generated in code.
- `<List any images, PDFs or icons you add>`

## Performance Optimization

- **Lazy loading:** 3D scenes are loaded with `next/dynamic` (`ssr: false`), so the heavy 3D code is split from the main bundle.
- **Device-aware 3D (mobile strategy):** `Visual3D` chooses a mode per device:
  - **Full:** desktop, 90 nodes, device pixel ratio up to 2
  - **Reduced:** screens under 768px, 40 nodes, pixel ratio 1, antialiasing off
  - **Static fallback:** gradient shown for `prefers-reduced-motion` or low-core devices
- **Procedural geometry:** no heavy model or texture files, so there is nothing large to download.
- **Fonts:** `next/font` with `display: swap`.
- **Static generation:** service, portfolio and job pages use `generateStaticParams`.
- **Scroll animation:** GSAP contexts are cleaned up on unmount to avoid leaks.

## Known Limitations

- Blog, About and Technology Ecosystem sections are not implemented yet.
- Admin authentication uses a single shared token (not user accounts).
- Email notifications are not wired up (a TODO marker exists in `routes.js`).
- Resume upload is a link field, not a file upload.
- Portfolio case-study content and results are placeholder text and need replacing with verified client details.
- Service 3D visuals use simple procedural shapes rather than custom Blender or Spline models.
- No automated tests yet.

## Future Improvements

- Blog with categories, tags, search and related articles (CMS-ready)
- About page with an interactive company timeline
- 3D technology ecosystem (orbiting logos)
- JWT-based admin login with hashed passwords
- Email notifications (Nodemailer or Resend) and real file upload for resumes
- Custom Blender or Spline models for each service
- Move content from `data.js` to the database or a headless CMS
- Unit and API tests, Lighthouse audit and tuning

## Author

Shaik Abdul Vaheed (Vsk)
