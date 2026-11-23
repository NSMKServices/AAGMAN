# AAGMAN – Maharashtra Tourism & Heritage Portal (React + Vite)

A modern, high-performance Single-Page Application (SPA) foundation for the **AAGMAN** Maharashtra Tourism and Cultural Heritage web platform.

---

## 1. Project Purpose
This application represents the modernized frontend foundation for AAGMAN. Built using React 18, Vite, and React Router v6, it is designed to replace the legacy multi-page static site while preserving its rich cultural assets, verified historical content, and interactive features (such as 3D destination carousels and the Ashtavinayak Pilgrimage Planner).

---

## 2. Technology Stack
- **Framework**: React 18.3.1
- **DOM Renderer**: React DOM 18.3.1
- **Routing**: React Router DOM 6.28.0 (Browser Router with declarative route tree)
- **Bundler & Dev Server**: Vite 5.4.11
- **Styling Architecture**: Pure CSS3 with CSS Modules (`*.module.css`) and global Design Tokens (`src/styles/tokens.css`)
- **Typography**: Google Fonts (Cinzel, Playfair Display, Plus Jakarta Sans, Poppins)
- **Backend (Target Integration)**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)

---

## 3. Approved Heritage Palette
- **Deep Terracotta**: `#722D1B` (`--color-primary`)
- **Burnt Saffron**: `#C45A32` (`--color-secondary`)
- **Antique Gold**: `#E6A23C` (`--color-accent`)
- **Warm Ivory**: `#FFF1DF` (`--color-background`)
- **Dark Brown**: `#4A2419` (`--color-text`)

---

## 4. Getting Started

### Installation
From inside the `aagman-app` directory:
```bash
cd aagman-app
npm install
```

### Local Development
To launch the Vite development server with Hot Module Reloading (HMR):
```bash
npm run dev
```
The application will be accessible at: `http://localhost:3000`

### Production Build
To create an optimized, minified production distribution bundle:
```bash
npm run build
```
Output artifacts will be compiled into the `dist/` directory.

### Preview Production Build
To locally test and inspect the compiled production build:
```bash
npm run preview
```

---

## 5. Folder Structure
```
aagman-app/
├── public/                       # Static public assets served directly at root
│   ├── images/                   # Static raster and vector destination images
│   ├── icons/                    # Custom iconography
│   └── legacy-assets/            # Preserved media from legacy portal
├── src/
│   ├── assets/                   # Bundled application media and SVGs
│   ├── components/               # Modular, reusable React UI components
│   │   ├── common/               # Universal buttons, cards, modals, badges
│   │   ├── navigation/           # Navbar, Footer, Mobile Drawer
│   │   └── layout/               # Container, Grid, Section wrappers
│   ├── layouts/                  # Top-level page wrappers (RootLayout)
│   ├── pages/                    # Route-level view components
│   │   ├── HomePage.jsx          # Portal landing page
│   │   ├── FortsPage.jsx         # Historic Forts & Sahyadris directory
│   │   ├── TemplesPage.jsx       # Sacred Temples & Pilgrimage directory
│   │   ├── BeachesPage.jsx       # Konkan Coastal Beaches directory
│   │   ├── HeritagePage.jsx      # UNESCO Caves & Heritage directory
│   │   ├── PlannerPage.jsx       # AI Itinerary Planner interface
│   │   ├── LoginPage.jsx         # Traveler sign-in page
│   │   ├── RegisterPage.jsx      # Traveler account registration
│   │   ├── DashboardPage.jsx     # Saved trips & bookmarks dashboard
│   │   └── NotFoundPage.jsx      # 404 error page with recovery navigation
│   ├── routes/                   # React Router route declarations (AppRoutes.jsx)
│   ├── hooks/                    # Custom React hooks (useTheme, etc.)
│   ├── services/                 # API client services (Supabase, Edge Functions)
│   ├── utils/                    # Data formatters and helper functions
│   ├── styles/                   # Design system tokens and global styling
│   │   ├── tokens.css            # Approved CSS Custom Properties
│   │   └── global.css            # CSS reset, typography, and scrollbars
│   ├── lib/                      # Third-party SDK client initializers
│   ├── App.jsx                   # Application root component
│   └── main.jsx                  # ReactDOM mount entry point
├── index.html                    # Single-Page Application HTML entry point
├── package.json                  # NPM dependencies and run scripts
├── vite.config.js                # Vite bundler configuration
└── README.md                     # Project documentation
```

---

## 6. Current Implementation Status
- **Foundation**: Complete. React 18 + Vite development pipeline active.
- **Design Tokens**: Complete. Approved heritage palette and typography established.
- **Routing**: Complete. All 10 core routes (`/`, `/forts`, `/temples`, `/beaches`, `/heritage`, `/planner`, `/login`, `/register`, `/dashboard`, `*`) configured with working navigation.
- **Theme Support**: Complete. Dark/Light mode toggle persisted in `localStorage` (`aagman_theme`).
- **Legacy Application**: Fully isolated and untouched in sibling directories (`frontend/` and `backend/`).
