
import React, { useState } from 'react';
import { PROJECTS, TIMELINE } from '../constants';
import { MatchData } from '../types';

const GROQ_MODEL = 'llama-3.3-70b-versatile';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

interface ResumeTailorProps {
  onMatch: (data: MatchData | null) => void;
}

const ResumeTailor: React.FC<ResumeTailorProps> = ({ onMatch }) => {
  const [jd, setJd] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeJD = async () => {
    if (!jd.trim()) return;
    setIsAnalyzing(true);
    setError(null);

    try {
      const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
      if (!apiKey) {
        throw new Error("API Key Missing");
      }

      const prompt = `Analyze this Job Description (JD) against Rakesh Chintanippu's portfolio data.

RAKESH'S PROJECTS: ${JSON.stringify(PROJECTS)}
RAKESH'S CAREER: ${JSON.stringify(TIMELINE)}

JOB DESCRIPTION: ${jd}

Return ONLY a valid JSON object (no markdown, no code fences) with exactly these keys:
1. "relevantSkills": String array of technical keywords from the JD that Rakesh possesses.
2. "projectScores": Object mapping project IDs ("weather-ai", "rchat", "edgeticker") to a match percentage (0-100) based on relevance to the JD.
3. "summary": A 2-sentence explanation of why Rakesh is a fit for this specific role.`;

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
            { role: 'system', content: 'You are a JSON-only response bot. You must respond with valid JSON and nothing else. No markdown, no code fences, no explanations.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 512,
          temperature: 0.3,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API response error:", response.status, errorBody);
        throw new Error(`API error: ${response.status}`);
      }

      const responseData = await response.json();
      const rawText = responseData.choices?.[0]?.message?.content || '';

      // Extract JSON from the response, handling potential markdown code fences
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("Could not parse AI response");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate the response has the expected MatchData shape
      if (!Array.isArray(parsed.relevantSkills) || typeof parsed.projectScores !== 'object' || typeof parsed.summary !== 'string') {
        throw new Error("Invalid response structure");
      }

      const data: MatchData = {
        relevantSkills: parsed.relevantSkills,
        projectScores: parsed.projectScores,
        summary: parsed.summary,
      };
      onMatch(data);
      setShowInput(false);
    } catch (err) {
      console.error("Tailor Error:", err);
      setError(
        err instanceof Error && err.message === "API Key Missing"
          ? "API key not configured. Please check your environment setup."
          : err instanceof DOMException && err.name === 'AbortError'
          ? "Request timed out. Please try again."
          : "Analysis failed. Please try again or refine your input."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="mb-12">
      {!showInput ? (
        <button
          onClick={() => setShowInput(true)}
          className="w-full py-4 border-2 border-dashed border-mint/20 rounded-md bg-mint/5 hover:bg-mint/10 hover:border-mint/40 transition-all group flex flex-col items-center justify-center gap-2"
        >
          <div className="flex items-center gap-2 text-mint">
            <span className="material-symbols-outlined animate-pulse">psychology</span>
            <span className="font-mono font-bold text-xs tracking-[0.2em] uppercase">Activate Neural Resume Tailor</span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono">Paste a Job Description to highlight matching expertise</p>
        </button>
      ) : (
        <div className="glass-panel p-6 rounded-md border-mint/30 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xs font-mono font-bold text-mint tracking-[0.3em] uppercase">Job Description Uplink</h3>
            <button onClick={() => { setShowInput(false); setError(null); onMatch(null); }} className="text-gray-500 hover:text-white" aria-label="Close resume tailor">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>

          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste technical requirements or full JD here..."
            className="w-full h-40 bg-void border border-white/10 rounded-sm p-4 text-sm text-gray-300 font-mono focus:outline-none focus:border-mint/50 custom-scrollbar mb-4"
          />

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-red-400 text-sm">error</span>
              <span className="text-red-400 text-xs font-mono">{error}</span>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={analyzeJD}
              disabled={isAnalyzing || !jd.trim()}
              className="flex-1 h-12 bg-mint text-void font-mono font-bold text-xs tracking-widest uppercase hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="size-3 border-2 border-void border-t-transparent rounded-full animate-spin"></div>
                  ANALYZING_CORTEX...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                  CALCULATE_MATCH
                </>
              )}
            </button>
            <button
              onClick={() => { setJd(''); setError(null); onMatch(null); }}
              className="px-6 border border-white/10 text-gray-500 hover:text-white hover:border-white/20 transition-all font-mono text-xs"
            >
              RESET
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeTailor;
