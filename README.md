# RESEARCH_CORE

> System-initiated. Data streams optimized. Redefining computational analysis through monochromatic precision.

A high-fidelity research monitoring platform built with **Next.js 16**, **Three.js**, and **Tailwind CSS v4**. Features a real-time dashboard, interactive 3D visualizations, protocol explorer, and a terminal interface — all wrapped in a monochromatic, zero-radius design system with gold accents.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Three.js](https://img.shields.io/badge/Three.js-latest-000000?style=flat-square&logo=three.js)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer)

---

## Features

- **3D Interactive Scene** — Mouse-parallax camera with orbiting torus knots, octahedrons, icosahedrons, and a 400-particle vertex-colored field
- **Live Dashboard** — Real-time monitoring with auto-polling (15s), counter animations, and staggered card reveals
- **Terminal Interface** — Interactive shell with command history and system-style output
- **Protocol Explorer** — 6 system protocol cards with status tags, spec badges, and staggered entrance animations
- **Authentication** — Session-based auth with login/logout flow and middleware guarding
- **Data Export** — Download dashboard data as CSV or JSON
- **Keyboard Navigation** — Press `1`–`4` to navigate pages, `Ctrl+K` for dashboard
- **PWA Ready** — Web manifest with dark theme and standalone display
- **SEO Optimized** — Auto-generated sitemap, robots.txt, and Open Graph metadata
- **Responsive** — Fully adaptive layout from 360px mobile to ultrawide desktop
- **Docker Support** — Multi-stage Dockerfile + docker-compose with MongoDB

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| 3D Graphics | Three.js + React Three Fiber |
| Animation | Framer Motion 12 |
| Database | MongoDB + Mongoose |
| Validation | Zod |
| Auth | Session-based (HTTP-only cookies) |
| Container | Docker + docker-compose |

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- MongoDB (optional — demo data auto-generates)

### Install & Run

```bash
git clone https://github.com/shawon2210/RESEARCH_CORE.git
cd RESEARCH_CORE
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

Copy `.env.example` to `.env.local` and configure:

```env
MONGODB_URI=mongodb://localhost:27017/research-core
NEXT_PUBLIC_SITE_URL=http://localhost:3000
AUTH_USERNAME=admin
AUTH_PASSWORD=research_core
```

### Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run test         # Run tests (Vitest)
npm run typecheck    # TypeScript check
npm run lint         # ESLint
npm run seed         # Seed MongoDB with demo data
```

## Project Structure

```
src/
├── app/
│   ├── api/            # API routes (activity, metrics, nodes, streams, health, auth)
│   ├── dashboard/      # Real-time monitoring dashboard
│   ├── terminal/       # Interactive terminal
│   ├── protocols/      # Protocol explorer
│   ├── login/          # Authentication page
│   ├── layout.tsx      # Root layout with fonts, navbar, footer
│   ├── globals.css     # Design system + CSS utilities
│   ├── sitemap.ts      # Auto-generated sitemap
│   └── robots.ts       # Robots configuration
├── components/
│   ├── ui/             # Design system (Button, Card, Table, Tag, etc.)
│   ├── three/          # 3D scene objects (torus, octahedron, particles)
│   ├── sections/       # Home page sections (Hero, Mission, Technology, Impact)
│   ├── layout/         # Navbar, Footer
│   └── animations/     # MotionSection, StaggerContainer, Counter
├── lib/
│   ├── mongodb.ts      # MongoDB connection with timeout fallback
│   ├── demo-data.ts    # Realistic demo data generators
│   ├── api-utils.ts    # API helpers (CORS, error handling)
│   ├── validations.ts  # Zod schemas
│   └── auth.ts         # Session validation
└── middleware.ts        # Route protection
```

## API Endpoints

| Route | Description |
|-------|-------------|
| `GET /api/metrics` | System metrics (throughput, latency, uptime) |
| `GET /api/activity` | Recent activity stream |
| `GET /api/nodes` | Node health & status |
| `GET /api/streams` | Data pipeline streams |
| `GET /api/health` | System health check |
| `POST /api/auth/login` | User authentication |
| `POST /api/auth/logout` | Session invalidation |
| `GET /api/auth/me` | Current session status |

## Deployment

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker compose up --build
```

---

**RESEARCH_CORE** — System Archive. Status: Optimal.
