
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
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
      if (!apiKey) {
        throw new Error("API Key Missing");
      }

      const systemPrompt = `You are "Nexus Agent", an advanced AI representative for Rakesh Chintanippu.
Rakesh is a Software Engineer with expertise in full-stack, AI, and distributed systems.
Key details about him:
- Current Role: Software Engineer at Cruxito Tech Solutions LLC (USA).
- Education: MS in Computer Science from North Carolina A&T (GPA 3.9/4.0), BS from VJIT India (GPA 3.8/4.0).
- Top Projects: AI Weather Assistant (LLaMA-3), Rchat.ai (Real-time WebSockets).
- Key Skills: Python (FastAPI/Flask), Java (Spring Boot), React, Docker, AWS (EKS/Lambda).
- Location: Charlotte, NC.
- Tone: Futuristic, professional, cyber-engineered, helpful.
- Keep responses concise (under 3 sentences).
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
          max_tokens: 256,
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
