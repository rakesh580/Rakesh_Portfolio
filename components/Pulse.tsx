
import React, { useEffect, useState } from 'react';

/**
 * THE_PULSE — live GitHub activity panel.
 *
 * Split into two layers per research recommendation:
 *   1. SVG stat cards (github-readme-stats) — server-rendered, zero cost to our rate limit.
 *   2. A single /events/public fetch (hand-cached in localStorage with a 1-hour TTL) for
 *      the recent-activity feed + "currently building" line. Keeps us under the 60/hr
 *      unauthenticated GitHub API cap for any realistic traffic level.
 */

const GH_USER = 'rakesh580';
const CACHE_KEY = 'pulse:events:v1';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

type GHEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: any;
};

type ReposResp = {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  private: boolean;
}[];

const relativeTime = (iso: string): string => {
  const d = new Date(iso).getTime();
  const diff = Date.now() - d;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

const summarizeEvent = (e: GHEvent): string => {
  const repo = e.repo.name.split('/').slice(-1)[0];
  switch (e.type) {
    case 'PushEvent': {
      const n = e.payload?.commits?.length || 1;
      const first = e.payload?.commits?.[0]?.message?.split('\n')[0] || '';
      return `pushed ${n} commit${n === 1 ? '' : 's'} to ${repo}${first ? ` — ${first}` : ''}`;
    }
    case 'CreateEvent':
      return `created ${e.payload?.ref_type || 'ref'} ${e.payload?.ref || ''} in ${repo}`;
    case 'PullRequestEvent':
      return `${e.payload?.action} PR #${e.payload?.number} in ${repo}`;
    case 'IssuesEvent':
      return `${e.payload?.action} issue #${e.payload?.issue?.number} in ${repo}`;
    case 'WatchEvent':
      return `starred ${repo}`;
    case 'ForkEvent':
      return `forked ${repo}`;
    case 'ReleaseEvent':
      return `released ${e.payload?.release?.tag_name || ''} on ${repo}`;
    default:
      return `${e.type.replace(/Event$/, '').toLowerCase()} on ${repo}`;
  }
};

const iconForEvent = (type: string): string => {
  switch (type) {
    case 'PushEvent': return 'commit';
    case 'CreateEvent': return 'add_circle';
    case 'PullRequestEvent': return 'merge';
    case 'IssuesEvent': return 'bug_report';
    case 'WatchEvent': return 'star';
    case 'ForkEvent': return 'call_split';
    case 'ReleaseEvent': return 'rocket_launch';
    default: return 'bolt';
  }
};

interface CachedPayload {
  ts: number;
  events: GHEvent[];
  latestRepo: {
    name: string;
    url: string;
    description: string | null;
    pushed_at: string;
    language: string | null;
  } | null;
}

const loadCache = (): CachedPayload | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedPayload;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

const saveCache = (payload: CachedPayload) => {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / disabled — ignore */
  }
};

const Pulse: React.FC = () => {
  const [events, setEvents] = useState<GHEvent[]>([]);
  const [latestRepo, setLatestRepo] = useState<CachedPayload['latestRepo']>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const cached = loadCache();
    if (cached) {
      setEvents(cached.events);
      setLatestRepo(cached.latestRepo);
      setLoading(false);
      return;
    }

    const fetchPulse = async () => {
      try {
        const [eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=30`),
          fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=10`),
        ]);
        if (!eventsRes.ok || !reposRes.ok) throw new Error('gh api');

        const eventsJson = (await eventsRes.json()) as GHEvent[];
        const reposJson = (await reposRes.json()) as ReposResp;
        const firstPublicRepo = reposJson.find(r => !r.fork && !r.private) || null;

        const payload: CachedPayload = {
          ts: Date.now(),
          events: eventsJson.slice(0, 8),
          latestRepo: firstPublicRepo
            ? {
                name: firstPublicRepo.name,
                url: firstPublicRepo.html_url,
                description: firstPublicRepo.description,
                pushed_at: firstPublicRepo.pushed_at,
                language: firstPublicRepo.language,
              }
            : null,
        };

        if (cancelled) return;
        setEvents(payload.events);
        setLatestRepo(payload.latestRepo);
        saveCache(payload);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPulse();
    return () => { cancelled = true; };
  }, []);

  const readmeStatsBase = `https://github-readme-stats.vercel.app/api`;
  const theme = '&bg_color=00000000&title_color=00FF88&text_color=E8E8F0&icon_color=7000FF&hide_border=true';

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <div className="flex items-end justify-between border-b border-white/5 pb-8 flex-wrap gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">THE_PULSE</h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">Live GitHub Signal Feed</p>
        </div>
        <a
          href={`https://github.com/${GH_USER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[10px] font-mono text-mint hover:text-white tracking-widest transition-colors"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          VIEW_ON_GITHUB
        </a>
      </div>

      {/* Currently Building banner */}
      {latestRepo && (
        <a
          href={latestRepo.url}
          target="_blank"
          rel="noreferrer"
          className="group block glass-panel border-mint/20 rounded-md p-6 hover:border-mint/60 transition-all"
        >
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-sm bg-mint/10 border border-mint/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-mint">construction</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-mint uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="size-1.5 bg-mint rounded-full animate-pulse"></span>
                  CURRENTLY_BUILDING
                </div>
                <div className="text-xl font-mono font-bold text-white group-hover:text-mint transition-colors">
                  {latestRepo.name}
                </div>
                {latestRepo.description && (
                  <p className="text-sm text-gray-400 max-w-2xl">{latestRepo.description}</p>
                )}
              </div>
            </div>
            <div className="text-right space-y-1">
              {latestRepo.language && (
                <div className="text-[10px] font-mono text-gray-400 tracking-widest">{latestRepo.language}</div>
              )}
              <div className="text-[10px] font-mono text-gray-500 tracking-widest">
                last push {relativeTime(latestRepo.pushed_at)}
              </div>
            </div>
          </div>
        </a>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GitHub Stats card */}
        <div className="glass-panel rounded-md p-4 border-white/5">
          <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em] mb-3">stats</div>
          <img
            src={`${readmeStatsBase}?username=${GH_USER}&show_icons=true&rank_icon=github${theme}`}
            alt="GitHub stats"
            loading="lazy"
            className="w-full"
          />
        </div>

        {/* Top languages */}
        <div className="glass-panel rounded-md p-4 border-white/5">
          <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em] mb-3">top_languages</div>
          <img
            src={`${readmeStatsBase}/top-langs/?username=${GH_USER}&layout=compact&langs_count=8${theme}`}
            alt="Top languages"
            loading="lazy"
            className="w-full"
          />
        </div>

        {/* Streak */}
        <div className="glass-panel rounded-md p-4 border-white/5">
          <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em] mb-3">streak</div>
          <img
            src={`https://streak-stats.demolab.com?user=${GH_USER}&background=00000000&stroke=00FF88&ring=00FF88&fire=7000FF&currStreakLabel=00FF88&sideLabels=E8E8F0&hide_border=true`}
            alt="GitHub streak"
            loading="lazy"
            className="w-full"
          />
        </div>
      </div>

      {/* Recent Activity feed */}
      <div className="glass-panel rounded-md border-white/5">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-mint rounded-full animate-pulse"></div>
            <div className="text-[10px] font-mono font-bold text-mint uppercase tracking-[0.3em]">
              recent_activity
            </div>
          </div>
          <div className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
            updated hourly · cached
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {loading && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              syncing signal from github.com/{GH_USER}...
            </div>
          )}
          {error && !events.length && !loading && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              GitHub API throttled — try again in a few minutes.
            </div>
          )}
          {!loading && !error && events.length === 0 && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              No recent public activity.
            </div>
          )}
          {events.map((e) => {
            const repoUrl = `https://github.com/${e.repo.name}`;
            return (
              <a
                key={e.id}
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <div className="size-8 shrink-0 rounded-sm bg-void border border-white/10 flex items-center justify-center text-mint group-hover:border-mint/50 transition-colors">
                  <span className="material-symbols-outlined text-sm">{iconForEvent(e.type)}</span>
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="text-[12px] font-mono text-gray-300 group-hover:text-white transition-colors truncate">
                    {summarizeEvent(e)}
                  </div>
                  <div className="text-[10px] font-mono text-gray-500 tracking-widest">
                    {relativeTime(e.created_at)}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Pulse;
