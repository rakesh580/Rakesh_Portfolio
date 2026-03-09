
import { Project, TimelineEvent } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'weather-ai',
    title: 'AI Weather Assistant',
    mission: 'Providing real-time weather insights through intelligent LLM-driven chat responses.',
    description: 'Built an AI-powered weather assistant integrating Ollama LLaMA-3 via Ngrok-tunnelled AWS EC2 instances.',
    tech: ['FastAPI', 'Docker', 'AWS EC2', 'Ollama', 'LLaMA-3', 'Python'],
    github: 'https://weather-app-s3vf.onrender.com/',
    image: 'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?q=80&w=1200&auto=format&fit=crop',
    impact: 'Real-time contextual insights',
    architecture: 'Edge-to-Cloud hybrid using Ngrok tunnels for local LLM inference on AWS infrastructure.',
    metrics: ['Low-latency chat', 'Seamless AWS/Docker integration'],
    diagram: {
      nodes: [
        { id: 'u', label: 'User Client', type: 'client', x: 50, y: 150 },
        { id: 'f', label: 'FastAPI (AWS)', type: 'server', x: 250, y: 150 },
        { id: 'w', label: 'Weather API', type: 'external', x: 450, y: 50 },
        { id: 'o', label: 'Ollama (LLaMA-3)', type: 'llm', x: 450, y: 250 }
      ],
      edges: [
        { from: 'u', to: 'f', label: 'REST/WS' },
        { from: 'f', to: 'w', label: 'Weather Data' },
        { from: 'f', to: 'o', label: 'Ngrok Tunnel' }
      ]
    },
    caseStudy: {
      tagline: 'From raw weather data to intelligent, conversational insights — powered by AI.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Weather Apps Tell You Numbers, Not Answers',
            paragraphs: [
              'Traditional weather apps show you temperature, humidity, and wind speed — but they don\'t answer simple questions like "Should I bring an umbrella?" or "Is it safe to go for a run?"',
              'People want actionable advice, not raw data. They want a weather assistant that understands context and speaks naturally.'
            ],
            highlights: [
              { label: 'Raw Data Overload', value: 'Users see 10+ metrics but can\'t interpret them together', icon: 'data_array' },
              { label: 'No Personalization', value: 'Generic forecasts don\'t consider your plans or activities', icon: 'person_off' },
              { label: 'No Conversational Interface', value: 'Can\'t ask follow-up questions about conditions', icon: 'chat_bubble_outline' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'SkyPulse — An AI-Powered Weather Companion',
            paragraphs: [
              'SkyPulse combines real-time weather data from OpenWeatherMap with Meta\'s LLaMA 3.3 70B language model to create a conversational weather experience.',
              'Instead of just showing numbers, SkyPulse calculates a Comfort Score (0-100), recommends clothing, and lets you chat with an AI that knows your local weather conditions in real-time.'
            ],
            highlights: [
              { label: 'Comfort Score', value: 'Single 0-100 number combining temp, humidity, wind & visibility', icon: 'speed' },
              { label: 'Smart Clothing Advisor', value: 'AI suggests jacket, umbrella, sunglasses based on conditions', icon: 'checkroom' },
              { label: 'AI Chat Assistant', value: 'Ask anything — the AI knows your current weather context', icon: 'smart_toy' },
              { label: 'Weather Particles', value: 'Ambient rain, snow, or sun animations matching conditions', icon: 'animation' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Search to Smart Insights in 4 Steps',
            paragraphs: [
              'Here\'s how SkyPulse transforms a simple city search into an intelligent weather experience:'
            ],
            steps: [
              { step: 1, title: 'You Search a City', description: 'Type any city name. The app sends it to the FastAPI backend, which calls OpenWeatherMap\'s geocoding API to find the exact coordinates.' },
              { step: 2, title: 'Data is Fetched & Processed', description: 'The backend pulls current weather and a 5-day forecast. It calculates the Comfort Score by weighing temperature (40%), humidity (25%), wind (20%), and visibility (15%).' },
              { step: 3, title: 'The UI Comes Alive', description: 'Your browser receives the data and renders the weather hero card, interactive charts (Chart.js), a live map (Leaflet), sunrise/sunset bar, city clock, and ambient weather particles — all in real-time.' },
              { step: 4, title: 'You Ask the AI', description: 'Open the chat and ask a question like "Will it rain today?" The backend sends your question plus the current weather context to Meta\'s LLaMA 3.3 model via Hugging Face, and the AI responds with a contextual answer.' }
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
              'SkyPulse isn\'t just another weather app — it\'s a full-stack platform with premium UX touches that make weather data feel personal and actionable.'
            ],
            highlights: [
              { label: '5-Day Forecast', value: 'Three views: scrollable cards, interactive charts, and daily summaries', icon: 'calendar_month' },
              { label: 'Interactive Map', value: 'Leaflet-powered map that zooms to your searched city with a marker', icon: 'map' },
              { label: 'Sunrise/Sunset Bar', value: 'Visual progress bar showing where the sun is in its daily arc', icon: 'wb_twilight' },
              { label: 'Live City Clock', value: 'Ticking clock showing local time at the searched city', icon: 'schedule' },
              { label: 'Pressure Trend', value: 'Shows if barometric pressure is Rising, Falling, or Steady', icon: 'trending_up' },
              { label: 'Favorites System', value: 'Save cities you check often for one-click access', icon: 'favorite' },
              { label: 'Dark/Light Mode', value: 'Premium OLED-black dark mode with electric cyan accents', icon: 'dark_mode' },
              { label: 'Dockerized Deployment', value: 'CI/CD pipeline: push to main triggers Docker build and deploys to AWS EC2', icon: 'cloud_upload' }
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
              'The backend is built with Python FastAPI for speed and automatic API documentation. Weather data comes from OpenWeatherMap\'s free tier (1,000 calls/day). The AI chat uses Hugging Face\'s Inference API to run Meta\'s LLaMA 3.3 70B model — no GPU server needed.',
              'The frontend is intentionally built with vanilla HTML/CSS/JS (no React) to keep it lightweight and fast-loading. Chart.js handles interactive forecasts, Leaflet.js renders the map, and all weather particle effects use GPU-accelerated CSS animations.',
              'Deployment uses a multi-stage Dockerfile. GitHub Actions automatically builds the image, pushes to Docker Hub, and SSHs into an AWS EC2 instance to pull and restart the container.'
            ],
            highlights: [
              { label: 'FastAPI Backend', value: 'Async Python server with auto-generated OpenAPI docs', icon: 'bolt' },
              { label: 'LLaMA 3.3 70B', value: 'Meta\'s large language model via Hugging Face Inference API', icon: 'psychology' },
              { label: 'Docker + CI/CD', value: 'Automated build-push-deploy pipeline via GitHub Actions', icon: 'deployed_code' },
              { label: 'Zero Framework Frontend', value: 'Vanilla JS for sub-second load times and simplicity', icon: 'speed' }
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
              'SkyPulse demonstrates the power of combining traditional APIs with modern AI to create experiences that feel genuinely helpful — not just informational.'
            ],
            highlights: [
              { label: 'Comfort Score', value: 'Turns 4 weather metrics into one intuitive number anyone can understand', icon: 'speed' },
              { label: '6 API Endpoints', value: 'Clean REST API that could power any weather frontend or integration', icon: 'api' },
              { label: 'Sub-2s AI Response', value: 'LLaMA 3.3 responds with context-aware answers in under 2 seconds', icon: 'timer' },
              { label: 'Full CI/CD Pipeline', value: 'Zero-touch deployment from git push to live production', icon: 'rocket_launch' }
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
    mission: 'Delivering explainable, AI-driven stock signals with real-time technical and valuation analysis.',
    description: 'Built a full-stack AI-powered stock intelligence platform combining technical indicators, valuation metrics, risk modeling, and an LLM-based Market Copilot for actionable BUY/HOLD/AVOID signals.',
    tech: ['React', 'Vite', 'FastAPI', 'Python', 'OpenAI', 'REST API'],
    github: 'https://huggingface.co/spaces/mindflayer80058/Edgeticker',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
    impact: 'Explainable stock signals',
    architecture: 'Modular React frontend with FastAPI backend orchestrating financial data ingestion, indicator computation, signal scoring, and LLM-powered copilot with context-grounded prompts.',
    metrics: ['RSI/SMA-based signal engine', 'Risk-reward modeling', 'LLM Market Copilot', 'Multi-timeframe analysis'],
    diagram: {
      nodes: [
        { id: 'ui', label: 'React Dashboard', type: 'client', x: 50, y: 150 },
        { id: 'api', label: 'FastAPI Engine', type: 'server', x: 250, y: 150 },
        { id: 'fin', label: 'Financial APIs', type: 'external', x: 450, y: 50 },
        { id: 'llm', label: 'LLM Copilot', type: 'llm', x: 450, y: 250 }
      ],
      edges: [
        { from: 'ui', to: 'api', label: 'REST' },
        { from: 'api', to: 'fin', label: 'Market Data' },
        { from: 'api', to: 'llm', label: 'Context Injection' }
      ]
    },
    caseStudy: {
      tagline: 'From raw market data to explainable BUY/HOLD/AVOID signals — powered by AI and technical analysis.',
      sections: [
        {
          id: 'problem',
          label: 'The Problem',
          icon: 'error_outline',
          content: {
            heading: 'Stock Analysis is Fragmented and Overwhelming',
            paragraphs: [
              'Individual investors face a flood of financial data scattered across multiple platforms — price charts on one site, fundamentals on another, news on a third, and options data somewhere else entirely.',
              'Most tools are either too simplistic (just showing a price chart) or too complex (requiring deep financial expertise to interpret). There\'s no single platform that brings everything together and tells you, in plain language, whether a stock is worth buying.'
            ],
            highlights: [
              { label: 'Data Fragmentation', value: 'Investors juggle 5+ different tools to analyze a single stock', icon: 'dashboard' },
              { label: 'No Clear Signals', value: 'Raw charts don\'t tell you when to buy, hold, or avoid', icon: 'signal_cellular_off' },
              { label: 'Expert-Only Tools', value: 'Most analysis platforms require years of trading experience', icon: 'school' }
            ]
          }
        },
        {
          id: 'solution',
          label: 'The Solution',
          icon: 'lightbulb',
          content: {
            heading: 'EdgeTicker — One Platform, Complete Stock Intelligence',
            paragraphs: [
              'EdgeTicker is a full-stack stock analysis platform that combines technical indicators (SMA-200, RSI-14), valuation metrics, risk modeling, and an AI-powered Market Copilot to generate clear BUY, HOLD, or AVOID signals.',
              'Every signal comes with a visual explanation showing exactly why it was generated — which factors contributed positively and which raised red flags. Non-experts can understand the reasoning, and experienced traders can drill into the raw data.'
            ],
            highlights: [
              { label: 'Three-Tier Signal System', value: 'Clear BUY / HOLD / AVOID based on SMA-200 + RSI-14', icon: 'traffic' },
              { label: 'Signal Explainability', value: 'Visual breakdown showing each factor\'s contribution', icon: 'visibility' },
              { label: 'AI Market Copilot', value: 'Ask questions in plain English — AI answers using real market data', icon: 'smart_toy' },
              { label: 'All-in-One Dashboard', value: 'Charts, fundamentals, news, options, earnings in one view', icon: 'grid_view' }
            ]
          }
        },
        {
          id: 'how-it-works',
          label: 'How It Works',
          icon: 'account_tree',
          content: {
            heading: 'From Ticker to Signal in 5 Steps',
            paragraphs: [
              'Here\'s how EdgeTicker transforms a stock ticker into an actionable investment signal:'
            ],
            steps: [
              { step: 1, title: 'Enter Any Stock Ticker', description: 'Type a stock symbol (like AAPL or TSLA). The autocomplete dropdown shows matching companies with their full names, so you always pick the right one.' },
              { step: 2, title: 'Market Data is Fetched', description: 'The FastAPI backend calls Yahoo Finance to pull real-time prices, historical data, fundamentals (P/E ratio, revenue, margins), recent news, options chains, and earnings dates.' },
              { step: 3, title: 'Indicators are Calculated', description: 'The engine computes the 200-day Simple Moving Average (SMA-200), RSI-14 momentum indicator, nearest resistance levels, and volume patterns. These feed into the signal algorithm.' },
              { step: 4, title: 'Signal is Generated', description: 'If the price is below SMA-200 AND RSI is under 40 → BUY (stock is undervalued and oversold). If extended above SMA-200 by 10%+ OR RSI is above 65 → AVOID. Everything else → HOLD.' },
              { step: 5, title: 'Results are Displayed', description: 'You see the signal with a visual explanation, interactive price chart with indicator overlays, risk/reward analysis, and the AI Copilot ready to answer your follow-up questions.' }
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
              'EdgeTicker goes far beyond basic charting. It\'s a comprehensive platform with tools that professional analysts use — made accessible to everyone.'
            ],
            highlights: [
              { label: 'Live Price Streaming', value: 'Prices refresh every 5 seconds with animated up/down tick indicators', icon: 'candlestick_chart' },
              { label: 'Interactive Charts', value: 'Professional candlestick and line charts with DMA-50, DMA-200, RSI overlays', icon: 'show_chart' },
              { label: 'Multi-Timeframe Analysis', value: 'Compare daily, weekly, and monthly signals with conflict warnings', icon: 'date_range' },
              { label: 'Backtesting Engine', value: 'Test how signals would have performed over 2, 3, or 5 years historically', icon: 'history' },
              { label: 'Options Flow Detection', value: 'Spots unusual options activity (volume > 2x open interest)', icon: 'trending_up' },
              { label: 'Stock Screener', value: 'Filter S&P 500, tech stocks, or dividend kings by signal, RSI, P/E, sector', icon: 'filter_alt' },
              { label: 'Portfolio Tracker', value: 'Track holdings with real-time P&L, allocation charts, and market value', icon: 'account_balance_wallet' },
              { label: 'Price Alerts', value: 'Set price-above or price-below alerts with triggered notification badges', icon: 'notifications_active' },
              { label: 'Stock Comparison', value: 'Compare 2-3 stocks side-by-side with normalized performance charts', icon: 'compare_arrows' },
              { label: 'Dark/Light Mode', value: 'Glassmorphism dark mode and clean white light mode with full chart theming', icon: 'dark_mode' }
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
              'The 200-day Simple Moving Average (SMA-200) shows the long-term trend. If a stock\'s price is below this line, it\'s historically cheap. The Relative Strength Index (RSI-14) measures momentum on a 0-100 scale — below 40 means oversold (potentially undervalued), above 65 means overbought (potentially overvalued).',
              'Risk management is built in: the system suggests buying at the SMA-200 price, sets a stop loss at 5% below to limit downside, and targets 8% above the nearest resistance level for profit-taking.'
            ],
            highlights: [
              { label: 'BUY Signal', value: 'Price ≤ SMA-200 AND RSI < 40 — stock is below average and oversold', icon: 'arrow_downward' },
              { label: 'HOLD Signal', value: 'Price ≤ SMA-200 × 1.10 AND RSI < 65 — within acceptable range', icon: 'pause_circle' },
              { label: 'AVOID Signal', value: 'Price > SMA-200 × 1.10 OR RSI ≥ 65 — extended or overbought', icon: 'do_not_disturb' },
              { label: 'Risk Management', value: 'Stop loss at 5% below buy price, target at 8% above resistance', icon: 'shield' }
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
              'The backend is a modular FastAPI application with clean separation: API routes handle HTTP, services contain business logic, and schemas validate data. Yahoo Finance (via yfinance) provides all market data — no paid API subscriptions required.',
              'The AI Market Copilot uses Mistral-7B via Hugging Face\'s Inference API. Before sending a question, the backend injects current fundamentals, news, and technical data as context — so the AI answers based on real data, not generic knowledge.',
              'The frontend is React 19 with Vite 7 for instant hot-module replacement. Lightweight Charts (by TradingView) renders professional-grade candlestick charts. State lives in React hooks, with localStorage persisting watchlist, alerts, and theme preferences.'
            ],
            highlights: [
              { label: 'FastAPI + Pydantic', value: 'Type-safe backend with auto-generated API documentation', icon: 'bolt' },
              { label: 'Mistral-7B LLM', value: 'Context-grounded AI that uses real market data, not hallucinations', icon: 'psychology' },
              { label: 'Lightweight Charts', value: 'TradingView\'s open-source library for institutional-grade charting', icon: 'candlestick_chart' },
              { label: '20+ API Endpoints', value: 'Complete REST API for analysis, screening, backtesting, and portfolio', icon: 'api' }
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
              'EdgeTicker proves that sophisticated financial analysis can be made accessible without dumbing it down. Every signal is explainable, every metric has context, and the AI copilot bridges the gap for users who want to learn.'
            ],
            highlights: [
              { label: 'Unified Platform', value: 'Replaced 5+ separate tools with one cohesive dashboard', icon: 'integration_instructions' },
              { label: 'Explainable AI Signals', value: 'Every BUY/HOLD/AVOID shows exactly which factors contributed', icon: 'visibility' },
              { label: 'Backtesting Validation', value: 'Historical testing with Sharpe ratio, max drawdown, and win rate', icon: 'verified' },
              { label: '20+ REST Endpoints', value: 'Production-grade API powering analysis, screening, and portfolio management', icon: 'rocket_launch' }
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
