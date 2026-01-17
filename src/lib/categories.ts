// Comprehensive list of agent categories
export const AGENT_CATEGORIES = [
  'accessibility',
  'accounting',
  'analytics',
  'audio',
  'automation',
  'competitive-analysis',
  'content-creation',
  'customer-service',
  'data-extraction',
  'data-analysis',
  'email',
  'finance',
  'hr',
  'invoice',
  'learning',
  'legal',
  'market-research',
  'marketing',
  'operations',
  'podcast',
  'productivity',
  'project-management',
  'reporting',
  'research',
  'sales',
  'security',
  'seo',
  'social-media',
  'strategy',
  'text-to-audio',
  'translation',
  'video',
] as const;

export type AgentCategory = typeof AGENT_CATEGORIES[number] | 'all';

// Helper function to format category name for display
export function formatCategoryName(category: string): string {
  return category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

