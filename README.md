# Rachael Olarinoye - Data Analyst Portfolio

A production-ready portfolio website with integrated CMS for managing data analysis projects. Built for data analysts who want to showcase their work professionally while maintaining full control over their content.

## 🎯 Features

### Public Portfolio
- **Home Page**: Professional landing page with key metrics and achievements
- **Interactive Demo**: Live demonstrations of data analysis capabilities
  - Dashboard with filters and KPIs
  - Data cleaning showcase (raw vs cleaned data)
  - SQL query examples with results
  - Business insights and recommendations
- **Projects Gallery**: Showcase of completed projects with filtering
- **Project Details**: In-depth case studies with problem, solution, and impact
- **Contact Form**: Lead capture with budget range selection

### Admin CMS
- **Secure Authentication**: Firebase-based admin login
- **Project Management**: Full CRUD operations for projects
- **Image Upload**: Cloudinary integration for screenshots and cover images
- **Publish Control**: Toggle projects between draft and published states
- **Real-time Updates**: Changes reflect immediately on the public site

### Technical Stack
- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Authentication**: Firebase Auth with custom claims
- **Database**: Cloud Firestore
- **Media Storage**: Cloudinary
- **Form Handling**: Web3Forms
- **Deployment**: Vercel/Netlify ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Firebase account
- Cloudinary account
- Web3Forms account (free)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd flow-prompt-artist-main

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your credentials in .env file
# See SETUP.md for detailed instructions

# Run development server
npm run dev
```

Visit `http://localhost:5173` to see the site.

## 📚 Documentation

- **[SETUP.md](./SETUP.md)** - Complete setup guide with Firebase, Cloudinary, and Web3Forms configuration
- **[flow.md](./flow.md)** - System architecture and user flows
- **[prompt.md](./prompt.md)** - Original project requirements and specifications

## 🔐 Admin Access

1. Navigate to `/admin/login`
2. Sign in with your Firebase admin credentials
3. Manage projects at `/admin/projects`

**First-time setup**: See [SETUP.md](./SETUP.md) for instructions on creating an admin user and setting custom claims.

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── AdminGuard.tsx  # Route protection
│   │   ├── AdminLayout.tsx # Admin panel layout
│   │   ├── ImageUploader.tsx
│   │   ├── ProjectForm.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication state
│   ├── data/              # Static data and types
│   │   ├── mockProjects.ts
│   │   ├── kpi_summary.json
│   │   ├── sales_raw.json
│   │   ├── sales_clean.json
│   │   └── sql_queries.json
│   ├── lib/               # Utilities
│   │   └── firebase.ts    # Firebase configuration
│   ├── pages/             # Route components
│   │   ├── admin/         # Admin pages
│   │   │   ├── Login.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── NewProject.tsx
│   │   │   └── EditProject.tsx
│   │   ├── Home.tsx
│   │   ├── Projects.tsx
│   │   ├── ProjectDetail.tsx
│   │   ├── Interactive.tsx
│   │   └── Contact.tsx
│   └── App.tsx            # Main app component
├── firestore.rules        # Firestore security rules
├── .env.example          # Environment variables template
└── SETUP.md             # Setup instructions
```

## 🔒 Security

- **Firestore Rules**: Only published projects are publicly readable
- **Admin Access**: Protected by Firebase custom claims (`role: 'admin'`)
- **Environment Variables**: All sensitive credentials in `.env` (gitignored)
- **Image Uploads**: Cloudinary unsigned uploads with configurable restrictions

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Netlify

1. Push code to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables
6. Deploy

## 📝 Environment Variables

Required variables (see `.env.example`):

```env
# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# Cloudinary
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=

# Web3Forms
VITE_WEB3FORMS_ACCESS_KEY=
```

## 🛠️ Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📊 Data Model

### Project Schema (Firestore)

```typescript
{
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  tools: string[];
  coverImage: string;
  images: string[];
  published: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## 🎨 Customization

- **Branding**: Update colors in `tailwind.config.ts`
- **Content**: Edit page components in `src/pages/`
- **Components**: Modify or add components in `src/components/`
- **Data**: Update mock data in `src/data/` for interactive demos

## 📄 License

This project is private and proprietary.

## 🤝 Support

For setup issues, see [SETUP.md](./SETUP.md) troubleshooting section.
# Racheal-work
