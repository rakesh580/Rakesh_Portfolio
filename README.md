<div align="center">

# Rakesh Portfolio

A high-performance, cyber-themed engineering portfolio built with React, TypeScript, and Vite.
Features an AI-powered Resume Tailor, Nexus Agent chatbot, and interactive project case studies.

**[Live Demo](https://rakesh580.github.io/Rakesh_Portfolio/)**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Groq](https://img.shields.io/badge/Groq-LLaMA_3.3_70B-F55036?logo=meta&logoColor=white)](https://groq.com)
[![Deploy](https://img.shields.io/badge/Deployed-GitHub_Pages-222?logo=github&logoColor=white)](https://rakesh580.github.io/Rakesh_Portfolio/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Live Projects](#live-projects)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [Branches](#branches)
- [License](#license)

---

## Overview

This portfolio is more than a static resume site. It's an interactive, AI-enhanced platform that lets visitors:

- **Chat with an AI agent** that knows Rakesh's full background, projects, and skills
- **Paste a job description** and get an instant AI-driven match analysis showing which skills and projects are relevant
- **Explore detailed case studies** for each project with step-by-step walkthroughs, architecture breakdowns, and technical deep dives
- **View live demos** of deployed projects directly from the portfolio

Built with a cyber/futuristic design language — glassmorphism panels, monospace typography, mint-green accent system, and ambient background effects.

---

## Features

### Nexus Agent (AI Chatbot)
A floating AI chatbot powered by **Groq LLaMA-3.3-70B** that can answer questions about Rakesh's experience, skills, and projects. The agent has full knowledge of all project details including architecture, tech decisions, signal logic (EdgeTicker), and deployment strategies.

### Neural Resume Tailor
Paste any job description and the AI analyzes it against Rakesh's portfolio data. It returns:
- **Relevant skills** highlighted across all project cards
- **Match scores** (0-100%) for each project
- **Tailored summary** explaining why Rakesh fits the role

When active, project cards glow and the Nexus Agent automatically provides context-aware responses focused on the matched skills.

### Project Cortex (Skill Map)
Interactive project cards in a 2-column grid layout. Each card shows:
- Project title, mission, and core outcome
- Tech stack tags (highlighted when Resume Tailor is active)
- Hover overlay with architecture summary, production metrics, case study button, and live project link

### Interactive Case Studies
Full-screen modal with tabbed navigation for each project. Sections include:
- **The Problem** — What gap the project fills, with highlight cards
- **The Solution** — How the project solves it, with key differentiators
- **How It Works** — Step-by-step walkthrough with numbered steps (written for non-technical readers)
- **Key Features** — Grid of feature cards with icons and descriptions
- **Signal Logic** (EdgeTicker only) — Detailed breakdown of BUY/HOLD/AVOID signal system
- **Under the Hood** — Technical architecture, design decisions, and tech choices
- **Results** — Impact metrics and outcomes

Case studies are accessible from both the Cortex (Skill Map) section and the Lab section.

### The Lab
Project showcase with image cards, tech badges, and architecture modal. Each project has:
- Hero image with grayscale-to-color hover effect
- Architecture diagram (interactive SVG)
- Tech stack, metrics, and core outcome
- Links to live apps and case studies

### Timeline
Career history displayed as a vertical timeline with:
- Role, company, location, and date range
- Description of responsibilities
- Tech stack tags
- Impact metrics (quantified achievements)

### Uplink (Contact)
Contact section with links to GitHub, LinkedIn, email, and other social profiles.

---

## Live Projects

| Project | Description | Live Link |
|---------|-------------|-----------|
| **AI Weather Assistant (SkyPulse)** | AI-powered weather app with Comfort Score, clothing advisor, and LLaMA 3.3 chat | [weather-app-s3vf.onrender.com](https://weather-app-s3vf.onrender.com/) |
| **EdgeTicker** | Full-stack stock analysis platform with BUY/HOLD/AVOID signals and AI Market Copilot | [huggingface.co/spaces/mindflayer80058/Edgeticker](https://huggingface.co/spaces/mindflayer80058/Edgeticker) |
| **Rchat.ai** | Real-time chat platform with WebSockets, room management, and JWT auth | [github.com/rakesh580/Rchat.ai-](https://github.com/rakesh580/Rchat.ai-) |

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Framework | React 19 + TypeScript | Component-based UI with type safety |
| Build Tool | Vite 6 | Fast dev server and optimized production builds |
| Styling | Tailwind CSS 3.4 + tailwindcss-animate | Utility-first CSS with animation support |
| AI Backend | Groq API (LLaMA-3.3-70B-Versatile) | Powers Nexus Agent chatbot and Resume Tailor analysis |
| Deployment | GitHub Pages via GitHub Actions | Automated CI/CD on push to main |
| Architecture Diagrams | Custom SVG components | Interactive node-edge diagrams for each project |

---

## Project Structure

```
rakesh-portfolio/
├── App.tsx                          # Root app — section routing, intersection observer, case study state
├── index.tsx                        # Entry point
├── constants.tsx                    # Project data, timeline data, and case study content
├── types.ts                         # TypeScript interfaces (Project, CaseStudy, MatchData, etc.)
├── index.css                        # Global styles, Tailwind directives, custom scrollbar, glass-panel
├── vite.config.ts                   # Vite config — API key injection, base path, aliases
├── .env.local                       # Local environment variables (not committed)
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions — build + deploy to GitHub Pages
├── components/
│   ├── Header.tsx                   # Fixed navigation with section highlighting
│   ├── Hero.tsx                     # Landing section with typewriter animation
│   ├── Cortex.tsx                   # Skill Map — project cards with hover overlays and match scoring
│   ├── ResumeTailor.tsx             # AI-powered JD analysis panel (Groq API)
│   ├── NexusAgent.tsx               # Floating AI chatbot with project knowledge (Groq API)
│   ├── CaseStudyModal.tsx           # Full-screen tabbed case study viewer
│   ├── ArchitectureDiagram.tsx      # SVG node-edge architecture diagrams
│   ├── Timeline.tsx                 # Career timeline with impact metrics
│   ├── Lab.tsx                      # Project cards with images and architecture modals
│   └── Uplink.tsx                   # Contact and social links
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [Groq API key](https://console.groq.com/keys) (free tier available)

### Installation

```bash
# Clone the repository
git clone https://github.com/rakesh580/Rakesh_Portfolio.git
cd Rakesh_Portfolio

# Install dependencies
npm install

# Create environment file
echo "GROQ_API_KEY=your_groq_api_key_here" > .env.local

# Start development server
npm run dev
```

The app will be available at **http://localhost:3000/Rakesh_Portfolio/**

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

The output will be in the `dist/` directory.

---

## Environment Variables

| Variable | Description | Required | Where to Get |
|----------|-------------|----------|--------------|
| `GROQ_API_KEY` | API key for Groq (powers chatbot and resume tailor) | Yes | [console.groq.com/keys](https://console.groq.com/keys) |

### How API Key Injection Works

Vite's `define` plugin replaces `process.env.API_KEY` with the literal API key string at **build time**. This means:

1. The key is read from `.env.local` (locally) or from GitHub Secrets (in CI/CD)
2. Vite bakes it directly into the JavaScript bundle during `npm run build`
3. At runtime, the browser uses the embedded string — no server-side environment needed

This is standard for static sites deployed to GitHub Pages, Netlify, or Vercel.

---

## Deployment

### GitHub Pages (Current Setup)

The site is automatically deployed via GitHub Actions on every push to `main`.

**Workflow:** `.github/workflows/deploy.yml`

```
Push to main → npm ci → Create .env.local from secret → npm run build → Upload to Pages → Deploy
```

**Setup steps:**
1. Go to your repo's **Settings > Secrets and variables > Actions**
2. Add a repository secret: `GROQ_API_KEY` = your Groq API key
3. Go to **Settings > Pages** and set Source to **GitHub Actions**
4. Push to `main` — the site will deploy to `https://<username>.github.io/Rakesh_Portfolio/`

### Other Hosting (Vercel, Netlify, etc.)

```bash
npm run build
# Upload the dist/ folder to your hosting provider
# Set GROQ_API_KEY as an environment variable in your provider's dashboard
```

---

## Architecture

### Data Flow

```
User's Browser
    │
    ├── React App (Vite-built static bundle)
    │   ├── Cortex — Project cards with match scoring
    │   ├── Lab — Project showcase with architecture modals
    │   ├── CaseStudyModal — Tabbed case study viewer
    │   ├── ResumeTailor — JD analysis (calls Groq API)
    │   └── NexusAgent — AI chatbot (calls Groq API)
    │
    └── External APIs
        └── Groq API (LLaMA-3.3-70B)
            ├── Chatbot responses with project context
            └── JD match analysis (returns JSON)
```

### Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Groq API over OpenAI** | Free tier, fast inference (~1s), supports LLaMA-3.3-70B |
| **Vite `define` for API key** | Bakes key at build time — no backend needed for static hosting |
| **Shared CaseStudyModal** | Single modal component used by both Cortex and Lab via App-level state |
| **Case study data in constants.tsx** | Keeps all project content co-located and type-safe |
| **Tailwind + custom CSS** | Utility classes for layout, custom properties for the cyber theme |
| **No React Router** | Single-page scroll with intersection observer for section highlighting |

### Component Hierarchy

```
App
├── Header (fixed nav, section highlighting)
├── Hero (landing, typewriter)
├── ResumeTailor (JD input, Groq API call)
├── Cortex (project cards, hover overlays, match scoring)
├── Timeline (career history)
├── Lab (project images, architecture modals)
├── Uplink (contact links)
├── CaseStudyModal (full-screen tabbed viewer)
└── NexusAgent (floating chatbot)
```

---

## Branches

| Branch | Description |
|--------|-------------|
| `main` | Latest development version — auto-deploys to GitHub Pages |
| `stable` | Last known stable release — safe fallback point |

---

## License

This project is for personal portfolio use by Rakesh Chintanippu.
