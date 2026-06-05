export const BLOG_CATEGORIES = ['Legal', 'Current Affairs', 'Law Preparation'] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export const BLOG_CATEGORY_COLORS: Record<string, string> = {
  Legal: '#6366f1',
  'Current Affairs': '#f97316',
  'Law Preparation': '#08BD80',
};

export function categoryColor(category: string): string {
  return BLOG_CATEGORY_COLORS[category] || '#08BD80';
}
