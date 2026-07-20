import { Code2, LineChart, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react';
import type { PillarId } from '@/content/types';

/** One consistent line-icon per capability pillar. */
export const pillarIcons: Record<PillarId, LucideIcon> = {
  'ai-automation': Workflow,
  software: Code2,
  cybersecurity: ShieldCheck,
  growth: LineChart,
};
