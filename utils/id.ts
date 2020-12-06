import { slugify } from './slugify';

export function parseId(id: string | string[]): number {
  return parseInt(id as string, 10);
}

// TODO: Might need more robust parsing for slugs in the future.
export const parseSlug = parseId;

export function createSlug(id: number | string, title: string): string {
  const slug = slugify(title);
  return `${id}-${slug}`;
}
