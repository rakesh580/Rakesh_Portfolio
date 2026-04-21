
import React from 'react';
import { DiagramNode, DiagramEdge } from '../types';

interface DiagramProps {
  nodes: DiagramNode[];
  edges: DiagramEdge[];
}

const ArchitectureDiagram: React.FC<DiagramProps> = ({ nodes, edges }) => {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'client': return '#00C2FF';
      case 'server': return '#00FF88';
      case 'database': return '#7000FF';
      case 'external': return '#FFB800';
      case 'llm': return '#FF00F5';
      default: return '#FFFFFF';
    }
  };

  const ariaSummary = nodes.map(n => n.label).join(', ') +
    (edges.length ? ', connected by ' + edges.map(e => e.label || `${e.from}→${e.to}`).join(', ') : '');

  return (
    <div className="relative w-full h-full min-h-[400px] bg-void/40 overflow-visible p-8">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 350"
        className="overflow-visible"
        role="img"
        aria-label={`System architecture diagram · ${ariaSummary}`}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#00FF88" fillOpacity="0.6" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          return (
            <g key={i}>
              <line
                x1={fromNode.x + 80}
                y1={fromNode.y + 25}
                x2={toNode.x}
                y2={toNode.y + 25}
                stroke="#00FF88"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                markerEnd="url(#arrowhead)"
              />
              <line
                x1={fromNode.x + 80}
                y1={fromNode.y + 25}
                x2={toNode.x}
                y2={toNode.y + 25}
                stroke="#00FF88"
                strokeWidth="2"
                strokeDasharray="4 8"
                strokeOpacity="0.8"
                className="animate-[dash_30s_linear_infinite]"
              />
              {edge.label && (
                <text
                  x={(fromNode.x + 80 + toNode.x) / 2}
                  y={(fromNode.y + 25 + toNode.y + 25) / 2 - 10}
                  fill="#00FF88"
                  fontSize="8"
                  textAnchor="middle"
                  className="font-mono opacity-50 uppercase tracking-tighter"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="group cursor-pointer">
            <rect
              width="120"
              height="50"
              rx="4"
              fill="rgba(20, 20, 20, 0.8)"
              stroke={getNodeColor(node.type)}
              strokeWidth="1"
              strokeOpacity="0.4"
              className="group-hover:stroke-opacity-100 transition-all duration-300"
            />
            <rect
              width="120"
              height="50"
              rx="4"
              fill="none"
              stroke={getNodeColor(node.type)}
              strokeWidth="2"
              className="opacity-0 group-hover:opacity-40 group-hover:blur-[4px] transition-all duration-300"
            />
            <text
              x="60"
              y="30"
              textAnchor="middle"
              fill="white"
              fontSize="10"
              className="font-mono font-bold tracking-tighter pointer-events-none"
            >
              {node.label}
            </text>
            <text
              x="60"
              y="45"
              textAnchor="middle"
              fill={getNodeColor(node.type)}
              fontSize="6"
              className="font-mono uppercase opacity-50 pointer-events-none"
            >
              {node.type}
            </text>
          </g>
        ))}
      </svg>
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
      `}</style>
    </div>
  );
};

export default ArchitectureDiagram;
