import { slugify } from './slugify';

const SEPARATOR = '-';

export function parseId(id: string): number {
  return parseInt(id, 10);
}

export function parseSlug(slug: string): number {
  const parts = slug.split(SEPARATOR);
  const id = parts[parts.length - 1];
  return parseId(id);
}

export function createSlug(id: number | string, title: string): string {
  const slug = slugify(title);
  return `${slug}${SEPARATOR}${id}`;
}
