# Goal
Build a production-ready data analyst portfolio website for **Rachael Olarinoye**.

This is not a static CV site. It is:
- A public portfolio (home, projects, interactive demo, contact)
- A live CMS where Rachael can log in and add/edit/remove projects herself

Stack:
- Next.js (App Router)
- React
- Tailwind CSS
- Firebase (Auth + Firestore)
- Cloudinary (image upload)
- Vercel deployment

## Positioning / Branding
Site should position Rachael as:
> "I turn raw data into decisions."

Tagline / summary:
> "I'm Rachael Olarinoye, a data analyst focused on building executive dashboards, automating reporting, and translating messy spreadsheets into clear business actions."

Voice: confident, practical, focused on business impact.

## Public Pages

### 1. Home (`/`)
Sections:
- Hero:
  - Headline: "I turn raw data into decisions."
  - Subtext explaining dashboards, automation, decision support.
  - CTA buttons:
    - "See Interactive Demo"
    - "Work With Me"
- KPI / Wins:
  - "+23% Marketing ROI improvement"
  - "10+ hrs manual reporting time saved / month"
  - "150k+ rows cleaned and validated"
- Selected Work teaser linking to `/projects`.

### 2. Interactive Demo (`/interactive`)
Purpose: showcase competence in a hands-on way.
This page should include:
- A mock dashboard with filter controls (date range, region, product).
- A "Data Cleaning" demo that toggles between dirty data vs cleaned data and explains what was fixed (duplicates, missing values, inconsistent naming).
- A "SQL Showcase":
  - Business question (e.g. "Which regions are underperforming?")
  - The SQL query used to answer it.
  - The resulting table.
- An "Insights and Actions" section:
  - Insight: plain English recommendation
  - Impact: expected outcome / ROI
  - Evidence: reference to the chart/table

All data here can be static JSON in `/data/*.json`. It should LOOK interactive. Filters should change what is displayed in charts/tables, but do not require a backend.

### 3. Projects (`/projects`)
- Fetch live data from Firestore collection `projects` (where `published == true`).
- Display grid of project cards.
Each project card shows:
- `coverImage`
- `title`
- `summary`
- list of `tools` as tags

### 4. Individual Project Page (`/projects/[id]`)
- Load one project doc from Firestore (`projects/{id}`).
- Show:
  - Title
  - Summary
  - Problem
  - What I Did
  - Impact
  - Tools used
  - Cover image
  - Screenshot gallery (`images[]`)
- If project is not published, and user is not admin, show "Project not found or private."

### 5. Contact (`/contact`)
- Simple lead form:
  - name
  - email or WhatsApp
  - "What problem are you trying to solve?"
  - budget range dropdown
- On submit, either:
  - POST to a server action / API route that emails Rachael (e.g. via Brevo), OR
  - POST to Formspree/Web3Forms for now (cheaper to ship).
- Also show static contact line ("Based in [location], available remotely.")

## Private Admin Pages (Protected Area)

All admin pages live under `/admin` and require auth.

### Auth
- Use Firebase Auth (email/password).
- Only approved user(s) can access admin.
- Owner is **Rachael Olarinoye**.
- Admin access is checked using Firebase custom claims: `role: "admin"`.

### Routes
1. `/admin/login`
   - Email/password form.
   - On success, user can access other admin pages.

2. `/admin/projects`
   - List all projects from Firestore (published and unpublished).
   - For each project:
     - Show title
     - Show published/unpublished status
     - Buttons: Publish / Unpublish, Edit, Delete
   - Include "+ New Project" button.

3. `/admin/projects/new`
   - Form to create a new project.
   - Fields:
     - title
     - summary
     - problem
     - solution (What I Did)
     - impact
     - tools (comma-separated)
     - coverImage (upload to Cloudinary)
     - images[] gallery (upload multiple to Cloudinary)
     - published (checkbox)
   - On submit:
     - Upload images to Cloudinary
     - Create Firestore document in collection `projects` with:
       - createdAt (serverTimestamp)
       - updatedAt (serverTimestamp)
       - all the above fields

4. `/admin/projects/[id]/edit`
   - Same form as "new", but pre-filled.
   - On submit:
     - Update the document
     - Set updatedAt = serverTimestamp

## Components

We need reusable UI components (Tailwind, neutral dark theme):
- `<ProjectCard />`:
  - Used in `/projects`
  - Shows cover image, summary, tools
- `<ProjectForm />`:
  - Used in admin create/edit
  - Handles controlled inputs for all project fields
- `<ImageUploader />`:
  - Handles sending file(s) to Cloudinary
  - Returns public URL(s)
  - Shows preview(s)
- `<DataCleaningDemo />`:
  - Toggle Raw vs Cleaned dataset
  - Show table view of each
  - Brief explanation of fixes
- `<SQLShowcase />`:
  - Dropdown of questions
  - Show the question, SQL query, and a static result table
- `<KPIBlock />`, `<InsightCard />`:
  - Small stat / insight cards

## Data Model

Firestore collection: `projects`

Each project document structure:
```json
{
  "title": "Sales Performance Dashboard",
  "summary": "Power BI dashboard for tracking revenue by region.",
  "problem": "Leadership had no visibility into underperforming branches.",
  "solution": "Merged 4 data sources, cleaned product names, built drill-down dashboard.",
  "impact": "Cut reporting time by 5hrs/week and revealed 2 loss-making regions.",
  "tools": ["Power BI", "SQL", "Excel", "Python"],
  "coverImage": "https://res.cloudinary.com/.../main.png",
  "images": [
    "https://res.cloudinary.com/.../chart1.png",
    "https://res.cloudinary.com/.../chart2.png"
  ],
  "published": true,
  "createdAt": 1730000000000,
  "updatedAt": 1730000500000
}
```

## Security Rules (Firestore)
- Public:
  - Can read projects ONLY if `published == true`
- Admin (Rachael):
  - Can create, update, delete, and toggle `published`
- No write access for non-admin.

## Visual Style
- Dark UI
- Neutral black/gray background (`bg-neutral-950`, `bg-neutral-900/30`)
- Soft borders (`border-neutral-800`)
- Rounded corners (`rounded-xl`, `rounded-lg`)
- Small text, high information density
- Clean dashboard / SaaS aesthetic, not playful

## Deliverables
1. Working Next.js app with:
   - `/`
   - `/interactive`
   - `/projects`
   - `/projects/[id]`
   - `/contact`
   - `/admin/login`
   - `/admin/projects`
   - `/admin/projects/new`
   - `/admin/projects/[id]/edit`
2. Tailwind configured.
3. Firebase configured.
4. Auth context that exposes:
   - current user
   - loading state
   - custom claims (role)
5. AdminGuard component that blocks access if not role `"admin"`.
6. Cloudinary uploader component stubbed in.
7. Example data JSONs for interactive demo in `/data/`.

This portfolio should make it obvious that:
- Rachael can clean data
- Rachael can query data
- Rachael can build dashboards
- Rachael can communicate impact
- Rachael can work like an analyst, not just make pretty charts
