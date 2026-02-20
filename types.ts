
export interface DiagramNode {
  id: string;
  label: string;
  type: 'client' | 'server' | 'database' | 'external' | 'llm';
  x: number;
  y: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Project {
  id: string;
  title: string;
  mission: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image: string;
  impact: string;
  architecture?: string;
  metrics?: string[];
  diagram?: {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
  };
}

export interface SkillNode {
  subject: string;
  value: number;
  fullMark: number;
}

export interface TimelineEvent {
  period: string;
  role: string;
  company: string;
  description: string;
  stack: string[];
  location?: string;
  impact?: string[];
}

export interface MatchData {
  relevantSkills: string[];
  projectScores: Record<string, number>; // Project ID -> Match Score (0-100)
  summary: string;
}
