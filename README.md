<div align="center">

# Rakesh Portfolio

A high-performance, cyber-themed engineering portfolio built with React, TypeScript, and Vite.
Features an AI-powered Resume Tailor and Nexus Agent chatbot powered by **Groq (LLaMA-3.3-70B)**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## Features

- **Nexus Agent** — AI chatbot that answers questions about Rakesh's experience, powered by Groq LLaMA-3.3-70B
- **Neural Resume Tailor** — Paste a job description and get an AI-driven match analysis highlighting relevant skills and projects
- **Project Cortex** — Interactive project cards with architecture details, tech stacks, and hover overlays
- **Timeline** — Career history with roles, impact metrics, and tech stacks
- **Lab** — Skills and experimentation showcase
- **Uplink** — Contact and social links section
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile
- **Cyber-Themed UI** — Custom glass-panel styling, animated grid backgrounds, and monospace typography

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | React 19 + TypeScript               |
| Build Tool  | Vite 6                              |
| Styling     | Tailwind CSS 3.4 + tailwindcss-animate |
| AI Backend  | Groq API (LLaMA-3.3-70B-Versatile)  |
| Deployment  | Static build (Vercel / Netlify / any host) |

## Project Structure

```
rakesh-portfolio/
├── App.tsx                  # Root app with section routing and intersection observer
├── index.tsx                # Entry point
├── constants.tsx            # Projects and timeline data
├── types.ts                 # TypeScript interfaces
├── index.css                # Global styles and Tailwind directives
├── vite.config.ts           # Vite config with Groq API key injection
├── components/
│   ├── Header.tsx           # Fixed navigation header
│   ├── Hero.tsx             # Landing section with typewriter animation
│   ├── Cortex.tsx           # Project cards with match scoring
│   ├── ResumeTailor.tsx     # AI-powered JD analysis panel
│   ├── NexusAgent.tsx       # Floating AI chatbot
│   ├── ArchitectureDiagram.tsx  # SVG system architecture diagrams
│   ├── Timeline.tsx         # Career timeline
│   ├── Lab.tsx              # Skills showcase
│   └── Uplink.tsx           # Contact section
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [Groq API key](https://console.groq.com/keys)

### Installation

```bash
# Clone the repository
git clone https://github.com/rakesh580/Rakesh_Portfolio.git
cd Rakesh_Portfolio

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
# Edit .env.local and add your Groq API key:
# GROQ_API_KEY=your_api_key_here

# Start dev server
npm run dev
```

The app will be available at **http://localhost:3000**

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

The output will be in the `dist/` directory, ready to deploy to any static hosting provider.

## Environment Variables

| Variable       | Description                    | Required |
|----------------|--------------------------------|----------|
| `GROQ_API_KEY` | API key from Groq Console       | Yes      |

## Branches

| Branch   | Description                                      |
|----------|--------------------------------------------------|
| `main`   | Latest development version                        |
| `stable` | Last known stable release — safe fallback point   |

## License

This project is for personal portfolio use by Rakesh Chintanippu.
