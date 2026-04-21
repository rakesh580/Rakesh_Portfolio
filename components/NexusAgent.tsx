
import React, { useState, useRef, useEffect } from 'react';
import { MatchData } from '../types';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface NexusAgentProps {
  matchData?: MatchData | null;
}

const NexusAgent: React.FC<NexusAgentProps> = ({ matchData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
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
        throw new Error("API Key Missing");
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
      const errorMsg = err instanceof Error && err.message === "API Key Missing"
        ? "Uplink key not found. Please ensure your environment is configured."
        : err instanceof DOMException && err.name === 'AbortError'
        ? "Request timed out. Please try again."
        : "Error accessing cortex nodes. Connection interrupted.";
      setMessages(prev => [...prev, { role: 'agent', text: errorMsg }]);
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
              <div className="size-2 bg-mint rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-mint uppercase tracking-widest">NEXUS_AGENT v1.1</span>
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
