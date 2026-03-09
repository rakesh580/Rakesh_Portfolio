
import { Project, TimelineEvent } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'weather-ai',
    title: 'AI Weather Assistant',
    mission: 'Providing real-time weather insights through intelligent LLM-driven chat responses.',
    description: 'Built an AI-powered weather assistant integrating Ollama LLaMA-3 via Ngrok-tunnelled AWS EC2 instances.',
    tech: ['FastAPI', 'Docker', 'AWS EC2', 'Ollama', 'LLaMA-3', 'Python'],
    github: 'https://github.com/rakesh580/Weather_App',
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
    github: 'https://github.com/rakesh580/edgeticker',
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
