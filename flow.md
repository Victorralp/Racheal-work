# flow.md
System Architecture, User Flows, and Content Flows
for "Rachael Olarinoye" Data Analyst Portfolio

---

## 1. High-Level System

**Frontend:** Next.js (App Router) + React + Tailwind  
**Auth:** Firebase Auth  
**Data Storage:** Firestore (projects collection)  
**Media Storage:** Cloudinary (images, dashboard screenshots)  
**Deployment:** Vercel  
**Security:** Firestore rules + role-based auth via Firebase custom claims

---

## 2. Roles / Actors

### Public Visitor
- Can browse `/`, `/interactive`, `/projects`, `/projects/[id]`, and `/contact`
- Can submit the contact form
- Can ONLY see published projects (where `published == true`)

### Admin (Rachael Olarinoye)
- Can log in at `/admin/login`
- After login, can access `/admin/...`
- Can create new projects, edit projects, unpublish projects, delete projects
- Can upload screenshots/images to Cloudinary
- Can update the site content without a developer

---

## 3. Data Flow: Project Lifecycle

### Create New Project
1. Admin goes to `/admin/projects/new`.
2. Admin fills:
   - Title
   - Summary
   - Problem
   - What I Did (solution)
   - Impact
   - Tools used
   - Uploads cover image + screenshots via `ImageUploader`
   - Checks "Published?" if ready to show publicly
3. Admin clicks "Create Project".
4. Frontend:
   - Uploads images to Cloudinary → gets back URLs.
   - Writes a new Firestore doc into `projects` with:
     - text fields
     - `coverImage`
     - `images[]`
     - `published`
     - `createdAt = serverTimestamp()`
     - `updatedAt = serverTimestamp()`
5. Admin is redirected to `/admin/projects`.

Result:
- If `published: true`, that project now shows publicly on `/projects`.

---

### Edit Existing Project
1. Admin opens `/admin/projects/[id]/edit`.
2. The form is pre-filled from Firestore.
3. Admin updates copy, adds/removes screenshots, changes published status.
4. On Save:
   - Firestore doc is updated with new values.
   - `updatedAt = serverTimestamp()`.
5. Public site updates instantly (no redeploy).

---

### Delete Project
1. Admin clicks "Delete" in `/admin/projects`.
2. Firestore `projects/{id}` doc is removed.
3. `/projects` will no longer render that card.
4. Screenshots still exist in Cloudinary unless we later add cleanup. (Okay for v1.)

---

## 4. Access Control Flow

### Public read
When a visitor opens `/projects`:
1. Frontend runs a Firestore query:
   - `collection("projects")`
   - `where("published", "==", true)`
   - `orderBy("createdAt", "desc")`
2. The UI maps those docs into `<ProjectCard />`.

They CANNOT see:
- Unpublished drafts
- Internal notes

### Admin access
- Admin logs in at `/admin/login` using Firebase Auth email/password.
- After login, on each protected page (`/admin/projects`, `/admin/projects/new`, `/admin/projects/[id]/edit`):
  - `AdminGuard` runs.
  - `AdminGuard` reads `useAuth()` → which:
    - Checks the current Firebase user
    - Fetches their ID token
    - Reads token claims (`role`)
  - If `role !== "admin"`, block and show "Access denied."

This means only Rachael (or whoever you bless as admin) can modify content.

---

## 5. Interactive Demo Flow (`/interactive`)

This page proves competence without needing live client data. It simulates real analyst work.

### Sections:

#### A. Dashboard View
- We load mock data from `data/kpi_summary.json`, `data/sales_clean.json`, etc.
- We render:
  - KPI cards (total revenue, avg order value, etc.)
  - Charts (line/bar)
- We expose filters (e.g. timeframe, region).
- Clicking a filter updates local React state → charts/table re-render.

**Message to viewer:**  
"I can build decision dashboards. I understand what matters to leadership."

---

#### B. Data Cleaning Demo
- Two data tables:
  - Raw data: from `data/sales_raw.json`
  - Cleaned data: from `data/sales_clean.json`
- Toggle button (Raw / Cleaned)
- Text panel:
  - "Fixed inconsistent SKU names"
  - "Merged store sales with warehouse exports"
  - "Dropped duplicate invoices"
  - "Standardized date format to YYYY-MM-DD"

**Message to viewer:**  
"I'm not just making charts. I can make dirty data reliable."

---

#### C. SQL Showcase
- We store an array like:
```json
[
  {
    "question": "Which branch underperformed this quarter?",
    "sql": "SELECT branch, SUM(revenue) ...",
    "result": [
      { "branch": "North", "revenue": 120000, "target": 150000 },
      { "branch": "West", "revenue": 80000, "target": 140000 }
    ]
  },
  {
    "question": "Top 5 products by gross margin?",
    "sql": "SELECT product_name, margin_pct ...",
    "result": [
      { "product": "SKU-244", "margin_pct": 37.5 },
      { "product": "SKU-105", "margin_pct": 34.2 }
    ]
  }
]
```
- UI:
  - A dropdown to pick the question
  - Shows the SQL in a code block
  - Shows the result table

**Message to viewer:**  
"I understand a business question, translate it into SQL, and surface the answer."

---

#### D. Insight / Recommendation Cards
Each `<InsightCard />` shows:
- Insight (what we found)
- Business impact (why it matters)
- Action (what leadership should actually do)

Example:
- Insight: "South region has lower CAC than West but similar conversion."
- Impact: "Shifting 15% of ad spend from West → South could lift new signups by 8–12% next month."
- Action: "Reallocate spend next cycle, re-check CAC after 30 days."

**Message to viewer:**  
"You don't hire me just to make charts. You hire me so you stop wasting money."

---

## 6. Contact / Lead Flow

### Contact Page
1. Visitor fills:
   - Name
   - Email / WhatsApp
   - Problem statement
   - Budget range
2. Form submits via:
   - An API route in Next.js (server action) that emails Rachael
   OR
   - A 3rd-party form service if we want zero backend for v1.

### Why this matters:
- This page is where interest turns into pipeline.
- We are NOT dumping all socials and saying “DM me.”  
  We are directing them to give context so the conversation starts warm.

---

## 7. Visual / Brand Flow

- Theme: dark, minimal, dashboard aesthetic.
- Colors: neutral blacks/greys (`bg-neutral-950`, `bg-neutral-900/30`, `border-neutral-800`).
- Typography: clean, small, confident. Feels like an internal analytics dashboard, not a marketing landing page.
- Components:
  - Rounded corners (`rounded-xl`)
  - Thin borders (`border-neutral-800`)
  - Subtext in muted gray (`text-neutral-500`, `text-neutral-400`)
  - Headings in white
- Tone of all copy:
  - Practical, confident
  - "Here’s the business impact", not "data is the new oil"

---

## 8. Why this setup works

- Rachael can add/remove projects herself in minutes. No dev dependency.
- Recruiters / clients can SEE how she thinks, not just read buzzwords.
- The portfolio doubles as a live demo of her workflow:
  - cleaning
  - analysis
  - dashboarding
  - storytelling
  - action/impact

This is not just personal branding. This is pre-selling her as "plug me into your org and I’ll unblock decision-making."

That is the whole point.
