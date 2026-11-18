# NPTEL Webpage Replica

A pixel-perfect replica of the **NPTEL Student Dashboard**, extracted directly from the Stitch MCP Server design project (`Webpage Replica Project`), built with **React + Vite**, **Bootstrap 5.3**, **Bootstrap Icons**, and a **Node.js + Express + SQLite** backend.

---

## 📸 Overview & Visual Fidelity

The application replicates the NPTEL Dashboard design down to every pixel, maintaining exact Bootstrap 5.3 markup, colors, typography, Bootstrap Icons, responsive breakpoints, and institutional emblems.

- **Navbar**: Deep maroon (`#800020`) top bar with mortarboard icon, NPTEL branding, primary links (Dashboard, My Courses, Certificates, Halltickets, LC dropdown), and authenticated user menu (`iv1560@srmist.edu.in`).
- **Notice Alert Banner**: Warning red (`#feecee` / `#861b2d`) notification regarding previous semester score/certificate migration with active problem reporting link.
- **Metrics Cards Grid**: 4 stat cards displaying Total Courses (1, maroon), Certificates (1, green), Active Enrollments (0, cyan), and Pending Exams (0, yellow).
- **Recent Activity Panel**: 8-column card showing enrolled course *"Data Base Management System"* (`noc26-cs117 - Jul-Dec 2026`), status badge, and "View All Courses" link.
- **Quick Actions & Upcoming Deadlines**: 4-column sidebar with styled outline action buttons and upcoming exam deadlines status.
- **Footer**: NPTEL logo, About NPTEL summary, MoE funding accreditation, social media channels, and 8 partner institute emblems (IIT Madras, IIT Bombay, IIT Delhi, IIT Kanpur, IIT Kharagpur, IIT Guwahati, IIT Roorkee, IISc Bangalore).
- **Floating Support Action**: Fixed bottom-right button opening the interactive *"Report a problem"* modal submitting to `/api/reports`.

---

## 🗂 Project Structure

```text
dbms_nptel_webpage/
├── stitch-export/                     # Designs exported from Stitch MCP
│   ├── nptel_dashboard_bootstrap.html # Bootstrap 5.3 HTML code
│   ├── nptel_dashboard_replica.html   # Tailwind alternative export
│   ├── screenshot_bootstrap.jpg       # Reference screenshot (Bootstrap)
│   ├── screenshot_replica.jpg         # Reference screenshot (Replica)
│   └── images/                        # Exported institution & NPTEL logos
├── reference-images/                  # Local copies of screenshots
│   ├── screenshot_bootstrap.jpg
│   └── screenshot_replica.jpg
├── client/                            # React + Vite Frontend
│   ├── public/images/                 # Institutional logos & emblems
│   ├── src/
│   │   ├── components/                # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── AlertBanner.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── QuickActions.jsx
│   │   │   ├── UpcomingDeadlines.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FloatingReportButton.jsx
│   │   │   └── ReportModal.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # JWT Authentication state
│   │   ├── pages/                     # React Router page views
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MyCourses.jsx
│   │   │   ├── Certificates.jsx
│   │   │   ├── Halltickets.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   ├── index.css                  # Stitch CSS rules
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                            # Node.js + Express + SQLite Backend
│   ├── db.js                          # SQLite database schema & seeds
│   ├── server.js                      # Express API server & static host
│   ├── nptel.db                       # SQLite database file
│   ├── .env                           # Environment configuration
│   ├── .env.example
│   └── package.json
├── .env.example                       # Root environment reference
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18+ (tested on Node v22.14.0)
- **npm**: v9+

### 1. Installation

Install server dependencies:
```bash
cd server
npm install
```

Install client dependencies:
```bash
cd ../client
npm install
```

### 2. Environment Configuration

Copy `.env.example` to `.env` in `server/`:
```bash
cd ../server
cp .env.example .env
```

Default `.env` settings:
```ini
PORT=5001
JWT_SECRET=nptel_jwt_secret_key_2026_secure
NODE_ENV=development
```

### 3. Running the Application

#### Option A: Unified Server (Serves both Frontend & Backend)
Build the client and start the backend:
```bash
# Build frontend
cd client && npm run build

# Start backend (serves API on :5001 and React SPA)
cd ../server && npm start
```
Open your browser at: **`http://localhost:5001`**

#### Option B: Independent Dev Servers
Run the Express backend:
```bash
cd server
npm run dev
```

In a separate terminal, run the Vite dev server:
```bash
cd client
npm run dev
```
Vite will run on `http://localhost:3000` and automatically proxy all `/api/*` calls to `http://localhost:5001`.

---

## 🔐 Credentials & Seed Data

The SQLite database (`server/nptel.db`) is automatically initialized and seeded on first run:

| Role | Email | Password | Details |
|---|---|---|---|
| **Primary Seed User** | `student@example.com` | `password123` | Required seed user |
| **Replica UI User** | `iv1560@srmist.edu.in` | `password123` | User shown on Stitch reference design |

### Seeded Records
- **Course**: *"Data Base Management System"* (`noc26-cs117`, Jul-Dec 2026, IIT Kharagpur, Prof. Partha Pratim Das, 3 Credits, Status: `Enrolled`)
- **Certificate**: Data Base Management System (`noc26-cs117`, Jul-Dec 2026, Score: 88, Type: `Elite + Silver`)
- **Hallticket**: Data Base Management System (Exam Date: 25 Oct 2026, Shift: 09:00 AM - 12:00 PM, Center: Chennai Ion Digital Zone)
- **Dashboard Stats**: Total Courses = 1, Certificates = 1, Active Enrollments = 0, Pending Exams = 0

---

## 📡 REST API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/login` | Authenticate with email & password, returns JWT token | No |
| `GET` | `/api/auth/me` | Fetch authenticated user profile | Yes (Bearer JWT) |
| `GET` | `/api/dashboard/summary` | Retrieve dashboard counters and recent activities | No |
| `GET` | `/api/courses` | List enrolled courses | No |
| `GET` | `/api/certificates` | List earned certificates and scores | No |
| `GET` | `/api/halltickets` | List released halltickets and exam centers | No |
| `POST` | `/api/reports` | Submit a problem report / support ticket | No |
| `GET` | `/api/health` | Healthcheck endpoint | No |

---

## 🧩 Components Breakdown

1. **`Navbar`**: Responsive header featuring brand logo, desktop navigation menu, LC portal dropdown, mobile drawer, and user profile/logout actions.
2. **`AlertBanner`**: Notification banner informing students of semester migration, with direct trigger to open the problem reporting modal.
3. **`StatCard`**: Colorful metrics cards matching exact NPTEL color codes (`#800020`, `#198754`, `#0dcaf0`, `#ffc107`).
4. **`RecentActivity`**: Course card with course title, code, semester session, and enrollment badge.
5. **`QuickActions`**: Action shortcuts linked to Certificates, Achievements, Analytics, and Profile.
6. **`UpcomingDeadlines`**: Warning panel displaying examination deadlines.
7. **`Footer`**: Full institutional footer with NPTEL accreditation and 8 IIT/IISc partner logos.
8. **`ReportModal` & `FloatingReportButton`**: Floating action button and modal allowing students to submit issue reports directly to the backend database.
