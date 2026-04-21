
import React, { useState, useRef, useEffect } from 'react';
import { MatchData } from '../types';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface NexusAgentProps {
  matchData?: MatchData | null;
}

/**
 * Rule-based fallback responder. Activates when the Groq API key is missing
 * or the live LLM call fails so the agent never shows a broken / empty state.
 * Maps common question keywords to grounded answers drawn from the portfolio
 * data. The user sees a subtle "offline mode" indicator in the header.
 */
const offlineReply = (msg: string): string => {
  const q = msg.toLowerCase();
  const hit = (...kws: string[]) => kws.some(k => q.includes(k));

  if (hit('hi', 'hello', 'hey', 'yo ', 'greet')) {
    return "Hey! I'm Nexus Agent running in offline mode. Ask about Rakesh's projects, skills, experience, or how to reach him.";
  }
  if (hit('who', 'about rakesh', 'tell me about', 'yourself', 'background')) {
    return "Rakesh Chintanippu is a Software Engineer at Cruxito Tech Solutions — specializing in full-stack engineering, AI platforms (LLMs, RAG, agents), and cloud-native microservices. MS in CS from NC A&T (3.9/4.0), BS from VJIT India (3.8/4.0).";
  }
  if (hit('contact', 'email', 'reach', 'hire', 'available')) {
    return "Email rakeshswe2026@gmail.com, phone (980) 666-8179. He's open to Full-Stack, AI Platform, and Cloud Engineering roles. GitHub: github.com/rakesh580.";
  }
  if (hit('wellby', 'health')) {
    return "Wellby is an enterprise AI health companion with 110+ API endpoints, Gemma 4 + Groq multi-provider routing, Medical RAG, vision meal scanning, and TensorFlow.js anomaly detection. Live on GCP Cloud Run.";
  }
  if (hit('collective brain', 'knowledge', 'rag')) {
    return "Collective Brain is a team knowledge platform: 7 source connectors (Git, MD, PDF, Slack, Discord), ChromaDB vectors, LangGraph agents, and real-time WebSocket rooms. Stack: React 19, FastAPI, PostgreSQL, Redis.";
  }
  if (hit('skypulse', 'weather')) {
    return "SkyPulse is an AI weather intelligence platform with 20+ FastAPI endpoints, LLaMA 3.3 70B chat, activity optimizer, health journal, journey corridor, and microclimate analysis. Live at weather-app-s3vf.onrender.com.";
  }
  if (hit('edgeticker', 'stock', 'trading', 'market')) {
    return "EdgeTicker is a stock intelligence platform with backtested BUY/HOLD/AVOID signals, a streaming Market Copilot (Mistral-7B via SSE), multi-timeframe conflict alerts, and watchlist intelligence. React 19 + FastAPI.";
  }
  if (hit('rchat', 'chat')) {
    return "Rchat.ai is a real-time AI chat platform with WebSockets, JWT/OAuth2 auth, Redis pub/sub for multi-process fan-out, and PostgreSQL persistence. FastAPI backend, React frontend.";
  }
  if (hit('project', 'built', 'work', 'case study', 'portfolio')) {
    return "Rakesh has 5 flagship projects: Wellby (AI health), Collective Brain (RAG + agents), SkyPulse (weather AI), EdgeTicker (stock intel), and Rchat.ai (real-time chat). Scroll to THE_CORTEX for full case studies.";
  }
  if (hit('skill', 'stack', 'tech', 'language', 'framework')) {
    return "Core stack: Python (FastAPI, Flask, Django), TypeScript / React 19, Java (Spring Boot), Node / Express, Postgres, Redis, ChromaDB, Docker, AWS (EKS, Lambda), GCP Cloud Run, LangGraph, LLMs (Groq, Gemma 4, LLaMA, Mistral).";
  }
  if (hit('experience', 'job', 'role', 'work history', 'career')) {
    return "Current: Software Engineer at Cruxito Tech Solutions (May 2024–present). Prior: Graduate Research Assistant at NC A&T (Aug 2022–May 2024), Software Engineer at Capgemini (Jun 2020–Jul 2022). Scroll to THE_TIMELINE for details.";
  }
  if (hit('education', 'degree', 'school', 'university', 'gpa')) {
    return "MS Computer Science — North Carolina A&T State University (GPA 3.9/4.0). BS — VJIT, India (GPA 3.8/4.0). Outstanding Graduate Research Award (2023).";
  }
  if (hit('ai', 'llm', 'machine learning', 'ml', 'genai')) {
    return "Rakesh ships production AI systems — RAG with ChromaDB, agentic workflows with LangGraph, multi-provider routing (Groq / Gemma 4 / OpenAI / Anthropic), vector search, SSE streaming, and on-device ML with TensorFlow.js.";
  }
  if (hit('location', 'where', 'based')) {
    return "Based in the United States, open to remote or on-site roles.";
  }
  if (hit('resume', 'cv', 'pdf', 'download')) {
    return "Use the DOWNLOAD_RESUME button in THE_UPLINK section at the bottom of the page to get a PDF.";
  }
  if (hit('github', 'code', 'repo')) {
    return "GitHub: github.com/rakesh580 — public repos include SkyPulse (Weather_App), Rchat.ai, Collective Brain, and the portfolio source itself.";
  }
  if (hit('linkedin')) {
    return "LinkedIn: linkedin.com/in/rakesh-c-231334329";
  }
  return "I'm in offline demo mode right now. Try asking about Rakesh's projects (Wellby, Collective Brain, SkyPulse, EdgeTicker, Rchat.ai), skills, experience, or contact info.";
};

const NexusAgent: React.FC<NexusAgentProps> = ({ matchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; text: string }[]>([
    { role: 'agent', text: 'Nexus Agent initialized. How can I assist you with Rakesh\'s portfolio today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (matchData) {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: `Neural Resume Tailor analysis complete. I've highlighted Rakesh's expertise that matches your JD. For example, his experience with ${matchData.relevantSkills.slice(0, 3).join(', ')} is highly relevant here.`
      }]);
      setIsOpen(true);
    }
  }, [matchData]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY || '';
      if (!apiKey) {
        // Graceful demo-mode fallback — no broken chat.
        setIsOfflineMode(true);
        await new Promise(r => setTimeout(r, 350));
        setMessages(prev => [...prev, { role: 'agent', text: offlineReply(userMsg) }]);
        setIsLoading(false);
        return;
      }

      const systemPrompt = `You are "Nexus Agent", an advanced AI representative for Rakesh Chintanippu.
Rakesh is a Software Engineer with expertise in full-stack, AI, and distributed systems.

KEY DETAILS:
- Current Role: Software Engineer at Cruxito Tech Solutions LLC (USA).
- Education: MS in Computer Science from North Carolina A&T (GPA 3.9/4.0), BS from VJIT India (GPA 3.8/4.0).
- Key Skills: Python (FastAPI/Flask), Java (Spring Boot), React, Docker, AWS (EKS/Lambda).

PROJECT DETAILS (use these to answer project questions):

1. AI Weather Assistant (SkyPulse) — Live at weather-app-s3vf.onrender.com
   - Problem: Traditional weather apps show raw numbers but don't answer questions like "Should I bring an umbrella?"
   - Solution: Combines OpenWeatherMap data with Meta's LLaMA 3.3 70B via Hugging Face for conversational weather
   - Key Features: Comfort Score (0-100 combining temp/humidity/wind/visibility), Smart Clothing Advisor, AI Chat, 5-day forecast with 3 views, interactive Leaflet map, sunrise/sunset bar, live city clock, weather particle animations, dark/light mode
   - How it works: User searches city → FastAPI backend calls OpenWeatherMap → Calculates Comfort Score (temp 40%, humidity 25%, wind 20%, visibility 15%) → Frontend renders charts/map/particles → AI chat sends weather context to LLaMA 3.3
   - Tech: Python FastAPI, OpenWeatherMap API, Hugging Face (LLaMA 3.3 70B), vanilla HTML/CSS/JS, Chart.js, Leaflet.js, Docker, GitHub Actions CI/CD to AWS EC2

2. EdgeTicker — Live at huggingface.co/spaces/mindflayer80058/Edgeticker
   - Problem: Stock analysis is fragmented across 5+ tools, most are too complex for non-experts
   - Solution: One platform with BUY/HOLD/AVOID signals using SMA-200 + RSI-14, with visual explanations
   - Signal Logic: BUY = price ≤ SMA-200 AND RSI < 40. HOLD = price ≤ SMA-200×1.10 AND RSI < 65. AVOID = price > SMA-200×1.10 OR RSI ≥ 65. Stop loss 5% below buy, target 8% above resistance.
   - Key Features: Live price streaming, candlestick charts with overlays, multi-timeframe analysis, backtesting (2-5yr), options flow detection, stock screener, portfolio tracker, price alerts, AI Market Copilot (Mistral-7B), dark/light mode
   - Tech: React 19, Vite 7, FastAPI, yfinance, Mistral-7B, Lightweight Charts, 20+ REST endpoints

3. Rchat.ai — github.com/rakesh580/Rchat.ai-
   - Real-time AI-powered chat with WebSockets, room management, JWT/OAuth2 auth
   - Tech: FastAPI, React, WebSockets, PostgreSQL, Redis Pub/Sub

4. Collective Brain — Enterprise knowledge management platform
   - Problem: Teams lose institutional knowledge across Git repos, docs, Slack, and tribal wisdom
   - Solution: Unified RAG + Agent platform that ingests multi-source content and answers natural-language questions with citations
   - Key Features: 7 source connectors (Git, Markdown, PDF, DOCX, Slack, Discord, web), dual AI modes (RAG + LangGraph Agents), real-time WebSocket chat rooms, auto-generated knowledge graph, team expertise scoring, weekly AI insights, Google OAuth
   - Tech: React 19, FastAPI, ChromaDB (384-dim embeddings via SentenceTransformers), LangGraph, Redis Pub/Sub, PostgreSQL + SQLAlchemy

5. Wellby Health Assistant — Live at wellby-production-773067923612.us-central1.run.app
   - Problem: Health apps are fragmented — one for vitals, one for nutrition, one for triage, none with an intelligent AI layer that ties everything together
   - Solution: Enterprise-grade AI health companion with 110+ API endpoints, 120+ React components, 21 DB models, unified multi-provider AI routing (Groq, Gemma 4, OpenAI, Anthropic)
   - Key Features: AI symptom triage with severity/urgency scoring, drug interaction checker (200+ drugs), multi-modal vision AI (meal scanner, nutrition label OCR, menu scanner), Medical RAG knowledge base, real-time anomaly detection with TensorFlow.js, wearable integration (Apple Watch/Fitbit/Garmin), 14 AI companions with 3D animations, gamification (XP, levels, streaks, 28 trophies), Stripe premium tier, HIPAA-aligned encryption
   - Tech: React 19, TypeScript 5.8, Express, Prisma, Google Gemma 4 (31B Dense + 26B MoE, 256K context), TensorFlow.js, GCP Cloud Run

INSTRUCTIONS:
- Tone: Futuristic, professional, cyber-engineered, helpful.
- Keep responses concise (under 3 sentences unless asked for detail).
- When asked about projects, use the detailed info above to give specific answers.
- You can explain technical concepts in simple terms for non-technical users.
${matchData ? `CURRENT CONTEXT: The user is analyzing Rakesh for a role that requires ${matchData.relevantSkills.join(', ')}. Focus on these skills.` : ''}`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userMsg }
          ],
          max_tokens: 512,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API response error:", response.status, errorBody);
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "Connection interrupted. Please try again.";
      setMessages(prev => [...prev, { role: 'agent', text }]);
    } catch (err) {
      console.error("AI Error:", err);
      // Live API failed — fall back to offline responder so the chat never feels broken.
      setIsOfflineMode(true);
      setMessages(prev => [...prev, { role: 'agent', text: offlineReply(userMsg) }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-mono">
      {isOpen ? (
        <div className="glass-panel w-80 h-96 rounded-lg border-mint/20 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-white/5 p-4 border-b border-white/10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`size-2 rounded-full animate-pulse ${isOfflineMode ? 'bg-yellow-400' : 'bg-mint'}`}></div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${isOfflineMode ? 'text-yellow-400' : 'text-mint'}`}>
                NEXUS_AGENT {isOfflineMode ? '// OFFLINE_DEMO' : 'v1.1'}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white" aria-label="Close chat">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-sm text-[11px] leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-mint/10 border border-mint/20 text-white'
                    : 'bg-white/5 border border-white/10 text-gray-300'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-3 rounded-sm border border-white/10 flex gap-1">
                  <div className="size-1 bg-mint rounded-full animate-bounce"></div>
                  <div className="size-1 bg-mint rounded-full animate-bounce [animation-delay:0.1s]"></div>
                  <div className="size-1 bg-mint rounded-full animate-bounce [animation-delay:0.2s]"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-void">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query agent..."
                className="flex-grow bg-white/5 border border-white/10 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-mint/50"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-mint text-void p-2 rounded-sm hover:bg-white transition-colors"
                aria-label="Send message"
              >
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Nexus Agent chat"
          className={`size-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all group ${
            matchData ? 'bg-laser text-void animate-pulse' : 'bg-mint text-void'
          }`}
        >
          <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
            {matchData ? 'psychology' : 'smart_toy'}
          </span>
        </button>
      )}
    </div>
  );
};

export default NexusAgent;
