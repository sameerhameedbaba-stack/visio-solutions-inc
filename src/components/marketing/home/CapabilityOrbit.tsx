import type { CSSProperties } from 'react';
import { pillars } from '@/content/services';
import { pillarIcons } from '@/components/marketing/icons';
import { pillarTheme } from '@/components/marketing/pillar-theme';

/**
 * Where each capability sits: centred on the four diagonal points of the middle
 * ring, which leaves room for the longest label without touching the core.
 */
const POSITIONS: Record<string, CSSProperties> = {
  'ai-automation': { left: '26%', top: '24%', transform: 'translate(-50%, -50%)' },
  software: { left: '74%', top: '24%', transform: 'translate(-50%, -50%)' },
  cybersecurity: { left: '74%', top: '76%', transform: 'translate(-50%, -50%)' },
  growth: { left: '26%', top: '76%', transform: 'translate(-50%, -50%)' },
};

/**
 * Hero visual: the four capabilities orbiting one connected core. Decorative
 * (aria-hidden) — the same information is the bento grid further down the page.
 * Motion is CSS only and stops under prefers-reduced-motion.
 */
export function CapabilityOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]" aria-hidden="true">
      {/* Halo behind the core. */}
      <div className="absolute inset-[22%] animate-glow-pulse rounded-full bg-[radial-gradient(closest-side,rgba(124,58,237,.55),rgba(37,99,235,.25)_55%,transparent)] blur-2xl" />

      <svg viewBox="0 0 520 520" fill="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient
            id="orbit-ring"
            x1="0"
            y1="0"
            x2="520"
            y2="520"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#60A5FA" />
            <stop offset="0.45" stopColor="#A78BFA" />
            <stop offset="0.75" stopColor="#F472B6" />
            <stop offset="1" stopColor="#FB923C" />
          </linearGradient>
        </defs>
        <g className="origin-center animate-orbit-slow [transform-box:fill-box]">
          <circle
            cx="260"
            cy="260"
            r="236"
            stroke="url(#orbit-ring)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
            strokeDasharray="2 10"
          />
          <circle cx="260" cy="24" r="4" fill="#A78BFA" />
          <circle cx="496" cy="260" r="3" fill="#60A5FA" />
        </g>
        <g className="origin-center animate-orbit-reverse [transform-box:fill-box]">
          <circle
            cx="260"
            cy="260"
            r="176"
            stroke="url(#orbit-ring)"
            strokeOpacity="0.6"
            strokeWidth="1.4"
          />
          <circle cx="84" cy="260" r="3.5" fill="#F472B6" />
          <circle cx="260" cy="436" r="3" fill="#FB923C" />
        </g>
        <circle
          cx="260"
          cy="260"
          r="112"
          stroke="url(#orbit-ring)"
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="1 7"
        />
        {/* Spokes from the core to each capability, with travelling signals. */}
        <g stroke="url(#orbit-ring)" strokeWidth="1.4" strokeOpacity="0.55">
          <path d="M215 215 L 140 140" />
          <path d="M305 215 L 380 140" />
          <path d="M305 305 L 380 380" />
          <path d="M215 305 L 140 380" />
        </g>
        <g
          stroke="#fff"
          strokeWidth="1.6"
          strokeDasharray="3 13"
          strokeOpacity="0.8"
          className="motion-safe:[animation:dash-flow_1.4s_linear_infinite]"
        >
          <path d="M215 215 L 140 140" />
          <path d="M305 215 L 380 140" />
          <path d="M305 305 L 380 380" />
          <path d="M215 305 L 140 380" />
        </g>
      </svg>

      {/* Core */}
      <div className="absolute left-1/2 top-1/2 flex h-[24%] w-[24%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[28%] bg-[linear-gradient(135deg,#2563EB,#7C3AED_50%,#DB2777)] shadow-glow-lg ring-1 ring-white/30">
        <svg viewBox="0 0 32 32" className="h-1/2 w-1/2" fill="none">
          <path
            d="M10 10 L22 10 M10 10 L10 22 M10 22 L22 22 M22 10 L22 22 M10 10 L22 22"
            stroke="#fff"
            strokeWidth="1.4"
            strokeOpacity="0.7"
          />
          <circle cx="10" cy="10" r="2.8" fill="#fff" />
          <circle cx="22" cy="10" r="2.8" fill="#A5F3FC" />
          <circle cx="10" cy="22" r="2.8" fill="#FDBA74" />
          <circle cx="22" cy="22" r="2.8" fill="#6EE7B7" />
        </svg>
      </div>

      {/* Capability chips */}
      {pillars.map((pillar, index) => {
        const Icon = pillarIcons[pillar.id];
        const theme = pillarTheme[pillar.id];
        return (
          <div key={pillar.id} className="absolute" style={POSITIONS[pillar.id]}>
            <div
              className="flex animate-float items-center gap-2.5 rounded-2xl border border-white/15 bg-ink/60 py-2 pl-2 pr-3.5 shadow-[0_10px_40px_-12px_rgba(0,0,0,.6)] backdrop-blur-md"
              style={{ animationDelay: `${index * -1.5}s` }}
            >
              <span
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ backgroundImage: theme.gradient }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="whitespace-nowrap text-sm font-semibold text-white">
                {pillar.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
