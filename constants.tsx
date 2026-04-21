
import { Project, TimelineEvent } from './types';

/**
 * Single source of truth for contact info. Imported by the Uplink panel,
 * the NexusAgent system prompt, and any future resume-download logic so
 * there's exactly one place to update phone / email / handles.
 */
export const CONTACT = {
  name: 'Rakesh Chintanippu',
  title: 'Software Engineer · Full-Stack · AI Platforms',
  email: 'rakeshswe2026@gmail.com',
  phone: '(980) 666-8179',
  github: 'https://github.com/rakesh580',
  githubHandle: 'rakesh580',
  linkedin: 'https://www.linkedin.com/in/rakesh-c-231334329/',
  linkedinHandle: 'rakesh-c',
  portfolio: 'https://rakesh580.github.io/Rakesh_Portfolio/',
  availability: 'Open to Full-Stack, AI Platform, and Cloud Engineering roles',
  company: 'Cruxito Tech Solutions LLC',
  education: {
    masters: { school: 'North Carolina A&T State University', gpa: '3.9/4.0', year: '2024' },
    bachelors: { school: 'Vidya Jyothi Institute of Technology (VJIT), India', gpa: '3.8/4.0', year: '2022' },
  },
};

export const PROJECTS: Project[] = [
  {
    id: 'weather-ai',
    title: 'SkyPulse · AI Weather Intelligence',
    mission: 'Transforming raw weather data into actionable, AI-driven insights with health tracking, logistics optimization, and journey planning.',
    description: 'A full-stack weather intelligence platform built with React 19 + TypeScript and FastAPI, featuring AI-powered chat (LLaMA 3.3 70B), activity optimization, health journal, logistics planning, anomaly detection, microclimate analysis, and journey weather corridors.',
    tech: ['React 19', 'TypeScript', 'Vite', 'FastAPI', 'Python', 'LLaMA 3.3 70B', 'Hugging Face', 'Chart.js', 'Leaflet', 'Docker', 'AWS EC2'],
    github: 'https://weather-app-s3vf.onrender.com/',
    image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1200&auto=format&fit=crop',
    impact: 'Full-stack weather intelligence',
    architecture: 'React 19 + TypeScript frontend with FastAPI backend orchestrating OpenWeatherMap data, Hugging Face LLM inference, route-based weather corridors, health correlation engines, and activity optimization, all with rate limiting, caching, and Docker-based CI/CD.',
    metrics: ['AI-powered chat', 'Activity Optimizer', 'Health Journal', 'Journey Weather Corridor', 'Anomaly Detection', 'Microclimate Analysis'],
    diagram: {
      nodes: [
        { id: 'u', label: 'React 19 + TS', type: 'client', x: 50, y: 150 },
        { id: 'f', label: 'FastAPI Engine', type: 'server', x: 250, y: 150 },
        { id: 'w', label: 'OpenWeatherMap', type: 'external', x: 450, y: 30 },
        { id: 'o', label: 'LLaMA 3.3 70B', type: 'llm', x: 450, y: 150 },
        { id: 'g', label: 'Geocoding APIs', type: 'external', x: 450, y: 270 }
      ],
      edges: [
        { from: 'u', to: 'f', label: 'REST API' },
        { from: 'f', to: 'w', label: 'Weather + AQI + UV' },
        { from: 'f', to: 'o', label: 'HuggingFace Inference' },
        { from: 'f', to: 'g', label: 'Nominatim + ORS' }
      ]
    },
    caseStudy: {
      tagline: 'From raw weather data to intelligent, actionable insights, powered by AI, health science, and route planning.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Weather Apps Tell You Numbers, Not Answers',
            paragraphs: [
              'Traditional weather apps show you temperature, humidity, and wind speed, but they don\'t answer "Should I bring an umbrella?", "Is it safe to drive to Charlotte tonight?", or "Will this pressure drop trigger my migraines?"',
              'People want actionable advice tied to their activities, health, and travel plans, not raw data scattered across 10 different metrics.'
            ],
            highlights: [
              { label: 'Raw Data Overload', value: 'Users see 10+ metrics but can\'t interpret them together', icon: 'data_array' },
              { label: 'No Health Awareness', value: 'No correlation between weather patterns and personal symptoms', icon: 'health_and_safety' },
              { label: 'No Route Intelligence', value: 'Can\'t see weather conditions along a driving route', icon: 'route' },
              { label: 'No Activity Guidance', value: 'No recommendations for outdoor activities based on conditions', icon: 'directions_run' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'SkyPulse, A Full-Stack Weather Intelligence Platform',
            paragraphs: [
              'SkyPulse combines real-time weather data from OpenWeatherMap with Meta\'s LLaMA 3.3 70B to create a platform that goes far beyond forecasts, it optimizes your activities, tracks your health patterns, plans your routes, and detects weather anomalies.',
              'It calculates a Comfort Score (0-100), recommends clothing, analyzes microclimates (elevation, urban heat islands, water proximity), plans weather-safe delivery routes, and lets you chat with an AI that knows your exact local conditions.'
            ],
            highlights: [
              { label: 'Comfort Score', value: 'Single 0-100 number combining temp, humidity, wind & visibility', icon: 'speed' },
              { label: 'Activity Optimizer', value: 'AI ranks outdoor activities by weather suitability in real-time', icon: 'fitness_center' },
              { label: 'Health Journal', value: 'Track symptoms and correlate them with barometric pressure changes', icon: 'monitor_heart' },
              { label: 'Journey Corridor', value: 'See weather along your entire driving route with waypoints and ETAs', icon: 'map' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Search to Smart Insights in 5 Steps',
            paragraphs: [
              'Here\'s how SkyPulse transforms a simple city search into a comprehensive weather intelligence experience:'
            ],
            steps: [
              { step: 1, title: 'You Search a City', description: 'Type any city name. The FastAPI backend geocodes it via Nominatim (with OpenRouteService fallback) to find exact coordinates.' },
              { step: 2, title: 'Parallel Data Fetch', description: 'The backend fires parallel requests: current weather, 5-day forecast, air quality index, UV index, anomaly detection (vs historical averages), and microclimate corrections (elevation, urban heat island, water proximity).' },
              { step: 3, title: 'The UI Comes Alive', description: 'React 19 renders the weather hero card, Chart.js forecasts (3 view modes), Leaflet map with weather overlays, sunrise/sunset arc, city clock, AQI breakdown, UV exposure guide, and Framer Motion animations.' },
              { step: 4, title: 'You Explore Advanced Tools', description: 'Open the Activity Optimizer for weather-scored activity rankings, the Health Journal to log symptoms against pressure changes, the Logistics Optimizer for delivery route planning, or the Journey Corridor for route-based weather visualization.' },
              { step: 5, title: 'You Ask the AI', description: 'Chat with LLaMA 3.3 70B, it knows your current weather, your planned route, and your health history. Ask "Is it safe to drive to Charlotte?" and get a contextual, data-grounded answer.' }
            ]
          }
        },
        {
          id: 'features',
          label: 'Key Features',
          icon: 'star',
          content: {
            heading: 'What Makes SkyPulse Different',
            paragraphs: [
              'SkyPulse isn\'t just another weather app · it\'s a full-stack intelligence platform with 20+ API endpoints, 16 component directories, and premium UX that makes weather data personal and actionable.'
            ],
            highlights: [
              { label: 'Activity Optimizer', value: 'AI-powered activity recommendations scored by weather suitability', icon: 'fitness_center' },
              { label: 'Health Journal', value: 'Barometric pressure tracking with symptom correlation over time', icon: 'monitor_heart' },
              { label: 'Journey Weather Corridor', value: 'Full route weather with waypoints, elevation data, and ETAs', icon: 'route' },
              { label: 'Logistics Optimizer', value: 'Weather-aware delivery route planning with risk assessment', icon: 'local_shipping' },
              { label: 'Anomaly Detection', value: 'Flags conditions that deviate from historical averages', icon: 'warning' },
              { label: 'Microclimate Analysis', value: 'Elevation, urban heat island, water proximity, terrain corrections', icon: 'terrain' },
              { label: 'Air Quality + UV Index', value: 'Real-time AQI pollutant breakdown and UV exposure recommendations', icon: 'air' },
              { label: '5-Day Forecast', value: 'Three views: scrollable cards, interactive Chart.js graphs, daily summaries', icon: 'calendar_month' },
              { label: 'Interactive Map', value: 'Leaflet map with toggleable weather overlays (clouds, rain, temp, wind)', icon: 'map' },
              { label: 'OLED Dark Mode', value: 'True black (#000) with electric cyan accents, 8.3:1 contrast ratio', icon: 'dark_mode' },
              { label: 'AI Chat Assistant', value: 'LLaMA 3.3 70B with full weather + journey context injection', icon: 'smart_toy' },
              { label: 'Favorites & City Clock', value: 'Save frequent cities, see local time, sunrise/sunset progress arc', icon: 'favorite' }
            ]
          }
        },
        {
          id: 'tech-deep-dive',
          label: 'Under the Hood',
          icon: 'engineering',
          content: {
            heading: 'Technical Architecture & Decisions',
            paragraphs: [
              'The backend is a 1,800-line FastAPI server with 20+ endpoints, rate limiting (SlowAPI), TTL caching (cachetools), and parallel data fetching. Weather data comes from OpenWeatherMap. Geocoding uses Nominatim with OpenRouteService fallback. The AI chat runs Meta\'s LLaMA 3.3 70B via Hugging Face Inference API.',
              'The frontend is React 19 + TypeScript + Vite 7, organized into 16 feature-based component directories with dedicated API modules, custom hooks (useReducedMotion, useCityClock, useDebounce), and context providers. Framer Motion handles animations, Chart.js powers forecasts, and Leaflet renders interactive maps.',
              'Deployment uses multi-stage Docker builds with GitHub Actions CI/CD. The pipeline automatically builds, pushes to Docker Hub, and deploys to AWS EC2. Alternative deployment configs exist for Render.com.'
            ],
            highlights: [
              { label: 'FastAPI + SlowAPI', value: 'Rate-limited async backend with TTL caching and 20+ endpoints', icon: 'bolt' },
              { label: 'React 19 + TypeScript', value: 'Fully typed frontend with 16 component directories and custom hooks', icon: 'code' },
              { label: 'LLaMA 3.3 70B', value: 'Context-grounded AI with weather + journey + health data injection', icon: 'psychology' },
              { label: 'Docker + CI/CD', value: 'Multi-stage builds with GitHub Actions auto-deploy to AWS EC2', icon: 'deployed_code' }
            ]
          }
        },
        {
          id: 'results',
          label: 'Results',
          icon: 'emoji_events',
          content: {
            heading: 'Impact & Outcomes',
            paragraphs: [
              'SkyPulse demonstrates the power of combining traditional weather APIs with modern AI, health science, and route planning to create an experience that\'s genuinely useful, not just informational.'
            ],
            highlights: [
              { label: '20+ API Endpoints', value: 'Weather, forecast, AQI, UV, anomaly, microclimate, journey, logistics, health, chat', icon: 'api' },
              { label: '6 Intelligence Modules', value: 'Activity, Health, Logistics, Anomaly, Microclimate, Journey, all AI-enhanced', icon: 'hub' },
              { label: 'Sub-2s AI Response', value: 'LLaMA 3.3 responds with route-aware, health-aware contextual answers', icon: 'timer' },
              { label: 'Full CI/CD Pipeline', value: 'Zero-touch deployment from git push to live production on AWS', icon: 'rocket_launch' }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'rchat',
    title: 'Rchat.ai Platform',
    mission: 'Enabling seamless, secure, low-latency multi-user communication in real-time.',
    description: 'Engineered a real-time AI-powered chat system with message streaming and room management.',
    tech: ['FastAPI', 'React', 'WebSockets', 'PostgreSQL', 'JWT', 'OAuth2'],
    github: 'https://github.com/rakesh580/Rchat.ai-',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&auto=format&fit=crop',
    impact: 'Seamless message streaming',
    architecture: 'Async FastAPI backend utilizing WebSockets for duplex communication and PostgreSQL for persistent state.',
    metrics: ['Zero-latency streaming', 'Secure Auth implementation'],
    diagram: {
      nodes: [
        { id: 'r', label: 'React Frontend', type: 'client', x: 50, y: 150 },
        { id: 'f', label: 'FastAPI WS', type: 'server', x: 250, y: 150 },
        { id: 'p', label: 'PostgreSQL', type: 'database', x: 450, y: 80 },
        { id: 'rd', label: 'Redis Pub/Sub', type: 'database', x: 450, y: 220 }
      ],
      edges: [
        { from: 'r', to: 'f', label: 'WebSockets' },
        { from: 'f', to: 'p', label: 'Persistence' },
        { from: 'f', to: 'rd', label: 'Real-time Sync' }
      ]
    }
  },
  {
    id: 'edgeticker',
    title: 'EdgeTicker',
    mission: 'Delivering explainable, AI-driven stock signals with enterprise-grade analysis, backtested confidence scores, and a streaming Market Copilot.',
    description: 'A full-stack AI-powered stock intelligence platform with BUY/HOLD/AVOID signals backed by 3-year backtested confidence scores, multi-timeframe conflict detection, watchlist intelligence analytics, and an enterprise Market Copilot with SSE streaming and proactive auto-insights.',
    tech: ['React 19', 'Vite 7', 'FastAPI', 'Python', 'Mistral-7B', 'yfinance', 'Lightweight Charts', 'SSE', 'Docker'],
    github: 'https://huggingface.co/spaces/mindflayer80058/Edgeticker',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    impact: 'Enterprise stock intelligence',
    architecture: 'Modular React 19 frontend with FastAPI backend orchestrating Yahoo Finance data, technical indicator computation, backtesting engine, multi-timeframe consensus detection, and Mistral-7B powered Market Copilot with SSE streaming and context-grounded prompts.',
    metrics: ['Signal Confidence + Backtest Proof', 'Enterprise SSE Market Copilot', 'Multi-Timeframe Conflict Alerts', 'Watchlist Intelligence Dashboard', 'Command Palette + Sector Heatmap'],
    diagram: {
      nodes: [
        { id: 'ui', label: 'React 19 Dashboard', type: 'client', x: 50, y: 150 },
        { id: 'api', label: 'FastAPI Engine', type: 'server', x: 250, y: 150 },
        { id: 'fin', label: 'Yahoo Finance', type: 'external', x: 450, y: 30 },
        { id: 'llm', label: 'Mistral-7B (SSE)', type: 'llm', x: 450, y: 150 },
        { id: 'bt', label: 'Backtest Engine', type: 'server', x: 450, y: 270 }
      ],
      edges: [
        { from: 'ui', to: 'api', label: 'REST + SSE' },
        { from: 'api', to: 'fin', label: 'Market Data' },
        { from: 'api', to: 'llm', label: 'Context Injection' },
        { from: 'api', to: 'bt', label: 'Signal Validation' }
      ]
    },
    caseStudy: {
      tagline: 'From raw market data to explainable, backtested BUY/HOLD/AVOID signals, powered by AI, technical analysis, and enterprise UX.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Stock Analysis is Fragmented and Overwhelming',
            paragraphs: [
              'Individual investors face a flood of financial data scattered across multiple platforms, price charts on one site, fundamentals on another, news on a third, and options data somewhere else entirely.',
              'Most tools are either too simplistic (just showing a price chart) or too complex (requiring deep financial expertise to interpret). There\'s no single platform that brings everything together and tells you, in plain language, whether a stock is worth buying, with proof.'
            ],
            highlights: [
              { label: 'Data Fragmentation', value: 'Investors juggle 5+ different tools to analyze a single stock', icon: 'dashboard' },
              { label: 'No Clear Signals', value: 'Raw charts don\'t tell you when to buy, hold, or avoid', icon: 'signal_cellular_off' },
              { label: 'No Confidence Metrics', value: 'Signals lack backtested win rates or historical validation', icon: 'query_stats' },
              { label: 'Expert-Only Tools', value: 'Most analysis platforms require years of trading experience', icon: 'school' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'EdgeTicker, Enterprise Stock Intelligence, Made Accessible',
            paragraphs: [
              'EdgeTicker is a full-stack stock analysis platform that generates BUY/HOLD/AVOID signals backed by 3-year backtested confidence scores, multi-timeframe consensus analysis, and an enterprise AI Market Copilot with real-time SSE streaming.',
              'Every signal shows its confidence score with historical win rate, average return, and max drawdown. When daily, weekly, and monthly signals disagree, the platform alerts you with conflict severity. The AI Copilot proactively generates executive summaries and answers questions using real market data.'
            ],
            highlights: [
              { label: 'Backtested Confidence', value: 'Every signal shows 3-year win rate, avg return, and max drawdown', icon: 'verified' },
              { label: 'Timeframe Conflict Alerts', value: 'Auto-detects when daily, weekly, monthly signals disagree', icon: 'warning' },
              { label: 'Streaming AI Copilot', value: 'SSE-powered assistant with typewriter effect and auto-insights', icon: 'smart_toy' },
              { label: 'Watchlist Intelligence', value: 'Signal distribution, top movers, and overbought/oversold alerts', icon: 'analytics' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Ticker to Validated Signal in 6 Steps',
            paragraphs: [
              'Here\'s how EdgeTicker transforms a stock ticker into a backtested, explainable investment signal:'
            ],
            steps: [
              { step: 1, title: 'Enter Any Stock Ticker', description: 'Type a symbol or use the Command Palette (Ctrl+K) for instant lookup. Autocomplete shows matching companies with full names.' },
              { step: 2, title: 'Market Data is Fetched', description: 'The FastAPI backend calls Yahoo Finance for real-time prices, historical data, fundamentals (P/E, revenue, margins), news, options chains, and earnings dates.' },
              { step: 3, title: 'Signal is Generated & Backtested', description: 'The engine computes SMA-200, RSI-14, resistance levels, and volume patterns. A BUY/HOLD/AVOID signal is generated, then validated against 3 years of historical data to produce a confidence score with win rate and max drawdown.' },
              { step: 4, title: 'Multi-Timeframe Check', description: 'Daily, weekly, and monthly signals are compared. If they disagree, a conflict alert appears with severity level and each timeframe\'s individual signal.' },
              { step: 5, title: 'AI Copilot Activates', description: 'The Market Copilot auto-generates a 4-bullet executive summary via SSE streaming. Smart context-aware suggestions appear as follow-up chips based on the stock\'s data.' },
              { step: 6, title: 'Full Dashboard Renders', description: 'Interactive charts, signal explanation, risk/reward analysis, options flow, earnings calendar, news feed, and the streaming AI Copilot, all in one enterprise-grade view.' }
            ]
          }
        },
        {
          id: 'features',
          label: 'Key Features',
          icon: 'star',
          content: {
            heading: 'A Complete Investment Analysis Toolkit',
            paragraphs: [
              'EdgeTicker goes far beyond basic charting. It\'s an enterprise-grade platform with 56 components, 13 API route files, and tools that professional analysts use, made accessible to everyone.'
            ],
            highlights: [
              { label: 'Signal Confidence', value: 'Backtested win rates, total trades analyzed, avg returns, max drawdown', icon: 'verified' },
              { label: 'Timeframe Conflict Alerts', value: 'Detects daily/weekly/monthly signal disagreements with severity', icon: 'warning' },
              { label: 'Watchlist Intelligence', value: 'Signal distribution, top movers, strongest buys, RSI overbought/oversold', icon: 'analytics' },
              { label: 'Enterprise Market Copilot', value: 'SSE streaming, auto-insights, smart suggestions, rich markdown, memory', icon: 'smart_toy' },
              { label: 'Command Palette', value: 'Ctrl/Cmd+K for instant ticker lookup and navigation', icon: 'keyboard_command_key' },
              { label: 'Sector Heatmap', value: 'Visual performance breakdown by market sector', icon: 'grid_view' },
              { label: 'Market Tape', value: 'Scrolling ticker display with real-time prices and indices', icon: 'receipt_long' },
              { label: 'Live Price Streaming', value: 'Prices refresh every 5s with animated up/down tick indicators', icon: 'candlestick_chart' },
              { label: 'Backtesting Engine', value: 'Test signals over 2/3/5 years with equity curves and Sharpe ratio', icon: 'history' },
              { label: 'Options Flow Detection', value: 'Spots unusual activity (volume > 2x open interest) with sentiment', icon: 'trending_up' },
              { label: 'Stock Screener', value: 'Filter S&P 500, tech stocks, dividend kings by signal/RSI/P/E/sector', icon: 'filter_alt' },
              { label: 'Dark/Light Mode', value: 'Glassmorphism dark mode with splash screen and notification center', icon: 'dark_mode' }
            ]
          }
        },
        {
          id: 'signal-logic',
          label: 'Signal Logic',
          icon: 'psychology',
          content: {
            heading: 'The Brain Behind BUY / HOLD / AVOID',
            paragraphs: [
              'EdgeTicker\'s signal system is built on two battle-tested technical indicators that professional traders have used for decades:',
              'The 200-day Simple Moving Average (SMA-200) shows the long-term trend. If a stock\'s price is below this line, it\'s historically cheap. The Relative Strength Index (RSI-14) measures momentum on a 0-100 scale, below 40 means oversold (potentially undervalued), above 65 means overbought (potentially overvalued).',
              'Every signal is now backed by a 3-year backtest showing its historical confidence, win rate, average return per trade, and maximum drawdown. Risk management suggests buying at SMA-200, stop loss at 5% below, and target at 8% above nearest resistance.'
            ],
            highlights: [
              { label: 'BUY Signal', value: 'Price ≤ SMA-200 AND RSI < 40, stock is below average and oversold', icon: 'arrow_downward' },
              { label: 'HOLD Signal', value: 'Price ≤ SMA-200 × 1.10 AND RSI < 65, within acceptable range', icon: 'pause_circle' },
              { label: 'AVOID Signal', value: 'Price > SMA-200 × 1.10 OR RSI ≥ 65, extended or overbought', icon: 'do_not_disturb' },
              { label: 'Confidence Score', value: '3-year backtest: win rate, avg return, max drawdown per signal', icon: 'verified' }
            ]
          }
        },
        {
          id: 'tech-deep-dive',
          label: 'Under the Hood',
          icon: 'engineering',
          content: {
            heading: 'Technical Architecture & Design Decisions',
            paragraphs: [
              'The backend is a modular FastAPI application with 13 route files and dedicated service modules. Yahoo Finance (via yfinance) provides all market data. The signal service centralizes BUY/HOLD/AVOID logic, and the backtest engine replays strategies with equity curves and trade logs.',
              'The AI Market Copilot uses Mistral-7B via Hugging Face Inference API with Server-Sent Events (SSE) for real-time streaming. It has 5 enterprise phases: SSE streaming with typewriter effect, proactive auto-insights, smart context-aware suggestions, rich markdown rendering with inline metric chips, and conversation persistence via localStorage.',
              'The frontend is React 19 with Vite 7, featuring 56 components across 16 categories. Lightweight Charts renders TradingView-grade candlesticks. The enterprise UI includes a splash screen, command palette (Ctrl+K), market tape, sector heatmap, status bar, and notification center.'
            ],
            highlights: [
              { label: 'FastAPI + 13 Routes', value: 'Modular backend with signal, backtest, multiframe, and copilot services', icon: 'bolt' },
              { label: 'Mistral-7B + SSE', value: 'Real-time streaming AI with rule-based fallback and context injection', icon: 'psychology' },
              { label: '56 React Components', value: 'Enterprise UI with command palette, splash screen, and heatmap', icon: 'widgets' },
              { label: 'Lightweight Charts', value: 'TradingView\'s open-source library for institutional-grade charting', icon: 'candlestick_chart' }
            ]
          }
        },
        {
          id: 'results',
          label: 'Results',
          icon: 'emoji_events',
          content: {
            heading: 'Impact & Outcomes',
            paragraphs: [
              'EdgeTicker proves that sophisticated financial analysis can be made accessible without dumbing it down. Every signal is explainable and backtested, every metric has context, and the AI copilot bridges the gap for users who want to learn.'
            ],
            highlights: [
              { label: 'Unified Platform', value: 'Replaced 5+ separate tools with one enterprise-grade dashboard', icon: 'integration_instructions' },
              { label: 'Backtested Confidence', value: 'Every signal validated with 3-year historical win rates and drawdown', icon: 'verified' },
              { label: 'Streaming AI Copilot', value: 'SSE-powered assistant with auto-insights and conversation memory', icon: 'smart_toy' },
              { label: '56 Components, 13 APIs', value: 'Production-grade codebase with enterprise UX patterns', icon: 'rocket_launch' }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'collective-brain',
    title: 'Collective Brain',
    mission: 'Transforming scattered team knowledge into a searchable, AI-queryable knowledge base with real-time collaboration.',
    description: 'A full-stack AI-powered team knowledge management platform that ingests knowledge from 7 source types (Git, Markdown, PDF, DOCX, Slack, Discord), builds a vector-based semantic search engine, provides dual AI query modes (RAG + LangGraph agents), and enables real-time team collaboration with WebSocket-powered rooms.',
    tech: ['React 19', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'ChromaDB', 'LangGraph', 'Docker', 'Celery', 'SQLAlchemy'],
    github: 'https://github.com/rakesh580/collective-brain',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    impact: 'AI-powered team knowledge',
    architecture: 'React 19 + TypeScript frontend with FastAPI backend orchestrating 7 data connectors, ChromaDB vector store, dual LLM query modes (RAG + LangGraph agents), Redis pub/sub for real-time WebSocket rooms, Celery task queue, and PostgreSQL with SQLAlchemy ORM, all containerized with Docker Compose.',
    metrics: ['7 Source Connectors', 'Dual AI Modes (RAG + Agents)', 'Real-Time WebSocket Rooms', 'Knowledge Graph Visualization', 'Expert Auto-Discovery', 'Slack + GitHub Integrations'],
    diagram: {
      nodes: [
        { id: 'ui', label: 'React 19 + TS', type: 'client', x: 50, y: 150 },
        { id: 'api', label: 'FastAPI (15+ Routes)', type: 'server', x: 250, y: 150 },
        { id: 'vec', label: 'ChromaDB Vectors', type: 'database', x: 450, y: 30 },
        { id: 'llm', label: 'LLM (Ollama/Claude)', type: 'llm', x: 450, y: 150 },
        { id: 'db', label: 'PostgreSQL + Redis', type: 'database', x: 450, y: 270 }
      ],
      edges: [
        { from: 'ui', to: 'api', label: 'REST + WebSocket' },
        { from: 'api', to: 'vec', label: 'Semantic Search' },
        { from: 'api', to: 'llm', label: 'RAG + LangGraph' },
        { from: 'api', to: 'db', label: 'State + Pub/Sub' }
      ]
    },
    caseStudy: {
      tagline: 'From scattered team knowledge to instant, AI-powered answers, with real-time collaboration and automatic expertise discovery.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Team Knowledge is Scattered and Siloed',
            paragraphs: [
              'Every team generates knowledge across dozens of channels, Git repos, Markdown docs, PDFs, Slack threads, Discord messages, and shared documents. But this knowledge lives in silos. When someone has a question, they either interrupt the right person or spend hours searching across platforms.',
              'There\'s no single place to search everything, no way to ask natural-language questions across all sources, and no visibility into who on the team actually knows what.'
            ],
            highlights: [
              { label: 'Knowledge Silos', value: 'Information trapped across 7+ different platforms and formats', icon: 'storage' },
              { label: 'Expert Discovery', value: 'No way to know who has expertise in what topic', icon: 'person_search' },
              { label: 'Context Loss', value: 'Critical decisions buried in old Slack threads and forgotten docs', icon: 'history' },
              { label: 'Search Fragmentation', value: 'Can\'t search Git, docs, and chat messages in one query', icon: 'search_off' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'Collective Brain · Your Team\'s AI-Powered Second Brain',
            paragraphs: [
              'Collective Brain ingests knowledge from 7 source types, chunks and embeds it into a vector database, and makes it instantly queryable through two AI modes: fast RAG retrieval for simple questions, and LangGraph agents for complex multi-step reasoning.',
              'Teams collaborate in real-time WebSocket rooms with typing indicators and presence tracking. The platform auto-discovers expertise from ingested data, routes questions to the right people, generates weekly insights, and visualizes relationships through an interactive knowledge graph.'
            ],
            highlights: [
              { label: '7 Source Connectors', value: 'Git, Markdown, PDF, DOCX, TXT, Slack exports, Discord logs', icon: 'input' },
              { label: 'Dual AI Query Modes', value: 'Fast RAG retrieval + LangGraph multi-step agent reasoning', icon: 'psychology' },
              { label: 'Real-Time Rooms', value: 'WebSocket chat with typing indicators, presence, and AI assistant', icon: 'forum' },
              { label: 'Expert Auto-Discovery', value: 'Automatically identifies team expertise from ingested contributions', icon: 'people' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Raw Data to Intelligent Answers in 5 Steps',
            paragraphs: [
              'Here\'s how Collective Brain transforms scattered team knowledge into an AI-powered, searchable brain:'
            ],
            steps: [
              { step: 1, title: 'Connect Your Sources', description: 'Point Collective Brain at your Git repos, upload Markdown/PDF/DOCX files, or import Slack/Discord exports. Each source type has a dedicated connector that extracts and normalizes the content.' },
              { step: 2, title: 'Automatic Ingestion', description: 'The ingestion pipeline chunks content intelligently, generates 384-dimensional embeddings via SentenceTransformers, and stores them in ChromaDB. Metadata (author, date, source) is persisted in PostgreSQL via SQLAlchemy.' },
              { step: 3, title: 'Ask Anything', description: 'Type a natural-language question. In RAG mode, it embeds your question, finds the most semantically similar chunks, assembles context, and sends it to the LLM. In Agent mode, LangGraph orchestrates multi-step reasoning with tool use.' },
              { step: 4, title: 'Collaborate in Real-Time', description: 'Create rooms for topics. WebSocket connections (with Redis pub/sub for multi-process fan-out) enable real-time chat, typing indicators, and presence tracking. An AI assistant can join any room.' },
              { step: 5, title: 'Discover & Visualize', description: 'The knowledge graph shows topic relationships and expertise. Team member profiles auto-update with expertise scores. Weekly AI-generated insights surface patterns, stale knowledge, and team health metrics.' }
            ]
          }
        },
        {
          id: 'features',
          label: 'Key Features',
          icon: 'star',
          content: {
            heading: 'Enterprise Knowledge Management, Built for Teams',
            paragraphs: [
              'Collective Brain is a production-grade platform with 15+ API routers, 20+ services, 9 database models, and enterprise security, built to scale with your team\'s growing knowledge.'
            ],
            highlights: [
              { label: 'Semantic Search', value: 'Vector-based search using 384-dim embeddings, finds meaning, not just keywords', icon: 'search' },
              { label: 'LangGraph Agents', value: 'Multi-step AI reasoning with tool use for complex, multi-source questions', icon: 'account_tree' },
              { label: 'Knowledge Graph', value: 'Interactive force-directed visualization with expertise matrices and heatmaps', icon: 'hub' },
              { label: 'Discussion Threads', value: 'Async threaded discussions with real-time WebSocket updates', icon: 'forum' },
              { label: 'AI-Generated Insights', value: 'Weekly summaries, pattern detection, data freshness monitoring', icon: 'auto_awesome' },
              { label: 'Slack + GitHub Integration', value: 'OAuth-based Slack digests and GitHub webhook ingestion', icon: 'integration_instructions' },
              { label: 'Expert Routing', value: 'Auto-recommends the right person to answer based on expertise scoring', icon: 'person_pin' },
              { label: 'Team Analytics', value: 'Activity timelines, source breakdowns, topic trends, health metrics', icon: 'analytics' },
              { label: 'Pluggable LLM Providers', value: 'Switch between Ollama, Claude, Mistral, or HuggingFace with one config', icon: 'swap_horiz' },
              { label: 'Enterprise Security', value: 'JWT auth, rate limiting, CORS, CSP headers, circuit breakers, input validation', icon: 'security' }
            ]
          }
        },
        {
          id: 'tech-deep-dive',
          label: 'Under the Hood',
          icon: 'engineering',
          content: {
            heading: 'Technical Architecture & Design Decisions',
            paragraphs: [
              'The backend is a FastAPI application with 15+ routers and 20+ service modules. SQLAlchemy 2.0 manages 9 models (User, Member, Artifact, Contribution, Conversation, Discussion, Room, Insight, SlackIntegration). ChromaDB stores vector embeddings, and Redis handles pub/sub for WebSocket fan-out with graceful in-memory fallback.',
              'The AI layer supports pluggable LLM providers (Ollama, Claude, Mistral, HuggingFace). RAG mode embeds questions, retrieves semantically similar chunks from ChromaDB, and assembles context for the LLM. Agent mode uses LangGraph\'s state machine to orchestrate multi-step reasoning with tool access.',
              'The frontend is React 19 + TypeScript + Tailwind CSS 4 with 15+ route pages and 30+ reusable components. Force-directed graphs (react-force-graph-2d) render the knowledge graph. Framer Motion handles animations. The entire stack is containerized with Docker Compose (PostgreSQL, Redis, backend, frontend, Celery worker, Nginx).'
            ],
            highlights: [
              { label: 'FastAPI + 15 Routers', value: '20+ services with SQLAlchemy 2.0 ORM and 9 data models', icon: 'bolt' },
              { label: 'ChromaDB + SentenceTransformers', value: '384-dim embeddings for semantic search across all knowledge sources', icon: 'memory' },
              { label: 'LangGraph State Machine', value: 'Multi-step agentic reasoning with tool use and planning', icon: 'account_tree' },
              { label: 'Docker Compose (6 Services)', value: 'PostgreSQL, Redis, FastAPI, React, Celery, Nginx, one command deploy', icon: 'deployed_code' }
            ]
          }
        },
        {
          id: 'results',
          label: 'Results',
          icon: 'emoji_events',
          content: {
            heading: 'Impact & Outcomes',
            paragraphs: [
              'Collective Brain demonstrates that enterprise-grade knowledge management can be built with modern open-source tools, combining vector search, agentic AI, real-time collaboration, and team analytics into a single, deployable platform.'
            ],
            highlights: [
              { label: '7 Source Connectors', value: 'Unified ingestion from Git, docs, PDFs, Slack, and Discord', icon: 'input' },
              { label: 'Dual AI Architecture', value: 'Fast RAG for simple queries + LangGraph agents for complex reasoning', icon: 'psychology' },
              { label: 'Real-Time Collaboration', value: 'WebSocket rooms with Redis pub/sub, typing indicators, and AI assistant', icon: 'group' },
              { label: 'Production-Ready Stack', value: '6-service Docker Compose with CI/CD, security hardening, and monitoring', icon: 'rocket_launch' }
            ]
          }
        }
      ]
    }
  },
  {
    id: 'wellby',
    title: 'Wellby · AI Health Companion',
    mission: 'Unifying vitals, nutrition, medical AI, and gamified wellness into one enterprise-grade health platform powered by a multi-provider AI routing layer.',
    description: 'An AI-powered health companion with 110+ API endpoints, 120+ React components, and 21 database models, featuring real-time vital monitoring with TensorFlow.js anomaly detection, AI symptom triage, multi-modal vision meal scanning, a 200+ drug interaction checker, Medical RAG, wearable integration, 14 AI companions, and deep gamification with XP, levels, streaks, and 28 trophies.',
    tech: ['React 19', 'TypeScript 5.8', 'Express', 'Prisma', 'Google Gemma 4', 'Groq', 'OpenAI', 'Anthropic', 'TensorFlow.js', 'PostgreSQL', 'Stripe', 'GCP Cloud Run'],
    link: 'https://wellby-production-773067923612.us-central1.run.app',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop',
    impact: 'Enterprise AI health platform',
    architecture: 'React 19 + TypeScript 5.8 PWA frontend with an Express + Prisma backend orchestrating a unified multi-provider AI routing system across Groq, Google Gemma 4 (31B Dense + 26B MoE), OpenAI, and Anthropic, with medical RAG via vector embeddings, real-time anomaly detection in TensorFlow.js, Stripe-powered premium tier, HIPAA-aligned encryption, and deployment to GCP Cloud Run.',
    metrics: ['110+ API Endpoints', '120+ React Components', '21 DB Models', '14 AI Companions', '200+ Drug Database', 'Unified AI Model Routing', 'Gemma 4 (256K context)', 'HIPAA-Aligned Encryption'],
    diagram: {
      nodes: [
        { id: 'ui', label: 'React 19 PWA', type: 'client', x: 50, y: 150 },
        { id: 'api', label: 'Express + Prisma', type: 'server', x: 250, y: 150 },
        { id: 'router', label: 'AI Model Router', type: 'llm', x: 450, y: 30 },
        { id: 'rag', label: 'Medical RAG + Vectors', type: 'database', x: 450, y: 150 },
        { id: 'wearable', label: 'Wearables + TF.js', type: 'external', x: 450, y: 270 }
      ],
      edges: [
        { from: 'ui', to: 'api', label: 'REST + SSE' },
        { from: 'api', to: 'router', label: 'Groq / Gemma 4 / GPT / Claude' },
        { from: 'api', to: 'rag', label: 'Semantic Retrieval' },
        { from: 'ui', to: 'wearable', label: 'Apple Watch / Fitbit / Garmin' }
      ]
    },
    caseStudy: {
      tagline: 'From fragmented health apps to one enterprise-grade AI companion, triage, nutrition, vitals, and gamified wellness, unified.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Health Tracking Is Fragmented and Un-Intelligent',
            paragraphs: [
              'The average health-conscious person juggles 5+ apps, one for vitals, another for nutrition, a third for workouts, a symptom checker, and a medication reminder. None of them talk to each other, and none bring an intelligent AI layer that understands your full context.',
              'Meanwhile, real medical decisions demand nuance: is this chest pain a red flag? Does this new medication interact with my current prescription? Which of these restaurant menu items fits my calorie budget? Most consumer apps can\'t answer these questions with clinical rigor.'
            ],
            highlights: [
              { label: 'App Fragmentation', value: 'Users juggle 5+ disconnected apps for vitals, nutrition, triage, and fitness', icon: 'apps' },
              { label: 'No Clinical Reasoning', value: 'Consumer apps lack triage, drug interaction, and medical RAG capabilities', icon: 'medical_information' },
              { label: 'No Adherence Mechanism', value: 'Health habits fail without gamification, companions, or real engagement', icon: 'psychology' },
              { label: 'No Vision Intelligence', value: 'Users manually log meals · impossible to sustain at scale', icon: 'photo_camera' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'Wellby, One Platform, Every Health Dimension',
            paragraphs: [
              'Wellby unifies real-time vital monitoring, AI symptom triage, drug interaction checking, multi-modal vision nutrition analysis, medical RAG, and gamified habit-building into a single progressive web app, all orchestrated through a unified multi-provider AI routing layer.',
              'Admins can route any AI category (chat, medical, vision, nutrition) to any provider (Groq, Google Gemma 4, OpenAI, Anthropic) with zero code changes. Users can even bring their own API keys (BYOK). The result is a health companion that adapts to your context, your mood, and your clinical needs.'
            ],
            highlights: [
              { label: 'Unified AI Routing', value: 'Admin-configurable per-category routing across 7 AI providers', icon: 'hub' },
              { label: 'Gemma 4 Integration', value: 'Google\'s latest open model, 31B Dense + 26B MoE, 256K context, native vision', icon: 'visibility' },
              { label: '14 AI Companions', value: 'Specialized animal buddies with 3D animations that adapt to user mood', icon: 'pets' },
              { label: 'Deep Gamification', value: 'XP, levels, streaks, 28 trophies, community challenges with leaderboards', icon: 'emoji_events' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Wearable Data to Clinical-Grade Insight in Real Time',
            paragraphs: [
              'Here\'s how Wellby turns raw wearable data and user input into personalized, intelligent health outcomes:'
            ],
            steps: [
              { step: 1, title: 'Wearable & Manual Ingestion', description: 'Connect Apple Watch, Fitbit, or Garmin, or use the built-in simulator. Heart rate, SpO2, HRV, BP, temperature, and respiratory rate stream in real time. Apple Health XML import is also supported.' },
              { step: 2, title: 'Client-Side Anomaly Detection', description: 'TensorFlow.js runs Z-score + IQR statistical analysis directly in the browser with zero server latency, flagging deviations across 7 vital signs with 4 severity levels.' },
              { step: 3, title: 'AI Symptom Triage', description: 'Describe a symptom and the Medical RAG layer retrieves relevant medical knowledge, then an LLM returns a severity assessment (non-urgent → emergency) with confidence scoring and red-flag detection.' },
              { step: 4, title: 'Multi-Modal Nutrition Analysis', description: 'Photograph a meal, a nutrition label, or a restaurant menu. Vision AI identifies foods, estimates portions, extracts macros, and offers pre-meal coaching based on your daily goals.' },
              { step: 5, title: 'Gamified Adherence', description: 'Every interaction rewards XP, unlocks trophies, or extends streaks. 14 AI companions adapt to your mood, and community challenges create social accountability.' }
            ]
          }
        },
        {
          id: 'features',
          label: 'Key Features',
          icon: 'star',
          content: {
            heading: 'What Makes Wellby Different',
            paragraphs: [
              'Wellby is an enterprise-grade health platform with 110+ API endpoints, 120+ React components, and 21 database models, spanning medical AI, nutrition, fitness, mental wellness, and gamification.'
            ],
            highlights: [
              { label: 'AI Symptom Triage', value: 'Severity classification with urgency routing and red-flag detection', icon: 'emergency' },
              { label: 'Drug Interaction Checker', value: '200+ drug database with major/moderate/minor severity classification', icon: 'medication' },
              { label: 'Medical RAG Knowledge Base', value: 'Vector-embedded retrieval for context-aware clinical responses', icon: 'library_books' },
              { label: 'AI Meal Scanner', value: 'Vision-powered food recognition, portion estimation, and macro extraction', icon: 'restaurant' },
              { label: 'Menu & Label Scanner', value: 'Photograph restaurant menus or nutrition labels for instant breakdown', icon: 'menu_book' },
              { label: 'Real-Time Vital Monitoring', value: 'Heart rate, SpO2, HRV, BP, temperature, respiratory rate with live charts', icon: 'monitor_heart' },
              { label: 'Anomaly Detection (TF.js)', value: 'Z-score + IQR statistical analysis with configurable sensitivity, client side', icon: 'insights' },
              { label: 'AI Health Reports', value: 'Comprehensive reports analyzing vitals, trends, anomalies, and risk factors', icon: 'assessment' },
              { label: 'Wearable Integration', value: 'Apple Watch, Fitbit, Garmin, and Apple Health XML import', icon: 'watch' },
              { label: '14 AI Companions', value: 'Fitness dog, nutrition lion, sleep cat, mindfulness panda, and more, with 3D animations', icon: 'pets' },
              { label: 'Gamification System', value: 'XP, levels, streaks, 28 trophies, community challenges, leaderboards', icon: 'leaderboard' },
              { label: 'BYOK + Premium Tier', value: 'Bring your own API key or upgrade via Stripe for AI health reports', icon: 'key' }
            ]
          }
        },
        {
          id: 'tech-deep-dive',
          label: 'Under the Hood',
          icon: 'engineering',
          content: {
            heading: 'Technical Architecture & Decisions',
            paragraphs: [
              'The backend is an Express + Prisma server exposing 110+ REST endpoints backed by 21 database models. A unified AI model routing layer abstracts over Groq, Google Gemma 4 (31B Dense + 26B MoE, 256K context, Apache 2.0), OpenAI, and Anthropic, admins remap any category (chat, medical, vision, nutrition) to any provider with zero code changes.',
              'The frontend is React 19 + TypeScript 5.8 compiled as a progressive web app, with 120+ components, real-time vital streaming, and TensorFlow.js anomaly detection running entirely client-side to eliminate server latency on critical signals.',
              'Security is HIPAA-aligned with end-to-end encryption, SOC 2-ready audit logging, and Stripe-based premium tier. Deployment runs on GCP Cloud Run with auto-scaling containers.'
            ],
            highlights: [
              { label: 'Express + Prisma', value: '110+ REST endpoints, 21 DB models, type-safe DB access', icon: 'api' },
              { label: 'Multi-Provider AI Router', value: 'Groq / Gemma 4 / OpenAI / Anthropic with admin-configurable routing', icon: 'alt_route' },
              { label: 'TensorFlow.js Client-Side ML', value: 'Real-time anomaly detection with zero server latency', icon: 'bolt' },
              { label: 'GCP Cloud Run', value: 'Auto-scaling serverless containers with HIPAA-aligned encryption', icon: 'cloud' }
            ]
          }
        },
        {
          id: 'results',
          label: 'Results',
          icon: 'emoji_events',
          content: {
            heading: 'Impact & Outcomes',
            paragraphs: [
              'Wellby proves that clinical-grade AI, consumer-grade UX, and deep gamification can coexist in a single platform, setting a new bar for what a health companion can do when modern LLMs, vision models, and on-device ML come together.'
            ],
            highlights: [
              { label: '110+ API Endpoints', value: 'Spanning medical, nutrition, fitness, wellness, gamification, and admin', icon: 'api' },
              { label: '120+ React Components', value: 'Full PWA with responsive layouts, 3D companions, and real-time charts', icon: 'widgets' },
              { label: 'Zero-Latency Anomaly Detection', value: 'Client-side TF.js avoids round trips on time-sensitive vitals', icon: 'speed' },
              { label: 'Enterprise-Ready Security', value: 'HIPAA-aligned encryption, SOC 2-ready audit logs, Stripe billing', icon: 'shield' }
            ]
          }
        }
      ]
    }
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    period: 'MAY 2024 – PRESENT',
    role: 'Software Engineer',
    company: 'Cruxito Tech Solutions LLC',
    location: 'USA',
    description: 'Building RESTful APIs for scalable microservices and analytics solutions. Optimizing data exchange reliability and implementing robust auth protocols.',
    stack: ['Python', 'FastAPI', 'Flask', 'Java Spring Boot', 'AWS (EKS, Lambda)', 'Docker'],
    impact: ['30% increase in data exchange reliability', '25% reduction in access-related issues']
  },
  {
    period: 'AUG 2022 – MAY 2024',
    role: 'Graduate Research Assistant',
    company: 'North Carolina A&T State University',
    location: 'Greensboro, NC',
    description: 'Developed end-to-end applications serving 5K+ users. Researched federated learning and IoT data aggregation.',
    stack: ['React.js', 'Python', 'FastAPI', 'PostgreSQL', 'TensorFlow'],
    impact: ['Served 5K+ real-time users', 'Outstanding Graduate Research Award (2023)']
  },
  {
    period: 'JUN 2020 – JUL 2022',
    role: 'Software Engineer',
    company: 'Capgemini Technology Services',
    location: 'Hyderabad, India',
    description: 'Developed enterprise auth flows and integration workflows. Implemented CI/CD pipelines to reduce release bottlenecks.',
    stack: ['Node.js', 'React', 'Azure', 'Jenkins', 'Docker', 'OAuth2', 'JWT'],
    impact: ['Improved system reliability through new workflows', 'Reduced release bottlenecks via Jenkins/Docker']
  }
];
