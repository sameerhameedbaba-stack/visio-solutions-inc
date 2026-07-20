import { cn } from '@/lib/utils';

/**
 * Custom abstract "connected systems" visualization for the hero.
 * Shows layered nodes — operations, software, AI/automation, security, growth —
 * joined by data pathways. Purely decorative (aria-hidden); motion is CSS-driven
 * and disabled under prefers-reduced-motion.
 */
export function SystemsDiagram({ className }: { className?: string }) {
  const nodes = [
    { label: 'Operations', x: 90, cy: 70, tone: '#2563EB' },
    { label: 'Software', x: 90, cy: 150, tone: '#3B82F6' },
    { label: 'AI + automation', x: 250, cy: 110, tone: '#0F9F9A' },
    { label: 'Security', x: 410, cy: 70, tone: '#2563EB' },
    { label: 'Growth', x: 410, cy: 150, tone: '#0891B2' },
  ];

  return (
    <div className={cn('relative w-full', className)} aria-hidden="true">
      <svg
        viewBox="0 0 500 240"
        fill="none"
        role="presentation"
        className="h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="sd-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#2563EB" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#2563EB" stopOpacity="0.55" />
            <stop offset="1" stopColor="#0F9F9A" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Connection pathways */}
        <g stroke="url(#sd-line)" strokeWidth="1.5">
          <path d="M90 70 C 170 70, 180 110, 250 110" />
          <path d="M90 150 C 170 150, 180 110, 250 110" />
          <path d="M250 110 C 320 110, 340 70, 410 70" />
          <path d="M250 110 C 320 110, 340 150, 410 150" />
        </g>
        {/* Animated signal dashes along the pathways */}
        <g
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeDasharray="4 12"
          className="motion-safe:[animation:dash-flow_1.6s_linear_infinite]"
          opacity="0.9"
        >
          <path d="M90 70 C 170 70, 180 110, 250 110" />
          <path d="M250 110 C 320 110, 340 70, 410 70" />
          <path d="M250 110 C 320 110, 340 150, 410 150" />
        </g>

        {/* Nodes */}
        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.cy}
              r="30"
              fill="rgb(var(--surface))"
              stroke={node.tone}
              strokeWidth="1.5"
            />
            <circle cx={node.x} cy={node.cy} r="6" fill={node.tone} />
            <text
              x={node.x}
              y={node.cy + 46}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="rgb(var(--muted-foreground))"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
