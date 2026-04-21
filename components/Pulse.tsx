
import React, { useEffect, useMemo, useState } from 'react';

/**
 * THE_PULSE — fully custom, terminal-themed live GitHub panel.
 *
 * Data comes from three GitHub REST endpoints batched on mount and cached
 * in localStorage for 1 hour. Total cost per visitor per hour: ~7 calls,
 * well under the 60/hr unauthenticated cap.
 *
 * Layout:
 *   1. A top "whoami" terminal card with key stats (repos, stars, followers, member-since)
 *   2. A "languages --breakdown" bar chart with real byte percentages aggregated
 *      across top repos' /languages endpoints
 *   3. Currently_Building banner showing the most recently pushed public repo
 *   4. Recent_Activity feed from /events/public
 *
 * No external stats images, no brand-breaking third-party embeds.
 */

const GH_USER = 'rakesh580';
const CACHE_KEY = 'pulse:v2';
const CACHE_TTL_MS = 60 * 60 * 1000;
const TOP_REPOS_FOR_LANG_BREAKDOWN = 6;

type GHEvent = {
  id: string;
  type: string;
  created_at: string;
  repo: { name: string };
  payload: any;
};

type GHRepo = {
  name: string;
  html_url: string;
  description: string | null;
  pushed_at: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  private: boolean;
  languages_url: string;
  size: number;
  updated_at: string;
};

type GHUser = {
  login: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  bio: string | null;
  html_url: string;
};

type LangBreakdown = { name: string; bytes: number; pct: number }[];

type Cached = {
  ts: number;
  user: GHUser;
  events: GHEvent[];
  latestRepo: {
    name: string; url: string; description: string | null;
    pushed_at: string; language: string | null;
  } | null;
  stats: {
    totalStars: number;
    topRepo: { name: string; stars: number } | null;
  };
  langs: LangBreakdown;
};

// ---------- helpers ----------
const relativeTime = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
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

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const summarizeEvent = (e: GHEvent): string => {
  const repo = e.repo.name.split('/').slice(-1)[0];
  switch (e.type) {
    case 'PushEvent': {
      const n = e.payload?.commits?.length || 1;
      const first = e.payload?.commits?.[0]?.message?.split('\n')[0] || '';
      return `git push origin → ${repo}${first ? `  [${first}]` : ''} (${n} commit${n === 1 ? '' : 's'})`;
    }
    case 'CreateEvent':
      return `git create ${e.payload?.ref_type || 'ref'} ${e.payload?.ref || ''} → ${repo}`;
    case 'PullRequestEvent':
      return `gh pr ${e.payload?.action} #${e.payload?.number} → ${repo}`;
    case 'IssuesEvent':
      return `gh issue ${e.payload?.action} #${e.payload?.issue?.number} → ${repo}`;
    case 'WatchEvent':
      return `gh star → ${repo}`;
    case 'ForkEvent':
      return `gh fork → ${repo}`;
    case 'ReleaseEvent':
      return `gh release ${e.payload?.release?.tag_name || ''} → ${repo}`;
    default:
      return `${e.type.replace(/Event$/, '').toLowerCase()} → ${repo}`;
  }
};

const iconForEvent = (type: string): string => ({
  PushEvent: 'commit',
  CreateEvent: 'add_circle',
  PullRequestEvent: 'merge',
  IssuesEvent: 'bug_report',
  WatchEvent: 'star',
  ForkEvent: 'call_split',
  ReleaseEvent: 'rocket_launch',
} as Record<string, string>)[type] || 'bolt';

// Stable-ish per-name palette so the same language always gets the same hue.
const LANG_COLORS: Record<string, string> = {
  Python: '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Java: '#B07219',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Shell: '#89E051',
  Dockerfile: '#384D54',
  Jupyter: '#DA5B0B',
  Go: '#00ADD8',
  C: '#555555',
  'C++': '#F34B7D',
  Ruby: '#701516',
  Rust: '#DEA584',
  PLpgSQL: '#336790',
  Mako: '#7E858D',
};
const fallbackColor = (name: string) => {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return `hsl(${h}, 65%, 55%)`;
};
const colorFor = (name: string) => LANG_COLORS[name] || fallbackColor(name);

// ---------- cache ----------
const loadCache = (): Cached | null => {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Cached;
    if (Date.now() - parsed.ts > CACHE_TTL_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};
const saveCache = (c: Cached) => {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch {}
};

// ---------- fetcher ----------
async function fetchPulse(): Promise<Cached> {
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GH_USER}`),
    fetch(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=30`),
    fetch(`https://api.github.com/users/${GH_USER}/events/public?per_page=30`),
  ]);
  if (!userRes.ok || !reposRes.ok || !eventsRes.ok) throw new Error('gh api');

  const user = (await userRes.json()) as GHUser;
  const repos = (await reposRes.json()) as GHRepo[];
  const events = (await eventsRes.json()) as GHEvent[];

  const publicRepos = repos.filter(r => !r.fork && !r.private);
  const firstPublic = publicRepos[0] || null;

  const totalStars = publicRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const topRepo = publicRepos.reduce<{ name: string; stars: number } | null>(
    (best, r) => (!best || r.stargazers_count > best.stars)
      ? { name: r.name, stars: r.stargazers_count }
      : best,
    null,
  );

  // Parallel language breakdown from the top-by-size public repos.
  const langSources = publicRepos
    .slice()
    .sort((a, b) => b.size - a.size)
    .slice(0, TOP_REPOS_FOR_LANG_BREAKDOWN);

  const langResults = await Promise.all(
    langSources.map(r => fetch(r.languages_url).then(res => res.ok ? res.json() : {}).catch(() => ({})))
  );
  const merged: Record<string, number> = {};
  for (const row of langResults) {
    for (const [name, bytes] of Object.entries(row as Record<string, number>)) {
      merged[name] = (merged[name] || 0) + bytes;
    }
  }
  const totalBytes = Object.values(merged).reduce((a, b) => a + b, 0) || 1;
  const langs: LangBreakdown = Object.entries(merged)
    .map(([name, bytes]) => ({ name, bytes, pct: (bytes / totalBytes) * 100 }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);

  return {
    ts: Date.now(),
    user,
    events: events.slice(0, 8),
    latestRepo: firstPublic
      ? {
          name: firstPublic.name,
          url: firstPublic.html_url,
          description: firstPublic.description,
          pushed_at: firstPublic.pushed_at,
          language: firstPublic.language,
        }
      : null,
    stats: { totalStars, topRepo },
    langs,
  };
}

// ---------- sub-components ----------
const StatCell: React.FC<{ label: string; value: string | number; icon?: string }> = ({ label, value, icon }) => (
  <div className="p-5 border border-white/10 rounded-sm bg-void/40 group hover:border-mint/40 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      {icon && <span className="material-symbols-outlined text-mint text-sm">{icon}</span>}
      <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">{label}</div>
    </div>
    <div className="text-3xl font-mono font-bold text-white tracking-tighter group-hover:text-mint transition-colors">
      {value}
    </div>
  </div>
);

const LangBar: React.FC<{ lang: { name: string; pct: number }; maxPct: number }> = ({ lang, maxPct }) => {
  const barChars = 28;
  const filled = Math.max(1, Math.round((lang.pct / maxPct) * barChars));
  return (
    <div className="group grid grid-cols-[1fr_auto] gap-4 items-center py-1.5">
      <div className="flex items-center gap-3 min-w-0">
        <div
          className="size-2.5 rounded-sm shrink-0"
          style={{ backgroundColor: colorFor(lang.name) }}
          aria-hidden
        />
        <span className="text-[12px] font-mono text-gray-300 w-24 truncate shrink-0">{lang.name}</span>
        <div className="flex-1 font-mono text-[12px] tracking-widest text-gray-600 overflow-hidden">
          <span style={{ color: colorFor(lang.name) }}>{'█'.repeat(filled)}</span>
          <span>{'░'.repeat(barChars - filled)}</span>
        </div>
      </div>
      <span className="text-[11px] font-mono text-gray-400 tabular-nums w-16 text-right">
        {lang.pct.toFixed(1)}%
      </span>
    </div>
  );
};

// ---------- main ----------
const Pulse: React.FC = () => {
  const [data, setData] = useState<Cached | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cached = loadCache();
    if (cached) { setData(cached); setLoading(false); return; }

    fetchPulse()
      .then(d => { if (!cancelled) { setData(d); saveCache(d); } })
      .catch(() => { if (!cancelled) setError(true); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const topLangPct = useMemo(() =>
    data?.langs[0]?.pct || 100,
    [data]
  );

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Section header */}
      <div className="flex items-end justify-between border-b border-white/5 pb-8 flex-wrap gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">THE_PULSE</h2>
          <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.4em]">
            Live GitHub Signal Feed
          </p>
        </div>
        <a
          href={`https://github.com/${GH_USER}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 border border-mint/30 rounded-sm text-mint text-[10px] font-mono font-bold tracking-widest hover:bg-mint hover:text-void transition-all"
        >
          <span className="material-symbols-outlined text-sm">open_in_new</span>
          VIEW_ON_GITHUB
        </a>
      </div>

      {/* Terminal: whoami */}
      <div className="glass-panel rounded-md border-white/10 overflow-hidden">
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="size-2 rounded-full bg-red-500/50" />
            <div className="size-2 rounded-full bg-yellow-500/50" />
            <div className="size-2 rounded-full bg-green-500/50" />
          </div>
          <div className="text-[10px] font-mono text-gray-500">
            pulse-terminal — gh api /users/{GH_USER}
          </div>
          <div className="w-10" />
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 font-mono">
            <span className="text-mint font-bold">~</span>
            <span className="text-white text-sm">gh api /users/{GH_USER} --stats</span>
            <span className="size-2 bg-mint animate-pulse" />
          </div>

          {loading && (
            <div className="text-[12px] font-mono text-gray-500 pl-6">
              syncing with github.com...
            </div>
          )}

          {error && !data && (
            <div className="text-[12px] font-mono text-yellow-400 pl-6">
              // GitHub API throttled. Will retry on next visit.
            </div>
          )}

          {data && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <StatCell label="Public Repos" value={data.user.public_repos} icon="folder_open" />
                <StatCell label="Stars Earned" value={data.stats.totalStars} icon="star" />
                <StatCell label="Followers" value={data.user.followers} icon="group" />
                <StatCell label="Recent Signals" value={data.events.length} icon="sensors" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 border border-white/10 rounded-sm bg-void/40">
                  <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-1">
                    member_since
                  </div>
                  <div className="text-sm font-mono text-white">
                    {formatDate(data.user.created_at)}
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-sm bg-void/40">
                  <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-1">
                    latest_push
                  </div>
                  <div className="text-sm font-mono text-white">
                    {data.latestRepo ? relativeTime(data.latestRepo.pushed_at) : '—'}
                  </div>
                </div>
                <div className="p-4 border border-white/10 rounded-sm bg-void/40">
                  <div className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-1">
                    top_repo
                  </div>
                  <div className="text-sm font-mono text-white truncate">
                    {data.stats.topRepo
                      ? `${data.stats.topRepo.name}  ★${data.stats.topRepo.stars}`
                      : '—'}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Languages */}
      {data && data.langs.length > 0 && (
        <div className="glass-panel rounded-md border-white/10 overflow-hidden">
          <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
            <div className="text-[10px] font-mono text-mint font-bold tracking-[0.3em] uppercase">
              languages --breakdown
            </div>
            <div className="text-[10px] font-mono text-gray-500">
              aggregated from top {Math.min(TOP_REPOS_FOR_LANG_BREAKDOWN, data.user.public_repos)} repos
            </div>
          </div>
          <div className="p-6 md:p-8">
            <div className="space-y-0.5">
              {data.langs.map(l => (
                <LangBar key={l.name} lang={l} maxPct={topLangPct} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Currently Building */}
      {data?.latestRepo && (
        <a
          href={data.latestRepo.url}
          target="_blank"
          rel="noreferrer"
          className="group block relative overflow-hidden rounded-md border border-mint/20 hover:border-mint/60 transition-all"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,#00FF8815,transparent_50%)] pointer-events-none" />
          <div className="p-6 flex items-start justify-between gap-6 flex-wrap relative">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-sm bg-mint/10 border border-mint/30 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-mint">construction</span>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-mint uppercase tracking-[0.3em] flex items-center gap-2">
                  <span className="size-1.5 bg-mint rounded-full animate-pulse" />
                  currently_building
                </div>
                <div className="text-xl font-mono font-bold text-white group-hover:text-mint transition-colors">
                  {data.latestRepo.name}
                </div>
                {data.latestRepo.description && (
                  <p className="text-sm text-gray-400 max-w-2xl">{data.latestRepo.description}</p>
                )}
              </div>
            </div>
            <div className="text-right space-y-1">
              {data.latestRepo.language && (
                <div className="flex items-center gap-2 justify-end">
                  <div
                    className="size-2.5 rounded-sm"
                    style={{ backgroundColor: colorFor(data.latestRepo.language) }}
                  />
                  <span className="text-[10px] font-mono text-gray-300 tracking-widest">
                    {data.latestRepo.language}
                  </span>
                </div>
              )}
              <div className="text-[10px] font-mono text-gray-500 tracking-widest">
                last push {relativeTime(data.latestRepo.pushed_at)}
              </div>
            </div>
          </div>
        </a>
      )}

      {/* Recent Activity */}
      <div className="glass-panel rounded-md border-white/10 overflow-hidden">
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-mint rounded-full animate-pulse" />
            <div className="text-[10px] font-mono text-mint font-bold tracking-[0.3em] uppercase">
              recent_activity
            </div>
          </div>
          <div className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">
            cached · refreshes every hour
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {loading && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              tailing event stream from github.com/{GH_USER}...
            </div>
          )}
          {error && !data?.events.length && !loading && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              GitHub API throttled — try again in a few minutes.
            </div>
          )}
          {!loading && !error && data && data.events.length === 0 && (
            <div className="px-6 py-10 text-center text-[11px] font-mono text-gray-500">
              No recent public activity.
            </div>
          )}
          {data?.events.map((e) => {
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
